import React, { useState, useEffect, useCallback, memo } from 'react';
import { X, UploadCloudIcon, Pointer, ExternalLinkIcon } from 'lucide-react';
// If you have a custom Card icon, import it here
// import { CardPropIcon } from '../../modules/projectIcons';
// import { cardStyles } from '../../modules/panelStyles';

// Minimal inline styles for demonstration
const cardStyles = {
  container: {
    padding: '1rem',
    fontFamily: 'sans-serif'
  },
  addButton: {
    background: '#237804',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.6rem',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  cardItem: {
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    padding: '0.5rem',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
    textAlign: 'center'
  },
  selectedCardItem: {
    border: '2px solid #237804',
    backgroundColor: '#fff'
  },
  cardImageThumb: {
    width: '100%',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  removeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer'
  },

  /* Live Preview styling */
  livePreviewWrapper: {
    marginTop: '1.5rem'
  },
  livePreviewCard: {
    width: '280px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  livePreviewImage: {
    width: '100%',
    height: 'auto'
  },
  livePreviewBody: {
    padding: '12px'
  },
  livePreviewText: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '12px',
    lineHeight: '1.4'
  },
  livePreviewButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    color: '#333',
    textDecoration: 'none',
    cursor: 'pointer'
  },

  /* Fields styling */
  fieldGroup: {
    marginTop: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.25rem',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '0.4rem',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  uploadArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  mediaUploadBtn: {
    cursor: 'pointer',
    border: '1px dashed #ccc',
    borderRadius: '4px',
    padding: '0.5rem'
  }
};

const CardItem = memo(({ card, isSelected, onClick, onRemove }) => {
  return (
    <div
      style={{
        ...cardStyles.cardItem,
        ...(isSelected ? cardStyles.selectedCardItem : {})
      }}
      onClick={onClick}
    >
      {card.image?.preview ? (
        <img
          src={card.image.preview}
          alt="Card"
          style={cardStyles.cardImageThumb}
        />
      ) : (
        <div
          style={{
            ...cardStyles.cardImageThumb,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999'
          }}
        >
          No Image
        </div>
      )}
      <p style={{ margin: '6px 0 0', fontSize: '12px' }}>
        {card.text ? card.text.slice(0, 30) + (card.text.length > 30 ? '...' : '') : 'No Text'}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(card.id);
        }}
        style={cardStyles.removeButton}
      >
        <X size={16} />
      </button>
    </div>
  );
});

const CardNodePropertyPanel = ({ node, setNodes }) => {
  const [cards, setCards] = useState(node.data?.cards || []);
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Fields for the currently selected card
  const [cardImage, setCardImage] = useState(null); 
  const [cardText, setCardText] = useState('');
  const [buttonType, setButtonType] = useState('url');
  const [buttonLabel, setButtonLabel] = useState('');
  const [buttonAction, setButtonAction] = useState('');

  const [activeTab, setActiveTab] = useState('options');

  useEffect(() => {
    if (node?.id) {
      setCards(node.data?.cards || []);
      // If there's at least one card, select the first
      if (node.data?.cards?.length) {
        setSelectedCardId(node.data.cards[0].id);
      } else {
        setSelectedCardId(null);
      }
    }
  }, [node?.id]);

  // Whenever the selected card changes, populate the form fields
  useEffect(() => {
    const foundCard = cards.find((c) => c.id === selectedCardId);
    if (foundCard) {
      setCardImage(foundCard.image || null);
      setCardText(foundCard.text || '');
      setButtonType(foundCard.button?.type || 'url');
      setButtonLabel(foundCard.button?.label || '');
      setButtonAction(foundCard.button?.action || '');
    }
  }, [selectedCardId, cards]);

  // Helper to update node data in React Flow
  const updateNodeData = useCallback(
    (updatedCards) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                cards: updatedCards
              }
            };
          }
          return n;
        })
      );
    },
    [node?.id, setNodes]
  );

  // --- Add, Remove, Select Cards ---
  const handleAddCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      image: null,
      text: '',
      button: {
        type: 'url',
        label: '',
        action: ''
      }
    };
    const updated = [...cards, newCard];
    setCards(updated);
    updateNodeData(updated);
    setSelectedCardId(newCard.id);
  };

  const handleRemoveCard = (cardId) => {
    const updated = cards.filter((c) => c.id !== cardId);
    setCards(updated);
    updateNodeData(updated);

    // If removing the currently selected card, reset selection
    if (cardId === selectedCardId) {
      if (updated.length > 0) {
        setSelectedCardId(updated[0].id);
      } else {
        setSelectedCardId(null);
      }
    }
  };

  const handleSelectCard = (cardId) => {
    setSelectedCardId(cardId);
  };

  // --- Form Handlers for the selected card ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve({
          file,
          preview: event.target.result,
          name: file.name,
          id: `${file.name}-${Date.now()}`
        });
      };
      reader.readAsDataURL(file);
    });

    setCardImage(imageData);

    // Update the selected card in our array
    setCards((prev) => {
      const updated = prev.map((c) => {
        if (c.id === selectedCardId) {
          return {
            ...c,
            image: imageData
          };
        }
        return c;
      });
      updateNodeData(updated);
      return updated;
    });
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCardText(newText);

    setCards((prev) => {
      const updated = prev.map((c) =>
        c.id === selectedCardId ? { ...c, text: newText } : c
      );
      updateNodeData(updated);
      return updated;
    });
  };

  const handleButtonTypeChange = (e) => {
    const newType = e.target.value;
    setButtonType(newType);

    setCards((prev) => {
      const updated = prev.map((c) =>
        c.id === selectedCardId
          ? {
              ...c,
              button: {
                ...c.button,
                type: newType
              }
            }
          : c
      );
      updateNodeData(updated);
      return updated;
    });
  };

  const handleButtonLabelChange = (e) => {
    const newLabel = e.target.value;
    setButtonLabel(newLabel);

    setCards((prev) => {
      const updated = prev.map((c) =>
        c.id === selectedCardId
          ? {
              ...c,
              button: {
                ...c.button,
                label: newLabel
              }
            }
          : c
      );
      updateNodeData(updated);
      return updated;
    });
  };

  const handleButtonActionChange = (e) => {
    const newAction = e.target.value;
    setButtonAction(newAction);

    setCards((prev) => {
      const updated = prev.map((c) =>
        c.id === selectedCardId
          ? {
              ...c,
              button: {
                ...c.button,
                action: newAction
              }
            }
          : c
      );
      updateNodeData(updated);
      return updated;
    });
  };

  return (
    <div className="properties-panel">
      {/* Tabs */}
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
            {/* Optional Card Icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Pointer size={32} color="#237804" />
              <h3 style={{ margin: 0 }}>Card Node</h3>
            </div>
            <hr />

            {/* Add Card Button */}
            <button style={cardStyles.addButton} onClick={handleAddCard}>
              + Add Card
            </button>

            {/* Cards Preview (small thumbnails) */}
            <div style={cardStyles.previewGrid}>
              {cards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  isSelected={card.id === selectedCardId}
                  onClick={() => handleSelectCard(card.id)}
                  onRemove={handleRemoveCard}
                />
              ))}
            </div>

            {/* Only show form if a card is selected */}
            {selectedCardId && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4>Edit Selected Card</h4>

                {/* Image Field */}
                <div style={cardStyles.fieldGroup}>
                  <label style={cardStyles.label}>Image</label>
                  <div style={cardStyles.uploadArea}>
                    <input
                      type="file"
                      id="card-image-file"
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="card-image-file" style={cardStyles.mediaUploadBtn}>
                      <UploadCloudIcon size={18} />
                    </label>
                    {cardImage?.preview && (
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={cardImage.preview}
                          alt="Card Preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Field */}
                <div style={cardStyles.fieldGroup}>
                  <label style={cardStyles.label}>Text</label>
                  <input
                    type="text"
                    value={cardText}
                    onChange={handleTextChange}
                    placeholder="Enter card text..."
                    style={cardStyles.input}
                  />
                </div>

                {/* Button Fields */}
                <div style={cardStyles.fieldGroup}>
                  <label style={cardStyles.label}>Button Type</label>
                  <select
                    value={buttonType}
                    onChange={handleButtonTypeChange}
                    style={cardStyles.input}
                  >
                    <option value="url">URL Button</option>
                    <option value="action">Action Button</option>
                  </select>
                </div>

                <div style={cardStyles.fieldGroup}>
                  <label style={cardStyles.label}>Button Label</label>
                  <input
                    type="text"
                    value={buttonLabel}
                    onChange={handleButtonLabelChange}
                    placeholder="e.g. Sign Up Now"
                    style={cardStyles.input}
                  />
                </div>

                <div style={cardStyles.fieldGroup}>
                  <label style={cardStyles.label}>Button Action</label>
                  <input
                    type="text"
                    value={buttonAction}
                    onChange={handleButtonActionChange}
                    placeholder="e.g. http://mywebsite.com"
                    style={cardStyles.input}
                  />
                </div>

                {/* Live Preview of the Selected Card */}
                <div style={cardStyles.livePreviewWrapper}>
                  <h4 style={{ marginBottom: '0.5rem' }}>Live Preview</h4>
                  <div style={cardStyles.livePreviewCard}>
                    {/* If no image, you could show a placeholder or keep it empty */}
                    {cardImage?.preview ? (
                      <img
                        src={cardImage.preview}
                        alt="Preview"
                        style={cardStyles.livePreviewImage}
                      />
                    ) : (
                      <div
                        style={{
                          ...cardStyles.livePreviewImage,
                          height: '180px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#eee'
                        }}
                      >
                        No Image
                      </div>
                    )}
                    <div style={cardStyles.livePreviewBody}>
                      <p style={cardStyles.livePreviewText}>
                        {cardText || 'Your card text goes here...'}
                      </p>
                      {/* Button */}
                      <button
                        style={cardStyles.livePreviewButton}
                        onClick={() => {
                          // Just for demonstration
                          if (buttonType === 'url' && buttonAction) {
                            window.open(buttonAction, '_blank');
                          }
                        }}
                      >
                        <ExternalLinkIcon size={16} />
                        {buttonLabel || 'Click Me'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
