import * as tf from '@tensorflow/tfjs';

class MLEngine {
  constructor() {
    this.purchaseModel = null;
    this.trainingData = null;
    this.testData = null;
    this.trainingHistory = null;
    this.accuracy = null;
    this.isReady = false;
  }

  // Core purchase probability formula (shared between training & test data)
  calculatePurchaseProbability(price, healthConsciousness, priceSensitivity, brandLoyalty, age, sugarFree, premium, influencer, urban, highIncome) {
    let purchaseProb = 0.3;

    // Price effect with non-linearity
    purchaseProb += (1 - price / 600) * (10 - priceSensitivity) * 0.04;

    // Health consciousness interactions
    if (sugarFree === 1) {
      purchaseProb += healthConsciousness * 0.06;
      if (premium === 1) {
        purchaseProb += healthConsciousness * 0.02;
      }
    } else {
      purchaseProb -= healthConsciousness * 0.04;
    }

    // Premium packaging effects
    if (premium === 1) {
      purchaseProb += brandLoyalty * 0.03;
      if (highIncome === 1) {
        purchaseProb += 0.1;
      }
    }

    // Influencer marketing
    if (influencer === 1) {
      purchaseProb += (10 - brandLoyalty) * 0.025;
      if (urban === 1 && age < 35) {
        purchaseProb += 0.12;
      }
    }

    // Hidden patterns for ML to discover
    if (urban === 0 && age > 30 && age < 45 && sugarFree === 1 && influencer === 1) {
      purchaseProb += 0.15;
    }

    if (price > 500 && premium === 1 && influencer === 1 && urban === 1 && age < 35 && highIncome === 1) {
      purchaseProb += 0.18;
    }

    if (age > 55 && price > 450) {
      purchaseProb -= 0.25;
    }

    purchaseProb += (Math.random() - 0.5) * 0.1;
    return Math.max(0, Math.min(1, purchaseProb));
  }

  // Generate a single data sample with random features
  generateSample() {
    const price = 99 + Math.random() * 900;
    const healthConsciousness = 1 + Math.random() * 9;
    const priceSensitivity = 1 + Math.random() * 9;
    const brandLoyalty = 1 + Math.random() * 9;
    const age = 18 + Math.random() * 47;
    const sugarFree = Math.random() > 0.5 ? 1 : 0;
    const premium = Math.random() > 0.5 ? 1 : 0;
    const influencer = Math.random() > 0.5 ? 1 : 0;
    const urban = Math.random() > 0.4 ? 1 : 0;
    const highIncome = Math.random() > 0.6 ? 1 : 0;

    const purchaseProb = this.calculatePurchaseProbability(
      price, healthConsciousness, priceSensitivity, brandLoyalty, age,
      sugarFree, premium, influencer, urban, highIncome
    );

    return {
      inputs: [price / 600, healthConsciousness / 10, priceSensitivity / 10,
              brandLoyalty / 10, age / 70, sugarFree, premium, influencer,
              urban, highIncome],
      output: purchaseProb
    };
  }

  // Generate synthetic training data based on real FMCG patterns
  generateTrainingData(samples = 2000) {
    const data = [];
    for (let i = 0; i < samples; i++) {
      data.push(this.generateSample());
    }
    this.trainingData = data;
    return data;
  }

  // ── Persistence: save trained model to IndexedDB ────────────────────────
  async saveModel() {
    try {
      await this.purchaseModel.save('indexeddb://fmcg-purchase-model');
      localStorage.setItem('fmcg-model-accuracy', JSON.stringify(this.accuracy));
      console.log('💾 Model saved to IndexedDB.');
    } catch (e) {
      console.warn('Could not save model:', e);
    }
  }

  // Load previously saved model (returns true if successful)
  async loadModel() {
    try {
      this.purchaseModel = await tf.loadLayersModel('indexeddb://fmcg-purchase-model');
      this.purchaseModel.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'meanSquaredError',
        metrics: ['mse', 'mae']
      });
      const saved = localStorage.getItem('fmcg-model-accuracy');
      if (saved) this.accuracy = JSON.parse(saved);
      this.isReady = true;
      console.log('✅ Loaded saved model — skipping training.');
      return true;
    } catch (e) {
      return false;  // No saved model — caller must train
    }
  }

  // Force retrain on next load
  clearSavedModel() {
    try {
      tf.io.removeModel('indexeddb://fmcg-purchase-model');
      localStorage.removeItem('fmcg-model-accuracy');
      console.log('🗑️ Saved model cleared.');
    } catch (e) {
      console.warn('Could not clear model:', e);
    }
  }

  // Train neural network
  async trainPurchaseModel() {
    console.log('Training purchase prediction model...');
    
    // Generate training data (80% of total)
    this.generateTrainingData(1600);
    
    // Generate separate test data (20% of total) to measure real accuracy
    this.testData = this.generateTestData(400);

    this.purchaseModel = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [10], units: 32, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.1 }),
        tf.layers.dense({ units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
      ]
    });

    this.purchaseModel.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mse', 'mae']
    });

    const inputs = tf.tensor2d(this.trainingData.map(d => d.inputs));
    const outputs = tf.tensor2d(this.trainingData.map(d => [d.output]));

    // Train with validation split for monitoring
    this.trainingHistory = await this.purchaseModel.fit(inputs, outputs, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      verbose: 0,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (epoch % 10 === 0) {
            console.log(`Epoch ${epoch}: loss=${logs.loss.toFixed(4)}, val_loss=${logs.val_loss.toFixed(4)}`);
          }
        }
      }
    });

    inputs.dispose();
    outputs.dispose();

    // Calculate accuracy on test data
    this.accuracy = await this.evaluateModel();

    // Save so next page load is instant
    await this.saveModel();
    
    console.log('Purchase model trained!');
    console.log(`Model Accuracy: ${(this.accuracy.accuracy * 100).toFixed(2)}%`);
    console.log(`Mean Squared Error: ${this.accuracy.mse.toFixed(4)}`);
    console.log(`Mean Absolute Error: ${this.accuracy.mae.toFixed(4)}`);
    
    this.isReady = true;
    return this.accuracy;
  }

  // Generate separate test dataset (reuses shared formula)
  generateTestData(samples = 400) {
    const data = [];
    for (let i = 0; i < samples; i++) {
      data.push(this.generateSample());
    }
    return data;
  }

  // Evaluate model accuracy on test data
  async evaluateModel() {
    if (!this.purchaseModel || !this.testData) {
      console.error('Model or test data not available');
      return null;
    }

    const testInputs = tf.tensor2d(this.testData.map(d => d.inputs));
    const testOutputs = tf.tensor2d(this.testData.map(d => [d.output]));
    let predictions;

    try {
      // Get predictions
      predictions = this.purchaseModel.predict(testInputs);
      const predValues = predictions.dataSync();
      const actualValues = testOutputs.dataSync();

      // Calculate metrics
      let totalSquaredError = 0;
      let totalAbsoluteError = 0;
      let correctPredictions = 0;
      const threshold = 0.1; // 10% tolerance for "correct" prediction

      for (let i = 0; i < predValues.length; i++) {
        const error = predValues[i] - actualValues[i];
        totalSquaredError += error * error;
        totalAbsoluteError += Math.abs(error);

        // Count as correct if within 10% of actual value
        if (Math.abs(error) < threshold) {
          correctPredictions++;
        }
      }

      const mse = totalSquaredError / predValues.length;
      const mae = totalAbsoluteError / predValues.length;
      const accuracy = correctPredictions / predValues.length;

      // R² Score (coefficient of determination)
      const mean = actualValues.reduce((sum, val) => sum + val, 0) / actualValues.length;
      let totalSquares = 0;
      for (let i = 0; i < actualValues.length; i++) {
        totalSquares += Math.pow(actualValues[i] - mean, 2);
      }
      const r2Score = 1 - (totalSquaredError / totalSquares);

      return {
        mse,
        mae,
        accuracy,
        r2Score,
        testSamples: predValues.length,
        correctWithin10Percent: correctPredictions
      };
    } finally {
      // Cleanup tensors even if calculation throws
      testInputs.dispose();
      testOutputs.dispose();
      if (predictions) predictions.dispose();
    }
  }

  // Get detailed accuracy report
  getAccuracyReport() {
    if (!this.accuracy) {
      return 'Model not trained yet or accuracy not calculated';
    }

    return {
      summary: `Model Accuracy: ${(this.accuracy.accuracy * 100).toFixed(2)}%`,
      details: {
        'Accuracy (±10%)': `${(this.accuracy.accuracy * 100).toFixed(2)}%`,
        'Mean Squared Error': this.accuracy.mse.toFixed(4),
        'Mean Absolute Error': this.accuracy.mae.toFixed(4),
        'R² Score': this.accuracy.r2Score.toFixed(4),
        'Test Samples': this.accuracy.testSamples,
        'Correct Predictions': `${this.accuracy.correctWithin10Percent} / ${this.accuracy.testSamples}`
      },
      interpretation: this.interpretAccuracy(this.accuracy)
    };
  }

  // Interpret accuracy scores
  interpretAccuracy(accuracy) {
    const interpretations = [];

    if (accuracy.accuracy > 0.85) {
      interpretations.push('✅ Excellent accuracy - Model predictions are highly reliable');
    } else if (accuracy.accuracy > 0.75) {
      interpretations.push('✅ Good accuracy - Model predictions are generally reliable');
    } else if (accuracy.accuracy > 0.60) {
      interpretations.push('⚠️ Moderate accuracy - Use predictions with caution');
    } else {
      interpretations.push('❌ Poor accuracy - Model needs improvement');
    }

    if (accuracy.r2Score > 0.85) {
      interpretations.push('✅ R² score indicates strong predictive power');
    } else if (accuracy.r2Score > 0.70) {
      interpretations.push('✅ R² score indicates decent predictive power');
    } else {
      interpretations.push('⚠️ R² score indicates room for improvement');
    }

    if (accuracy.mae < 0.08) {
      interpretations.push('✅ Low error margin - Predictions are close to actual values');
    } else if (accuracy.mae < 0.12) {
      interpretations.push('✅ Acceptable error margin');
    } else {
      interpretations.push('⚠️ High error margin - Consider retraining with more data');
    }

    return interpretations;
  }

  // Predict purchase probability
  predictPurchase(persona, config) {
    if (!this.isReady) return null;

    const input = tf.tensor2d([[
      config.price / 600,
      persona.healthConsciousness / 10,
      persona.priceSensitivity / 10,
      persona.brandLoyalty / 10,
      persona.age / 70,
      config.sugarFree ? 1 : 0,
      config.packaging === 'premium' ? 1 : 0,
      config.influencer ? 1 : 0,
      persona.cityType === 'Urban' ? 1 : 0,
      persona.incomeLevel === 'High' ? 1 : 0
    ]]);

    const prediction = this.purchaseModel.predict(input);
    const value = prediction.dataSync()[0] * 100;

    input.dispose();
    prediction.dispose();

    return value;
  }

  // Batch predict for multiple personas (much faster for large datasets)
  predictPurchaseBatch(personas, config) {
    if (!this.isReady) return null;

    // Create input tensor for all personas at once
    const inputData = personas.map(persona => [
      config.price / 600,
      persona.healthConsciousness / 10,
      persona.priceSensitivity / 10,
      persona.brandLoyalty / 10,
      persona.age / 70,
      config.sugarFree ? 1 : 0,
      config.packaging === 'premium' ? 1 : 0,
      config.influencer ? 1 : 0,
      persona.cityType === 'Urban' ? 1 : 0,
      persona.incomeLevel === 'High' ? 1 : 0
    ]);

    const input = tf.tensor2d(inputData);
    const predictions = this.purchaseModel.predict(input);
    const values = Array.from(predictions.dataSync()).map(v => v * 100);

    input.dispose();
    predictions.dispose();

    return values;
  }

  // K-means clustering
  performClustering(personas, k = 6) {
    const data = personas.map(p => [
      p.healthConsciousness / 10,
      p.priceSensitivity / 10,
      p.brandLoyalty / 10,
      p.age / 70
    ]);

    return this.kMeans(data, k);
  }

  kMeans(data, k, maxIterations = 50) {
    const n = data.length;
    const dim = data[0].length;

    let centroids = [];
    for (let i = 0; i < k; i++) {
      centroids.push(data[Math.floor(Math.random() * n)].slice());
    }

    let assignments = new Array(n).fill(0);

    for (let iter = 0; iter < maxIterations; iter++) {
      const prevAssignments = assignments.slice();

      for (let i = 0; i < n; i++) {
        let minDist = Infinity;
        let minIdx = 0;

        for (let j = 0; j < k; j++) {
          const dist = this.euclideanDistance(data[i], centroids[j]);
          if (dist < minDist) {
            minDist = dist;
            minIdx = j;
          }
        }

        assignments[i] = minIdx;
      }

      // Early stopping: check if assignments changed
      const converged = assignments.every((a, i) => a === prevAssignments[i]);
      if (converged) break;

      const newCentroids = Array(k).fill(0).map(() => Array(dim).fill(0));
      const counts = Array(k).fill(0);

      for (let i = 0; i < n; i++) {
        const cluster = assignments[i];
        counts[cluster]++;
        for (let d = 0; d < dim; d++) {
          newCentroids[cluster][d] += data[i][d];
        }
      }

      for (let j = 0; j < k; j++) {
        if (counts[j] > 0) {
          for (let d = 0; d < dim; d++) {
            newCentroids[j][d] /= counts[j];
          }
        }
      }

      centroids = newCentroids;
    }

    return { assignments, centroids };
  }

  euclideanDistance(a, b) {
    return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
  }

  // Churn prediction and CLV
  predictChurn(persona, purchaseProb, price) {
    let repurchaseRate = purchaseProb / 100;

    repurchaseRate += (persona.brandLoyalty - 5) * 0.03;
    repurchaseRate += (persona.healthConsciousness - 5) * 0.02;
    repurchaseRate -= (persona.priceSensitivity - 5) * 0.025;

    if (persona.age > 35 && persona.age < 55) {
      repurchaseRate += 0.08;
    }

    if (persona.cityType === 'Urban') {
      repurchaseRate -= 0.05;
    }

    repurchaseRate = Math.max(0.1, Math.min(0.95, repurchaseRate));

    const monthlyPurchases = repurchaseRate;
    const avgLifetimeMonths = 12 / (1 - repurchaseRate);
    const margin = 0.4;
    const clv = monthlyPurchases * avgLifetimeMonths * price * margin;

    return {
      repurchaseRate: repurchaseRate * 100,
      churnRisk: (1 - repurchaseRate) * 100,
      clv: Math.round(clv)
    };
  }

  // Market size estimation
  estimateTAM(config) {
    const urbanPopulation = 377000000;
    const tier2Population = 255000000;
    const targetRatio = 0.35;
    
    let addressableRate = 0.02;

    if (config.packaging === 'premium') {
      addressableRate *= 0.6;
    }

    if (config.sugarFree) {
      addressableRate *= 1.4;
    }

    if (config.influencer) {
      addressableRate *= 1.3;
    }

    if (config.price < 300) {
      addressableRate *= 1.5;
    } else if (config.price > 700) {
      addressableRate *= 0.7;
    }

    const tam = Math.round(
      (urbanPopulation + tier2Population) * targetRatio * addressableRate
    );

    return {
      total: tam,
      urban: Math.round(urbanPopulation * targetRatio * addressableRate),
      tier2: Math.round(tier2Population * targetRatio * addressableRate)
    };
  }

  // Find optimal price (optimized for large datasets)
  findOptimalPrice(personas, config) {
    let bestPrice = 99;
    let bestRevenue = 0;

    for (let price = 99; price <= 999; price += 25) {
      const testConfig = { ...config, price };
      
      // Use batch prediction for all personas at once
      const probabilities = this.predictPurchaseBatch(personas, testConfig);
      
      const totalRevenue = probabilities.reduce((sum, prob, i) => {
        return sum + (prob / 100) * price * (personas[i].weight / 100);
      }, 0);

      if (totalRevenue > bestRevenue) {
        bestRevenue = totalRevenue;
        bestPrice = price;
      }
    }

    return {
      optimalPrice: bestPrice,
      expectedRevenue: bestRevenue * 100
    };
  }
}

export default MLEngine;
