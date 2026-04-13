// Shared UI components: header, footer, disclaimer, cards

function renderHeader(activePage) {
  const nav = [
    { href: 'index.html', label: 'Home', key: 'index' },
    { href: 'medical.html', label: 'Medical', key: 'medical' },
    { href: 'admin.html', label: 'Admin', key: 'admin' },
    { href: 'daily.html', label: 'Daily Life', key: 'daily' }
  ];
  const links = nav.map(n => {
    const cls = n.key === activePage
      ? 'text-white font-semibold'
      : 'text-blue-200 hover:text-white';
    return `<a href="${n.href}" class="${cls} transition-colors">${n.label}</a>`;
  }).join('');
  return `<header class="bg-blue-700 text-white sticky top-0 z-50 shadow-md">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.html" class="text-lg font-bold tracking-tight">Japan Life Guide</a>
      <nav class="flex gap-4 text-sm">${links}</nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `<footer class="bg-gray-100 border-t mt-12">
    <div class="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
      <p class="mb-2">This is general information, not legal or medical advice. Always confirm details with official sources.</p>
      <p>&copy; ${new Date().getFullYear()} Japan Life Guide.
        <a href="https://github.com/humancronadmin" class="text-blue-600 hover:underline" target="_blank" rel="noopener">GitHub</a>
      </p>
    </div>
  </footer>`;
}

function renderDisclaimer() {
  return `<div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-6 text-sm text-yellow-800 rounded">
    This is general information, not legal or medical advice. Rules may vary by municipality. Always confirm with your local city hall or the relevant official source.
  </div>`;
}

function renderGuideCard(guide) {
  const icons = { medical: '🏥', admin: '🏛️', daily: '🏠' };
  const icon = icons[guide.category] || '📋';
  return `<a href="guide.html?id=${guide.id}" class="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5 border border-gray-200">
    <div class="text-2xl mb-2">${icon}</div>
    <h3 class="font-semibold text-gray-900 mb-1">${guide.title}</h3>
    <p class="text-sm text-gray-600">${guide.summary}</p>
    <span class="inline-block mt-3 text-sm text-blue-600 font-medium">View guide &rarr;</span>
  </a>`;
}

function renderCategoryCard(cat) {
  const data = {
    medical: { icon: '🏥', title: 'Medical', desc: 'Visiting doctors, calling 119, finding English-speaking clinics, using NHI at pharmacies', href: 'medical.html', color: 'blue' },
    admin: { icon: '🏛️', title: 'Admin & Paperwork', desc: 'City hall registration, My Number card, residence card renewal', href: 'admin.html', color: 'green' },
    daily: { icon: '🏠', title: 'Daily Life', desc: 'Setting up utilities, sorting garbage, and everyday essentials', href: 'daily.html', color: 'orange' }
  };
  const d = data[cat];
  return `<a href="${d.href}" class="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 border border-gray-200 text-center">
    <div class="text-4xl mb-3">${d.icon}</div>
    <h2 class="text-lg font-bold text-gray-900 mb-2">${d.title}</h2>
    <p class="text-sm text-gray-600">${d.desc}</p>
  </a>`;
}

function renderResourceCard(res) {
  const phone = res.phone ? `<p class="text-sm mt-1"><strong>Phone:</strong> <a href="tel:${res.phone}" class="text-blue-600">${res.phone}</a></p>` : '';
  const link = res.url ? `<a href="${res.url}" class="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener">Official website &rarr;</a>` : '';
  return `<div class="bg-white rounded-lg shadow p-4 border border-gray-200">
    <h3 class="font-semibold text-gray-900">${res.name}</h3>
    <p class="text-sm text-gray-600 mt-1">${res.description}</p>
    ${phone}
    <div class="mt-2">${link}</div>
  </div>`;
}

function injectHeaderFooter(activePage) {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = renderHeader(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();
}
