import { useState, useEffect } from 'react';
import Icon from '../components/Icon';

const AVAILABLE_BLOCK_TYPES = [
  { type: 'hero', label: 'Hero Section', defaultContent: { title: 'New Hero Title', subtitle: 'Detailed subtitle description text.' } },
  { type: 'features', label: 'Features Grid', defaultContent: { title: 'Our Core Advantages', items: ['Advantage 1', 'Advantage 2', 'Advantage 3'] } },
  { type: 'text', label: 'Rich Text Block', defaultContent: { heading: 'Section Heading', body: 'This is a description text block.' } },
  { type: 'faq', label: 'FAQs List', defaultContent: { title: 'Common Inquiries', faqs: [{ q: 'Question 1?', a: 'Answer 1.' }] } },
  { type: 'contact', label: 'Contact Banner', defaultContent: { title: 'Need Sizing Advice?', text: 'Get same-day quotations from our engineers.' } }
];

export default function AdminBuilderPage() {
  const [pages, setPages] = useState([]);
  const [activePagePath, setActivePagePath] = useState('/');
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Fetch all pages
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/pages');
      if (res.ok) {
        const data = await res.json();
        setPages(data);
        const active = data.find(p => p.path === activePagePath) || data[0];
        if (active) {
          setActivePagePath(active.path);
          setBlocks(active.blocks || []);
        }
      }
    } catch (err) {
      console.error('Error fetching pages:', err);
    }
  };

  const handleSelectPage = (path) => {
    setActivePagePath(path);
    const pg = pages.find(p => p.path === path);
    setBlocks(pg ? pg.blocks : []);
    setSelectedBlockId(null);
  };

  const handleAddPage = async () => {
    const name = prompt('Enter new page name (e.g. /custom-page):');
    if (!name) return;
    const path = name.startsWith('/') ? name : '/' + name;
    
    const newPage = {
      path,
      title: name.replace('/', '').toUpperCase() || 'NEW PAGE',
      blocks: [
        { id: 'b_' + Date.now(), type: 'hero', content: { title: 'Welcome to ' + name, subtitle: 'This is your new custom layout page.' } }
      ]
    };

    try {
      const res = await fetch('http://localhost:5000/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPage)
      });
      if (res.ok) {
        await fetchPages();
        handleSelectPage(path);
      }
    } catch (err) {
      console.error('Error creating page:', err);
    }
  };

  const handleAddBlock = (blockType) => {
    const template = AVAILABLE_BLOCK_TYPES.find(b => b.type === blockType);
    if (!template) return;

    const newBlock = {
      id: 'block_' + Date.now(),
      type: blockType,
      content: JSON.parse(JSON.stringify(template.defaultContent))
    };

    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const handleDeleteBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const handleMoveBlock = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setBlocks(updated);
  };

  const handleUpdateBlockContent = (field, value) => {
    setBlocks(blocks.map(b => {
      if (b.id === selectedBlockId) {
        return {
          ...b,
          content: {
            ...b.content,
            [field]: value
          }
        };
      }
      return b;
    }));
  };

  const handleSavePage = async () => {
    setSaveStatus('Saving...');
    const pg = pages.find(p => p.path === activePagePath);
    const payload = {
      path: activePagePath,
      title: pg ? pg.title : 'Page Layout',
      blocks
    };

    try {
      const res = await fetch('http://localhost:5000/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSaveStatus('Saved Successfully!');
        fetchPages();
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('Save Failed');
      }
    } catch (err) {
      setSaveStatus('Save Failed');
      console.error(err);
    }
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', background: '#0F0E17', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* Top Builder Control Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: '#161424' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>Frappe Builder</h2>
          
          <select 
            value={activePagePath} 
            onChange={(e) => handleSelectPage(e.target.value)}
            style={{ padding: '0.5rem 1rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '6px' }}
          >
            {pages.map(p => (
              <option key={p.path} value={p.path}>{p.title} ({p.path})</option>
            ))}
          </select>

          <button onClick={handleAddPage} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', gap: '0.25rem' }}>
            + New Page
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {saveStatus && <span style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>{saveStatus}</span>}
          <button onClick={handleSavePage} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
            Save Layout
          </button>
        </div>
      </div>

      {/* Main Builder Panel Workspace */}
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        
        {/* Left Panel: Available Widgets & Drag Blocks */}
        <div style={{ width: '250px', background: '#161424', padding: '1.5rem', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', color: 'rgba(255,255,255,0.6)' }}>Widgets / Components</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {AVAILABLE_BLOCK_TYPES.map(widget => (
              <button 
                key={widget.type} 
                onClick={() => handleAddBlock(widget.type)}
                style={{ width: '100%', padding: '0.85rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#36344E'}
                onMouseLeave={e => e.currentTarget.style.background = '#26243A'}
              >
                <span>{widget.label}</span>
                <span style={{ fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>+</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Panel: Live Layout Visual Canvas */}
        <div style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto', background: '#0A0814', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          {blocks.length === 0 ? (
            <div style={{ color: 'rgba(255,255,255,0.4)', marginTop: '20vh', textAlign: 'center' }}>
              <p>Your layout is empty.</p>
              <p style={{ fontSize: '0.9rem' }}>Add a widget from the left panel to begin building.</p>
            </div>
          ) : (
            blocks.map((block, index) => {
              const isSelected = selectedBlockId === block.id;
              return (
                <div 
                  key={block.id}
                  onClick={() => setSelectedBlockId(block.id)}
                  style={{ width: '100%', maxWidth: '800px', padding: '2rem', border: isSelected ? '2px solid var(--accent-cyan)' : '1px dashed rgba(255,255,255,0.15)', borderRadius: '12px', background: isSelected ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', position: 'relative', cursor: 'pointer' }}
                >
                  {/* Block Controls overlay */}
                  <div style={{ position: 'absolute', right: '1rem', top: '1rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                    <button onClick={(e) => { e.stopPropagation(); handleMoveBlock(index, 'up'); }} style={{ background: '#26243A', border: 'none', color: '#fff', padding: '0.35rem', borderRadius: '4px', cursor: 'pointer' }}>↑</button>
                    <button onClick={(e) => { e.stopPropagation(); handleMoveBlock(index, 'down'); }} style={{ background: '#26243A', border: 'none', color: '#fff', padding: '0.35rem', borderRadius: '4px', cursor: 'pointer' }}>↓</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteBlock(block.id); }} style={{ background: '#C62828', border: 'none', color: '#fff', padding: '0.35rem', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                  </div>

                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', background: '#161424', padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase', position: 'absolute', left: '1rem', top: '-0.75rem' }}>
                    {block.type} widget
                  </span>

                  {/* Render Visual Dummies of each block */}
                  {block.type === 'hero' && (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                      <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{block.content.title}</h1>
                      <p style={{ color: 'rgba(255,255,255,0.6)' }}>{block.content.subtitle}</p>
                    </div>
                  )}

                  {block.type === 'features' && (
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>{block.content.title}</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {block.content.items?.map((item, idx) => (
                          <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', textAlign: 'center' }}>{item}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {block.type === 'text' && (
                    <div>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{block.content.heading}</h2>
                      <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{block.content.body}</p>
                    </div>
                  )}

                  {block.type === 'faq' && (
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>{block.content.title}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {block.content.faqs?.map((faq, idx) => (
                          <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                            <strong>{faq.q}</strong>
                            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {block.type === 'contact' && (
                    <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--accent-cyan)', color: '#000', borderRadius: '8px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{block.content.title}</h3>
                      <p>{block.content.text}</p>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* Right Panel: Selected widget configurations */}
        <div style={{ width: '300px', background: '#161424', padding: '1.5rem', borderLeft: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', color: 'rgba(255,255,255,0.6)' }}>Properties Inspector</h3>
          
          {!selectedBlock ? (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>Select a widget on the canvas to configure properties.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Widget Type</label>
                <input type="text" value={selectedBlock.type.toUpperCase()} readOnly style={{ width: '100%', padding: '0.5rem', background: '#0F0E17', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: '4px' }} />
              </div>

              {/* Dynamic properties field generation */}
              {selectedBlock.type === 'hero' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem' }}>Hero Title</label>
                    <input 
                      type="text" 
                      value={selectedBlock.content.title || ''} 
                      onChange={(e) => handleUpdateBlockContent('title', e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem' }}>Hero Subtitle</label>
                    <textarea 
                      rows={4}
                      value={selectedBlock.content.subtitle || ''} 
                      onChange={(e) => handleUpdateBlockContent('subtitle', e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', resize: 'vertical' }} 
                    />
                  </div>
                </>
              )}

              {selectedBlock.type === 'features' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem' }}>Section Title</label>
                    <input 
                      type="text" 
                      value={selectedBlock.content.title || ''} 
                      onChange={(e) => handleUpdateBlockContent('title', e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} 
                    />
                  </div>
                  {/* Add list editing if needed, or simple custom controls */}
                </>
              )}

              {selectedBlock.type === 'text' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem' }}>Heading</label>
                    <input 
                      type="text" 
                      value={selectedBlock.content.heading || ''} 
                      onChange={(e) => handleUpdateBlockContent('heading', e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem' }}>Body Text</label>
                    <textarea 
                      rows={6}
                      value={selectedBlock.content.body || ''} 
                      onChange={(e) => handleUpdateBlockContent('body', e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', resize: 'vertical' }} 
                    />
                  </div>
                </>
              )}

              {selectedBlock.type === 'faq' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem' }}>FAQ Section Title</label>
                    <input 
                      type="text" 
                      value={selectedBlock.content.title || ''} 
                      onChange={(e) => handleUpdateBlockContent('title', e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} 
                    />
                  </div>
                </>
              )}

              {selectedBlock.type === 'contact' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem' }}>Contact Title</label>
                    <input 
                      type="text" 
                      value={selectedBlock.content.title || ''} 
                      onChange={(e) => handleUpdateBlockContent('title', e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem' }}>Promo Text</label>
                    <input 
                      type="text" 
                      value={selectedBlock.content.text || ''} 
                      onChange={(e) => handleUpdateBlockContent('text', e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', background: '#26243A', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} 
                    />
                  </div>
                </>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
