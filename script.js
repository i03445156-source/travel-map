import { db } from './firebase-config.js';
import {
  collection, addDoc, deleteDoc, doc,
  query, orderBy, onSnapshot, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ── 지도 초기화 ──────────────────────────────────────────
const map = L.map('map', {
  center: [35.5, 128.2],
  zoom: 7,
  zoomControl: false,
  attributionControl: false,
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
  maxZoom: 18,
}).addTo(map);

L.control.zoom({ position: 'topright' }).addTo(map);

// ── 댓글 (Firestore) ─────────────────────────────────────
let currentTravelId = null;
let unsubscribeComments = null;

function messagesRef(travelId) {
  return collection(db, 'comments', `travel_${travelId}`, 'messages');
}

function formatCommentDate(date) {
  if (!date) return '방금';
  const d = date instanceof Date ? date : date.toDate();
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function renderCommentsList(comments) {
  const list = document.getElementById('comments-list');
  if (comments.length === 0) {
    list.innerHTML = '<div class="no-comments">아직 댓글이 없어요. 첫 기억을 남겨보세요 💕</div>';
    return;
  }
  list.innerHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-meta">
        <span class="comment-author">${c.author === '나' ? '🧡 나' : '💕 지인'}</span>
        <span>
          <span class="comment-date">${formatCommentDate(c.date)}</span>
          <button class="comment-delete" data-id="${c.id}" title="삭제">✕</button>
        </span>
      </div>
      <div class="comment-text">${c.text.replace(/</g, '&lt;')}</div>
    </div>
  `).join('');

  // 삭제 버튼 이벤트
  list.querySelectorAll('.comment-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      await deleteDoc(doc(db, 'comments', `travel_${currentTravelId}`, 'messages', btn.dataset.id));
    });
  });

  list.scrollTop = list.scrollHeight;
}

function subscribeComments(travelId) {
  if (unsubscribeComments) unsubscribeComments();
  const q = query(messagesRef(travelId), orderBy('date', 'asc'));
  unsubscribeComments = onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    renderCommentsList(comments);
  });
}

document.getElementById('comment-submit').addEventListener('click', async () => {
  const text = document.getElementById('comment-text').value.trim();
  const author = document.getElementById('comment-author').value;
  if (!text) return;

  const btn = document.getElementById('comment-submit');
  btn.disabled = true;
  btn.textContent = '...';

  await addDoc(messagesRef(currentTravelId), {
    author,
    text,
    date: serverTimestamp()
  });

  document.getElementById('comment-text').value = '';
  btn.disabled = false;
  btn.textContent = '남기기 ♥';
});

document.getElementById('comment-text').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    document.getElementById('comment-submit').click();
  }
});

// ── 라이트박스 ────────────────────────────────────────────
window.openLightbox = function(travel) {
  currentTravelId = travel.id;
  document.getElementById('lightbox-img').src = travel.photo || '';
  document.getElementById('lightbox-img').style.display = travel.photo ? 'block' : 'none';
  document.getElementById('lb-title').textContent = travel.title;
  document.getElementById('lb-date').textContent = '📅 ' + travel.date;
  document.getElementById('lb-desc').textContent = travel.desc || '';
  document.getElementById('comments-list').innerHTML = '<div class="no-comments">불러오는 중...</div>';
  subscribeComments(travel.id);
  document.getElementById('lightbox').classList.remove('hidden');
};

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  if (unsubscribeComments) { unsubscribeComments(); unsubscribeComments = null; }
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

// ── 마커 생성 ─────────────────────────────────────────────
const _travelById = {};
TRAVELS.forEach(travel => {
  _travelById[travel.id] = travel;

  const icon = travel.photo
    ? L.divIcon({
        className: '',
        html: `<div class="photo-marker"><img src="${travel.photo}" alt="${travel.title}" /></div>`,
        iconSize: [60, 60], iconAnchor: [30, 30], popupAnchor: [0, -36],
      })
    : L.divIcon({
        className: '',
        html: `<div class="emoji-marker">${travel.emoji || '📍'}</div>`,
        iconSize: [44, 44], iconAnchor: [22, 22], popupAnchor: [0, -26],
      });

  const photoHtml = travel.photo
    ? `<img class="popup-thumb" src="${travel.photo}" alt="${travel.title}" />`
    : `<div style="font-size:3rem;text-align:center;padding:10px 0;">${travel.emoji || '📍'}</div>`;

  const popup = L.popup({ maxWidth: 220 }).setContent(`
    <div class="popup-content">
      ${photoHtml}
      <h3>${travel.title}</h3>
      <div class="popup-date">📅 ${travel.date}</div>
      <div class="popup-desc">${travel.desc || ''}</div>
      <span class="popup-btn" id="popup-btn-${travel.id}">크게 보기 🔍</span>
    </div>
  `);

  const marker = L.marker([travel.lat, travel.lng], { icon }).addTo(map);
  marker.bindPopup(popup);

  marker.on('popupopen', () => {
    document.getElementById(`popup-btn-${travel.id}`)
      ?.addEventListener('click', () => window.openLightbox(_travelById[travel.id]));
  });
});

// ── 통계 ──────────────────────────────────────────────────
const countries = new Set(TRAVELS.map(t => t.country));
document.getElementById('stat-countries').textContent = `🌏 ${countries.size}개국`;
document.getElementById('stat-cities').textContent = `📍 ${TRAVELS.length}곳`;

// ── 키보드 단축키 ──────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ── 배경음악 ──────────────────────────────────────────────
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
