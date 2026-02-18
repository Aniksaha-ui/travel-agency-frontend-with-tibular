import { useState, useRef } from 'react';
import './BlogBuilder.css';
import { toast } from 'react-toastify';
import AdminLayout from '../../Layout/AdminLayout';

const COMPONENT_TYPES = [
  { id: 'header', label: 'Header', icon: 'H1' },
  { id: 'subheader', label: 'Subheader', icon: 'H2' },
  { id: 'paragraph', label: 'Paragraph', icon: 'P' },
  { id: 'image', label: 'Image', icon: 'IMG' },
  { id: 'quote', label: 'Quote', icon: '""' },
  { id: 'code', label: 'Code Block', icon: '</>' },
  { id: 'highlight', label: 'Highlight', icon: '★' },
  { id: 'footer', label: 'Footer', icon: '___' }
];

const BlogBuilder = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    slug: '',
    author: '',
    publishDate: '',
    status: 'draft',
    metaDescription: '',
    coverImage: ''
  });

  const [components, setComponents] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [viewMode, setViewMode] = useState('desktop');
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('componentType', type);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    if (componentType) {
      const newComponent = {
        id: Date.now(),
        type: componentType,
        content: '',
        settings: {}
      };
      setComponents([...components, newComponent]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateComponentContent = (id, content) => {
    setComponents(
      components.map((comp) => (comp.id === id ? { ...comp, content } : comp))
    );
  };
  const updateComponentSettings = (id, setting, value) => {
    setComponents(
      components.map((comp) =>
        comp.id === id
          ? { ...comp, settings: { ...comp.settings, [setting]: value } }
          : comp
      )
    );
  };

  const removeComponent = (id) => {
    setComponents(components.filter((comp) => comp.id !== id));
  };

  const moveComponent = (dragIndex, hoverIndex) => {
    const dragComponent = components[dragIndex];
    const newComponents = [...components];
    newComponents.splice(dragIndex, 1);
    newComponents.splice(hoverIndex, 0, dragComponent);
    setComponents(newComponents);
  };

  const generateHTML = () => {
    let htmlContent = `<article class="blog-post">`;
    const getStyle = (settings) => {
        const color = settings?.color ? `color: ${settings.color};` : '';
        const bg = settings?.backgroundColor ? `background-color: ${settings.backgroundColor};` : '';
        const padding = settings?.backgroundColor ? 'padding: 10px; border-radius: 4px;' : '';
        const alignment = settings?.alignment ? `text-align: ${settings.alignment};` : '';
        return `style="${color} ${bg} ${padding} ${alignment}"`;
    };

    components.forEach((comp) => {
      const style = getStyle(comp.settings);
      switch (comp.type) {
        case 'header':
          htmlContent += `<h2 class="blog-header" ${style}>${comp.content || 'Header'}</h2>`;
          break;
        case 'subheader':
          htmlContent += `<h3 class="blog-subheader" ${style}>${comp.content || 'Subheader'}</h3>`;
          break;
        case 'paragraph':
          htmlContent += `<p class="blog-paragraph" ${style}>${comp.content ? comp.content.replace(/\n/g, '<br>') : 'Paragraph'}</p>`;
          break;
        case 'image':
           // Image itself doesn't need text color usually, but container might for caption or padding
          htmlContent += `<figure class="blog-image-wrapper" ${style}><img src="${comp.content}" alt="Blog Image" class="img-fluid rounded" /><figcaption class="text-center mt-2" style="${comp.settings?.color ? `color: ${comp.settings.color};` : ''}">${comp.settings?.caption || ''}</figcaption></figure>`;
          break;
        case 'quote':
          htmlContent += `<blockquote class="blog-quote" ${style}>${comp.content || 'Quote'}</blockquote>`;
          break;
        case 'code':
            htmlContent += `<pre class="blog-code" ${style}><code>${comp.content ? comp.content.replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'Code Block'}</code></pre>`;
            break;
        case 'highlight':
          htmlContent += `<div class="blog-highlight highlight-box" ${style}>${comp.content || 'Highlight Content'}</div>`;
          break;
        case 'footer':
          htmlContent += `<footer class="blog-footer" ${style}>${comp.content || 'Footer Content'}</footer>`;
          break;
        default:
          break;
      }
    });
    htmlContent += `</article>`;
    return htmlContent;
  };

  const handleSave = () => {
    console.log('--- Submitting Blog Data ---');
    const htmlContent = generateHTML();
    
    const payload = {
      ...blogData,
      content: htmlContent,
      components_json: JSON.stringify(components) 
    };

    console.log('1. Blog Metadata:', blogData);
    console.log('2. Components (Raw):', components);
    console.log('3. Generated HTML:', htmlContent);
    console.log('4. Final Payload:', payload);

    // Simulate API call
    toast.success('Blog saved successfully! See console for details.');
  };

  return (
    <AdminLayout>
      <div className="blog-builder-container">
      {/* Sidebar Tools */}
      <div className="sidebar">
        <h4>Tools</h4>
        <div className="d-grid gap-2">
          {COMPONENT_TYPES.map((type) => (
            <div
              key={type.id}
              className="draggable-item"
              draggable
              onDragStart={(e) => handleDragStart(e, type.id)}
            >
              <span className="me-2">{type.icon}</span> {type.label}
            </div>
          ))}
        </div>
      </div>

        {/* Main Builder Area */}
        <div className="main-content">
            <div className="row">
                {/* Editor Column */}
                <div className="col-lg-6">
                    <div className="card shadow-sm p-4 mb-4">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={blogData.title}
                                    onChange={handleInputChange}
                                    placeholder="Blog Title"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Slug</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="slug"
                                    value={blogData.slug}
                                    onChange={handleInputChange}
                                    placeholder="blog-slug"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Author</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    value={blogData.author}
                                    onChange={handleInputChange}
                                    placeholder="Author Name"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Publish Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="publishDate"
                                    value={blogData.publishDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Cover Image</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="coverImage"
                                    value={blogData.coverImage}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="canvas-area"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {components.length === 0 && (
                            <div className="text-center text-muted mt-5">
                                <h5>Drag and Drop components here</h5>
                            </div>
                        )}
                        {components.map((comp, index) => (
                            <div
                                key={comp.id}
                                className="dropped-component card mb-3"
                                draggable
                                onDragStart={() => (dragItem.current = index)}
                                onDragEnter={() => (dragOverItem.current = index)}
                                onDragEnd={() => moveComponent(dragItem.current, dragOverItem.current)}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <div className="card-body position-relative">
                                    <div className="component-controls">
                                        <div className="d-flex align-items-center gap-1 bg-white border rounded px-2 py-1 shadow-sm">
                                            {/* Alignment Controls */}
                                            <div className="btn-group btn-group-sm me-2" role="group">
                                                <button type="button" className={`btn btn-light border-0 ${comp.settings?.alignment === 'left' ? 'active' : ''}`} onClick={() => updateComponentSettings(comp.id, 'alignment', 'left')} title="Align Left"><i className="fa fa-align-left"></i></button>
                                                <button type="button" className={`btn btn-light border-0 ${comp.settings?.alignment === 'center' ? 'active' : ''}`} onClick={() => updateComponentSettings(comp.id, 'alignment', 'center')} title="Align Center"><i className="fa fa-align-center"></i></button>
                                                <button type="button" className={`btn btn-light border-0 ${comp.settings?.alignment === 'right' ? 'active' : ''}`} onClick={() => updateComponentSettings(comp.id, 'alignment', 'right')} title="Align Right"><i className="fa fa-align-right"></i></button>
                                            </div>
                                            <div className="vr me-2"></div>

                                            <span className="text-muted small me-1">Txt</span>
                                            <input
                                                type="color"
                                                className="form-control form-control-color p-0 border-0"
                                                title="Text Color"
                                                value={comp.settings?.color || '#000000'}
                                                onChange={(e) => updateComponentSettings(comp.id, 'color', e.target.value)}
                                                style={{ width: '25px', height: '25px' }}
                                            />
                                            <span className="text-muted small ms-2 me-1">Bg</span>
                                            <input
                                                type="color"
                                                className="form-control form-control-color p-0 border-0"
                                                title="Background Color"
                                                value={comp.settings?.backgroundColor || '#ffffff'}
                                                onChange={(e) => updateComponentSettings(comp.id, 'backgroundColor', e.target.value)}
                                                style={{ width: '25px', height: '25px' }}
                                            />
                                            <div className="vr mx-2"></div>
                                            <button
                                                className="btn btn-sm text-danger p-0"
                                                onClick={() => removeComponent(comp.id)}
                                                title="Remove"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                            <span className="badge bg-light text-dark border ms-2" style={{ fontSize: '0.7rem' }}>{comp.type}</span>
                                        </div>
                                    </div>

                                    {/* Component Inputs */}
                                    {comp.type === 'header' && (
                                        <input
                                            type="text"
                                            className="form-control form-control-lg fw-bold"
                                            placeholder="Enter Header Text"
                                            value={comp.content}
                                            onChange={(e) => updateComponentContent(comp.id, e.target.value)}
                                        />
                                    )}
                                    {comp.type === 'subheader' && (
                                        <input
                                            type="text"
                                            className="form-control form-control fw-bold"
                                            placeholder="Enter Subheader Text"
                                            value={comp.content}
                                            onChange={(e) => updateComponentContent(comp.id, e.target.value)}
                                        />
                                    )}
                                    {comp.type === 'paragraph' && (
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            placeholder="Enter paragraph text..."
                                            value={comp.content}
                                            onChange={(e) => updateComponentContent(comp.id, e.target.value)}
                                        ></textarea>
                                    )}
                                    {comp.type === 'quote' && (
                                        <textarea
                                            className="form-control fst-italic text-center"
                                            rows="3"
                                            placeholder="Enter quote..."
                                            value={comp.content}
                                            onChange={(e) => updateComponentContent(comp.id, e.target.value)}
                                        ></textarea>
                                    )}
                                    {comp.type === 'code' && (
                                        <textarea
                                            className="form-control font-monospace bg-dark text-light"
                                            rows="5"
                                            placeholder="Enter code snippet..."
                                            value={comp.content}
                                            onChange={(e) => updateComponentContent(comp.id, e.target.value)}
                                        ></textarea>
                                    )}
                                    {comp.type === 'highlight' && (
                                        <div className="bg-light p-3 border-start border-primary border-5">
                                            <textarea
                                                className="form-control bg-transparent border-0"
                                                rows="3"
                                                placeholder="Enter highlighted content..."
                                                value={comp.content}
                                                onChange={(e) => updateComponentContent(comp.id, e.target.value)}
                                            ></textarea>
                                        </div>
                                    )}
                                    {comp.type === 'image' && (
                                        <div>
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                placeholder="Image URL"
                                                value={comp.content}
                                                onChange={(e) => updateComponentContent(comp.id, e.target.value)}
                                            />
                                            {comp.content && <img src={comp.content} alt="Preview" style={{ maxHeight: '200px' }} className="img-fluid rounded" />}
                                        </div>
                                    )}
                                    {comp.type === 'footer' && (
                                        <input
                                            type="text"
                                            className="form-control text-muted"
                                            placeholder="Footer Notes"
                                            value={comp.content}
                                            onChange={(e) => updateComponentContent(comp.id, e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                     <div className="mt-3">
                         <button className="btn btn-primary" onClick={handleSave}>Save Blog</button>
                     </div>
                </div>

                {/* Preview Column */}
                <div className="col-lg-6">
                    <div className="sticky-top" style={{top: '20px', zIndex: 100}}>
                        <div className={`preview-container bg-white rounded shadow-sm border ${viewMode === 'mobile' ? 'mobile-view' : ''}`} style={{maxHeight: 'calc(100vh - 40px)', overflowY: 'auto', padding: '2rem', transition: 'all 0.3s ease'}}>
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
                                <h5 className="text-muted mb-0">Live Preview</h5>
                                <div className="btn-group">
                                    <button 
                                        className={`btn btn-sm btn-outline-secondary ${viewMode === 'desktop' ? 'active' : ''}`} 
                                        onClick={() => setViewMode('desktop')}
                                        title="Desktop View"
                                    >
                                        <i className="fa fa-desktop"></i>
                                    </button>
                                    <button 
                                        className={`btn btn-sm btn-outline-secondary ${viewMode === 'mobile' ? 'active' : ''}`} 
                                        onClick={() => setViewMode('mobile')}
                                        title="Mobile View"
                                    >
                                        <i className="fa fa-mobile"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="preview-header border-bottom pb-4 mb-4">
                                <div className="preview-meta text-uppercase tracking-wider mb-2">
                                     <span className="badge bg-primary-lt">{blogData.status}</span>
                                     <span className="mx-2 text-muted">|</span>
                                     <span>{blogData.publishDate}</span>
                                </div>
                                <h1>{blogData.title || 'Your Blog Title'}</h1>
                                <p className="text-muted fst-italic mt-2">By {blogData.author || 'Author Name'}</p>
                                {blogData.coverImage && <img src={blogData.coverImage} alt="Cover" className="img-fluid rounded mb-3" />}
                            </div>
                             <div className="preview-body" dangerouslySetInnerHTML={{ __html: generateHTML() }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogBuilder;
