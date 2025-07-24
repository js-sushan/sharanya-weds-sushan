// ===== CONFIG =====
const CONFIG = {
  coupleNames: "Aarav & Meera",                           // TODO
  dateAndPlace: "December 20, 2025 • Bengaluru, India",   // TODO
  weddingDate: "2025-12-20T10:00:00+05:30",               // TODO (IST example)
  venue: {
    name: "The Grand Palace",
    address: "123 MG Road, Bengaluru, Karnataka 560001",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...", // TODO
    directionUrl: "https://maps.google.com/?q=The+Grand+Palace+Bengaluru" // TODO
  },
  videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // TODO
  timeline: [
    {
      title: "Haldi",
      date: "December 18, 2025",
      time: "10:00 AM",
      location: "Bride's Residence",
      description: "Join us for the auspicious Haldi ceremony."
    },
    {
      title: "Sangeet",
      date: "December 19, 2025",
      time: "7:00 PM",
      location: "The Grand Palace Lawn",
      description: "An evening of music, dance, and celebration."
    },
    {
      title: "Wedding",
      date: "December 20, 2025",
      time: "10:00 AM",
      location: "The Grand Palace Main Hall",
      description: "The wedding ceremony."
    },
    {
      title: "Reception",
      date: "December 21, 2025",
      time: "7:30 PM",
      location: "The Grand Palace Ballroom",
      description: "Dinner & celebration with family and friends."
    }
  ],
  gallery: [
    // TODO: Add your image paths here
    "assets/1.jpg",
    "assets/2.jpg",
    "assets/3.jpg",
    "assets/4.jpg",
    "assets/5.jpg"
  ]
};

// ===== UTIL =====
function $(sel) { return document.querySelector(sel); }
function createEl(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") el.className = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.substring(2), v);
    else el.setAttribute(k, v);
  });
  children.forEach(child => {
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  });
  return el;
}

// ===== Populate Static Text =====
$('#coupleNames').textContent = CONFIG.coupleNames;
$('#dateAndPlace').textContent = CONFIG.dateAndPlace;
$('#venueAddress').textContent = `${CONFIG.venue.name}, ${CONFIG.venue.address}`;
$('#mapFrame').src = CONFIG.venue.mapEmbedUrl;
$('#directionLink').href = CONFIG.venue.directionUrl;
$('#videoFrame').src = CONFIG.videoEmbedUrl;

// ===== Timeline Render =====
const timelineList = $('#timelineList');
CONFIG.timeline.forEach(ev => {
  const el = createEl('div', { class: 'event' }, [
    createEl('h3', {}, [ev.title]),
    createEl('div', { class: 'time' }, [`${ev.date} • ${ev.time}`]),
    createEl('div', { class: 'location' }, [ev.location]),
    ev.description ? createEl('p', {}, [ev.description]) : null
  ].filter(Boolean));
  timelineList.appendChild(el);
});

// ===== Gallery Render + Lightbox =====
const galleryGrid = $('#galleryGrid');
const lightbox = $('#lightbox');
const lightboxImg = lightbox.querySelector('img');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
}
function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxImg.src = "";
}

if (CONFIG.gallery && CONFIG.gallery.length > 0) {
  CONFIG.gallery.forEach(src => {
    const img = createEl('img', { src, alt: "Gallery image", onclick: () => openLightbox(src) });
    galleryGrid.appendChild(img);
  });
} else {
  // $('#gallery').style.display = 'none';
}

lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== Countdown =====
const weddingTime = new Date(CONFIG.weddingDate).getTime();
const daysEl = $('#days');
const hoursEl = $('#hours');
const minutesEl = $('#minutes');
const secondsEl = $('#seconds');
const afterMsg = $('#afterCountdownMsg');

function tick() {
  const now = Date.now();
  let diff = Math.max(0, weddingTime - now);

  if (diff <= 0) {
    daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '0';
    afterMsg.style.display = 'block';
    clearInterval(interval);
    return;
  }

  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = secs;
}

const interval = setInterval(tick, 1000);
tick();
