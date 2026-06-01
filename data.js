const TRAVELS = [
  // ── 2025 ──────────────────────────────────────────────
  {
    id: 1,
    title: "대구",
    country: "한국",
    date: "2025-06-03",
    lat: 35.8714, lng: 128.6014,
    photo: "photos/대구_250603_D-1.jpg",
    desc: "처음 같이 대구 시내를 걸었던 날 ☀️",
    emoji: "🏙️"
  },
  {
    id: 2,
    title: "대전 테미오래",
    country: "한국",
    date: "2025-07-19",
    lat: 36.3219, lng: 127.4127,
    photo: "photos/대전테미오래_250719.jpg",
    desc: "테미오래 옛 골목길 산책 🌿",
    emoji: "🏛️"
  },
  {
    id: 3,
    title: "대구 간송미술관",
    country: "한국",
    date: "2025-08-02",
    lat: 35.8582, lng: 128.6109,
    photo: "photos/대구간송미술관에서_250802.jpg",
    desc: "간송미술관에서 같이 본 전시 🎨",
    emoji: "🖼️"
  },
  {
    id: 4,
    title: "서울숲",
    country: "한국",
    date: "2025-08-16",
    lat: 37.5445, lng: 127.0374,
    photo: "photos/서울숲_250816.jpg",
    desc: "서울숲 피크닉 🌳",
    emoji: "🌿"
  },
  {
    id: 5,
    title: "동성로",
    country: "한국",
    date: "2025-10-03",
    lat: 35.8693, lng: 128.5945,
    photo: "photos/동성로_251003.jpg",
    desc: "동성로 가을 데이트 🍂",
    emoji: "🛍️"
  },
  {
    id: 6,
    title: "수성못",
    country: "한국",
    date: "2025-10-09",
    lat: 35.8461, lng: 128.6411,
    photo: "photos/수성못_251009.jpg",
    desc: "수성못 둘레길 산책 🦆",
    emoji: "🌊"
  },
  {
    id: 7,
    title: "대구 교동",
    country: "한국",
    date: "2025-10-18",
    lat: 35.8679, lng: 128.5870,
    photo: "photos/교동_251018.jpg",
    desc: "교동 가을 나들이 🍂",
    emoji: "🏘️"
  },
  {
    id: 8,
    title: "포항",
    country: "한국",
    date: "2025-11-21",
    lat: 36.0190, lng: 129.3435,
    photo: "photos/포항_251121.jpg",
    desc: "포항 바다 드라이브 🌊",
    emoji: "🐟"
  },
  {
    id: 9,
    title: "동대구역",
    country: "한국",
    date: "2025-12-25",
    lat: 35.8745, lng: 128.6280,
    photo: "photos/동대구역_251225.jpg",
    desc: "크리스마스에 함께한 동대구역 🎄",
    emoji: "🚄"
  },
  // ── 2026 ──────────────────────────────────────────────
  {
    id: 10,
    title: "대구 북구",
    country: "한국",
    date: "2026-01-11",
    lat: 35.9026, lng: 128.5671,
    photo: "photos/대구북구_260111.jpg",
    desc: "대구 북구 동네 산책 🚶",
    emoji: "🏘️"
  },
  {
    id: 11,
    title: "동성로",
    country: "한국",
    date: "2026-01-23",
    lat: 35.8695, lng: 128.5955,
    photo: "photos/동성로_260123.jpg",
    desc: "새해 첫 동성로 나들이 ✨",
    emoji: "🛍️"
  },
  {
    id: 12,
    title: "상하이 예원",
    country: "중국",
    date: "2026-01-26",
    lat: 31.2265, lng: 121.4927,
    photo: "photos/상하이예원_260126.jpg",
    desc: "예원 야경 🏮",
    emoji: "🏮"
  },
  {
    id: 13,
    title: "상하이",
    country: "중국",
    date: "2026-01-27",
    lat: 31.2304, lng: 121.4737,
    photo: "photos/상하이_260127.jpg",
    desc: "와이탄 야경 🌃",
    emoji: "🌃"
  },
  {
    id: 14,
    title: "상하이",
    country: "중국",
    date: "2026-01-28",
    lat: 31.2310, lng: 121.4747,
    photo: "photos/상하이_260128.jpg",
    desc: "상하이 마지막 날 ✈️",
    emoji: "🌆"
  },
  {
    id: 15,
    title: "상하이",
    country: "중국",
    date: "2026-01",
    lat: 31.2295, lng: 121.4720,
    photo: "photos/상하이.jpg",
    desc: "상하이에서 🇨🇳",
    emoji: "🇨🇳"
  },
  {
    id: 16,
    title: "삼덕동",
    country: "한국",
    date: "2026-01-30",
    lat: 35.8673, lng: 128.5988,
    photo: "photos/삼덕동_260130.jpg",
    desc: "삼덕동 카페거리 ☕",
    emoji: "☕"
  },
  {
    id: 17,
    title: "공평동 (서울)",
    country: "한국",
    date: "2026-02-06",
    lat: 37.5706, lng: 126.9849,
    photo: "photos/공평동_260206.jpg",
    desc: "서울 공평동 나들이 🌆",
    emoji: "🌆"
  },
  {
    id: 18,
    title: "대구역",
    country: "한국",
    date: "2026-03-21",
    lat: 35.8793, lng: 128.5919,
    photo: "photos/대구역_260321.jpg",
    desc: "대구역에서 🚂",
    emoji: "🚂"
  },
  {
    id: 19,
    title: "봉무동",
    country: "한국",
    date: "2026-03-21",
    lat: 35.9219, lng: 128.6577,
    photo: "photos/봉무동_260321.jpg",
    desc: "봉무공원 봄 산책 🌸",
    emoji: "🌸"
  },
  {
    id: 20,
    title: "경북대학교",
    country: "한국",
    date: "2026-03-27",
    lat: 35.8895, lng: 128.6103,
    photo: "photos/경북대학교_260327.jpg",
    desc: "경북대 캠퍼스 봄 🌷",
    emoji: "🎓"
  },
  {
    id: 21,
    title: "신천동",
    country: "한국",
    date: "2026-03-27",
    lat: 35.8714, lng: 128.6200,
    photo: "photos/신천동_260327.jpg",
    desc: "신천동 산책 🌊",
    emoji: "🚶"
  },
  {
    id: 22,
    title: "동성로",
    country: "한국",
    date: "2026-03-30",
    lat: 35.8697, lng: 128.5965,
    photo: "photos/동성로_0330.jpg",
    desc: "봄날 동성로 🌸",
    emoji: "🛍️"
  },
  {
    id: 23,
    title: "동성3가",
    country: "한국",
    date: "2026-04-06",
    lat: 35.8690, lng: 128.5940,
    photo: "photos/동성3가_260406.jpg",
    desc: "동성3가 거리 🌃",
    emoji: "🌃"
  },
  {
    id: 24,
    title: "동성로 CGV",
    country: "한국",
    date: "2026-04-06",
    lat: 35.8688, lng: 128.5960,
    photo: "photos/동성로CGV_260406.jpg",
    desc: "CGV 영화 데이트 🎬",
    emoji: "🎬"
  },
  {
    id: 25,
    title: "두류공원",
    country: "한국",
    date: "2026-04-08",
    lat: 35.8567, lng: 128.5714,
    photo: "photos/두류공원_260408.jpg",
    desc: "두류공원 봄 소풍 🌺",
    emoji: "🌺"
  },
  {
    id: 26,
    title: "만촌동",
    country: "한국",
    date: "2026-05-09",
    lat: 35.8504, lng: 128.6386,
    photo: "photos/만촌동_260509.jpg",
    desc: "만촌동 데이트 🌿",
    emoji: "🌿"
  },
  {
    id: 27,
    title: "동성로",
    country: "한국",
    date: "2026-05-19",
    lat: 35.8700, lng: 128.5950,
    photo: "photos/동성로_260519.jpg",
    desc: "초여름 동성로 ☀️",
    emoji: "🛍️"
  },
  {
    id: 28,
    title: "소제동 (대전)",
    country: "한국",
    date: "2026-05-25",
    lat: 36.3511, lng: 127.4397,
    photo: "photos/소제동_260525.jpg",
    desc: "소제동 감성 카페골목 ☕",
    emoji: "☕"
  },
];
