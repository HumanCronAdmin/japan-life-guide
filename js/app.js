// Main application logic: search, guide rendering, category listing

// Search initialization with Fuse.js
let fuseInstance = null;

function initSearch(guides) {
  if (typeof Fuse === 'undefined') return;
  fuseInstance = new Fuse(guides, {
    keys: ['title', 'summary', 'steps.title', 'steps.detail', 'phrases.en'],
    threshold: 0.4,
    includeScore: true
  });
}

function handleSearch(query, container) {
  if (!fuseInstance || !query.trim()) {
    container.innerHTML = '';
    container.classList.add('hidden');
    return;
  }
  const results = fuseInstance.search(query.trim());
  if (results.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-sm p-4">No guides found. Try different keywords.</p>';
    container.classList.remove('hidden');
    return;
  }
  container.innerHTML = results.slice(0, 6).map(r => renderGuideCard(r.item)).join('');
  container.classList.remove('hidden');
}

// Render a list of guides filtered by category
function renderGuideList(guides, category, container) {
  const filtered = guides.filter(g => g.category === category);
  container.innerHTML = filtered.map(g => renderGuideCard(g)).join('');
}

// Render resources filtered by category
function renderResourceList(resources, category, container) {
  const filtered = category ? resources.filter(r => r.category === category) : resources;
  container.innerHTML = filtered.map(r => renderResourceCard(r)).join('');
}

// Render a single guide page
function renderGuidePage(guide, container) {
  if (!guide) {
    container.innerHTML = '<p class="text-red-600 text-lg p-8">Guide not found.</p>';
    return;
  }
  const stepsHtml = guide.steps.map(s => `
    <div class="flex gap-4 mb-6">
      <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">${s.order}</div>
      <div class="flex-1">
        <h3 class="font-semibold text-gray-900 mb-1">${s.title}</h3>
        <p class="text-gray-700 text-sm leading-relaxed">${s.detail}</p>
        ${s.tip ? `<p class="text-sm text-blue-700 bg-blue-50 rounded p-2 mt-2"><strong>Tip:</strong> ${s.tip}</p>` : ''}
      </div>
    </div>
  `).join('');

  const bringHtml = guide.bring ? `
    <div class="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 class="font-semibold text-gray-900 mb-2">What to Bring</h3>
      <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
        ${guide.bring.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>` : '';

  const phrasesHtml = guide.phrases ? `
    <div class="bg-green-50 rounded-lg p-4 mb-6">
      <h3 class="font-semibold text-gray-900 mb-2">Useful Japanese Phrases</h3>
      <div class="space-y-3">
        ${guide.phrases.map(p => `
          <div class="text-sm">
            <span class="font-medium text-gray-900">${p.ja}</span>
            <span class="text-gray-500 ml-2">(${p.romaji})</span>
            <br><span class="text-gray-600">${p.en}</span>
          </div>
        `).join('')}
      </div>
    </div>` : '';

  const catLabel = { medical: 'Medical', admin: 'Admin & Paperwork', daily: 'Daily Life' };
  const catHref = { medical: 'medical.html', admin: 'admin.html', daily: 'daily.html' };

  container.innerHTML = `
    <div class="mb-4">
      <a href="${catHref[guide.category]}" class="text-sm text-blue-600 hover:underline">&larr; ${catLabel[guide.category]}</a>
    </div>
    <h1 class="text-2xl font-bold text-gray-900 mb-2">${guide.title}</h1>
    <p class="text-gray-600 mb-1">${guide.summary}</p>
    <p class="text-xs text-gray-400 mb-6">Last verified: ${guide.lastVerified}</p>
    ${renderDisclaimer()}
    <div class="mb-8">${stepsHtml}</div>
    ${bringHtml}
    ${phrasesHtml}
  `;
}

// Index page: category cards + search
async function initIndexPage() {
  injectHeaderFooter('index');
  const guides = await loadGuidesData();
  initSearch(guides);

  const catContainer = document.getElementById('category-cards');
  if (catContainer) {
    catContainer.innerHTML = ['medical', 'admin', 'daily'].map(c => renderCategoryCard(c)).join('');
  }

  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value, searchResults));
  }

  // Recent/featured guides
  const featuredContainer = document.getElementById('featured-guides');
  if (featuredContainer) {
    featuredContainer.innerHTML = guides.slice(0, 3).map(g => renderGuideCard(g)).join('');
  }
}

// Category page
async function initCategoryPage(category) {
  injectHeaderFooter(category);
  const [guides, resources] = await Promise.all([loadGuidesData(), loadResourcesData()]);

  const listContainer = document.getElementById('guide-list');
  if (listContainer) renderGuideList(guides, category, listContainer);

  const resContainer = document.getElementById('resource-list');
  if (resContainer) renderResourceList(resources, category, resContainer);
}

// Individual guide page
async function initGuidePage() {
  injectHeaderFooter('');
  const guides = await loadGuidesData();
  const params = new URLSearchParams(window.location.search);
  const guideId = params.get('id');
  const guide = guides.find(g => g.id === guideId);

  const container = document.getElementById('guide-content');
  if (container) renderGuidePage(guide, container);

  // Update page title
  if (guide) document.title = guide.title + ' | Japan Life Guide';
}
