import React, { useState, useEffect, useCallback, memo } from 'react';
import { X, UploadCloudIcon, GalleryHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import ToolbarPlugin from '../../editor/ToolbarPlugin';
import { ExternalLinkIcon } from '../../modules/projectIcons';
import defaultCarouselImage from '../../assets/default-card-img.jpg';
import { carouselStyles } from '../../modules/panelStyles';
import { CarouselPropIcon } from '../../modules/projectIcons';


// CarouselMediaDisplay component
const CarouselMediaDisplay = memo(({ mediaFiles, activeIndex, onNext, onPrev }) => {
  const hasNext = activeIndex < mediaFiles.length - 1;
  const hasPrev = activeIndex > 0;
  
  const currentMedia = mediaFiles[activeIndex];
  const isVideo = currentMedia?.file?.type?.startsWith('video/') ||
                 currentMedia?.name?.match(/\.(mp4|webm|ogg|mov)$/i) ||
                 currentMedia?.preview?.match(/\.(mp4|webm|ogg|mov)$/i);
  
  return (
    <div style={carouselStyles.carouselContainer}>
      {isVideo ? (
        <div style={carouselStyles.videoContainer}>
          <video
            src={currentMedia.preview}
            style={carouselStyles.video}
            controls
            preload="metadata"
          />
        </div>
      ) : (
        <img
          src={currentMedia.preview}
          alt={currentMedia.name || "Carousel image"}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}
      
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        style={{
          ...carouselStyles.navigationButton,
          ...carouselStyles.prevButton,
          ...(hasPrev ? {} : carouselStyles.navigationButtonDisabled)
        }}
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={onNext}
        disabled={!hasNext}
        style={{
          ...carouselStyles.navigationButton,
          ...carouselStyles.nextButton,
          ...(hasNext ? {} : carouselStyles.navigationButtonDisabled)
        }}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
});

// CarouselPreview component
const CarouselPreview = memo(({ carousel, onRemove, onSelect, isSelected }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  
  const handleNext = (e) => {
    e.stopPropagation();
    if (activeMediaIndex < carousel.mediaFiles.length - 1) {
      setActiveMediaIndex(prevIndex => prevIndex + 1);
    }
  };
  
  const handlePrev = (e) => {
    e.stopPropagation();
    if (activeMediaIndex > 0) {
      setActiveMediaIndex(prevIndex => prevIndex - 1);
    }
  };
  
  return (
    <>
      <div 
        style={{
          position: 'relative',
          borderRadius: '3px',
          overflow: 'hidden',
          backgroundColor: '#e7f7d4',
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: '0',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          border: isSelected ? '2px solid #3b82f6' : 'none'
        }}
        onClick={() => onSelect(carousel.id)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(carousel.id);
          }}
          style={carouselStyles.removeButton}
        >
          <X size={16} />
        </button>
        
        {carousel.mediaFiles && carousel.mediaFiles.length > 0 && (
          <CarouselMediaDisplay 
            mediaFiles={carousel.mediaFiles}
            activeIndex={activeMediaIndex}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
        
        <div style={{
          padding: '12px 16px',
          fontSize: '14px',
          color: '#303030',
          lineHeight: '1.5',
          wordWrap: 'break-word'
        }}>
          {carousel.text || "Welcome to our exclusive group! We share daily tips and insights for people who know exactly what they want in life."}
        </div>
        
        {/* WhatsApp style time stamp and check marks */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 12px 8px',
          fontSize: '12px',
          color: '#8D8D8D'
        }}>
          {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          <span style={{marginLeft: '4px'}}>✓✓</span>
        </div>
      </div>

      <div>
        {carousel.button && (
          <div>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(29, 29, 29, 0.25)',
                borderRadius: '2px',
                color: '#7BB9FE',
                fontSize: '14px',
                fontWeight: 400,
                fontFamily: 'Outfit',
                width: '100%',
                background: 'transparent',
                cursor: 'pointer',
                padding: '8px 12px',
                marginTop: '-7px',
                marginBottom: '12px',
              }}
            >
              {carousel.button.type === 'url' && (
                <ExternalLinkIcon />
              )}
              {carousel.button.label || "Sign Up Now"}
            </button>
          </div>
        )}
      </div>
    </>
  );
});

const CarouselNodePropertyPanel = ({ node, setNodes }) => {
  const [activeTab, setActiveTab] = useState('options');
  const [carousels, setCarousels] = useState(node.data?.carousels || []);
  const [selectedCarouselId, setSelectedCarouselId] = useState(null);
  
  // Form state
  const [currentMediaFiles, setCurrentMediaFiles] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [buttonLabel, setButtonLabel] = useState('');
  const [buttonAction, setButtonAction] = useState('');
  const [buttonType, setButtonType] = useState('action');
  
  // Editor state for rich text
  const [editorState, setEditorState] = useState(null);
  
  // Initialize or update local state when node changes
  useEffect(() => {
    console.log('Node changed, updating carousels:', node?.data?.carousels);
    
    if (node?.id) {
      const nodeCarousels = node.data?.carousels || [];
      
      // Convert old format (single media) to new format (multiple mediaFiles) if needed
      const updatedCarousels = nodeCarousels.map(carousel => {
        if (!carousel.mediaFiles) {
          const mediaFiles = [];
          if (carousel.media) {
            mediaFiles.push(carousel.media);
          } else if (carousel.image) {
            mediaFiles.push(carousel.image);
          }
          return {
            ...carousel,
            mediaFiles
          };
        }
        return carousel;
      });
      
      console.log('Setting carousels from node data:', updatedCarousels);
      setCarousels(updatedCarousels);
      
      // Select the first carousel by default if available and none is selected
      if (updatedCarousels.length > 0 && !selectedCarouselId) {
        console.log('Selecting first carousel:', updatedCarousels[0].id);
        setSelectedCarouselId(updatedCarousels[0].id);
      }
    }
  }, [node?.id]);

  // Update form fields when selected carousel changes
  useEffect(() => {
    console.log('Selected carousel changed to:', selectedCarouselId);
    
    if (selectedCarouselId) {
      const selectedCarousel = carousels.find(carousel => carousel.id === selectedCarouselId);
      console.log('Found selected carousel:', selectedCarousel);
      
      if (selectedCarousel) {
        setCurrentMediaFiles(selectedCarousel.mediaFiles || []);
        setCurrentText(selectedCarousel.text || '');
        
        if (selectedCarousel.button) {
          setButtonLabel(selectedCarousel.button.label || '');
          setButtonAction(selectedCarousel.button.action || '');
          setButtonType(selectedCarousel.button.type || 'action');
        } else {
          setButtonLabel('');
          setButtonAction('');
          setButtonType('action');
        }
      }
    }
  }, [selectedCarouselId, carousels]);
  
  // Update node data
  const updateNodeData = useCallback((updatedCarousels) => {
    console.log('Updating node data with carousels:', updatedCarousels);
    
    setNodes(nds => {
      const newNodes = nds.map(n => {
        if (n.id === node.id) {
          console.log('Found matching node, updating data');
          return {
            ...n,
            data: {
              ...n.data,
              carousels: updatedCarousels
            }
          };
        }
        return n;
      });
      
      console.log('New nodes after update:', newNodes);
      return newNodes;
    });
  }, [node?.id, setNodes]);
  
  // Handle media (image or video) upload
  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // Process each file
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const isVideo = file.type.startsWith('video/');
        const newMedia = {
          file,
          preview: e.target.result,
          name: file.name,
          id: `${file.name}-${Date.now()}`,
          type: isVideo ? 'video' : 'image'
        };
        
        setCurrentMediaFiles(prevFiles => [...prevFiles, newMedia]);
        
        // Update the selected carousel with the new media
        if (selectedCarouselId) {
          updateCarousel(selectedCarouselId, { 
            mediaFiles: [...currentMediaFiles, newMedia]
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  // Remove a media file
  const handleRemoveMedia = (mediaId) => {
    if (selectedCarouselId) {
      const updatedMediaFiles = currentMediaFiles.filter(media => media.id !== mediaId);
      setCurrentMediaFiles(updatedMediaFiles);
      
      updateCarousel(selectedCarouselId, { 
        mediaFiles: updatedMediaFiles
      });
    }
  };
  
  // Handle text editor changes
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    
    // Get HTML and plain text from editor
    editorState.read(() => {
      const textContent = document.querySelector('.editor-content')?.textContent || '';
      setCurrentText(textContent);
      
      // Update the selected carousel with the new text
      if (selectedCarouselId) {
        updateCarousel(selectedCarouselId, { text: textContent });
      }
    });
  };
  
  // Handle button changes
  const handleButtonLabelChange = (e) => {
    const newLabel = e.target.value;
    setButtonLabel(newLabel);
    
    if (selectedCarouselId) {
      updateCarousel(selectedCarouselId, { 
        button: { 
          ...carousels.find(c => c.id === selectedCarouselId)?.button,
          label: newLabel
        } 
      });
    }
  };
  
  const handleButtonActionChange = (e) => {
    const newAction = e.target.value;
    setButtonAction(newAction);
    
    if (selectedCarouselId) {
      updateCarousel(selectedCarouselId, { 
        button: { 
          ...carousels.find(c => c.id === selectedCarouselId)?.button,
          action: newAction
        } 
      });
    }
  };
  
  const handleButtonTypeChange = (e) => {
    const newType = e.target.value;
    setButtonType(newType);
    
    if (selectedCarouselId) {
      updateCarousel(selectedCarouselId, { 
        button: { 
          ...carousels.find(c => c.id === selectedCarouselId)?.button,
          type: newType
        } 
      });
    }
  };
  
  // Update a specific carousel
  const updateCarousel = (carouselId, updates) => {
    setCarousels(prevCarousels => {
      const updatedCarousels = prevCarousels.map(carousel => {
        if (carousel.id === carouselId) {
          // For button updates, we need to handle the nested structure
          if (updates.button) {
            return {
              ...carousel,
              button: {
                ...(carousel.button || {}),
                ...updates.button
              }
            };
          }
          
          // For other updates
          return { ...carousel, ...updates };
        }
        return carousel;
      });
      
      updateNodeData(updatedCarousels);
      return updatedCarousels;
    });
  };
  
  // Add a new carousel
  const handleAddCarousel = () => {
    const newCarousel = {
      id: `carousel-${Date.now()}`,
      mediaFiles: [{
        preview: defaultCarouselImage,
        name: "Default Image",
        id: `default-image-${Date.now()}`,
        type: 'image'
      }],
      text: 'Welcome to our exclusive group! We share daily tips and insights for people who know exactly what they want in life.',
      button: {
        type: 'url',
        label: 'Sign Up Now',
        action: 'https://example.com/signup'
      }
    };
    
    // Create new array with the new carousel added
    const updatedCarousels = [...carousels, newCarousel];
    
    // Update local state
    setCarousels(updatedCarousels);
    
    // Update node data in the parent component
    updateNodeData(updatedCarousels);
    
    // Select the newly created carousel
    setSelectedCarouselId(newCarousel.id);
  };

  // Remove a carousel
  const handleRemoveCarousel = (carouselId) => {
    setCarousels(prevCarousels => {
      const updatedCarousels = prevCarousels.filter(carousel => carousel.id !== carouselId);
      updateNodeData(updatedCarousels);
      
      // If we removed the selected carousel, select another one
      if (carouselId === selectedCarouselId) {
        if (updatedCarousels.length > 0) {
          setSelectedCarouselId(updatedCarousels[0].id);
        } else {
          setSelectedCarouselId(null);
        }
      }
      
      return updatedCarousels;
    });
  };
  
  // Select a carousel for editing
  const handleSelectCarousel = (carouselId) => {
    setSelectedCarouselId(carouselId);
  };
  
  // Lexical editor configuration
  const editorConfig = {
    namespace: 'CarouselNodeEditor',
    theme: {
      root: 'editor-root',
      text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
        underline: 'editor-text-underline',
      },
    },
    onError: (error) => console.error(error),
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      TableNode,
      TableCellNode,
      TableRowNode
    ]
  };
  
  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      carousels.forEach(carousel => {
        if (carousel.mediaFiles) {
          carousel.mediaFiles.forEach(media => {
            if (media.preview) {
              URL.revokeObjectURL(media.preview);
            }
          });
        }
      });
    };
  }, []);

  // Render media thumbnails
  const renderMediaThumbnails = () => {
    if (!currentMediaFiles || currentMediaFiles.length === 0) {
      return (
        <p style={{ color: '#666', fontSize: '14px' }}>
          No media files added yet.
        </p>
      );
    }
    
    return (
      <div style={carouselStyles.mediaUploadList}>
        {currentMediaFiles.map((media) => (
          <div key={media.id} style={carouselStyles.mediaUploadItem}>
            {media.type === 'video' ? (
              <video
                src={media.preview}
                style={carouselStyles.mediaPreviewThumbnail}
              />
            ) : (
              <img
                src={media.preview}
                alt={media.name}
                style={carouselStyles.mediaPreviewThumbnail}
              />
            )}
            <button
              onClick={() => handleRemoveMedia(media.id)}
              style={carouselStyles.removeMediaButton}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  const renderPreviewSection = () => (
    <div style={carouselStyles.section}>
      <p style={{ paddingLeft: 0, fontSize: '18px'}}>Preview</p>
      <div style={carouselStyles.previewList}>
        {carousels && carousels.length > 0 ? (
          carousels.map((carousel) => (
            <CarouselPreview 
              key={carousel.id}
              carousel={carousel}
              onRemove={handleRemoveCarousel}
              onSelect={handleSelectCarousel}
              isSelected={carousel.id === selectedCarouselId}
            />
          ))
        ) : (
          <p style={{textAlign: 'center', color: '#666', fontSize: '17px'}}>
            No carousels added yet. Click the "+" button to add a carousel.
          </p>
        )}
      </div>
    </div>
  );

  
  return (
    <div className="properties-panel">
      {/* Tab Navigation */}
      <div className="property-panel-tabs">
        <button
          className={`tab ${activeTab === 'options' ? 'active' : ''}`}
          onClick={() => setActiveTab('options')}
        >
          Options
        </button>
        
        <button
          className={`tab ${activeTab === 'sandbox' ? 'active' : ''}`}
          onClick={() => setActiveTab('sandbox')}
        >
          Sandbox
        </button>
      </div>
      
      <div className="property-panel-content">
        {activeTab === 'options' ? (
          <div style={carouselStyles.container}>
            {/* Panel Header */}
            <div style={{display: "flex"}}>
              <div style={{ width: "32px", height: "32px",  }}>
                  <CarouselPropIcon />
              </div>
              <p>Carousel</p>
            </div>
            
            <hr/>
            <div style={{display: 'flex', marginBottom: '20px', justifyContent: 'space-between'}}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Add button clicked');
                  handleAddCarousel();
                }}
                style={carouselStyles.addButton}
              >
                +
              </button>
            </div>
            
            {/* Content sections - only shown if a carousel is selected */}
            {selectedCarouselId && (
              <>
                {/* Header (Multiple Images/Videos) Section */}
                <div style={carouselStyles.section}>
                  <p style={{paddingLeft: 0, fontSize: '18px'}}>Header (Image or video)</p>
                  <div style={carouselStyles.uploadArea}>
                    <input 
                      className='media-upload-section'
                      type="file"
                      onChange={handleFileSelect}
                      id="carousel-media-file"
                      accept="image/*,video/*"
                      multiple // Allow multiple file selection
                    />
                    <label className="media-upload" htmlFor="carousel-media-file" style={{width: 'auto'}}>
                      <UploadCloudIcon size={24} strokeWidth={1.5} />
                    </label>
                    
                    {/* Media Thumbnails */}
                    {renderMediaThumbnails()}
                  </div>
                </div>
                
                {/* Body (Text) Section */}
                <div style={carouselStyles.section}>
                  <p style={{paddingLeft: 0, fontSize: '18px'}} >Body</p>
                  <div style={carouselStyles.editorContainer}>
                    <LexicalComposer initialConfig={editorConfig}>
                      <div className="editor-container">
                        <ToolbarPlugin />
                        <div style={carouselStyles.editor}>
                          <RichTextPlugin
                            contentEditable={<ContentEditable className="editor-content" />}
                            ErrorBoundary={LexicalErrorBoundary}
                          />
                          <HistoryPlugin />
                          <AutoFocusPlugin />
                          <ListPlugin />
                          <LinkPlugin />
                          <OnChangePlugin onChange={handleEditorChange} />
                        </div>
                      </div>
                    </LexicalComposer>
                  </div>
                </div>
                
                {/* Button Section */}
                <div style={carouselStyles.section}>
                  <p style={{paddingLeft: 0, fontSize: '18px'}} >Button</p>
                  <div style={carouselStyles.inputGroup}>
                    <select
                      value={buttonType}
                      style={carouselStyles.input}
                      onChange={handleButtonTypeChange}
                    >
                      <option value="action">Action Button</option>
                      <option value="url">URL Button</option>
                    </select>
                  </div>
                  
                  <div>
                    <div style={carouselStyles.labelInput}>
                      <p style={{ fontSize: '15px' }} >Label</p>
                      <input
                        type="text"
                        placeholder="Reply"
                        value={buttonLabel}
                        onChange={handleButtonLabelChange}
                        style={carouselStyles.input}
                      />
                    </div>
                    <div style={carouselStyles.actionInput}>
                      <p style={carouselStyles.p}>Action</p>
                      <input
                        type="text"
                        placeholder="http://mywebsite.com"
                        value={buttonAction}
                        onChange={handleButtonActionChange}
                        style={carouselStyles.input}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Carousel Previews */}
            {renderPreviewSection()}
          </div>

        ) : (
            <div className="sandbox-tab">
              <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Connected Apps</h3>
              
              <p style={{ color: '#666', fontSize: '14px' }}>
                No Sandbox environment connected yet. You'll be able to test integrations here in the future.
              </p>
              
              <button
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '15px'
                }}
                disabled
              >
                Add Sandbox (Coming Soon)
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default CarouselNodePropertyPanel;