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
  { id: 1, name: 'Amber Fort', position: [26.9855, 75.8513], category: 'Attractions', description: 'Stunning hilltop fort with mirror carvings.', image: 'https://media.istockphoto.com/id/469788052/photo/amer-fort-near-jaipur.jpg?s=612x612&w=0&k=20&c=Rsd9v_Ix39ce8U9QKo3UnWfEMG1DUq4hnzh3APPi3g8=' },
  { id: 2, name: 'Hawa Mahal', position: [26.9239, 75.8267], category: 'Attractions', description: 'The famous Palace of Winds with 953 windows.', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGF3YSUyMG1haGFsJTIwamFpcHVyfGVufDB8fDB8fHww' },
  { id: 3, name: 'City Palace', position: [26.9258, 75.8237], category: 'Attractions', description: 'Royal residence and museum of Jaipur.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR61m9E763V072X779wT-VpA_Gst-7m8bZJ-g&s' },
  { id: 4, name: 'Nahargarh Fort', position: [26.9375, 75.8155], category: 'Attractions', description: 'Best panoramic views of the whole Pink City.', image: 'https://media.istockphoto.com/id/635726330/photo/nahargarh-fort.jpg?s=612x612&w=0&k=20&c=z1hztb9BT6YhxT--G_cW8hBmBHWzrFdwbfM0Pc2jATI=' },
  { id: 8, name: 'Albert Hall', position: [26.9116, 75.8194], category: 'Attractions', description: 'Oldest museum of Rajasthan.', image: 'https://media.istockphoto.com/id/1149457223/photo/jaipur-albert-hall-museum-night-view.jpg?s=612x612&w=0&k=20&c=qXnQNoW8t8u7r_s76YmP_lR5_S15h1yM-lM=' },
  { id: 10, name: 'Jantar Mantar', position: [26.9248, 75.8245], category: 'Attractions', description: 'UNESCO World Heritage astronomical observatory.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfI6H3U6J4P1m3Ff6L2p2S5B_j4n6uR8bF9w&s' },
  { id: 5, name: 'Johari Bazaar', position: [26.9213, 75.8260], category: 'Shopping', description: 'Ancient market for jewelry and precious stones.', image: 'https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fd1zvcmhypeawxj.cloudfront.net%2Fblogs%2Fcover_web%2Fjohari-bazar-webp-2dac12dc1a-1760116805911.webp&w=3840&q=50' },
  { id: 6, name: 'Bapu Bazaar', position: [26.9157, 75.8193], category: 'Shopping', description: 'Best for textiles and traditional Mojari footwear.', image: 'https://images.tv9hindi.com/wp-content/uploads/2022/10/Bapu-Bazar.jpg' },
  { id: 11, name: 'World Trade Park', position: [26.8624, 75.8105], category: 'Shopping', description: 'Futuristic mall for luxury global brands.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6uT8O8l_J7L-P_X6r8r7-R9A0_3N5b2X_g&s' },
  { id: 7, name: 'LMB Hotel', position: [26.9217, 75.8242], category: 'Cuisine', description: 'Iconic spot for traditional Rajasthani sweets.', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/63/99/d7/authentic-rajasthani.jpg' },
  { id: 12, name: 'Rawat Misthan', position: [26.9272, 75.7946], category: 'Cuisine', description: 'Famous for the mouth-watering Pyaaz Kachori.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_O0qG9U9U9U9U9U9U9U9U9U9U9U9U9U9U9U&s' },
  { id: 13, name: 'Chokhi Dhani', position: [26.7672, 75.8362], category: 'Cuisine', description: 'A cultural village resort for authentic dining.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_9U9U9U9U9U9U9U9U9U9U9U9U9U9U9U9U&s' },
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
