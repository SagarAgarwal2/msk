# Digital Twin Market Engine — ML + AI FMCG Simulator

A sophisticated React application for simulating FMCG product launches using Machine Learning models. Features neural networks, clustering, churn prediction, and market estimation.

## 🚀 Features

### Machine Learning Models
1. **Neural Network Purchase Prediction** - TensorFlow.js model trained on 2000+ synthetic scenarios
2. **K-Means Clustering** - Automatic customer segmentation discovery
3. **Churn & Retention Prediction** - Calculate Customer Lifetime Value (CLV)
4. **Market Size Estimation** - Regression-based TAM calculation
5. **Price Optimization Engine** - Find optimal pricing using ML

### Key Capabilities
- Real-time simulation with 25,000 synthetic personas
- Interactive parameter controls (price, features, marketing)
- Side-by-side comparison: Rule-based vs ML predictions
- Multiple data visualizations using Chart.js
- Comprehensive business insights dashboard

## 📦 Installation

```bash
cd react-app
npm install
```

## 🏃‍♂️ Running the Application

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
```

Creates optimized production build in the `build` folder.

## 📁 Project Structure

```
react-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   ├── Dashboard.js
│   │   ├── MetricsGrid.js
│   │   ├── OptimalPricingCard.js
│   │   ├── ClusterChart.js
│   │   ├── ComparisonChart.js
│   │   ├── RevenueChart.js
│   │   ├── ChurnTable.js
│   │   ├── TraditionalInsights.js
│   │   └── RegionalData.js
│   ├── services/
│   │   ├── MLEngine.js          # Core ML logic
│   │   └── personaService.js    # Persona generation
│   ├── App.js                   # Main application
│   ├── App.css                  # Styling
│   ├── index.js                 # Entry point
│   └── index.css
├── package.json
└── README.md
```

## 🧠 ML Models Explained

### 1. Purchase Probability Neural Network
- **Architecture**: 4-layer dense network with dropout
- **Input**: 10 features (price, demographics, product config)
- **Output**: Purchase probability (0-100%)
- **Training**: 2000 samples, 50 epochs

### 2. K-Means Clustering
- Discovers 6 natural customer segments
- Features: Health consciousness, price sensitivity, brand loyalty, age
- Helps identify hidden market patterns

### 3. Churn Prediction Model
- Predicts repurchase rate and customer churn risk
- Calculates CLV using retention economics
- Prioritizes high-value segments

### 4. Market Size Estimation
- Regression model based on India demographics
- Factors: Population, product positioning, features
- Outputs: TAM, urban/tier-2 breakdown

### 5. Price Optimization
- Tests multiple price points (₹299-₹599)
- Finds revenue-maximizing configuration
- Confidence scoring based on training data

## 🎯 Use Cases

- **MBA Hackathons**: Demo-ready product launch simulator
- **Market Research**: Test hypotheses without expensive surveys
- **Product Strategy**: Optimize pricing and positioning
- **Investor Pitches**: Data-driven market size estimates
- **Education**: Learn ML applications in business

## 🛠️ Technologies

- **React 18** - Modern UI framework
- **TensorFlow.js** - Machine learning in the browser
- **Chart.js** - Data visualizations
- **React-Chartjs-2** - React wrapper for Chart.js

## 📊 Data & Personas

- 25,000 synthetic customer personas
- 8 base archetypes (Urban Health Enthusiast, Working Professional, etc.)
- Attributes: Demographics, psychographics, behavioral traits
- Realistic variations in age, income, preferences

## 🎓 MBA Hackathon Ready

This project is optimized for presentations:
- Clean, professional UI
- Real-time interactive demos
- Business-focused insights
- Comprehensive metrics dashboard
- Impressive ML technology stack

## 🔬 Future Enhancements

- [ ] Add LLM-powered natural language insights
- [ ] Real-time competitor data integration
- [ ] Advanced ensemble models (XGBoost, Random Forest)
- [ ] A/B testing simulator
- [ ] Marketing campaign ROI calculator

## 📝 License

MIT License - Feel free to use for educational/hackathon purposes

## 👥 Contributors

Built for MBA hackathon demonstrations

---

**Note**: All ML models run entirely in the browser using TensorFlow.js. No backend required!
