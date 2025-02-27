import React, { useState, useEffect, useCallback } from 'react';
import { X, Pointer } from 'lucide-react';
import { ExternalLinkIcon } from '../../modules/projectIcons';
import { buttonStyles } from '../../modules/panelStyles';

const ButtonNodePropertyPanel = ({ node, setNodes }) => {
  const [activeTab, setActiveTab] = useState('options');
  const [buttons, setButtons] = useState(node.data?.buttons || []);
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  const [type, setType] = useState('action');
  const [label, setLabel] = useState('');
  const [action, setAction] = useState('');

  useEffect(() => {
    if (node?.id) {
      setButtons(node.data?.buttons || []);
    }
  }, [node?.id]);

  // Ensure we have a selected button (default to first if none selected)
  useEffect(() => {
    if (buttons.length > 0 && !selectedButtonId) {
      setSelectedButtonId(buttons[0].id);
    }
  }, [buttons, selectedButtonId]);

  // Whenever the selected button changes, populate the form fields
  useEffect(() => {
    const sb = buttons.find((b) => b.id === selectedButtonId);
    if (sb) {
      setType(sb.type);
      setLabel(sb.label);
      setAction(sb.action);
    }
  }, [selectedButtonId, buttons]);

  const updateNodeData = useCallback(
    (newButtons) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                buttons: newButtons,
              },
            };
          }
          return n;
        })
      );
    },
    [node?.id, setNodes]
  );

  // Update form fields + the button array
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    setButtons((prev) => {
      const updated = prev.map((b) =>
        b.id === selectedButtonId ? { ...b, type: newType } : b
      );
      updateNodeData(updated);
      return updated;
    });
  };

  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setLabel(newLabel);
    setButtons((prev) => {
      const updated = prev.map((b) =>
        b.id === selectedButtonId ? { ...b, label: newLabel } : b
      );
      updateNodeData(updated);
      return updated;
    });
  };

  const handleActionChange = (e) => {
    const newAction = e.target.value;
    setAction(newAction);
    setButtons((prev) => {
      const updated = prev.map((b) =>
        b.id === selectedButtonId ? { ...b, action: newAction } : b
      );
      updateNodeData(updated);
      return updated;
    });
  };


  // Clicking a button in the preview selects it for editing
  const handleSelectButton = (id) => {
    setSelectedButtonId(id);
  };

  // Add a new button (and select it)
  const handleAddButton = () => {
    const newButton = {
      id: `btn-${Date.now()}`,
      type: 'action',
      label: 'New Button',
      action: '',
    };
    const updated = [...buttons, newButton];
    setButtons(updated);
    updateNodeData(updated);
    setSelectedButtonId(newButton.id);
  };

  // Remove a button; if it was selected, select the first remaining
  const handleRemoveButton = (id) => {
    const updated = buttons.filter((b) => b.id !== id);
    setButtons(updated);
    updateNodeData(updated);
    if (id === selectedButtonId) {
      if (updated.length > 0) {
        setSelectedButtonId(updated[0].id);
      } else {
        setSelectedButtonId(null);
      }
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //       addLocation();
  //   }
  // };

  return (
    
    <div className="properties-panel">

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
            <div style={buttonStyles.container}>
              <Pointer size={40} color='#237804'/>

              <hr/>
              <div style={{display: 'flex', marginBottom: '20px', gap:'70%'}}>
                <p>Button</p>
                <button
                  onClick={handleAddButton}
                  style={buttonStyles.addButton}
                >
                  +
                </button>
              </div>
              
              <div style={buttonStyles.buttonSection}>
                  <div style={buttonStyles.inputGroup}>
                      
                      <div style={buttonStyles.buttonContainer}>
                        <select
                          value={type}
                          style={buttonStyles.input}
                          onChange={handleTypeChange}
                        >
                          <option value="action">Action Button</option>
                          <option value="url">URL Button</option>
                        </select>
                      </div>
                  
                  </div>

                  <div>
                      <div style={buttonStyles.labelInput}>
                          <p>Label</p>
                          <input
                            type="text"
                            placeholder="Reply"
                            value={label}
                            onChange={handleLabelChange}
                            style={buttonStyles.input}
                          />
                          
                      </div>
                      <div style={buttonStyles.actionInput}>
                          <p style={buttonStyles.p}>Action</p>
                          <input
                            type="text"
                            placeholder="http://mywebsite.com"
                            value={action}
                            onChange={handleActionChange}
                            style={buttonStyles.input}
                          />
                          
                      </div>
                  </div>
              </div>

        

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {buttons.map((b) => (
                  <div key={b.id} style={{ position: 'relative', width: '100%', }}>
                    <button
                      onClick={() => handleSelectButton(b.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: b.id === selectedButtonId ? '1px solid black' : '1px solid rgba(29, 29, 29, 0.25)',
                        borderRadius: '2px',
                        color: b.id === selectedButtonId ? '#0a78f2' : '#7BB9FE',
                        fontSize: '14px',
                        fontWeight: 400,
                        fontFamily: 'Outfit',
                        width: '100%',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: '8px 12px',
                    
                        // highlight selected button
                        opacity: b.id === selectedButtonId ? 1 : 0.7,
                      }}
                    >
                      <ExternalLinkIcon />
                      {b.label || 'Button'}
                    </button>

                    <button
                      onClick={() => handleRemoveButton(b.id)}
                      style={buttonStyles.removeButton}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
    


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

export default ButtonNodePropertyPanel;
