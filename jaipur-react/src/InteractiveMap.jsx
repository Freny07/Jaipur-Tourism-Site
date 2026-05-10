import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap, Polygon, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import './MapStyles.css';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const jaipurBoundary = [
  [26.995, 75.850], [27.005, 75.875], [26.980, 75.910], [26.930, 75.925], 
  [26.860, 75.905], [26.810, 75.860], [26.790, 75.800], [26.800, 75.720],
  [26.840, 75.680], [26.930, 75.690], [26.970, 75.730], [26.995, 75.810]
];

const locations = [
  {
    "id": 1,
    "name": "Amber Fort",
    "position": [
      26.864400000000003,
      75.7873
    ],
    "category": "Attractions",
    "description": "A majestic hilltop fort offering light & sound shows and stunning views.",
    "image": "/packages/amber_fort.png"
  },
  {
    "id": 2,
    "name": "City Palace",
    "position": [
      26.872400000000003,
      75.8433
    ],
    "category": "Attractions",
    "description": "A royal residence complex with courtyards, museums, and beautiful gateways.",
    "image": "/packages/city_palace.png"
  },
  {
    "id": 3,
    "name": "Hawa Mahal",
    "position": [
      26.8804,
      75.7793
    ],
    "category": "Attractions",
    "description": "The \"Palace of Winds\" with 953 windows, built for royal ladies.",
    "image": "/packages/hawa_mahal.png"
  },
  {
    "id": 4,
    "name": "Jaigarh Fort",
    "position": [
      26.8884,
      75.8353
    ],
    "category": "Attractions",
    "description": "Known as the Fort of Victory, it houses the world's largest cannon on wheels.",
    "image": "/packages/jaigarh fort.jpg"
  },
  {
    "id": 5,
    "name": "Jal Mahal",
    "position": [
      26.896400000000003,
      75.7713
    ],
    "category": "Attractions",
    "description": "The beautiful water palace situated in the middle of Man Sagar Lake.",
    "image": "/packages/jal_mahal.png"
  },
  {
    "id": 6,
    "name": "Nahargarh Fort",
    "position": [
      26.904400000000003,
      75.82730000000001
    ],
    "category": "Attractions",
    "description": "Experience Nahargarh fort overlooking the glittering city of Jaipur.",
    "image": "/packages/nahagarh fort.jpg"
  },
  {
    "id": 8,
    "name": "Samode Haveli",
    "position": [
      26.9204,
      75.8193
    ],
    "category": "Attractions",
    "description": "A traditional Indian mansion showcasing elegant fresco paintings and heritage.",
    "image": "/packages/samode haveli.jpg"
  },
  {
    "id": 9,
    "name": "Samode Palace",
    "position": [
      26.9284,
      75.7553
    ],
    "category": "Attractions",
    "description": "A grand heritage palace offering luxury and an insight into Rajput grandeur.",
    "image": "/packages/samode palace.jpg"
  },
  {
    "id": 7,
    "name": "Patrika Gate",
    "position": [
      26.9124,
      75.7633
    ],
    "category": "Attractions",
    "description": "A vibrant, hand-painted architectural marvel serving as an entrance.",
    "image": "/packages/patrika gate.jpg"
  },
  {
    "id": 10,
    "name": "Tripolia Gate",
    "position": [
      26.936400000000003,
      75.8113
    ],
    "category": "Attractions",
    "description": "The historic three-arched gate leading to the City Palace.",
    "image": "/packages/tripola gate.jpg"
  },
  {
    "id": 11,
    "name": "New Gate",
    "position": [
      26.9444,
      75.7473
    ],
    "category": "Attractions",
    "description": "A prominent gateway adding to the majestic aura of the walled city.",
    "image": "/packages/new gate.jpg"
  },
  {
    "id": 42,
    "name": "Ajmeri Gate",
    "position": [
      26.9524,
      75.80330000000001
    ],
    "category": "Attractions",
    "description": "A busy and historically significant gate of the walled city of Jaipur.",
    "image": "/packages/ajmeri gate.jpg"
  },
  {
    "id": 43,
    "name": "Sanganeri Gate",
    "position": [
      26.9604,
      75.7393
    ],
    "category": "Attractions",
    "description": "A beautiful historical gateway leading to the famous Johari Bazaar.",
    "image": "/packages/sanganeri gate.jpg"
  },
  {
    "id": 44,
    "name": "Chandpole Gate",
    "position": [
      26.968400000000003,
      75.7953
    ],
    "category": "Attractions",
    "description": "An imposing gateway adorned with majestic architectural details.",
    "image": "/packages/chandpole gate.jpg"
  },
  {
    "id": 45,
    "name": "Zorawar Singh Gate",
    "position": [
      26.8564,
      75.7313
    ],
    "category": "Attractions",
    "description": "The northern gate of the walled city, originally built for defense.",
    "image": "/packages/zorwar singh gate.jpg"
  },
  {
    "id": 46,
    "name": "Surajpol Gate",
    "position": [
      26.864400000000003,
      75.7873
    ],
    "category": "Attractions",
    "description": "The sun gate, facing east towards the rising sun in the walled city.",
    "image": "/packages/surajpol gate.jpg"
  },
  {
    "id": 47,
    "name": "Kishanpole Gate",
    "position": [
      26.872400000000003,
      75.8433
    ],
    "category": "Attractions",
    "description": "A vibrant and bustling entry gate to the historic walled pink city.",
    "image": "/packages/kishanpole gate.jpg"
  },
  {
    "id": 48,
    "name": "Ghat Gate",
    "position": [
      26.8804,
      75.7793
    ],
    "category": "Attractions",
    "description": "The southeastern gate, steeped in the rich history of old Jaipur.",
    "image": "/packages/ghat gate.jpg"
  },
  {
    "id": 14,
    "name": "Akshardham Temple",
    "position": [
      26.968400000000003,
      75.7953
    ],
    "category": "Attractions",
    "description": "A stunning temple known for its brilliant architecture and spiritual ambiance.",
    "image": "/packages/akshardham temple.jpg"
  },
  {
    "id": 15,
    "name": "Digamber Jain Mandir",
    "position": [
      26.8564,
      75.7313
    ],
    "category": "Attractions",
    "description": "An ancient Jain temple of immense spiritual significance.",
    "image": "/packages/digamber jain mandir.jpg"
  },
  {
    "id": 16,
    "name": "Galtaji Temple",
    "position": [
      26.864400000000003,
      75.7873
    ],
    "category": "Attractions",
    "description": "An ancient Hindu pilgrimage site known for its natural water springs.",
    "image": "/packages/galtaji temple.jpg"
  },
  {
    "id": 17,
    "name": "Govind Dev Ji Temple",
    "position": [
      26.872400000000003,
      75.8433
    ],
    "category": "Attractions",
    "description": "One of the most sacred and famous temples dedicated to Lord Krishna.",
    "image": "/packages/govind dev ji temple.jpg"
  },
  {
    "id": 18,
    "name": "ISKCON Temple",
    "position": [
      26.8804,
      75.7793
    ],
    "category": "Attractions",
    "description": "A beautiful temple dedicated to Lord Krishna offering a peaceful environment.",
    "image": "/packages/iskcon temple.jpg"
  },
  {
    "id": 19,
    "name": "Khole Ke Hanuman Ji Temple",
    "position": [
      26.8884,
      75.8353
    ],
    "category": "Attractions",
    "description": "A highly revered temple of Lord Hanuman situated on a hillock.",
    "image": "/packages/khole ke hanuman ji temple.jpg"
  },
  {
    "id": 20,
    "name": "Moti Dungri Ganesh Temple",
    "position": [
      26.896400000000003,
      75.7713
    ],
    "category": "Attractions",
    "description": "A popular Ganesh temple frequented by locals and tourists alike.",
    "image": "/packages/moti dungri ganesh temple.jpg"
  },
  {
    "id": 21,
    "name": "Shila Devi Temple",
    "position": [
      26.904400000000003,
      75.82730000000001
    ],
    "category": "Attractions",
    "description": "A famous temple inside Amber Fort dedicated to Goddess Durga.",
    "image": "/packages/shila dev temple.jpg"
  },
  {
    "id": 22,
    "name": "Tarkeshwar Mahadev Temple",
    "position": [
      26.9124,
      75.7633
    ],
    "category": "Attractions",
    "description": "An ancient and highly revered Shiva temple in the city.",
    "image": "/packages/tarkeshwar mahadev temple.jpg"
  },
  {
    "id": 23,
    "name": "Central Park",
    "position": [
      26.9204,
      75.8193
    ],
    "category": "Attractions",
    "description": "The largest park in Jaipur featuring a lush green landscape and a polo ground.",
    "image": "/packages/central park.jpg"
  },
  {
    "id": 24,
    "name": "Kanak Ghati",
    "position": [
      26.9284,
      75.7553
    ],
    "category": "Attractions",
    "description": "A serene valley offering beautiful gardens and scenic views.",
    "image": "/packages/kanak ghati.jpg"
  },
  {
    "id": 25,
    "name": "Kanak Vrindavan Garden",
    "position": [
      26.936400000000003,
      75.8113
    ],
    "category": "Attractions",
    "description": "A picturesque garden nestled in the valley of Nahargarh hills.",
    "image": "/packages/kanak vrindavan garden.jpg"
  },
  {
    "id": 26,
    "name": "Ram Niwas Garden",
    "position": [
      26.9444,
      75.7473
    ],
    "category": "Attractions",
    "description": "A historical garden built by Maharaja Ram Singh, housing the Albert Hall Museum.",
    "image": "/packages/ram nivas garden.jpg"
  },
  {
    "id": 27,
    "name": "Sisodia Rani Garden and Palace",
    "position": [
      26.9524,
      75.80330000000001
    ],
    "category": "Attractions",
    "description": "Beautifully landscaped multi-tiered gardens featuring fountains and pavilions.",
    "image": "/packages/sisodiya rani garden and palace.jpg"
  },
  {
    "id": 28,
    "name": "Smriti Van Biodiversity Park",
    "position": [
      26.9604,
      75.7393
    ],
    "category": "Attractions",
    "description": "A tranquil forest area perfect for nature walks and bird watching.",
    "image": "/packages/smriti van biodiversity park.jpg"
  },
  {
    "id": 29,
    "name": "Vidyadhar Garden",
    "position": [
      26.968400000000003,
      75.7953
    ],
    "category": "Attractions",
    "description": "A beautiful garden dedicated to the chief architect of Jaipur, Vidyadhar Bhattacharya.",
    "image": "/packages/vidhyadar garden.jpg"
  },
  {
    "id": 30,
    "name": "Jantar Mantar",
    "position": [
      26.8564,
      75.7313
    ],
    "category": "Attractions",
    "description": "An astronomical observatory featuring the world's largest stone sundial.",
    "image": "/packages/jantar_mantar.png"
  },
  {
    "id": 31,
    "name": "Jawahar Kala Kendra",
    "position": [
      26.864400000000003,
      75.7873
    ],
    "category": "Attractions",
    "description": "A multi-arts center dedicated to preserving Rajasthani arts and crafts.",
    "image": "/packages/jawahar kala kendra.jpg"
  },
  {
    "id": 32,
    "name": "Gaitore Ki Chhatriyan",
    "position": [
      26.872400000000003,
      75.8433
    ],
    "category": "Attractions",
    "description": "The royal crematorium featuring beautifully carved marble cenotaphs.",
    "image": "/packages/gaitore ki chhatriyan.jpg"
  },
  {
    "id": 33,
    "name": "Maota Lake",
    "position": [
      26.8804,
      75.7793
    ],
    "category": "Attractions",
    "description": "A serene lake situated at the base of the Amber Fort.",
    "image": "/packages/maota lake.jpg"
  },
  {
    "id": 34,
    "name": "Pushkar",
    "position": [
      26.8884,
      75.8353
    ],
    "category": "Attractions",
    "description": "A spiritual trip to the holy Pushkar lake surrounded by traditional temples.",
    "image": "/packages/pushkar.png"
  },
  {
    "id": 13,
    "name": "Isarlat Sargasuli",
    "position": [
      26.9604,
      75.7393
    ],
    "category": "Attractions",
    "description": "A historic tower offering panoramic views of the pink city.",
    "image": "/packages/isarlat sargasuli.jpg"
  },
  {
    "id": 12,
    "name": "Panna Meena ka Kund",
    "position": [
      26.9524,
      75.80330000000001
    ],
    "category": "Attractions",
    "description": "A historic stepwell famous for its symmetrical staircases and architecture.",
    "image": "/packages/panna meena ka kund.jpg"
  },
  {
    "id": 35,
    "name": "Albert Hall Museum",
    "position": [
      26.896400000000003,
      75.7713
    ],
    "category": "Attractions",
    "description": "Houses an impressive collection of paintings, carpets, and sculptures.",
    "image": "/packages/albert_hall.png"
  },
  {
    "id": 36,
    "name": "Amrapali Museum",
    "position": [
      26.904400000000003,
      75.82730000000001
    ],
    "category": "Attractions",
    "description": "A mesmerizing collection of traditional Indian jewelry and artifacts.",
    "image": "/packages/amrapali museum.jpg"
  },
  {
    "id": 37,
    "name": "Anokhi Museum of Hand Printing",
    "position": [
      26.9124,
      75.7633
    ],
    "category": "Attractions",
    "description": "A museum dedicated to the traditional art of block printing.",
    "image": "/packages/anoki museum of hand printing.jpg"
  },
  {
    "id": 38,
    "name": "Dolls Museum",
    "position": [
      26.9204,
      75.8193
    ],
    "category": "Attractions",
    "description": "Showcasing a vast collection of dolls from various countries and cultures.",
    "image": "/packages/dolls museum.jpg"
  },
  {
    "id": 39,
    "name": "Gem and Jewellery Museum",
    "position": [
      26.9284,
      75.7553
    ],
    "category": "Attractions",
    "description": "Displays the rich heritage of gem cutting and jewelry making in Jaipur.",
    "image": "/packages/gem and jwellery museum.jpg"
  },
  {
    "id": 40,
    "name": "Museum of Legacies",
    "position": [
      26.936400000000003,
      75.8113
    ],
    "category": "Attractions",
    "description": "A museum showcasing Rajasthan’s diverse cultural heritage and art.",
    "image": "/packages/museum of legacies.jpg"
  },
  {
    "id": 41,
    "name": "Wax Museum",
    "position": [
      26.9444,
      75.7473
    ],
    "category": "Attractions",
    "description": "A popular museum featuring lifelike wax statues of celebrities and historic figures.",
    "image": "/packages/wax museum.jpg"
  },
  {
    "id": 101,
    "name": "Johari Bazaar",
    "position": [
      26.9213,
      75.826
    ],
    "category": "Shopping",
    "description": "Ancient market for jewelry and precious stones.",
    "image": "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fd1zvcmhypeawxj.cloudfront.net%2Fblogs%2Fcover_web%2Fjohari-bazar-webp-2dac12dc1a-1760116805911.webp&w=3840&q=50"
  },
  {
    "id": 102,
    "name": "Bapu Bazaar",
    "position": [
      26.9157,
      75.8193
    ],
    "category": "Shopping",
    "description": "Best for textiles and traditional Mojari footwear.",
    "image": "https://images.tv9hindi.com/wp-content/uploads/2022/10/Bapu-Bazar.jpg"
  },
  {
    "id": 103,
    "name": "World Trade Park",
    "position": [
      26.8624,
      75.8105
    ],
    "category": "Shopping",
    "description": "Futuristic mall for luxury global brands.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6uT8O8l_J7L-P_X6r8r7-R9A0_3N5b2X_g&s"
  },
  {
    "id": 104,
    "name": "LMB Hotel",
    "position": [
      26.9217,
      75.8242
    ],
    "category": "Cuisine",
    "description": "Iconic spot for traditional Rajasthani sweets.",
    "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/63/99/d7/authentic-rajasthani.jpg"
  },
  {
    "id": 105,
    "name": "Rawat Misthan",
    "position": [
      26.9272,
      75.7946
    ],
    "category": "Cuisine",
    "description": "Famous for the mouth-watering Pyaaz Kachori.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_O0qG9U9U9U9U9U9U9U9U9U9U9U9U9U9U9U&s"
  },
  {
    "id": 106,
    "name": "Chokhi Dhani (Cuisine)",
    "position": [
      26.7672,
      75.8362
    ],
    "category": "Cuisine",
    "description": "A cultural village resort for authentic dining.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_9U9U9U9U9U9U9U9U9U9U9U9U9U9U9U9U&s"
  }
];

function RoutingMachine({ start, end }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !start || !end) return;

    // Use a high-reliability OSRM configuration with 'shortest' preference
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'car',
        timeout: 10000,
        useHints: false, // Prevents reusing stale routing directions
      }),
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: {
        styles: [
          { color: '#A1673F', opacity: 0.8, weight: 8 },
          { color: '#d4a373', opacity: 1, weight: 4 }
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 10
      },
      createMarker: () => null
    }).addTo(map);

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, start, end]);
  return null;
}

function MapClickHandler({ isSelecting, onPointSelected }) {
  useMapEvents({ click: (e) => { if (isSelecting) onPointSelected(e.latlng); } });
  return null;
}

function ChangeView({ center, zoom, isFullscreen }) {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(timer);
  }, [isFullscreen, map]);
  useEffect(() => { map.setView(center, zoom); }, [center, zoom, map]);
  return null;
}

function InteractiveMap({ forcedFullscreen = false }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [mapCenter, setMapCenter] = useState([26.9124, 75.7873]);
  const [zoom, setZoom] = useState(12);
  const [selectedId, setSelectedId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(forcedFullscreen);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [selectingPoint, setSelectingPoint] = useState(null);
  const [isRoutingActive, setIsRoutingActive] = useState(false);

  useEffect(() => {
    setIsRoutingActive(false); // Reset routing when waypoints change
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (forcedFullscreen) {
      setIsFullscreen(true);
      return;
    }
    
    if (isFullscreen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isFullscreen, forcedFullscreen]);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#map-fullscreen') {
        setIsFullscreen(true);
        document.getElementById('interactive-map-anchor')?.scrollIntoView({ behavior: 'smooth' });
      } else setIsFullscreen(false);
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const closeFullscreen = () => {
    if (forcedFullscreen) {
      navigate('/#interactive-map-anchor');
      return;
    }
    setIsFullscreen(false);
    if (window.location.hash === '#map-fullscreen') {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  const filteredLocations = filter === 'All' ? locations : locations.filter(loc => loc.category === filter);

  const resetMap = () => {
    setMapCenter([26.9124, 75.7873]); setZoom(12); setSelectedId(null);
    setStartPoint(null); setEndPoint(null); setSelectingPoint(null);
  };

  const onMapPointSelected = (latlng) => {
    const point = { name: 'Pin on Map', position: [latlng.lat, latlng.lng] };
    if (selectingPoint === 'start') setStartPoint(point);
    else if (selectingPoint === 'end') setEndPoint(point);
    setSelectingPoint(null);
  };

  return (
    <div id="interactive-map-anchor" className={`interactive-map-wrapper ${isFullscreen ? 'fullscreen-map' : ''} ${selectingPoint ? 'selecting-mode' : ''}`}>
      {isFullscreen && (
        <div className="fullscreen-map-header">
           <h2>Interactive Jaipur Travel Map</h2>
        </div>
      )}
      
      <div className="map-controls-top-right">
        <button className="map-reset-btn" onClick={resetMap} title="Reset View"><i className="fa-solid fa-rotate-right"></i></button>
        {!isFullscreen ? (
          <button className="map-fullscreen-btn" onClick={() => setIsFullscreen(true)} title="Immersive View"><i className="fa-solid fa-expand"></i></button>
        ) : (
          <button className="exit-fullscreen-btn-compact" onClick={closeFullscreen} title="Exit Fullscreen"><i className="fa-solid fa-compress"></i></button>
        )}
      </div>

      <div className="fullscreen-map-content">
        <div className="map-sidebar glass">
          <div className="map-navigation-panel">
            <h5><i className="fa-solid fa-route"></i> Navigation Plan</h5>
<div className="nav-point-item">
              <div className="nav-point-row">
                <div className="select-with-clear">
                  <select value={locations.find(l => l.position[0] === startPoint?.position[0])?.id || ''} onChange={(e) => { const loc = locations.find(l => l.id === parseInt(e.target.value)); if (loc) setStartPoint({ name: loc.name, position: loc.position }); }}>
                    <option value="">{startPoint ? startPoint.name : "Starting From..."}</option>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                  {startPoint && <button className="individual-clear-btn" onClick={() => setStartPoint(null)} title="Clear Start"><i className="fa-solid fa-xmark"></i></button>}
                </div>
                <button className={`map-picker-btn ${selectingPoint === 'start' ? 'active' : ''}`} onClick={() => setSelectingPoint('start')} title="Pick on Map"><i className="fa-solid fa-location-crosshairs"></i></button>
              </div>
            </div>
            <div className="nav-point-item">
              <div className="nav-point-row">
                <div className="select-with-clear">
                  <select value={locations.find(l => l.position[0] === endPoint?.position[0])?.id || ''} onChange={(e) => { const loc = locations.find(l => l.id === parseInt(e.target.value)); if (loc) setEndPoint({ name: loc.name, position: loc.position }); }}>
                    <option value="">{endPoint ? endPoint.name : "Destination..."}</option>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                  {endPoint && <button className="individual-clear-btn" onClick={() => setEndPoint(null)} title="Clear Destination"><i className="fa-solid fa-xmark"></i></button>}
                </div>
                <button className={`map-picker-btn ${selectingPoint === 'end' ? 'active' : ''}`} onClick={() => setSelectingPoint('end')} title="Pick on Map"><i className="fa-solid fa-location-crosshairs"></i></button>
              </div>
            </div>

            {startPoint && endPoint && !isRoutingActive && (
              <button 
                className="get-directions-btn" 
                onClick={() => setIsRoutingActive(true)}
              >
                <i className="fa-solid fa-diamond-turn-right"></i> Get Directions
              </button>
            )}

            {isRoutingActive && (
              <button 
                className="clear-nav-btn-alt" 
                onClick={() => setIsRoutingActive(false)}
              >
                Clear Route
              </button>
            )}

            {selectingPoint && <p className="selection-tip">Click map to set {selectingPoint} point.</p>}
          </div>

          <div className="map-filters">
            {['All', 'Attractions', 'Shopping', 'Cuisine'].map(cat => (
              <button key={cat} className={`map-filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => { setFilter(cat); setSelectedId(null); }}>{cat}</button>
            ))}
          </div>
          <div className="location-list">
            {filteredLocations.map(loc => (
              <div key={loc.id} className={`location-item glass ${selectedId === loc.id ? 'active focus' : ''}`} onClick={() => { setMapCenter(loc.position); setZoom(15); setSelectedId(loc.id); }}>
                <strong>{loc.name}</strong><small>{loc.category}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="map-container-inner">
          <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            <ChangeView center={mapCenter} zoom={zoom} isFullscreen={isFullscreen} />
            <MapClickHandler isSelecting={!!selectingPoint} onPointSelected={onMapPointSelected} />
            <TileLayer attribution='&copy; CARTO' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            <Polygon positions={jaipurBoundary} pathOptions={{ color: '#00d2ff', weight: 2, dashArray: '5, 5', fillOpacity: 0.02 }} />
            {isRoutingActive && startPoint && endPoint && <RoutingMachine start={startPoint.position} end={endPoint.position} />}
            {startPoint && <Marker position={startPoint.position} icon={L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />}
            {endPoint && <Marker position={endPoint.position} icon={L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />}
            {filteredLocations.map(loc => (
              <Marker 
                key={`pin-${loc.id}`} 
                position={loc.position} 
                icon={L.divIcon({ 
                  className: `custom-unified-marker ${selectedId === loc.id ? 'active' : ''}`, 
                  html: `<div class="marker-container"><img src="${selectedId === loc.id ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png' : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'}" class="marker-pin-img" /><span class="marker-label-text">${loc.name}</span></div>`, 
                  iconSize: [120, 41], 
                  iconAnchor: [12, 41] 
                })} 
                eventHandlers={{ 
                  click: (e) => { 
                    if (selectingPoint) {
                      const point = { name: loc.name, position: loc.position };
                      if (selectingPoint === 'start') setStartPoint(point);
                      else if (selectingPoint === 'end') setEndPoint(point);
                      setSelectingPoint(null);
                      L.DomEvent.stopPropagation(e);
                    } else { setSelectedId(loc.id); setMapCenter(loc.position); }
                  }
                }}
              >
                {selectedId === loc.id && !selectingPoint && (
                  <Popup 
                    className="heritage-card-popup" 
                    closeButton={true} 
                    autoPan={true} 
                    offset={[0, -40]}
                    maxWidth={280}
                  >
                    <div className="popup-card-content modern-callout">
                      <div className="popup-card-img">
                        <img src={loc.image || 'https://via.placeholder.com/200x120?text=Jaipur'} alt={loc.name} />
                        <div className="popup-card-badge">{loc.category}</div>
                      </div>
                      <div className="popup-card-txt">
                        <h4>{loc.name}</h4>
                        <p>{loc.description}</p>
                        <div className="popup-card-footer">
                          <button className="navigate-here-btn" onClick={(e) => { e.stopPropagation(); setEndPoint({ name: loc.name, position: loc.position }); }}>
                            <i className="fa-solid fa-diamond-turn-right"></i> Route to Site
                          </button>
                        </div>
                      </div>
                    </div>
                  </Popup>
                )}
                {!selectingPoint && (
                  <Tooltip className="heritage-card-tooltip" direction="top" offset={[0, -50]} opacity={1} sticky={true}>
                    <div className="popup-card-content">
                      <div className="popup-card-img"><img src={loc.image || 'https://via.placeholder.com/200x120?text=Jaipur'} alt={loc.name} /></div>
                      <div className="popup-card-txt"><h4>{loc.name}</h4><span className="popup-card-cat">{loc.category}</span><p>{loc.description}</p></div>
                    </div>
                  </Tooltip>
                )}
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default InteractiveMap;
