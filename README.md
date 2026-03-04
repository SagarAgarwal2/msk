# Digital Twin Market Engine — Launch Simulator

A sophisticated React application for simulating FMCG product launches using Machine Learning models and AI-powered insights. Features neural networks, clustering, churn prediction, market estimation, and real-time LLM analysis via Groq.

## 🚀 Features

### Machine Learning Models
1. **Neural Network Purchase Prediction** - TensorFlow.js model trained on 2000+ synthetic scenarios
2. **K-Means Clustering** - Automatic customer segmentation discovery
3. **Churn & Retention Prediction** - Calculate Customer Lifetime Value (CLV)
4. **Market Size Estimation** - Regression-based TAM calculation
5. **Price Optimization Engine** - Find optimal pricing using ML

### AI Intelligence Layer
- **Groq LLM Integration** - Real-time AI analysis powered by Llama 3.1 (8B)
- **Natural Language Insights** - Auto-generated strategic recommendations
- **Interactive AI Chatbot** - Ask questions about your simulation results
- **5 Specialized Functions** - Market analysis, pricing strategy, competitor insights, growth tactics, risk assessment

### Key Capabilities
- Real-time simulation with 25,000 synthetic personas
- Interactive parameter controls (price, features, marketing)
- Product stage selection (Ideation / MVP / Already Selling)
- Business model toggle (B2C / B2B / B2B2C)
- Side-by-side comparison: Rule-based vs ML predictions
- Multiple data visualizations using Chart.js
- Comprehensive business insights dashboard
- AI-generated strategic recommendations

## 📦 Installation

```bash
cd react-app
npm install
```

### Environment Setup

Create a `.env` file in the `react-app` directory:

```bash
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key from [Groq Console](https://console.groq.com/)

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
│   │   ├── RegionalData.js
│   │   ├── LLMInsightsPanel.js  # AI-generated insights
│   │   └── AIChatbot.js         # Interactive Q&A
│   ├── services/
│   │   ├── MLEngine.js          # Core ML logic
│   │   ├── personaService.js    # Persona generation
│   │   └── groqService.js       # Groq LLM integration
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
- Tests multiple price points (₹99-₹999)
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
- **TensorFlow.js 4.11** - Machine learning in the browser
- **Groq SDK** - Ultra-fast LLM inference (Llama 3.1 8B)
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
- AI-powered insights via Groq LLM
- Interactive chatbot for Q&A
- Business-focused insights
- Comprehensive metrics dashboard
- Impressive ML + AI technology stack

## 🔬 Future Enhancements

- [ ] Real-time competitor data integration
- [ ] Advanced ensemble models (XGBoost, Random Forest)
- [ ] A/B testing simulator
- [ ] Marketing campaign ROI calculator
- [ ] Multi-product portfolio analysis

## 📝 License

MIT License - Feel free to use for educational/hackathon purposes

## 👥 Contributors

Built for MBA hackathon demonstrations

---

**Note**: All ML models run entirely in the browser using TensorFlow.js. AI insights powered by Groq's cloud LLM API for real-time analysis.
