// Guides data loaded from JSON — used by app.js for rendering and search
let guidesData = [];

async function loadGuidesData() {
  try {
    const basePath = window.location.pathname.includes('.html')
      ? window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))
      : window.location.pathname.replace(/\/$/, '');
    const resp = await fetch(basePath + '/data/guides.json');
    guidesData = await resp.json();
  } catch (e) {
    console.error('Failed to load guides data:', e);
    guidesData = [];
  }
  return guidesData;
}
