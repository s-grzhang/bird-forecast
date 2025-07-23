// Hotspot data: name, code, lat, lng, and a short blurb
const hotspots = [
  {
    name: 'Union Bay Natural Area', code: 'L162766', lat: 47.6536, lng: -122.2956,
    blurb: 'A premier birding site on Lake Washington, known for waterfowl and raptors.'
  },
  {
    name: 'Discovery Park', code: 'L128530', lat: 47.6591, lng: -122.4156,
    blurb: 'Seattle’s largest park with diverse habitats and excellent year-round birding.'
  },
  {
    name: 'Magnuson Park', code: 'L269461', lat: 47.6829, lng: -122.2471,
    blurb: 'Restored wetlands and shoreline attract a wide variety of birds.'
  },
  {
    name: 'Marymoor Park', code: 'L351484', lat: 47.6622, lng: -122.1169,
    blurb: 'A hotspot for songbirds, waterfowl, and raptors in the Sammamish area.'
  },
  {
    name: 'Juanita Bay Park', code: 'L232479', lat: 47.7002, lng: -122.2056,
    blurb: 'Boardwalks and marshes make this a favorite for waterbirds and herons.'
  },
  {
    name: 'Carkeek Park', code: 'L298030', lat: 47.7125, lng: -122.3767,
    blurb: 'A mix of forest, stream, and Puget Sound shoreline for diverse birding.'
  },
  {
    name: 'Lake Sammamish State Park', code: 'L321969', lat: 47.5457, lng: -122.0651,
    blurb: 'Lakeshore, wetlands, and woods attract a variety of species.'
  },
  {
    name: 'Kent Ponds', code: 'L257959', lat: 47.3897, lng: -122.2342,
    blurb: 'Wetlands and ponds are great for ducks, shorebirds, and raptors.'
  },
  {
    name: 'Alki Ponds', code: 'L207315', lat: 47.5702, lng: -122.3626,
    blurb: 'Urban ponds with surprising bird diversity, especially in migration.'
  }
];

const map = L.map('hotspotMap', {
  center: [47.6, -122.25],
  zoom: 10,
  scrollWheelZoom: false,
  keyboard: true,
  attributionControl: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

hotspots.forEach(({ name, code, lat, lng, blurb }) => {
  const popupContent = `
    <div class="p-2">
      <h2 class="text-lg font-bold mb-1">${name}</h2>
      <p class="text-sm text-gray-700 mb-1">${blurb}</p>
      <p class="text-xs text-gray-500">eBird Hotspot Code: <span class="font-mono">${code}</span></p>
      <a href="https://ebird.org/hotspot/${code}" target="_blank" rel="noopener" class="text-blue-700 underline text-xs">View on eBird</a>
    </div>
  `;
  L.marker([lat, lng], { keyboard: true, title: name })
    .addTo(map)
    .bindPopup(popupContent, { autoPan: true });
});
