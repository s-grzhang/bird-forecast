// Hotspot data: name, code, lat, lng, and a short blurb
const hotspots = [
  {
    name: 'Union Bay Natural Area (Montlake Fill)', code: 'L162766', lat: 47.6536, lng: -122.2956,
    blurb: 'A premier birding hotspot near the University of Washington, featuring diverse microhabitats that attract over 250 species. Best visited during late fall through early spring for waterfowl viewing.'
  },
  {
    name: 'Discovery Park', code: 'L128530', lat: 47.6591, lng: -122.4156,
    blurb: 'Seattle\'s largest park, encompassing 534 acres of varied habitats including beaches, forests, and meadows. Over 270 bird species have been recorded here, making it ideal for both resident and migratory birdwatching.'
  },
  {
    name: 'Magnuson Park', code: 'L269461', lat: 47.6829, lng: -122.2471,
    blurb: 'A 227-acre park on Lake Washington\'s west shore, offering a mix of forest, wetland, and shoreline habitats. Supports a variety of bird species, including songbirds and waterfowl.'
  },
  {
    name: 'Marymoor Park', code: 'L351484', lat: 47.6622, lng: -122.1169,
    blurb: 'A 640-acre park in Redmond with diverse habitats such as wetlands, grasslands, and woodlands. Over 200 bird species have been observed, including herons, woodpeckers, and warblers.'
  },
  {
    name: 'Juanita Bay Park', code: 'L232479', lat: 47.7002, lng: -122.2056,
    blurb: 'A 110-acre wildlife refuge in Kirkland, featuring wetlands and forested areas along Lake Washington. Home to over 200 bird species, including Bald Eagles and various waterfowl.'
  },
  {
    name: 'Carkeek Park', code: 'L298030', lat: 47.7125, lng: -122.3767,
    blurb: 'A 220-acre park in northwest Seattle, offering forest, stream, and beach habitats. Supports a wide variety of bird species, including chickadees, sparrows, and seabirds.'
  },
  {
    name: 'Lake Sammamish State Park', code: 'L321969', lat: 47.5457, lng: -122.0651,
    blurb: 'A 512-acre state park in Issaquah, featuring lakeshore, wetland, and forest habitats. Popular for birdwatching, with sightings of species like Mallards, American Robins, and Wilson\'s Warblers.'
  },
  {
    name: 'Kent Ponds', code: 'L257959', lat: 47.3897, lng: -122.2342,
    blurb: 'A 300-acre site in Kent, consisting of grassy meadows, cottonwood forests, and freshwater impoundments. Supports a variety of bird species, including raptors and shorebirds.'
  },
  {
    name: 'Alki Beach', code: 'L207315', lat: 47.5702, lng: -122.3626,
    blurb: 'A popular waterfront area in West Seattle, offering views of Puget Sound and the Olympic Mountains. Attracts seabirds, gulls, and migratory species, making it a great spot for coastal birdwatching.'
  }
];

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing map...');
  
  // Check if map container exists
  const mapContainer = document.getElementById('hotspotMap');
  if (!mapContainer) {
    console.error('Map container #hotspotMap not found!');
    return;
  }
  console.log('Map container found:', mapContainer);
  
  // Check if Leaflet is available
  if (typeof L === 'undefined') {
    console.error('Leaflet not loaded!');
    return;
  }
  console.log('Leaflet loaded successfully');
  
  try {
    // Initialize the map
    const map = L.map('hotspotMap', {
      center: [47.6, -122.25],
      zoom: 10,
      scrollWheelZoom: true,
      keyboard: true,
      attributionControl: true
    });
    
    console.log('Map initialized:', map);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    console.log('Tile layer added');
    
    // Add markers for each hotspot
    hotspots.forEach(({ name, code, lat, lng, blurb }, index) => {
      console.log(`Adding marker ${index + 1}: ${name} at [${lat}, ${lng}]`);
      
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #333;">${name}</h3>
          <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${blurb}</p>
          <p style="margin: 0 0 8px 0; color: #999; font-size: 12px;">eBird Hotspot Code: <code>${code}</code></p>
          <a href="https://ebird.org/hotspot/${code}" target="_blank" rel="noopener" style="color: #007bff; text-decoration: underline; font-size: 12px;">View on eBird</a>
        </div>
      `;
      
      const marker = L.marker([lat, lng], { 
        keyboard: true, 
        title: name 
      }).addTo(map);
      
      marker.bindPopup(popupContent, { 
        autoPan: true,
        maxWidth: 300
      });
      
      console.log(`Marker added for ${name}`);
    });
    
    console.log('All markers added successfully');
    
  } catch (error) {
    console.error('Error initializing map:', error);
  }
});
