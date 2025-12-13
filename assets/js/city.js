// List of allowed cities
const allowedCities = [
  'Barcelona',
  'Madrid',
  'Valencia',
  'Sevilla',
  'Zaragoza',
  'Málaga',
  'Murcia',
  'Palma',
  'Las Palmas',
  'Bilbao',
  'Alicante',
  'Córdoba',
  'Valladolid',
  'Vigo',
  'Gijón',
  'Hospitalet',
  'Vitoria',
  'Granada',
  'Elche',
  'Oviedo',
  'Badalona',
  'Cartagena',
  'Terrassa',
  'Jerez',
  'Sabadell',
  'Móstoles',
  'Santa Cruz',
  'Pamplona',
  'Almería',
  'Leganés',
  'San Sebastián',
  'Burgos',
  'Albacete',
  'Getafe',
  'Salamanca',
  'Huelva',
  'Logroño',
  'Tarragona',
  'León',
  'Lleida',
  'Marbella',
  'Mataró',
  'Dos Hermanas',
  'Santa Coloma',
  'Torrejón',
  'Alcalá de Henares',
  'Parla',
  'Alcorcón',
  'Reus',
  'Girona'
];

// Function to get query parameter
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to capitalize first letter
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Function to replace city in all elements with class 'dynamic-city'
function replaceCityName() {
  const cityParam = getQueryParam('city');
  let cityName = 'Barcelona'; // Default fallback

  if (cityParam) {
    // Check if the city is in the allowed list (case-insensitive)
    const foundCity = allowedCities.find(
      city => city.toLowerCase() === cityParam.toLowerCase()
    );
    
    if (foundCity) {
      cityName = foundCity;
    }
  }

  // Replace all elements with class 'dynamic-city'
  const elements = document.querySelectorAll('.dynamic-city');
  elements.forEach(element => {
    element.textContent = cityName;
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', replaceCityName);
