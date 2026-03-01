export const basePersonas = [
  {
    name: "Urban Health Enthusiast",
    cityType: "Urban",
    incomeLevel: "High",
    healthConsciousness: 9,
    priceSensitivity: 3,
    brandLoyalty: 7,
    weight: 15
  },
  {
    name: "Working Professional",
    cityType: "Urban",
    incomeLevel: "Medium",
    healthConsciousness: 7,
    priceSensitivity: 6,
    brandLoyalty: 5,
    weight: 20
  },
  {
    name: "Budget-Conscious Mother",
    cityType: "Tier-2",
    incomeLevel: "Medium",
    healthConsciousness: 6,
    priceSensitivity: 8,
    brandLoyalty: 4,
    weight: 18
  },
  {
    name: "Fitness-Focused Millennial",
    cityType: "Urban",
    incomeLevel: "High",
    healthConsciousness: 10,
    priceSensitivity: 2,
    brandLoyalty: 6,
    weight: 12
  },
  {
    name: "Traditional Homemaker",
    cityType: "Tier-2",
    incomeLevel: "Low",
    healthConsciousness: 5,
    priceSensitivity: 9,
    brandLoyalty: 8,
    weight: 15
  },
  {
    name: "Young Student",
    cityType: "Urban",
    incomeLevel: "Low",
    healthConsciousness: 4,
    priceSensitivity: 10,
    brandLoyalty: 3,
    weight: 10
  },
  {
    name: "Senior Citizen",
    cityType: "Tier-2",
    incomeLevel: "Medium",
    healthConsciousness: 8,
    priceSensitivity: 7,
    brandLoyalty: 9,
    weight: 6
  },
  {
    name: "Corporate Executive",
    cityType: "Urban",
    incomeLevel: "High",
    healthConsciousness: 7,
    priceSensitivity: 4,
    brandLoyalty: 6,
    weight: 4
  }
];

export function generatePersonas() {
  const personas = [];
  const personasPerTemplate = Math.floor(25000 / basePersonas.length);
  
  basePersonas.forEach((template, index) => {
    const count = index === basePersonas.length - 1 
      ? 25000 - personas.length
      : personasPerTemplate;
    
    for (let i = 0; i < count; i++) {
      personas.push({
        ...template,
        id: personas.length + 1,
        age: 18 + Math.floor(Math.random() * 47),
        healthConsciousness: Math.max(1, Math.min(10, template.healthConsciousness + (Math.random() - 0.5) * 2)),
        priceSensitivity: Math.max(1, Math.min(10, template.priceSensitivity + (Math.random() - 0.5) * 2)),
        brandLoyalty: Math.max(1, Math.min(10, template.brandLoyalty + (Math.random() - 0.5) * 2))
      });
    }
  });
  
  return personas;
}

export function calculateRuleBasedProbability(persona, config) {
  let probability = 50;

  const priceScore = (1 - ((config.price - 99) / 900)) * 10;
  const priceImpact = (10 - persona.priceSensitivity) * priceScore * 0.3;
  probability += priceImpact;

  if (config.sugarFree) {
    probability += persona.healthConsciousness * 1.5;
  } else {
    probability += persona.healthConsciousness * -0.8;
  }

  if (config.packaging === 'premium') {
    probability += persona.brandLoyalty * 0.8;
    if (persona.incomeLevel === 'High') {
      probability += 5;
    }
  }

  if (config.influencer) {
    probability += (11 - persona.brandLoyalty) * 0.7;
    if (persona.cityType === 'Urban' && persona.age < 35) {
      probability += 8;
    }
  }

  if (persona.incomeLevel === 'Low' && config.price > 500) {
    probability -= 15;
  } else if (persona.incomeLevel === 'High') {
    probability += 5;
  }

  return Math.max(0, Math.min(100, probability));
}
