import React from "react";

const DefaultPropertiesPanel = ({node, setNodes, onClose}) => {

    // Handle property changes
    const handleChanges = (key, value) => {
        setNodes((nodes) => 
            nodes.map((n) => {
                if (n.id === node.id) {
                    return {
                        ...n,
                        data: {
                            ...n,
                            [key]: value
                        }, 
                    };
                }
                return n
            })
        );
    };

    // Title based on node type
    const getTitle = () => {
        switch (node.type) {
        case 'textNode': return 'Message Properties';
        // case 'intentNode': return 'Intent Properties';
        // case 'conditionNode': return 'Condition Properties';
        // case 'apiNode': return 'API Call Properties';
        default: return 'Node Properties';
        }
    };

    return (
        <div className="properties-panel" style={{
            width: '280px',
            backgroundColor: '#f5f5f5',
            borderLeft: '1px solid #ddd',
            padding: '15px',
            height: '100vh',
            overflowY: 'auto',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0
          }}>
            <button 
                onClick={onClose}
                style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666'
                }}
                aria-label="Close properties panel"
            >
                ✕
            </button>
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>{getTitle()}</h3>
          
            {/* Common properties for all nodes */}
            <div className="property-group" style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '10px' }}>Basic Settings</h4>
                
                <div className="form-group" style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Label:</label>
                <input
                    type="text"
                    value={node.data.label || ''}
                    onChange={(e) => handleChange('label', e.target.value)}
                    style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                    }}
                />
                </div>
                
                {/* Node-specific properties are handled directly in the node components */}
                
                {/* Delete button */}
                <button
                onClick={() => setNodes((nodes) => nodes.filter((n) => n.id !== node.id))}
                style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}
                >
                Delete Node
                </button>
            </div>
        </div>
    );
}

export default DefaultPropertiesPanel;