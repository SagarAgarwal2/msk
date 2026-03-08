// Generate all 25,000 personas and export to CSV
const fs = require('fs');

const basePersonas = [
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

function generatePersonas() {
  const personas = [];
  const personasPerTemplate = Math.floor(25000 / basePersonas.length);
  
  basePersonas.forEach((template, index) => {
    const count = index === basePersonas.length - 1 
      ? 25000 - personas.length
      : personasPerTemplate;
    
    for (let i = 0; i < count; i++) {
      personas.push({
        id: personas.length + 1,
        archetype: template.name,
        cityType: template.cityType,
        incomeLevel: template.incomeLevel,
        age: 18 + Math.floor(Math.random() * 47), // 18-65
        healthConsciousness: Math.max(1, Math.min(10, template.healthConsciousness + (Math.random() - 0.5) * 2)),
        priceSensitivity: Math.max(1, Math.min(10, template.priceSensitivity + (Math.random() - 0.5) * 2)),
        brandLoyalty: Math.max(1, Math.min(10, template.brandLoyalty + (Math.random() - 0.5) * 2)),
        weight: template.weight
      });
    }
  });
  
  return personas;
}

function convertToCSV(personas) {
  const headers = ['ID', 'Archetype', 'City Type', 'Income Level', 'Age', 'Health Consciousness (1-10)', 'Price Sensitivity (1-10)', 'Brand Loyalty (1-10)', 'Distribution Weight'];
  
  const rows = personas.map(p => [
    p.id,
    p.archetype,
    p.cityType,
    p.incomeLevel,
    p.age,
    p.healthConsciousness.toFixed(2),
    p.priceSensitivity.toFixed(2),
    p.brandLoyalty.toFixed(2),
    p.weight
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
}

console.log('🔄 Generating 25,000 personas...');
const personas = generatePersonas();

console.log(`✅ Generated ${personas.length} personas`);
console.log('\n📊 Distribution by archetype:');
const distribution = {};
personas.forEach(p => {
  distribution[p.archetype] = (distribution[p.archetype] || 0) + 1;
});
Object.entries(distribution).forEach(([name, count]) => {
  console.log(`   ${name}: ${count.toLocaleString()}`);
});

console.log('\n💾 Converting to CSV...');
const csv = convertToCSV(personas);

const filename = 'personas_25000.csv';
fs.writeFileSync(filename, csv, 'utf-8');

console.log(`✅ Saved to ${filename}`);
console.log(`📦 File size: ${(csv.length / 1024 / 1024).toFixed(2)} MB`);
console.log('\n🎯 Sample rows (first 5):');
console.log(csv.split('\n').slice(0, 6).join('\n'));
