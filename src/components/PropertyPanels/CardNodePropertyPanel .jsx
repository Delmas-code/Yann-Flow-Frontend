import React, { useState, useEffect, useCallback, memo } from 'react';
import { X, UploadCloudIcon, BookImage } from 'lucide-react';
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
import defaultCardImage from '../../assets/default-card-img.jpg';

const cardStyles = {
  container: {
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '16px'
  },
  section: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#4B5563',
    marginBottom: '4px',
    fontFamily: 'Outfit'
  },
  inputGroup: {
    marginBottom: '12px'
  },
  input: {
    width: '90%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'Outfit'
  },
  previewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '15px',
    // padding: '10px',
    backgroundColor: '#f0f0f0', // WhatsApp chat background color
    borderRadius: '8px',
    minHeight: '200px'
  },
  uploadArea: {
    border: '2px solid #ddd',
    padding: '14px',
    marginBottom: '16px'
  },
  
  editorContainer: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  editor: {
    height: '70px',
    resize: 'vertical',
    overflow: 'auto',
    padding: '10px',
  },
  addButton: {
    marginTop: '12px',
    height: '30%',
    backgroundColor: '#fff',
    color: '#237804',
    border: '1px solid #237804',
    padding: '6px 10px',
    cursor: 'pointer',
  },
  previewContainer: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '10px',
    backgroundColor: '#e7f7d4', // WhatsApp light green
    maxWidth: '90%',
    border: '1px solid #ddd',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  imagePreviewContainer: {
    width: '100%',
    height: '140px',
    overflow: 'hidden',
    position: 'relative'
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  textPreview: {
    padding: '12px',
    fontSize: '14px',
    color: '#333'
  },
  buttonPreview: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(29, 29, 29, 0.25)',
    borderRadius: '2px',
    color: '#7BB9FE',
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Outfit',
    width: 'auto',
    background: 'transparent',
    cursor: 'pointer',
    padding: '8px 12px',
    margin: '12px'
  },
  removeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    zIndex: 10
  },
  selectButton: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    zIndex: 10
  },
  labelInput: {
    display: 'flex',
    gap: '20px',
    marginBottom: '7px',
  },
  actionInput: {
    display: 'flex',
    marginBottom: '7px'
  },
  p: {
    paddingRight: '13px',
  },
  selectedCard: {
    border: '2px solid #3b82f6',
  }
};

// Memoized card preview component
const CardPreview = memo(({ card, onRemove, onSelect, isSelected }) => (
  <>
    <div 
      style={{
        position: 'relative',
        borderRadius: '3px',
        overflow: 'hidden',
        backgroundColor: '#e7f7d4', // WhatsApp light green
        maxWidth: '100%',
        marginLeft: 'auto', // Align to right
        marginRight: '0',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        border: isSelected ? '2px solid #3b82f6' : 'none'
      }}
      onClick={() => onSelect(card.id)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(card.id);
        }}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          backgroundColor: 'rgba(239, 68, 68, 0.9)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
          zIndex: 10
        }}
      >
        <X size={16} />
      </button>
      
      {card.image && (
        <div style={{
          width: '100%',
          height: '160px',
          overflow: 'hidden'
        }}>
          <img
            src={card.image.preview}
            alt={card.image.name || "Card image"}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}
      
      <div style={{
        padding: '12px 16px',
        fontSize: '14px',
        color: '#303030',
        lineHeight: '1.5',
        wordWrap: 'break-word'
      }}>
        {card.text || "Welcome to our exclusive group! We share daily tips and insights for people who know exactly what they want in life."}
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
      {card.button && (

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
            {card.button.type === 'url' && (
              <ExternalLinkIcon />
            )}
            {card.button.label || "Sign Up Now"}
          </button>

          {/* <button
            onClick={() => handleRemoveButton(b.id)}
            style={buttonStyles.removeButton}
          >
            <X size={16} />
          </button> */}
        </div>
      )}
    </div>
  </>
));

const CardNodePropertyPanel = ({ node, setNodes }) => {
  const [activeTab, setActiveTab] = useState('options');
  const [cards, setCards] = useState(node.data?.cards || []);
  const [selectedCardId, setSelectedCardId] = useState(null);
  
  // Form state
  const [currentImage, setCurrentImage] = useState(null);
  const [currentText, setCurrentText] = useState('');
  const [buttonLabel, setButtonLabel] = useState('');
  const [buttonAction, setButtonAction] = useState('');
  const [buttonType, setButtonType] = useState('action');
  
  // Editor state for rich text
  const [editorState, setEditorState] = useState(null);
  
  // Initialize or update local state when node changes
  useEffect(() => {
    console.log('Node changed, updating cards:', node?.data?.cards);
    
    if (node?.id) {
      const nodeCards = node.data?.cards || [];
      console.log('Setting cards from node data:', nodeCards);
      setCards(nodeCards);
      
      // Select the first card by default if available and none is selected
      if (nodeCards.length > 0 && !selectedCardId) {
        console.log('Selecting first card:', nodeCards[0].id);
        setSelectedCardId(nodeCards[0].id);
      }
    }
  }, [node?.id]);

  // Update form fields when selected card changes
  useEffect(() => {
    console.log('Selected card changed to:', selectedCardId);
    
    if (selectedCardId) {
      const selectedCard = cards.find(card => card.id === selectedCardId);
      console.log('Found selected card:', selectedCard);
      
      if (selectedCard) {
        setCurrentImage(selectedCard.image || null);
        setCurrentText(selectedCard.text || '');
        
        if (selectedCard.button) {
          setButtonLabel(selectedCard.button.label || '');
          setButtonAction(selectedCard.button.action || '');
          setButtonType(selectedCard.button.type || 'action');
        } else {
          setButtonLabel('');
          setButtonAction('');
          setButtonType('action');
        }
      }
    }
  }, [selectedCardId, cards]);
  
  // Update node data
  const updateNodeData = useCallback((updatedCards) => {
    console.log('Updating node data with cards:', updatedCards);
    
    setNodes(nds => {
      const newNodes = nds.map(n => {
        if (n.id === node.id) {
          console.log('Found matching node, updating data');
          return {
            ...n,
            data: {
              ...n.data,
              cards: updatedCards
            }
          };
        }
        return n;
      });
      
      console.log('New nodes after update:', newNodes);
      return newNodes;
    });
  }, [node?.id, setNodes]);
  
  // Handle image upload
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage = {
        file,
        preview: e.target.result,
        name: file.name,
        id: `${file.name}-${Date.now()}`
      };
      
      setCurrentImage(newImage);
      
      // Update the selected card with the new image
      if (selectedCardId) {
        updateCard(selectedCardId, { image: newImage });
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Handle text editor changes
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    
    // Get HTML and plain text from editor
    editorState.read(() => {
      const textContent = document.querySelector('.editor-content')?.textContent || '';
      setCurrentText(textContent);
      
      // Update the selected card with the new text
      if (selectedCardId) {
        updateCard(selectedCardId, { text: textContent });
      }
    });
  };
  
  // Handle button changes
  const handleButtonLabelChange = (e) => {
    const newLabel = e.target.value;
    setButtonLabel(newLabel);
    
    if (selectedCardId) {
      updateCard(selectedCardId, { 
        button: { 
          ...cards.find(c => c.id === selectedCardId).button,
          label: newLabel
        } 
      });
    }
  };
  
  const handleButtonActionChange = (e) => {
    const newAction = e.target.value;
    setButtonAction(newAction);
    
    if (selectedCardId) {
      updateCard(selectedCardId, { 
        button: { 
          ...cards.find(c => c.id === selectedCardId).button,
          action: newAction
        } 
      });
    }
  };
  
  const handleButtonTypeChange = (e) => {
    const newType = e.target.value;
    setButtonType(newType);
    
    if (selectedCardId) {
      updateCard(selectedCardId, { 
        button: { 
          ...cards.find(c => c.id === selectedCardId).button,
          type: newType
        } 
      });
    }
  };
  
  // Update a specific card
  const updateCard = (cardId, updates) => {
    setCards(prevCards => {
      const updatedCards = prevCards.map(card => {
        if (card.id === cardId) {
          // For button updates, we need to handle the nested structure
          if (updates.button) {
            return {
              ...card,
              button: {
                ...(card.button || {}),
                ...updates.button
              }
            };
          }
          
          // For other updates
          return { ...card, ...updates };
        }
        return card;
      });
      
      updateNodeData(updatedCards);
      return updatedCards;
    });
  };
  
  // Add a new card

  const handleAddCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      image: {
        preview: defaultCardImage,
        name: "Default Image",
        id: `default-image-${Date.now()}`
      },
      text: 'Welcome to our exclusive group! We share daily tips and insights for people who know exactly what they want in life.',
      button: {
        type: 'url',
        label: 'Sign Up Now',
        action: 'https://example.com/signup'
      }
    };
    
    // Create new array with the new card added
    const updatedCards = [...cards, newCard];
    
    // Update local state
    setCards(updatedCards);
    
    // Update node data in the parent component
    updateNodeData(updatedCards);
    
    // Select the newly created card
    setSelectedCardId(newCard.id);
  };

  // Remove a card
  const handleRemoveCard = (cardId) => {
    setCards(prevCards => {
      const updatedCards = prevCards.filter(card => card.id !== cardId);
      updateNodeData(updatedCards);
      
      // If we removed the selected card, select another one
      if (cardId === selectedCardId) {
        if (updatedCards.length > 0) {
          setSelectedCardId(updatedCards[0].id);
        } else {
          setSelectedCardId(null);
        }
      }
      
      return updatedCards;
    });
  };
  
  // Select a card for editing
  const handleSelectCard = (cardId) => {
    setSelectedCardId(cardId);
  };
  
  // Lexical editor configuration
  const editorConfig = {
    namespace: 'CardNodeEditor',
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
      cards.forEach(card => {
        if (card.image && card.image.preview) {
          URL.revokeObjectURL(card.image.preview);
        }
      });
    };
  }, []);

  
  const renderPreviewSection = () => (
    <div style={cardStyles.section}>
      <p>Preview</p>
      <div style={cardStyles.previewList}>
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <CardPreview 
              key={card.id}
              card={card}
              onRemove={handleRemoveCard}
              onSelect={handleSelectCard}
              isSelected={card.id === selectedCardId}
            />
          ))
        ) : (
          <p style={{textAlign: 'center', color: '#666'}}>
            No cards added yet. Click the "+" button to add a card.
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
          <div style={cardStyles.container}>
            {/* Panel Header */}
            <div style={{ width: "50px", height: "50px" }}>
              {/* Replace with your card icon component */}
              <BookImage size={40} color='#237804'/>
            </div>
            
            <hr/>
            <div style={{display: 'flex', marginBottom: '20px', justifyContent: 'space-between'}}>
              <p>Card</p>
              <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Add button clicked');
                    handleAddCard();
                  }}
                  style={cardStyles.addButton}
                >
                  +
                </button>

            </div>
            
            {/* Content sections - only shown if a card is selected */}
            {selectedCardId && (
              <>
                {/* Header (Image) Section */}
                <div style={cardStyles.section}>
                  <p>Header (Image or video)</p>
                  <div style={cardStyles.uploadArea}>
                    <input 
                      className='media-upload-section'
                      type="file"
                      onChange={handleFileSelect}
                      id="card-media-file"
                      // accept="image/*"
                    />
                    <label className="media-upload" htmlFor="card-media-file" style={{width: 'auto'}}>
                      <UploadCloudIcon size={24} strokeWidth={1.5} />
                    </label>
                  </div>
                </div>
                
                {/* Body (Text) Section */}
                <div style={cardStyles.section}>
                  <p>Body</p>
                  <div style={cardStyles.editorContainer}>
                    <LexicalComposer initialConfig={editorConfig}>
                      <div className="editor-container">
                        <ToolbarPlugin />
                        <div style={cardStyles.editor}>
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
                <div style={cardStyles.section}>
                  <p>Button</p>
                  <div style={cardStyles.inputGroup}>
                    <select
                      value={buttonType}
                      style={cardStyles.input}
                      onChange={handleButtonTypeChange}
                    >
                      <option value="action">Action Button</option>
                      <option value="url">URL Button</option>
                    </select>
                  </div>
                  
                  <div>
                    <div style={cardStyles.labelInput}>
                      <p>Label</p>
                      <input
                        type="text"
                        placeholder="Reply"
                        value={buttonLabel}
                        onChange={handleButtonLabelChange}
                        style={cardStyles.input}
                      />
                    </div>
                    <div style={cardStyles.actionInput}>
                      <p style={cardStyles.p}>Action</p>
                      <input
                        type="text"
                        placeholder="http://mywebsite.com"
                        value={buttonAction}
                        onChange={handleButtonActionChange}
                        style={cardStyles.input}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            

            {/* Card Previews */}
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

export default CardNodePropertyPanel;