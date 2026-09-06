/* ------------------------------------------------------------------
   Amritapuri Campus Map — data + logic
   Coordinates are real locations around Amrita Vishwa Vidyapeetham's
   Amritapuri campus, Vallikavu / Clappana, Kollam, Kerala.
------------------------------------------------------------------- */

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
  landmark:   { label: "Landmark",      color: "#E8A33D", icon: '<i class="fi fi-rr-monument" aria-hidden="true"></i>' }
};

const CHIP_ORDER = ["all", "campus", "hostelBoys", "hostelGirls", "hospital", "pharmacy", "gym", "laptop", "phone", "salon", "railway", "bus", "hotel", "landmark"];

const cartoApiKey = "cb1_2ynn_1_e2db0c820448acae479fa430";

const PLACES = [
  { id: "c1", name: "Amrita Vishwa Vidyapeetham \u2013 Amritapuri", category: "campus", sub: "Main campus \u00b7 Engineering & Sciences", coords: [9.093937, 76.4918194] },
  { id: "c2", name: "Amrita School of Business, Amritapuri", category: "campus", sub: "Management campus", coords: [9.0928985, 76.4898167] },
  { id: "h1", name: "Shivam Hostel", category: "hostelBoys", sub: "Boys hostel", coords: [9.0983829, 76.4900625] },
  { id: "h2", name: "Anugraham Hostel", category: "hostelBoys", sub: "Boys hostel", coords: [9.1002005, 76.4897883] },
  { id: "h3", name: "Saraswathi Hostel", category: "hostelGirls", sub: "Girls hostel", coords: [9.0943579, 76.4883774] },
  { id: "m1", name: "Nandu Medicals", category: "pharmacy", sub: "Medical shop \u00b7 pharmacy", coords: [9.0922921, 76.4943018] },
  { id: "m2", name: "Sri Govinda Medicals", category: "pharmacy", sub: "Medical shop \u00b7 pharmacy", coords: [9.0920369, 76.4935367] },
  { id: "m3", name: "Amrita Ayurveda Hospital", category: "hospital", sub: "Hospital", coords: [9.0885237, 76.4930295] },
  { id: "s1", name: "IT Zone Vallikkavu", category: "laptop", sub: "Laptop & computer service", coords: [9.0925124, 76.4939956] },
  { id: "s2", name: "Amrita Technologies", category: "laptop", sub: "Computer service centre", coords: [9.0946676, 76.4929727] },
  { id: "p1", name: "Phones Hub", category: "phone", sub: "Mobile recharge & service", coords: [9.0921159, 76.4941082] },
  { id: "b1", name: "POSH Unisex Salon", category: "salon", sub: "Barbershop", coords: [9.0917017, 76.4922794] },
  { id: "b2", name: "Bond Unisex Salon", category: "salon", sub: "Barbershop", coords: [9.0910917, 76.4908555] },
  { id: "g1", name: "Core Fitness Gym", category: "gym", sub: "Gym", coords: [9.0915049, 76.4915472] },
  { id: "g2", name: "BodyTech Multi-Fitness Centre", category: "gym", sub: "Gym", coords: [9.0919433, 76.4943281] },
  { id: "t1", name: "Kayamkulam Junction", category: "railway", sub: "Nearest railway station \u00b7 ~9.5 km", coords: [9.1813368, 76.5123891] },
  { id: "t2", name: "Kinarumukku Bus Stop", category: "bus", sub: "Bus stop", coords: [9.0969134, 76.4929815] },
  { id: "t3", name: "Karelil Bus Stop", category: "bus", sub: "Bus stop", coords: [9.0963403, 76.4960020] },
  { id: "y1", name: "Swetha's Paying Guest", category: "hotel", sub: "PG / guest stay near campus", coords: [9.0965828, 76.4935979] },
  { id: "l1", name: "Amritapuri Ashram", category: "landmark", sub: "Mata Amritanandamayi Math", coords: [9.0885386, 76.4872978] },
  { id: "l2", name: "Parayakadavu Beach", category: "landmark", sub: "Arabian Sea", coords: [9.0891010, 76.4853891] }
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
  dark: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(cartoApiKey)}`
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
        <span class="place-row-sub">${meta.label} \u00b7 ${place.sub}${userPosition ? " \u00b7 " + distanceLabel(place) : ""}</span>
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
        <p>${meta.label} \u00b7 ${place.sub}</p>
      </div>
      <button type="button" class="icon-button detail-close" id="detail-close" aria-label="Close details">&times;</button>
    </div>
    <div class="route-summary" id="route-summary">${!userPosition ? "Turn on location for turn-by-turn distance." : isWithinCampusRange ? "Calculating route\u2026" : "Routing is available only within 17 km of campus."}</div>
    <div class="detail-actions">
      <a class="detail-btn primary" id="gmaps-link" target="_blank" rel="noopener">Open in Google Maps</a>
      <button type="button" class="detail-btn" id="recenter-btn">Center on map</button>
    </div>`;
  document.getElementById("detail-close").addEventListener("click", closeDetail);
  document.getElementById("recenter-btn").addEventListener("click", () => map.flyTo(place.coords, 17, { duration: 0.5 }));
  const gmaps = document.getElementById("gmaps-link");
  const dest = `${place.coords[0]},${place.coords[1]}`;
  gmaps.href = userPosition && isWithinCampusRange
    ? `https://www.google.com/maps/dir/?api=1&origin=${userPosition[0]},${userPosition[1]}&destination=${dest}&travelmode=driving`
    : `https://www.google.com/maps/search/?api=1&query=${dest}`;
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
      const el = document.getElementById("route-summary");
      if (el) el.textContent = `${km} km \u00b7 about ${mins} min by road`;
    });
    routingControl.on("routingerror", () => {
      const el = document.getElementById("route-summary");
      if (el) el.textContent = "Route preview unavailable \u2014 use Google Maps for turn-by-turn.";
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
  setStatus("Finding your location\u2026", true);
  
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
      const message = error.code === error.PERMISSION_DENIED ? "Grant permission for location" : "Couldn\u2019t find your location";
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
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    minZoom: 13,
    maxZoom: 18,
    noWrap: true,
    updateWhenIdle: true,
    keepBuffer: 1
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

  document.querySelector(".theme-toggle").addEventListener("click", () => setTheme(!isDark));
  document.getElementById("location-button").addEventListener("click", locateUser);
  document.getElementById("zoom-in").addEventListener("click", () => map.zoomIn());
  document.getElementById("zoom-out").addEventListener("click", () => map.zoomOut());

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