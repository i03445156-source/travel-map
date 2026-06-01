// 지도 초기화
const map = L.map('map', {
  center: [35.5, 128.2],
  zoom: 7,
  zoomControl: false,
  attributionControl: false,
});

// 타일 레이어 (CartoDB Voyager - 깔끔한 디자인)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
  maxZoom: 18,
}).addTo(map);

// 줌 컨트롤 오른쪽 위로
L.control.zoom({ position: 'topright' }).addTo(map);

// 라이트박스 열기
function openLightbox(travel) {
  document.getElementById('lightbox-img').src = travel.photo || '';
  document.getElementById('lightbox-img').style.display = travel.photo ? 'block' : 'none';
  document.getElementById('lb-title').textContent = travel.title;
  document.getElementById('lb-date').textContent = '📅 ' + travel.date;
  document.getElementById('lb-desc').textContent = travel.desc || '';
  document.getElementById('lightbox').classList.remove('hidden');
}

// 라이트박스 닫기
document.getElementById('lightbox-close').addEventListener('click', () => {
  document.getElementById('lightbox').classList.add('hidden');
});
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) {
    document.getElementById('lightbox').classList.add('hidden');
  }
});

// 마커 생성
TRAVELS.forEach(travel => {
  let icon;

  if (travel.photo) {
    // 사진 마커
    icon = L.divIcon({
      className: '',
      html: `<div class="photo-marker"><img src="${travel.photo}" alt="${travel.title}" /></div>`,
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      popupAnchor: [0, -36],
    });
  } else {
    // 이모지 마커
    icon = L.divIcon({
      className: '',
      html: `<div class="emoji-marker">${travel.emoji || '📍'}</div>`,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -26],
    });
  }

  const marker = L.marker([travel.lat, travel.lng], { icon }).addTo(map);

  // 팝업 내용
  const photoHtml = travel.photo
    ? `<img class="popup-thumb" src="${travel.photo}" alt="${travel.title}" />`
    : `<div style="font-size:3rem;text-align:center;padding:10px 0;">${travel.emoji || '📍'}</div>`;

  const popup = L.popup({ maxWidth: 220 }).setContent(`
    <div class="popup-content">
      ${photoHtml}
      <h3>${travel.title}</h3>
      <div class="popup-date">📅 ${travel.date}</div>
      <div class="popup-desc">${travel.desc || ''}</div>
      ${travel.photo ? `<span class="popup-btn" onclick="openLightbox(window._travelById[${travel.id}])">크게 보기 🔍</span>` : ''}
    </div>
  `);

  marker.bindPopup(popup);
});

// 전역 접근용 맵
window._travelById = {};
TRAVELS.forEach(t => { window._travelById[t.id] = t; });

// 통계 업데이트
const countries = new Set(TRAVELS.map(t => t.country));
document.getElementById('stat-countries').textContent = `🌏 ${countries.size}개국`;
document.getElementById('stat-cities').textContent = `📍 ${TRAVELS.length}곳`;

// 키보드 ESC로 라이트박스 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('lightbox').classList.add('hidden');
  }
});

// 배경음악 컨트롤
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('music-btn');
let playing = false;

musicBtn.addEventListener('click', () => {
  if (playing) {
    bgm.pause();
    musicBtn.classList.remove('playing');
  } else {
    bgm.play().catch(() => {});
    musicBtn.classList.add('playing');
  }
  playing = !playing;
});
