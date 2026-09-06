const CAMPUS_CENTER = [9.0940, 76.4915];
const CAMPUS_LIMIT_METRES = 17_000;
const CAMPUS_BOUNDS = L.latLng(CAMPUS_CENTER).toBounds(CAMPUS_LIMIT_METRES * 2);

const CATEGORY_META = {
  campus:     { label: "Campus",        color: "#9A1B2F", icon: '<i class="fi fi-rr-building" aria-hidden="true"></i>' },
  hostelBoys: { label: "Boys hostel",   color: "#2F6FED", icon: '<i class="fi fi-rr-bed-alt" aria-hidden="true"></i>' },
  hostelGirls:{ label: "Girls hostel",  color: "#D6336C", icon: '<i class="fi fi-rr-bed-alt" aria-hidden="true"></i>' },
  hospital:   { label: "Hospital",      color: "#E13B3B", icon: '<i class="fi fi-rr-hospital" aria-hidden="true"></i>' },
  pharmacy:   { label: "Medical shop",  color: "#12A76A", icon: '<i class="fi fi-rr-pharmacy" aria-hidden="true"></i>' },
  laptop:     { label: "Laptop service",color: "#5B5BD6", icon: '<i class="fi fi-rr-laptop" aria-hidden="true"></i>' },
  phone:      { label: "Phone service", color: "#8B5CF6", icon: '<i class="fi fi-rr-mobile-notch" aria-hidden="true"></i>' },
  salon:      { label: "Barbershop",    color: "#C026D3", icon: '<i class="fi fi-rr-scissors" aria-hidden="true"></i>' },
  gym:        { label: "Gym",           color: "#F2793A", icon: '<i class="fi fi-rr-gym" aria-hidden="true"></i>' },
  railway:    { label: "Railway",       color: "#1D4ED8", icon: '<i class="fi fi-rr-train" aria-hidden="true"></i>' },
  bus:        { label: "Bus stop",      color: "#B58900", icon: '<i class="fi fi-rr-bus" aria-hidden="true"></i>' },
  hotel:      { label: "Stay / hotel",  color: "#B8860B", icon: '<i class="fi fi-rr-hotel" aria-hidden="true"></i>' },
  landmark:   { label: "Landmark",      color: "#E8A33D", icon: '<i class="fi fi-rr-monument" aria-hidden="true"></i>' },
  restaurant: { label: "Restaurant",    color: "#E03C31", icon: '<i class="fi fi-rr-restaurant" aria-hidden="true"></i>' },
  laundry:    { label: "Laundry",       color: "#0284C7", icon: '<i class="fi fi-rr-washer" aria-hidden="true"></i>' },
  bank:       { label: "Bank & ATM",    color: "#059669", icon: '<i class="fi fi-rr-bank" aria-hidden="true"></i>' },
  mall:       { label: "Mall",          color: "#9333EA", icon: '<i class="fi fi-rr-shopping-bag" aria-hidden="true"></i>' },
  movie:      { label: "Movie Theatre", color: "#E11D48", icon: '<i class="fi fi-rr-film" aria-hidden="true"></i>' },
  print:      { label: "Stationery",    color: "#0EA5E9", icon: '<i class="fi fi-rr-print" aria-hidden="true"></i>' },
  bakery:     { label: "Juice/Bakery",  color: "#F59E0B", icon: '<i class="fi fi-rr-shop" aria-hidden="true"></i>' }
};

const CHIP_ORDER = ["all", "campus", "restaurant", "bakery", "print", "bank", "laundry", "hostelBoys", "hostelGirls", "hospital", "pharmacy", "gym", "laptop", "phone", "salon", "mall", "movie", "railway", "bus", "hotel", "landmark"];

const cartoApiKey = "cb1_2ynn_1_e2db0c820448acae479fa430";

const PLACES = [
  { id: "c1", name: "Amrita Vishwa Vidyapeetham – Amritapuri", category: "campus", sub: "Main campus · Engineering & Sciences", coords: [9.093937, 76.491819] },
  { id: "c2", name: "Amrita School of Business, Amritapuri", category: "campus", sub: "Management campus", coords: [9.092898, 76.489816] },
  { id: "c3", name: "Amrita School of Biotechnology, Amritapuri", category: "campus", sub: "BioTech campus", coords: [9.092382, 76.489653] },
  { id: "c4", name: "Amrita Ground 2", category: "campus", sub: "Sports Ground", coords: [9.095812, 76.491023] },

  { id: "h1", name: "Shivam Hostel", category: "hostelBoys", sub: "Boys hostel", coords: [9.098382, 76.490062] },
  { id: "h2", name: "Anugraham Hostel", category: "hostelBoys", sub: "Boys hostel", coords: [9.100200, 76.489788] },
  { id: "h3", name: "Saraswathi Hostel", category: "hostelGirls", sub: "Girls hostel", coords: [9.094357, 76.488377] },
  { id: "h4", name: "Prahalada Hostel", category: "hostelBoys", sub: "Boys hostel", coords:[9.087148, 76.488325] },

  { id: "r1", name: "ANDHRA RUCHULU", category: "restaurant", sub: "South Indian · Restaurant", coords: [9.094100, 76.494200] },
  { id: "r2", name: "North Indian Restaurant", category: "restaurant", sub: "North Indian · Dhaba", coords: [9.093500, 76.494800] },
  { id: "r3", name: "Red Momos Vallikavu", category: "restaurant", sub: "Fast Food · Momos", coords: [9.096100, 76.495200] },
  
  { id: "bk1", name: "Dhahabie Sijara", category: "bakery", sub: "Juice Centre · Cafe", coords: [9.095500, 76.494100] },

  { id: "ld1", name: "Bright Wash Laundry", category: "laundry", sub: "Professional Laundry Service", coords: [9.096300, 76.494700] },
  { id: "ld2", name: "Jas Laundry", category: "laundry", sub: "Laundry Service", coords: [9.091021540931296, 76.48727151764652] },


  { id: "bn1", name: "South Indian Bank", category: "bank", sub: "Amrithapuri Branch", coords: [9.094800, 76.494500] },
  { id: "bn2", name: "South Indian Bank ATM", category: "bank", sub: "ATM", coords: [9.094820, 76.494510] },
  { id: "bn3", name: "Federal Bank ATM", category: "bank", sub: "ATM", coords: [9.092700, 76.494000] },
  { id: "bn4", name: "SBI Branch Amritapuri", category: "bank", sub: "State Bank of India · Branch", coords: [9.091500, 76.492000] },

  { id: "pr1", name: "MS Stores", category: "print", sub: "Stationery · Print & Essentials", coords: [9.093200, 76.494300] },

  { id: "m1", name: "Nandu Medicals", category: "pharmacy", sub: "Medical shop · pharmacy", coords: [9.092292, 76.494301] },
  { id: "m2", name: "Sri Govinda Medicals", category: "pharmacy", sub: "Medical shop · pharmacy", coords: [9.092036, 76.493536] },
  { id: "m3", name: "Amrita Ayurveda Hospital", category: "hospital", sub: "Hospital", coords: [9.088523, 76.493029] },

  { id: "s1", name: "IT Zone Vallikkavu", category: "laptop", sub: "Laptop & computer service", coords: [9.092512, 76.493995] },
  { id: "p1", name: "Phones Hub", category: "phone", sub: "Mobile recharge & service", coords: [9.092115, 76.494108] },

  { id: "b1", name: "POSH Unisex Salon", category: "salon", sub: "Barbershop", coords: [9.091701, 76.492279] },
  { id: "b2", name: "Bond Unisex Salon", category: "salon", sub: "Barbershop", coords: [9.091091, 76.490855] },
  { id: "g1", name: "Core Fitness Gym", category: "gym", sub: "Gym", coords: [9.091504, 76.491547] },
  { id: "g2", name: "BodyTech Multi-Fitness Centre", category: "gym", sub: "Gym", coords: [9.091943, 76.494328] },
  { id: "g3", name: "Pulse Fitness Studio", category: "gym", sub: "Gym", coords: [9.093168, 76.493890] },

  { id: "mv1", name: "Carnival Cinemas", category: "movie", sub: "Movie Theatre · Karunagappally", coords: [9.057300, 76.536900] },
  { id: "ml1", name: "H&J Mall", category: "mall", sub: "Shopping Mall · Karunagappally", coords: [9.057100, 76.536700] },
  { id: "ml2", name: "RP Mall", category: "mall", sub: "Shopping Mall · Kollam", coords: [8.887500, 76.585500] },

  { id: "t1", name: "Kayamkulam Junction", category: "railway", sub: "Nearest railway station · ~9.5 km", coords: [9.181336, 76.512389] },
  { id: "t2", name: "Kinarumukku Bus Stop", category: "bus", sub: "Bus stop", coords: [9.096913, 76.492981] },
  { id: "t3", name: "Karelil Bus Stop", category: "bus", sub: "Bus stop", coords: [9.096340, 76.496002] },
  { id: "t4", name: "Karunagappally Bus Stand", category: "bus", sub: "Bus stand", coords: [9.051782, 76.536078] },
  { id: "t5", name: "Karunagapally Railway station", category: "railway", sub: "Railway station", coords: [9.065593, 76.544261] },

  { id: "y1", name: "Swetha's Paying Guest", category: "hotel", sub: "PG / guest stay near campus", coords: [9.096582, 76.493597] },
  { id: "l1", name: "Amritapuri Ashram", category: "landmark", sub: "Mata Amritanandamayi Math", coords: [9.088538, 76.487297] },
  { id: "l2", name: "Parayakadavu Beach", category: "landmark", sub: "Arabian Sea", coords: [9.089101, 76.485389] }
];

const savedTheme = localStorage.getItem("amritapuri-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let isDark = savedTheme ? savedTheme === "dark" : prefersDark;

let map, userMarker, accuracyCircle, tileLayer, routingControl;
let userPosition = null;
let isWithinCampusRange = false;
let activeCategory = "all";
let searchTerm = "";
let activePlace = null;
const markerById = {};

const tiles = {
  light: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(cartoApiKey)}`,
  dark: `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png`
};

function setTheme(dark) {
  isDark = dark;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]').content = dark ? "#202124" : "#faf7f2";
  document.querySelector(".theme-toggle").setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  localStorage.setItem("amritapuri-theme", dark ? "dark" : "light");
  if (tileLayer) tileLayer.setUrl(tiles[dark ? "dark" : "light"]);
}

function pinIcon(place, big) {
  const meta = CATEGORY_META[place.category];
  const size = big ? 36 : 30;
  return L.divIcon({
    className: "",
    html: `<div class="place-pin${big ? " place-pin-active" : ""}" style="background:${meta.color}"><span>${meta.icon}</span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size - 2],
    popupAnchor: [0, -(size - 2)]
  });
}

function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b[0] - a[0]) * Math.PI / 180;
  const dLon = (b[1] - a[1]) * Math.PI / 180;
  const la1 = a[0] * Math.PI / 180, la2 = b[0] * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function distanceLabel(place) {
  if (!userPosition) return "";
  const km = haversineKm(userPosition, place.coords);
  return km < 1 ? `${Math.round(km * 1000)} m away` : `${km.toFixed(1)} km away`;
}

function estimateAutoFare(km, place) {
  if (place) {
    if (place.id === "t1") return "₹350–₹400 (Kayamkulam Station)";
    if (place.id === "t5") return "₹300 (Karunagappally Station)";
    if (place.name.toLowerCase().includes("kollam junction")) return "₹1000 (Kollam Station)";
  }

  if (km > 30) {
    return "Distance exceeds local auto range (Taxi/Train recommended)";
  }

  if (km <= 1.1) return "₹30";

  const extraKm = km - 1.1;
  const extraCharge = Math.ceil(extraKm / 0.4) * 10;
  return `₹${30 + extraCharge} (Est.)`;
}

function setRangeWarning(show) {
  const warning = document.getElementById("range-warning");
  if(!warning) return;
  warning.hidden = !show;
  if (!show) {
    warning.classList.remove("is-expanded");
    warning.setAttribute("aria-expanded", "false");
  }
}

function setSheetCollapsed(collapsed) {
  document.getElementById("sheet").classList.toggle("collapsed", collapsed);
}

function matchesFilters(place) {
  const inCategory = activeCategory === "all" || place.category === activeCategory;
  const inSearch = !searchTerm || place.name.toLowerCase().includes(searchTerm) || place.sub.toLowerCase().includes(searchTerm);
  return inCategory && inSearch;
}

function renderChips() {
  const container = document.getElementById("chips");
  container.innerHTML = "";
  CHIP_ORDER.forEach((key) => {
    const meta = key === "all" ? { label: "All", color: null } : CATEGORY_META[key];
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip" + (activeCategory === key ? " active" : "");
    chip.style.setProperty("--chip-color", meta.color || "var(--maroon)");
    chip.innerHTML = meta.icon ? `<span class="chip-dot">${meta.icon}</span>${meta.label}` : meta.label;
    chip.addEventListener("click", () => {
      activeCategory = key;
      renderChips();
      renderPlaces();
      applyMarkerVisibility();
    });
    container.appendChild(chip);
  });
}

function renderPlaces() {
  const container = document.getElementById("places");
  container.innerHTML = "";
  const visible = PLACES.filter(matchesFilters);

  if (userPosition) {
    visible.sort((a, b) => haversineKm(userPosition, a.coords) - haversineKm(userPosition, b.coords));
  }

  document.getElementById("empty-state").hidden = visible.length !== 0;

  visible.forEach((place) => {
    const meta = CATEGORY_META[place.category];
    const row = document.createElement("button");
    row.type = "button";
    row.className = "place-row" + (activePlace && activePlace.id === place.id ? " active" : "");
    row.innerHTML = `
      <span class="place-row-icon" style="background:${meta.color}">${meta.icon}</span>
      <span class="place-row-text">
        <span class="place-row-name">${place.name}</span>
        <span class="place-row-sub">${meta.label} · ${place.sub}${userPosition ? " · " + distanceLabel(place) : ""}</span>
      </span>`;
    row.addEventListener("click", () => selectPlace(place));
    container.appendChild(row);
  });
}

function applyMarkerVisibility() {
  PLACES.forEach((place) => {
    const marker = markerById[place.id];
    const show = matchesFilters(place);
    const el = marker.getElement();
    if (el) el.style.display = show ? "" : "none";
  });
}

function selectPlace(place) {
  setSheetCollapsed(false);
  activePlace = place;
  map.flyTo(place.coords, 17, { duration: 0.65 });
  Object.entries(markerById).forEach(([id, marker]) => {
    marker.setIcon(pinIcon(PLACES.find((p) => p.id === id), id === place.id));
  });
  markerById[place.id].openPopup();
  document.getElementById("sheet").classList.add("detail-open");
  renderDetail(place);
  renderPlaces();
  if (userPosition && isWithinCampusRange) requestRoute(place);
  else if (userPosition) setStatus("Routing is available within 17 km of campus", false);
  else setStatus("Turn on location to see the route", false);
}

const KSRTC_TIMINGS = {
  north: [
    { k: "6:15 AM", a: "6:30 AM", d: "Amrita Hospital, Kochi" },
    { k: "6:30 AM", a: "6:45 AM", d: "Valiyazheekal" },
    { k: "7:00 AM", a: "7:20 AM", d: "Valiyazheekal" },
    { k: "8:00 AM", a: "8:20 AM", d: "Arattupuzha" },
    { k: "8:25 AM", a: "8:40 AM", d: "Ambalapuzha, NH 66" },
    { k: "9:10 AM", a: "9:30 AM", d: "Valiyazheekal" },
    { k: "10:35 AM", a: "10:50 AM", d: "Valiyazheekal" },
    { k: "11:00 AM", a: "11:20 AM", d: "Valiyazheekal" },
    { k: "11:45 AM", a: "12:05 PM", d: "Valiyazheekal" },
    { k: "12:40 PM", a: "1:05 PM", d: "Valiyazheekal" },
    { k: "1:20 PM", a: "1:40 PM", d: "Thottapally, NH 66" },
    { k: "2:40 PM", a: "3:00 PM", d: "Valiyazheekal" },
    { k: "3:45 PM", a: "4:05 PM", d: "Cherthala, NH 66" },
    { k: "4:30 PM", a: "4:50 PM", d: "Valiyazheekal" },
    { k: "5:30 PM", a: "5:50 PM", d: "Valiyazheekal" },
    { k: "6:00 PM", a: "6:20 PM", d: "Valiyazheekal" }
  ],
  south: [
    "5:25 AM (To TVM)", "7:40 AM", "8:05 AM", "8:40 AM",
    "10:15 AM", "11:00 AM", "11:45 AM", "12:05 PM",
    "12:55 PM", "1:40 PM", "2:00 PM", "3:15 PM",
    "4:00 PM", "5:00 PM", "5:30 PM", "6:00 PM", "7:10 PM"
  ]
};

function getBusScheduleHTML() {
  const northRows = KSRTC_TIMINGS.north.map(t => `
    <tr>
      <td>${t.k}</td>
      <td><strong>${t.a}</strong></td>
      <td>${t.d}</td>
    </tr>
  `).join("");

  const southPills = KSRTC_TIMINGS.south.map(t => `
    <span class="time-pill">${t}</span>
  `).join("");

  return `
    <div class="bus-schedule">
      <div class="bus-section">
        <h4>From Campus to Northern Side (Via Beach Rd)</h4>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Leaves K'pally</th><th>Leaves Campus</th><th>Destination</th></tr></thead>
            <tbody>${northRows}</tbody>
          </table>
        </div>
      </div>
      <div class="bus-section">
        <h4>From Campus to Karunagappally (South)</h4>
        <div class="pill-wrap">${southPills}</div>
      </div>
    </div>
  `;
}

function openBusSchedule() {
  setSheetCollapsed(false);
  document.getElementById("sheet").classList.add("detail-open");
  
  const panel = document.getElementById("detail");
  
  panel.innerHTML = `
    <div class="detail-head">
      <span class="detail-icon" style="background:#B58900"><i class="fi fi-rr-bus" aria-hidden="true"></i></span>
      <div class="detail-titles">
        <h3>KSRTC Bus Schedule</h3>
        <p>2024 Daily Service Timings</p>
      </div>
      <button type="button" class="icon-button detail-close" id="detail-close" aria-label="Close details">&times;</button>
    </div>
    ${getBusScheduleHTML()}
  `;
  
  document.getElementById("detail-close").addEventListener("click", closeDetail);
}

function closeDetail() {
  activePlace = null;
  document.getElementById("sheet").classList.remove("detail-open");
  if (routingControl) routingControl.setWaypoints([]);
  Object.entries(markerById).forEach(([id, marker]) => marker.setIcon(pinIcon(PLACES.find((p) => p.id === id), false)));
  renderPlaces();
}

function renderDetail(place) {
  const meta = CATEGORY_META[place.category];
  const panel = document.getElementById("detail");
  panel.innerHTML = `
    <div class="detail-head">
      <span class="detail-icon" style="background:${meta.color}">${meta.icon}</span>
      <div class="detail-titles">
        <h3>${place.name}</h3>
        <p>${meta.label} · ${place.sub}</p>
      </div>
      <button type="button" class="icon-button detail-close" id="detail-close" aria-label="Close details">&times;</button>
    </div>
    <div class="route-summary" id="route-summary">${!userPosition ? "Turn on location for turn-by-turn distance." : isWithinCampusRange ? "Calculating route…" : "Routing is available only within 17 km of campus."}</div>
    <div class="detail-actions">
      <a class="detail-btn primary" id="gmaps-link" target="_blank" rel="noopener">Open in Google Maps</a>
      <button type="button" class="detail-btn" id="recenter-btn">Center on map</button>
    </div>`;
  document.getElementById("detail-close").addEventListener("click", closeDetail);
  document.getElementById("recenter-btn").addEventListener("click", () => map.flyTo(place.coords, 17, { duration: 0.5 }));
  const gmaps = document.getElementById("gmaps-link");
  const dest = `${place.coords[0]},${place.coords[1]}`;
  gmaps.href = userPosition && isWithinCampusRange
    ? `https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=${userPosition[0]},${userPosition[1]}&destination=${dest}`
    : `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${dest}`;
}

function requestRoute(place) {
  if (!window.L.Routing || !userPosition || !isWithinCampusRange) {
    if (routingControl) routingControl.setWaypoints([]);
    return;
  }
  if (!routingControl) {
    routingControl = L.Routing.control({
      waypoints: [],
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
      lineOptions: { styles: [{ color: "#287cf1", weight: 5, opacity: 0.85 }] }
    }).addTo(map);
    routingControl.on("routesfound", (e) => {
      const r = e.routes[0];
      const km = (r.summary.totalDistance / 1000).toFixed(1);
      const mins = Math.round(r.summary.totalTime / 60);
      const autoFare = estimateAutoFare(parseFloat(km));
      const el = document.getElementById("route-summary");
      if (el) {
        el.innerHTML = `
          ${km} km · about ${mins} min by road 
          <div style="color: var(--muted); font-size: 11.5px; margin-top: 4px; font-weight: 500;">
            Estimated Auto Fare: ${autoFare}
          </div>
        `;
      }
    });
    routingControl.on("routingerror", () => {
      const el = document.getElementById("route-summary");
      if (el) el.textContent = "Route preview unavailable — use Google Maps for turn-by-turn.";
    });
  }
  routingControl.setWaypoints([L.latLng(userPosition), L.latLng(place.coords)]);
}

function setStatus(message, searching = false) {
  document.getElementById("status-text").textContent = message;
  document.querySelector(".status-dot").classList.toggle("searching", searching);
}

function locateUser() {
  if (!navigator.geolocation) { setStatus("Location is not supported by this browser"); return; }
  setStatus("Finding your location…", true);
  
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      userPosition = [coords.latitude, coords.longitude];
      
      const distance = haversineKm(userPosition, CAMPUS_CENTER);
      isWithinCampusRange = distance <= CAMPUS_LIMIT_METRES / 1000;
      setRangeWarning(!isWithinCampusRange);
      
      const userIcon = L.divIcon({ className: "", html: '<div class="user-marker"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });
      if (userMarker) {
        userMarker.setLatLng(userPosition);
        accuracyCircle.setLatLng(userPosition).setRadius(coords.accuracy);
      } else {
        userMarker = L.marker(userPosition, { icon: userIcon, zIndexOffset: 1000 }).addTo(map).bindPopup("You are here");
        accuracyCircle = L.circle(userPosition, { radius: coords.accuracy, color: "#287cf1", weight: 1, fillColor: "#287cf1", fillOpacity: .1, interactive: false }).addTo(map);
      }
      if (isWithinCampusRange) map.flyTo(userPosition, Math.max(map.getZoom(), 15.5), { duration: .8 });
      
      setStatus(isWithinCampusRange ? "Your location is shown on the map" : `You are outside the 17km range (${distance.toFixed(1)} km away)`);
      renderPlaces();
      
      if (activePlace) {
        renderDetail(activePlace);
        requestRoute(activePlace);
      }
    },
    (error) => {
      const message = error.code === error.PERMISSION_DENIED ? "Grant permission for location" : "Couldn't find your location";
      setStatus(message);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
}

function initSearch() {
  const input = document.getElementById("search-input");
  input.addEventListener("input", () => {
    searchTerm = input.value.trim().toLowerCase();
    renderPlaces();
    applyMarkerVisibility();
  });
}

function initMap() {
  setTheme(isDark);
  map = L.map("map", {
    zoomControl: false,
    attributionControl: true,
    minZoom: 13,
    maxZoom: 18,
    maxBounds: CAMPUS_BOUNDS,
    maxBoundsViscosity: 1.0,
    worldCopyJump: false
  }).setView(CAMPUS_CENTER, 15.4);

  tileLayer = L.tileLayer(tiles[isDark ? "dark" : "light"], {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    minZoom: 13,
    maxZoom: 18,
    noWrap: true,
    updateWhenIdle: true,
    keepBuffer: 12,
    unloadInvisibleTiles: false,
    reuseTiles: true
  }).addTo(map);

  PLACES.forEach((place) => {
    const marker = L.marker(place.coords, { icon: pinIcon(place, false) })
      .addTo(map)
      .bindPopup(`<b>${place.name}</b><br>${CATEGORY_META[place.category].label}`);
    marker.on("click", () => selectPlace(place));
    markerById[place.id] = marker;
  });

  renderChips();
  renderPlaces();
  initSearch();
  locateUser();

  const warning = document.getElementById("range-warning");
  if(warning) {
    warning.addEventListener("click", () => {
      const expanded = warning.classList.toggle("is-expanded");
      warning.setAttribute("aria-expanded", String(expanded));
    });
  }

  const handle = document.getElementById("sheet-handle");
  const sheet = document.getElementById("sheet");
  let dragStartY = null;
  let dragged = false;
  handle.addEventListener("pointerdown", (event) => {
    dragStartY = event.clientY;
    dragged = false;
    sheet.classList.add("is-dragging");
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", (event) => {
    if (dragStartY !== null && Math.abs(event.clientY - dragStartY) > 8) dragged = true;
  });
  handle.addEventListener("pointerup", (event) => {
    if (dragStartY === null) return;
    const deltaY = event.clientY - dragStartY;
    sheet.classList.remove("is-dragging");
    if (dragged) setSheetCollapsed(deltaY > 0);
    else setSheetCollapsed(!sheet.classList.contains("collapsed"));
    dragStartY = null;
  });
  handle.addEventListener("pointercancel", () => {
    dragStartY = null;
    sheet.classList.remove("is-dragging");
  });

  const placesList = document.getElementById("places");
  let listStartY = null;
  placesList.addEventListener("touchstart", (event) => {
    if (placesList.scrollTop <= 0) listStartY = event.touches[0].clientY;
  }, { passive: true });
  placesList.addEventListener("touchend", (event) => {
    if (listStartY !== null && event.changedTouches[0].clientY - listStartY > 42) setSheetCollapsed(true);
    listStartY = null;
  }, { passive: true });
}

initMap();

document.querySelector(".theme-toggle").addEventListener("click", (event) => {
  const isSwitchingToDark = !isDark;

  // Fallback for browsers that do not support View Transitions
  if (!document.startViewTransition) {
    setTheme(isSwitchingToDark);
    return;
  }

  // Use precise tap coordinates, fallback to button center if using keyboard
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX || (rect.left + rect.width / 2);
  const y = event.clientY || (rect.top + rect.height / 2);

  // Calculate radius to the furthest corner + 150px safety buffer for mobile viewport quirks
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  ) + 150;

  // Freeze the frame and swap the theme
  const transition = document.startViewTransition(() => {
    setTheme(isSwitchingToDark);
  });

  // Animate the new theme radiating outward
  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 450,
        easing: "ease-in", // Accelerates into the corners to hide the transition snap
        pseudoElement: "::view-transition-new(root)"
      }
    );
  });
});

document.getElementById("bus-button").addEventListener("click", openBusSchedule);
document.getElementById("location-button").addEventListener("click", locateUser);
document.getElementById("zoom-in").addEventListener("click", () => map.zoomIn());
document.getElementById("zoom-out").addEventListener("click", () => map.zoomOut());