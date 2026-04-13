// Resources data loaded from JSON — used by app.js for rendering
let resourcesData = [];

async function loadResourcesData() {
  try {
    const basePath = window.location.pathname.includes('.html')
      ? window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))
      : window.location.pathname.replace(/\/$/, '');
    const resp = await fetch(basePath + '/data/resources.json');
    resourcesData = await resp.json();
  } catch (e) {
    console.error('Failed to load resources data:', e);
    resourcesData = [];
  }
  return resourcesData;
}
