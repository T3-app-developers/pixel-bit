import React, { useMemo, useState } from 'react';

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
    summary:
      'Latest missions, nebula imagery, and quick facts about the expanding universe.',
    images: gradientCards.slice(0, 3).map((card, index) =>
      generatePlaceholder(`Space Vista ${index + 1}`, card[0], card[1])
    ),
  },
  {
    id: 'art',
    title: 'Digital Art',
    keywords: ['art', 'design', 'illustration', 'color'],
    summary:
      'Color palettes, style inspiration, and creative prompts crafted for digital artists.',
    images: gradientCards.slice(1, 4).map((card, index) =>
      generatePlaceholder(`Canvas ${index + 1}`, card[0], card[1])
    ),
  },
  {
    id: 'travel',
    title: 'Travel Inspiration',
    keywords: ['travel', 'trip', 'journey', 'vacation', 'city'],
    summary:
      'Three quick postcards with ideas for architecture, nature, and city adventures.',
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

const heroPreview = [
  generatePlaceholder('Live Boards', '#f6d365', '#fda085'),
  generatePlaceholder('Photo Memory', '#c471ed', '#f64f59'),
  generatePlaceholder('Video AI', '#6dd5ed', '#2193b0'),
];

const heroStats = [
  { label: 'Search intelligence', value: 'Domain aware' },
  { label: 'Creative kits', value: '5+ tools' },
  { label: 'Photo memory', value: 'Instant saves' },
];

const searchInsights = [
  {
    title: 'Domain navigation',
    detail: 'Pixelbit shifts into navigation mode the moment a valid domain is detected.',
  },
  {
    title: 'Visual discovery',
    detail: 'Three vivid reference images pair with a short summary for topic queries.',
  },
  {
    title: 'Status-first',
    detail: 'Live hints keep you oriented on what the search rail is doing.',
  },
];

const shoppingHighlights = [
  {
    title: 'Media vault',
    detail: 'Save uploads or captured snapshots locally in photo memory.',
  },
  {
    title: 'Creation lane',
    detail: 'Queue a mocked video-making AI request or add automation kits.',
  },
  {
    title: 'Responsive grid',
    detail: 'Tool cards glow when selected and stack neatly on smaller screens.',
  },
];

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

const isDomainQuery = (query) => {
  const cleaned = query.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!cleaned || cleaned.includes(' ')) return false;
  const domainPattern = /^(?!-)([a-z0-9-]{1,63}\.)+[a-z]{2,}$/;
  return domainPattern.test(cleaned);
};

const findTopic = (query) => {
  const normalized = query.toLowerCase();
  return topicLibrary.find((topic) =>
    topic.keywords.some((keyword) => normalized.includes(keyword))
  );
};

const SearchPanel = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(defaultSearchResult);
  const [status, setStatus] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) {
      setStatus('Enter a keyword or domain to begin.');
      setResult(defaultSearchResult);
      return;
    }

    if (isDomainQuery(value)) {
      setStatus('Domain lookup detected. Pixelbit would open navigation mode.');
      setResult({
        title: `Domain: ${value.replace(/^https?:\/\//, '')}`,
        summary: 'Direct domain queries skip discovery and route you to the destination.',
        images: defaultSearchResult.images,
      });
      return;
    }

    const topic = findTopic(value);
    if (topic) {
      setStatus('Topic discovery activated.');
      setResult(topic);
    } else {
      setStatus('General search using Pixelbit snippets.');
      const generalImages = gradientCards.slice(0, 3).map((card, index) =>
        generatePlaceholder(`${value} ${index + 1}`, card[0], card[1])
      );
      setResult({
        title: `Results for "${value}"`,
        summary:
          'Quick visual references generated from your query. Extend this with live APIs for production.',
        images: generalImages,
      });
    }
  };

  return (
    <section className="panel" aria-labelledby="search-heading">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Pixelbit Search</p>
          <h2 id="search-heading">Search or navigate</h2>
          <p className="muted">
            Pixelbit separates domain navigation from topic discovery. Type a domain to go
            straight there, or enter a theme to preview visuals and context.
          </p>
        </div>
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <label className="sr-only" htmlFor="search-query">
          Search query
        </label>
        <input
          id="search-query"
          name="search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try example.com or space art"
          aria-describedby="search-hint"
          required
        />
        <button type="submit" className="primary-btn">
          Search
        </button>
      </form>
      <div className="status-bar" role="status" aria-live="polite">
        <span className="pill soft">Discovery rail</span>
        <p>{status || 'Pixelbit previews three images and a short summary for topic searches.'}</p>
        <span className="pulse" aria-hidden="true" />
      </div>

      <div className="result-card">
        <div className="result-header">
          <div>
            <p className="eyebrow muted">Search outcome</p>
            <h3>{result.title}</h3>
          </div>
          <div className="result-meta">
            <span className="pill">Visual set</span>
            <span className="pill">Summary</span>
          </div>
        </div>
        <p className="muted result-summary">{result.summary}</p>
        <div className="image-grid" aria-label="Representative images">
          {result.images.map((image, index) => (
            <figure key={image} className="image-card">
              <img src={image} alt={`${result.title} visual ${index + 1}`} loading="lazy" />
              <figcaption className="sr-only">{`${result.title} visual ${index + 1}`}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="insight-grid" aria-label="Search experience details">
        {searchInsights.map((insight) => (
          <article key={insight.title} className="insight-card">
            <h4>{insight.title}</h4>
            <p className="muted">{insight.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

const ShoppingPanel = () => {
  const [selectedTools, setSelectedTools] = useState(new Set(['photo-memory']));
  const [photoMemory, setPhotoMemory] = useState([
    {
      id: 'memory-1',
      label: 'Palette idea',
      src: generatePlaceholder('Saved Palette', '#c471ed', '#f64f59'),
    },
  ]);
  const [videoStatus, setVideoStatus] = useState('Idle');
  const [uploadStatus, setUploadStatus] = useState('Waiting for a photo.');
  const selectedLabels = toolCatalog.filter((tool) => selectedTools.has(tool.id));

  const toggleSelection = (id) => {
    setSelectedTools((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const src = loadEvent.target?.result;
      if (typeof src === 'string') {
        setPhotoMemory((current) => [
          { id: `${file.name}-${Date.now()}`, label: file.name, src },
          ...current,
        ]);
        setUploadStatus(`${file.name} saved to photo memory.`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCapture = () => {
    const [startColor, endColor] = gradientCards[Math.floor(Math.random() * gradientCards.length)];
    const src = generatePlaceholder('Captured Photo', startColor, endColor);
    setPhotoMemory((current) => [
      { id: `capture-${Date.now()}`, label: 'Captured in browser', src },
      ...current,
    ]);
    setUploadStatus('Snapshot stored in photo memory.');
  };

  const handleVideo = () => {
    setVideoStatus('Sending prompt to Pixelbit studio...');
    setTimeout(() => {
      setVideoStatus('Queued: video-making AI stub has received your request.');
    }, 600);
  };

  return (
    <section className="panel" aria-labelledby="shopping-heading">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Shopping & Tools</p>
          <h2 id="shopping-heading">Browse Pixelbit kits</h2>
          <p className="muted">
            Select creative utilities, experiment with photo memory, or trigger the video-making
            AI stub. Everything here uses mock data you can extend.
          </p>
        </div>
        <div className="selection-pill" aria-live="polite">
          {selectedTools.size} tool{selectedTools.size === 1 ? '' : 's'} selected
        </div>
      </div>

      <div className="highlight-card" role="presentation">
        <div>
          <p className="eyebrow muted">Design-forward shopping</p>
          <h3>Glowing tool cards with responsive grids</h3>
          <p className="muted">Curated utility rows, shimmering selections, and a playful preview rail.</p>
        </div>
        <div className="highlight-grid" aria-label="Shopping highlights">
          {shoppingHighlights.map((item) => (
            <div key={item.title} className="micro-card">
              <p className="muted">{item.title}</p>
              <h4>{item.detail}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="tool-grid">
        {toolCatalog.map((tool) => (
          <article key={tool.id} className={`tool-card ${selectedTools.has(tool.id) ? 'active' : ''}`}>
            <header className="tool-head">
              <h3>{tool.name}</h3>
              <span className="pill">{tool.category}</span>
            </header>
            <p className="muted">{tool.description}</p>
            <div className="tool-footer">
              <span className="price">{tool.price}</span>
              <button
                type="button"
                className="secondary-btn"
                aria-pressed={selectedTools.has(tool.id)}
                onClick={() => toggleSelection(tool.id)}
              >
                {selectedTools.has(tool.id) ? 'Selected' : 'Select'}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="actions-grid">
        <div className="action-card">
          <h3>Photo capture or upload</h3>
          <p className="muted">Store references directly into Pixelbit photo memory.</p>
          <div className="action-controls">
            <label className="file-input">
              <input type="file" accept="image/*" onChange={handleUpload} aria-label="Upload photo" />
              <span>Upload photo</span>
            </label>
            <button type="button" className="secondary-btn" onClick={handleCapture}>
              Demo capture
            </button>
          </div>
          <p aria-live="polite" className="status">{uploadStatus}</p>
          <div className="memory-grid" aria-label="Saved photos">
            {photoMemory.map((photo) => (
              <figure key={photo.id} className="memory-card">
                <img src={photo.src} alt={photo.label} loading="lazy" />
                <figcaption>{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="action-card">
          <h3>Video-making AI</h3>
          <p className="muted">
            Trigger a mocked AI render. Extend this area with your real video generation backend.
          </p>
          <button type="button" className="primary-btn" onClick={handleVideo}>
            Queue AI video
          </button>
          <p aria-live="polite" className="status">{videoStatus}</p>

          <div className="list-card">
            <h4>What you can shop</h4>
            <ul>
              <li>Photo memory helpers</li>
              <li>Photo capture & save controls</li>
              <li>Video-making AI starter hooks</li>
              <li>Browser tools and automation kits</li>
            </ul>
          </div>
        </div>

        <div className="action-card selection-card">
          <h3>Selection summary</h3>
          <p className="muted">
            Your chosen tools shimmer here. Extend this to feed a real checkout or workspace setup.
          </p>
          <div className="chip-row" aria-live="polite">
            {selectedLabels.length === 0 ? (
              <span className="pill soft">No tools selected</span>
            ) : (
              selectedLabels.map((tool) => (
                <span key={tool.id} className="pill">
                  {tool.name}
                </span>
              ))
            )}
          </div>
          <div className="memory-preview" aria-label="Hero preview visuals">
            {heroPreview.map((image, index) => (
              <img key={image} src={image} alt={`Pixelbit preview ${index + 1}`} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('search');
  const tabContent = useMemo(() => ({ search: <SearchPanel />, shopping: <ShoppingPanel /> }), []);

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Pixelbit UI</p>
            <h1>Find, shop, and capture creative signals</h1>
            <p className="muted">
              A luminous interface with domain-aware search, curated shopping, photo memory,
              and a shimmering AI video rail ready for deeper integrations.
            </p>
            <div className="hero-stats" aria-label="Pixelbit capabilities">
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <p className="muted">{stat.label}</p>
                  <h3>{stat.value}</h3>
                </div>
              ))}
            </div>
            <nav className="tab-nav" aria-label="Primary">
              {[
                { id: 'search', label: 'Search' },
                { id: 'shopping', label: 'Shopping' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                  aria-pressed={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hero-visual" aria-label="Pixelbit preview">
            <div className="glass-card">
              <div className="spark-line" aria-hidden="true" />
              <p className="eyebrow muted">Photo memory</p>
              <h3>Gradient captures</h3>
              <p className="muted">
                Uploads and demo captures cascade into this preview rail. Extend with your storage
                or CDN of choice.
              </p>
              <div className="mini-grid">
                {heroPreview.map((image, index) => (
                  <figure key={image}>
                    <img src={image} alt={`Colorful preview ${index + 1}`} loading="lazy" />
                    <figcaption className="sr-only">Gradient preview {index + 1}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="glass-card alt">
              <p className="eyebrow muted">Live status</p>
              <h3>Video AI stub</h3>
              <p className="muted">Tap into the shopping tab to queue a shimmering AI render.</p>
              <div className="spark-pills">
                <span className="pill">Capture</span>
                <span className="pill">Shop</span>
                <span className="pill">Render</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>{tabContent[activeTab]}</main>

      <footer className="footer">
        <p>Pixelbit prototype. Built with Vite + React and ready to extend.</p>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          Vite documentation
        </a>
      </footer>
    </div>
  );
};

export default App;
