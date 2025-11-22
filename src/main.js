const gradientCards = [
  ['#6dd5ed', '#2193b0'],
  ['#f6d365', '#fda085'],
  ['#c471ed', '#f64f59'],
  ['#a1c4fd', '#c2e9fb'],
  ['#667db6', '#0082c8'],
];

const generatePlaceholder = (label, startColor = '#6dd5ed', endColor = '#2193b0') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">` +
    `<defs><linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">` +
    `<stop offset="0%" stop-color="${startColor}"/><stop offset="100%" stop-color="${endColor}"/>` +
    `</linearGradient></defs>` +
    `<rect width="400" height="240" rx="20" fill="url(#grad)"/>` +
    `<text x="200" y="130" text-anchor="middle" font-size="32" font-family="'Inter', 'Arial'" fill="white" font-weight="700">${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const topicLibrary = [
  {
    id: 'space',
    title: 'Space Discovery',
    keywords: ['space', 'galaxy', 'planet', 'nasa', 'orbit'],
    summary: 'Latest missions, nebula imagery, and quick facts about the expanding universe.',
    images: gradientCards.slice(0, 3).map((card, index) =>
      generatePlaceholder(`Space Vista ${index + 1}`, card[0], card[1])
    ),
  },
  {
    id: 'art',
    title: 'Digital Art',
    keywords: ['art', 'design', 'illustration', 'color'],
    summary: 'Color palettes, style inspiration, and creative prompts crafted for digital artists.',
    images: gradientCards.slice(1, 4).map((card, index) =>
      generatePlaceholder(`Canvas ${index + 1}`, card[0], card[1])
    ),
  },
  {
    id: 'travel',
    title: 'Travel Inspiration',
    keywords: ['travel', 'trip', 'journey', 'vacation', 'city'],
    summary: 'Three quick postcards with ideas for architecture, nature, and city adventures.',
    images: gradientCards.slice(2, 5).map((card, index) =>
      generatePlaceholder(`Journey ${index + 1}`, card[0], card[1])
    ),
  },
];

const defaultSearchResult = {
  title: 'Pixelbit Discovery',
  summary: 'Search across topics and visuals. Try "space", "art", or any domain like example.com.',
  images: gradientCards.slice(0, 3).map((card, index) =>
    generatePlaceholder(`Pixelbit Image ${index + 1}`, card[0], card[1])
  ),
};

const toolCatalog = [
  {
    id: 'photo-memory',
    name: 'Photo Memory',
    description: 'Save uploads or captured snapshots locally inside the browser.',
    category: 'Media',
    price: 'Included',
  },
  {
    id: 'photo-capture',
    name: 'Photo Capture & Save',
    description: 'Use the upload/capture controls to stash quick reference images.',
    category: 'Media',
    price: 'Included',
  },
  {
    id: 'video-ai',
    name: 'Video-Making AI',
    description: 'Stubbed action that simulates sending prompts to the Pixelbit studio.',
    category: 'Creation',
    price: 'Preview',
  },
  {
    id: 'browser-automation',
    name: 'Browser Automation',
    description: 'Mock automation triggers for managing creative workflows.',
    category: 'Utilities',
    price: 'Preview',
  },
  {
    id: 'asset-kit',
    name: 'Asset Handling Kit',
    description: 'Guides and helpers for packing images and other static assets.',
    category: 'Utilities',
    price: 'Free',
  },
];

const state = {
  activeTab: 'search',
  query: '',
  status: '',
  result: defaultSearchResult,
  selectedTools: new Set(['photo-memory']),
  photoMemory: [
    {
      id: 'memory-1',
      label: 'Palette idea',
      src: generatePlaceholder('Saved Palette', '#c471ed', '#f64f59'),
    },
  ],
  uploadStatus: 'Waiting for a photo.',
  videoStatus: 'Idle',
};

const root = document.getElementById('root');

const isDomainQuery = (query) => {
  const cleaned = query.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!cleaned || cleaned.includes(' ')) return false;
  const domainPattern = /^(?!-)([a-z0-9-]{1,63}\.)+[a-z]{2,}$/;
  return domainPattern.test(cleaned);
};

const findTopic = (query) => {
  const normalized = query.toLowerCase();
  return topicLibrary.find((topic) => topic.keywords.some((keyword) => normalized.includes(keyword)));
};

const setState = (updates) => {
  Object.assign(state, updates);
  render();
};

const renderImages = (images, title) =>
  images
    .map(
      (image, index) =>
        `<figure class="image-card"><img src="${image}" alt="${title} visual ${index + 1}" loading="lazy" /><figcaption class="sr-only">${title} visual ${index + 1}</figcaption></figure>`
    )
    .join('');

const renderMemory = (items) =>
  items
    .map(
      (photo) =>
        `<figure class="memory-card"><img src="${photo.src}" alt="${photo.label}" loading="lazy" /><figcaption>${photo.label}</figcaption></figure>`
    )
    .join('');

const renderTools = () =>
  toolCatalog
    .map(
      (tool) => `
        <article class="tool-card ${state.selectedTools.has(tool.id) ? 'active' : ''}" data-tool-id="${tool.id}">
          <header class="tool-head">
            <h3>${tool.name}</h3>
            <span class="pill">${tool.category}</span>
          </header>
          <p class="muted">${tool.description}</p>
          <div class="tool-footer">
            <span class="price">${tool.price}</span>
            <button type="button" class="secondary-btn tool-toggle" aria-pressed="${state.selectedTools.has(tool.id)}">
              ${state.selectedTools.has(tool.id) ? 'Selected' : 'Select'}
            </button>
          </div>
        </article>`
    )
    .join('');

const render = () => {
  if (!root) return;

  const tabNav = `
    <nav class="tab-nav" aria-label="Primary">
      <button class="tab ${state.activeTab === 'search' ? 'active' : ''}" data-tab="search" aria-pressed="${state.activeTab === 'search'}">Search</button>
      <button class="tab ${state.activeTab === 'shopping' ? 'active' : ''}" data-tab="shopping" aria-pressed="${state.activeTab === 'shopping'}">Shopping</button>
    </nav>`;

  const searchPanel = `
    <section class="panel" aria-labelledby="search-heading">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Pixelbit Search</p>
          <h2 id="search-heading">Search or navigate</h2>
          <p class="muted">
            Pixelbit separates domain navigation from topic discovery. Type a domain to go
            straight there, or enter a theme to preview visuals and context.
          </p>
        </div>
      </div>
      <form class="search-form" id="search-form">
        <label class="sr-only" for="search-query">Search query</label>
        <input id="search-query" name="search" type="search" value="${state.query}" placeholder="Try example.com or space art" aria-describedby="search-hint" required />
        <button type="submit" class="primary-btn">Search</button>
      </form>
      <p id="search-hint" class="muted" aria-live="polite">
        ${state.status || 'Pixelbit previews three images and a short summary for topic searches.'}
      </p>

      <div class="result-card">
        <div class="result-header">
          <h3>${state.result.title}</h3>
          <p class="muted">${state.result.summary}</p>
        </div>
        <div class="image-grid" aria-label="Representative images">
          ${renderImages(state.result.images, state.result.title)}
        </div>
      </div>
    </section>`;

  const shoppingPanel = `
    <section class="panel" aria-labelledby="shopping-heading">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Shopping &amp; Tools</p>
          <h2 id="shopping-heading">Browse Pixelbit kits</h2>
          <p class="muted">
            Select creative utilities, experiment with photo memory, or trigger the video-making
            AI stub. Everything here uses mock data you can extend.
          </p>
        </div>
        <div class="selection-pill" aria-live="polite">
          ${state.selectedTools.size} tool${state.selectedTools.size === 1 ? '' : 's'} selected
        </div>
      </div>

      <div class="tool-grid">
        ${renderTools()}
      </div>

      <div class="actions-grid">
        <div class="action-card">
          <h3>Photo capture or upload</h3>
          <p class="muted">Store references directly into Pixelbit photo memory.</p>
          <div class="action-controls">
            <label class="file-input">
              <input type="file" accept="image/*" id="photo-upload" aria-label="Upload photo" />
              <span>Upload photo</span>
            </label>
            <button type="button" class="secondary-btn" id="photo-capture">Demo capture</button>
          </div>
          <p aria-live="polite" class="status">${state.uploadStatus}</p>
          <div class="memory-grid" aria-label="Saved photos">
            ${renderMemory(state.photoMemory)}
          </div>
        </div>

        <div class="action-card">
          <h3>Video-making AI</h3>
          <p class="muted">
            Trigger a mocked AI render. Extend this area with your real video generation backend.
          </p>
          <button type="button" class="primary-btn" id="video-trigger">Queue AI video</button>
          <p aria-live="polite" class="status">${state.videoStatus}</p>

          <div class="list-card">
            <h4>What you can shop</h4>
            <ul>
              <li>Photo memory helpers</li>
              <li>Photo capture &amp; save controls</li>
              <li>Video-making AI starter hooks</li>
              <li>Browser tools and automation kits</li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;

  root.innerHTML = `
    <div class="app-shell">
      <header class="hero">
        <div>
          <p class="eyebrow">Pixelbit UI</p>
          <h1>Find, shop, and capture creative signals</h1>
          <p class="muted">
            Lightweight Pixelbit experience with domain-aware search, mock shopping tools, photo
            memory, and a stubbed video-making AI lane.
          </p>
          ${tabNav}
        </div>
      </header>
      <main>${state.activeTab === 'search' ? searchPanel : shoppingPanel}</main>
      <footer class="footer">
        <p>Pixelbit prototype. Built to run without external dependencies.</p>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite documentation</a>
      </footer>
    </div>`;

  attachHandlers();
};

const handleSearch = (event) => {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector('#search-query');
  if (!input) return;
  const value = input.value.trim();

  if (!value) {
    setState({ status: 'Enter a keyword or domain to begin.', result: defaultSearchResult, query: '' });
    return;
  }

  if (isDomainQuery(value)) {
    setState({
      status: 'Domain lookup detected. Pixelbit would open navigation mode.',
      result: {
        title: `Domain: ${value.replace(/^https?:\/\//, '')}`,
        summary: 'Direct domain queries skip discovery and route you to the destination.',
        images: defaultSearchResult.images,
      },
      query: value,
    });
    return;
  }

  const topic = findTopic(value);
  if (topic) {
    setState({ status: 'Topic discovery activated.', result: topic, query: value });
  } else {
    const generalImages = gradientCards.slice(0, 3).map((card, index) =>
      generatePlaceholder(`${value} ${index + 1}`, card[0], card[1])
    );
    setState({
      status: 'General search using Pixelbit snippets.',
      result: {
        title: `Results for "${value}"`,
        summary: 'Quick visual references generated from your query. Extend this with live APIs for production.',
        images: generalImages,
      },
      query: value,
    });
  }
};

const handleTabChange = (event) => {
  const tab = event.target.getAttribute('data-tab');
  if (tab) {
    setState({ activeTab: tab });
  }
};

const handleToolToggle = (event) => {
  const card = event.target.closest('.tool-card');
  if (!card) return;
  const id = card.getAttribute('data-tool-id');
  if (!id) return;
  const updated = new Set(state.selectedTools);
  if (updated.has(id)) updated.delete(id); else updated.add(id);
  state.selectedTools = updated;
  render();
};

const handleUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    const src = loadEvent.target?.result;
    if (typeof src === 'string') {
      const photo = { id: `${file.name}-${Date.now()}`, label: file.name, src };
      setState({
        photoMemory: [photo, ...state.photoMemory],
        uploadStatus: `${file.name} saved to photo memory.`,
      });
    }
  };
  reader.readAsDataURL(file);
};

const handleCapture = () => {
  const [startColor, endColor] = gradientCards[Math.floor(Math.random() * gradientCards.length)];
  const photo = {
    id: `capture-${Date.now()}`,
    label: 'Captured in browser',
    src: generatePlaceholder('Captured Photo', startColor, endColor),
  };
  setState({
    photoMemory: [photo, ...state.photoMemory],
    uploadStatus: 'Snapshot stored in photo memory.',
  });
};

const handleVideo = () => {
  setState({ videoStatus: 'Sending prompt to Pixelbit studio...' });
  setTimeout(() => setState({ videoStatus: 'Queued: video-making AI stub has received your request.' }), 600);
};

const attachHandlers = () => {
  const tabButtons = root.querySelectorAll('.tab');
  tabButtons.forEach((button) => button.addEventListener('click', handleTabChange));

  const searchForm = root.querySelector('#search-form');
  if (searchForm) searchForm.addEventListener('submit', handleSearch);

  const toolButtons = root.querySelectorAll('.tool-toggle');
  toolButtons.forEach((button) => button.addEventListener('click', handleToolToggle));

  const uploadInput = root.querySelector('#photo-upload');
  if (uploadInput) uploadInput.addEventListener('change', handleUpload);

  const captureButton = root.querySelector('#photo-capture');
  if (captureButton) captureButton.addEventListener('click', handleCapture);

  const videoButton = root.querySelector('#video-trigger');
  if (videoButton) videoButton.addEventListener('click', handleVideo);
};

render();
