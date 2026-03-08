# Persona Generation Framework — 25,000 Synthetic Indian Consumers

## 📋 Overview

The Digital Twin Market Engine simulates **25,000 unique personas** based on **8 base archetypes** representing diverse segments of Indian women consumers for FMCG protein drinks.

Each persona is generated with realistic variations in demographics, psychographics, and behavioral traits to accurately model market dynamics.

---

## 🎯 Base Persona Archetypes

### 1. **Urban Health Enthusiast** (15% — 3,750 personas)
**Profile:**
- **Location:** Urban metros (Mumbai, Delhi, Bangalore)
- **Income Level:** High (₹10L+ annual household)
- **Age Range:** 25-45
- **Key Traits:**
  - Health Consciousness: **9/10** (Very high — reads labels, tracks macros)
  - Price Sensitivity: **3/10** (Low — willing to pay premium for quality)
  - Brand Loyalty: **7/10** (Moderately loyal, seeks proven brands)

**Behavior:** Early adopter, shops at organic stores, influenced by nutritionists and fitness influencers. Actively seeks protein-rich, clean-label products.

---

### 2. **Working Professional** (20% — 5,000 personas)
**Profile:**
- **Location:** Urban cities (Tier-1)
- **Income Level:** Medium (₹5-10L annual)
- **Age Range:** 28-45
- **Key Traits:**
  - Health Consciousness: **7/10** (Above average)
  - Price Sensitivity: **6/10** (Moderate — looks for value)
  - Brand Loyalty: **5/10** (Open to switching for better offers)

**Behavior:** Time-starved, convenience-focused. Buys online or at nearby supermarkets. Influenced by quick health benefits (energy, immunity).

---

### 3. **Budget-Conscious Mother** (18% — 4,500 personas)
**Profile:**
- **Location:** Tier-2 cities (Jaipur, Lucknow, Indore)
- **Income Level:** Medium (₹4-8L annual)
- **Age Range:** 30-50
- **Key Traits:**
  - Health Consciousness: **6/10** (Moderate — family health matters)
  - Price Sensitivity: **8/10** (High — seeks best deals, bulk offers)
  - Brand Loyalty: **4/10** (Low — switches for discounts)

**Behavior:** Shops for the family, compares prices, influenced by local clinic recommendations. Prefers trusted local stores.

---

### 4. **Fitness-Focused Millennial** (12% — 3,000 personas)
**Profile:**
- **Location:** Urban metros
- **Income Level:** High (₹8L+ annual)
- **Age Range:** 22-35
- **Key Traits:**
  - Health Consciousness: **10/10** (Extremely high — gym-goer, counts calories)
  - Price Sensitivity: **2/10** (Very low — invests heavily in fitness)
  - Brand Loyalty: **6/10** (Moderate — tries trending brands)

**Behavior:** Active on social media, follows fitness influencers, shops online. Seeks high-protein, low-sugar, Instagram-worthy packaging.

---

### 5. **Traditional Homemaker** (15% — 3,750 personas)
**Profile:**
- **Location:** Tier-2 cities, semi-urban
- **Income Level:** Low-Medium (₹3-6L annual)
- **Age Range:** 35-60
- **Key Traits:**
  - Health Consciousness: **5/10** (Moderate — follows traditional health practices)
  - Price Sensitivity: **9/10** (Very high — limited discretionary spending)
  - Brand Loyalty: **8/10** (High — sticks to trusted brands)

**Behavior:** Relies on family doctor advice, shops at local kirana stores. Skeptical of "new" products unless recommended by trusted sources.

---

### 6. **Young Student** (10% — 2,500 personas)
**Profile:**
- **Location:** Urban college areas
- **Income Level:** Low (₹2-4L family income, limited personal budget)
- **Age Range:** 18-25
- **Key Traits:**
  - Health Consciousness: **4/10** (Low — convenience over nutrition)
  - Price Sensitivity: **10/10** (Extremely high — student budget)
  - Brand Loyalty: **3/10** (Very low — buys what's affordable)

**Behavior:** Impulse buyer, influenced by peer trends and college canteen availability. Prioritizes taste over health.

---

### 7. **Senior Citizen** (6% — 1,500 personas)
**Profile:**
- **Location:** Tier-2 cities, quieter urban areas
- **Income Level:** Medium (pension/savings, ₹4-7L)
- **Age Range:** 55-70
- **Key Traits:**
  - Health Consciousness: **8/10** (High — managing age-related health)
  - Price Sensitivity: **7/10** (Moderate-high — fixed income)
  - Brand Loyalty: **9/10** (Very high — risk-averse, prefers familiar brands)

**Behavior:** Doctor-recommended purchases, prefers established brands. Shops at familiar pharmacies or trusted supermarkets.

---

### 8. **Corporate Executive** (4% — 1,000 personas)
**Profile:**
- **Location:** Urban metros (premium areas)
- **Income Level:** High (₹15L+ annual)
- **Age Range:** 35-55
- **Key Traits:**
  - Health Consciousness: **7/10** (Above average — preventive health mindset)
  - Price Sensitivity: **4/10** (Low-moderate — values quality and time)
  - Brand Loyalty: **6/10** (Moderate)

**Behavior:** Premium shopper, buys at high-end supermarkets or online (Amazon, BigBasket). Influenced by brand reputation and executive wellness programs.

---

## 📊 Attribute Definitions

| Attribute | Type | Range | Description |
|-----------|------|-------|-------------|
| **ID** | Integer | 1-25,000 | Unique persona identifier |
| **Archetype** | String | 8 types | Base persona category |
| **City Type** | String | Urban / Tier-2 | Geographic segment |
| **Income Level** | String | High / Medium / Low | Household income bracket |
| **Age** | Integer | 18-65 | Randomly distributed within realistic range |
| **Health Consciousness** | Float | 1-10 | How much they prioritize health/nutrition (10 = extreme) |
| **Price Sensitivity** | Float | 1-10 | Resistance to higher prices (10 = won't pay premium) |
| **Brand Loyalty** | Float | 1-10 | Tendency to stick with known brands (10 = very loyal) |
| **Weight** | Integer | % | Archetype's proportion in the 25k population |

### 🎲 Variation Logic
Each persona inherits base values from their archetype but adds **random variations (±1 point)** to create realistic diversity within segments, ensuring:
- Not all "Urban Health Enthusiasts" behave identically
- Natural clustering patterns for ML discovery
- Representative market heterogeneity

---

## 🧠 How Personas Are Used in ML Models

### 1. **Neural Network Training**
- 2,000 synthetic training scenarios sample from these personas
- Input features: age, health consciousness, price sensitivity, brand loyalty, income, product config
- Output: Purchase probability (0-100%)

### 2. **K-Means Clustering**
- Discovers 6 natural segments beyond the 8 archetypes
- Reveals hidden patterns (e.g., "Premium Health Seekers", "Deal Hunters")

### 3. **Churn Prediction**
- High health consciousness + high price sensitivity = risk of churn to cheaper alternatives
- High brand loyalty = repeat purchase potential → higher CLV

### 4. **Market Sizing (TAM)**
- Income level + city type → filter addressable market
- E.g., ₹699 premium product primarily targets High income + Urban = ~9,750 personas

### 5. **Rule-Based Comparison**
- Each persona's purchase probability is calculated using heuristic rules
- Compared against ML predictions to show AI superiority

---

## 📈 Statistical Validity

- **Sample Size:** 25,000 personas ensures statistical significance (margin of error <1%)
- **Distribution:** Weighted by market research on Indian women consumer segments
- **Diversity:** 8 archetypes × ~3,125 variations = comprehensive market representation
- **Age Distribution:** Uniform within archetype-realistic ranges (e.g., students 18-25, seniors 55+)

---

## 🔄 Generation Process

```javascript
1. Define 8 base archetypes with fixed traits
2. Allocate personas proportionally (e.g., 20% Working Professional = 5,000 personas)
3. For each archetype:
   - Clone base attributes
   - Randomize age within realistic range
   - Add ±1 variation to health/price/brand scores
   - Assign unique ID
4. Output: 25,000 unique, realistic consumer profiles
```

---

## 💾 CSV Export

Run `node generate-personas-csv.js` to generate `personas_25000.csv` with all 25,000 personas.

**File Structure:**
```
ID, Archetype, City Type, Income Level, Age, Health Consciousness (1-10), Price Sensitivity (1-10), Brand Loyalty (1-10), Distribution Weight
1, Urban Health Enthusiast, Urban, High, 32, 8.73, 3.21, 6.89, 15
2, Urban Health Enthusiast, Urban, High, 28, 9.12, 2.85, 7.34, 15
...
```

---

## 🎯 Use Cases

1. **ML Model Training** — Synthetic data for neural network training
2. **Segmentation Analysis** — Discover hidden customer clusters
3. **Pricing Strategy** — Test price elasticity across income segments
4. **Market Sizing** — Estimate TAM/SAM/SOM by filtering personas
5. **A/B Testing** — Simulate feature impact before real launch
6. **Investor Pitches** — Demonstrate data-driven market understanding

---

**Total Market Representation:** 25,000 personas simulating ~50M Indian women aged 18-65 interested in health/wellness products.
