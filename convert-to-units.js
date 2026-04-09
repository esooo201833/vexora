const fs = require('fs');

// Read the properties data
const properties = JSON.parse(fs.readFileSync('all_properties.json', 'utf8'));

console.log(`Converting ${properties.length} properties...`);

// Map API data to units.js format
const units = properties.map((prop, index) => {
  // Extract basic info
  const id = index + 1;
  const title = prop.project?.name_en || prop.project?.name || 'Property ' + id;
  
  // Get price from villas or apartments if available
  let price = prop.price || 0;
  let size = 0;
  let type = prop.category?.categoryName_en || 'Property';
  
  // Extract from project villas/apartments if price is 0
  if (price === 0 && prop.project?.villas) {
    const availableVilla = prop.project.villas.find(v => v.available && v.price > 0);
    if (availableVilla) {
      price = availableVilla.price;
      size = availableVilla.area;
      type = availableVilla.type;
    }
  }
  
  if (price === 0 && prop.project?.apartments) {
    const availableApt = prop.project.apartments.find(a => a.available && a.price > 0);
    if (availableApt) {
      price = availableApt.price;
      size = availableApt.area;
      type = availableApt.type;
    }
  }
  
  // Get location
  const location = prop.location?.name_en || prop.location?.name || 'Egypt';
  const city = location;
  
  // Get developer/company
  const developer = prop.company?.name_en || prop.company?.name || 'Unknown';
  
  // Get images
  const images = prop.imgs?.slice(0, 4).map(img => img.replace('http://', 'https://')) || [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
  ];
  
  // Get finishing type
  const finishing = prop.finishingType?.[0] || 'FULLY-FINISHED';
  
  // Get delivery status
  const status = prop.deliveryStatus?.[0] || 'READY-To-MOVE';
  
  // Create description
  const description = `${title} in ${location}. ${type} with ${finishing} finishing. ${status}. Developed by ${developer}.`;
  
  // Determine bedrooms based on type
  let bedrooms = 0;
  if (type.includes('ONE')) bedrooms = 1;
  else if (type.includes('TWO')) bedrooms = 2;
  else if (type.includes('THREE')) bedrooms = 3;
  else if (type.includes('FOUR')) bedrooms = 4;
  else if (type === 'Villa' || type === 'STAND-ALONE') bedrooms = 4;
  else if (type === 'TOWN' || type === 'TWIN') bedrooms = 3;
  else if (type === 'STUDIO') bedrooms = 0;
  
  // Get down payment and installment info
  const downPayment = prop.downPayment || '10';
  const installmentDuration = prop.installmentDuration || 0;
  const paymentPlan = downPayment && installmentDuration 
    ? `${downPayment}% Down Payment - ${installmentDuration} Years Installments`
    : 'Cash';
  
  return {
    id,
    title: `${type} in ${title}`,
    price,
    location: `${location}, Egypt`,
    city,
    rooms: bedrooms + 1,
    bedrooms,
    bathrooms: Math.max(1, Math.floor(bedrooms / 2)),
    size,
    type,
    status: status === 'READY-To-MOVE' ? 'Ready to Move' : 
            status === 'AFTER-ONE-YEAR' ? 'Under Construction' :
            status === 'AFTER-TWO-YEARS' ? 'Under Construction' :
            status === 'AFTER-THREE-YEARS' ? 'Under Construction' : 'Under Construction',
    finishing: finishing === 'FULLY-FINISHED' ? 'Fully Finished' :
               finishing === 'SEMI-FINISHED' ? 'Semi Finished' :
               finishing === 'CORE-SHELL' ? 'Core & Shell' : 'Semi Finished',
    description,
    features: ['Security 24/7', 'Parking', 'Garden', 'Swimming Pool'].slice(0, Math.floor(Math.random() * 4) + 2),
    images,
    developer,
    deliveryDate: status === 'READY-To-MOVE' ? 'Ready' : '2026-12-01',
    paymentPlan,
    featured: index < 20 // First 20 are featured
  };
});

// Generate the units.js content
const unitsJSContent = `/**
 * Real Estate Units Data
 * This file contains all property listings for Vexora Estates
 * Data extracted from byitcorp.com API
 * Total Properties: ${units.length}
 * Last Updated: ${new Date().toISOString().split('T')[0]}
 */

export const units = ${JSON.stringify(units, null, 2)};

// Helper functions for data manipulation
export const getFeaturedUnits = () => units.filter(unit => unit.featured);

export const getUnitById = (id) => units.find(unit => unit.id === parseInt(id));

export const getUnitsByCity = (city) => units.filter(unit => unit.city === city);

export const getUnitsByType = (type) => units.filter(unit => unit.type === type);

export const filterUnits = (filters) => {
  return units.filter(unit => {
    if (filters.minPrice && unit.price < filters.minPrice) return false;
    if (filters.maxPrice && unit.price > filters.maxPrice) return false;
    if (filters.city && unit.city !== filters.city) return false;
    if (filters.type && unit.type !== filters.type) return false;
    if (filters.bedrooms && unit.bedrooms < parseInt(filters.bedrooms)) return false;
    if (filters.status && unit.status !== filters.status) return false;
    return true;
  });
};

export const getCities = () => [...new Set(units.map(unit => unit.city))];

export const getTypes = () => [...new Set(units.map(unit => unit.type))];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0
  }).format(price);
};
`;

// Write to units.js
fs.writeFileSync('src/data/units.js', unitsJSContent);
console.log(`✓ Successfully wrote ${units.length} units to src/data/units.js`);
console.log(`  - Featured units: ${units.filter(u => u.featured).length}`);
console.log(`  - Cities: ${[...new Set(units.map(u => u.city))].length}`);
console.log(`  - Types: ${[...new Set(units.map(u => u.type))].length}`);
