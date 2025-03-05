import React, { useState, useEffect, useCallback } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { VariablePropIcon } from '../../modules/projectIcons';


const variablesBlockStyles = {
    container: {
      width: '100%',
      border: '1px solid #d1d5db', // Light gray border
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    iconContainer: {
        width: '32px',
        height: '32px',
        marginRight: '10px',
    },
    header: {
      backgroundColor: '#fff', // Very light gray background
      padding: '8px 12px',
      borderBottom: '1px solid #d1d5db',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#374151', // Dark gray text
      fontFamily: 'Outfit',
      fontSize: '14px',
      fontWeight: '500',
      fontStyle: 'italic'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#ef4444', // Red color for close
      cursor: 'pointer',
      fontSize: '16px',
    },
    row: {
      display: 'flex',
      padding: '8px 12px',
      borderBottom: '1px solid #e5e7eb', // Light border between rows
      alignItems: 'center',
    },
    label: {
      color: '#4b5563', // Dark gray label color
      fontSize: '14px',
      flex: '0 0 80px', // Fixed width for labels
      fontWeight: '500',
    },
    input: {
        width: '100%',
      flex: '1',
      // border: '1px solid #d1d5db',
      border: 'none',
      padding: '6px 8px',
      fontFamily: 'Outfit',
      fontSize: '14px',
      color: '#111827', // Nearly black text
    },
    variableList: {
        display: 'flex',
        flexDirection: 'column',
        // gap: '4px',
        marginTop: '16px'
      },
    
    variableName: {
        // fontWeight: 'bold',
        fontFamily: 'Outfit',
        flex: 1,
    },
    toggleButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleRowContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '16px'
    },
      toggleRow: {
        position: 'relative',
        width: '90%',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      },
      dropdown: {
        width: '90%',
        backgroundColor: '#f9fafb',
        padding: '8px 12px',
        paddingLeft: 0,
        borderTop: '1px solid #e5e7eb',
      },
      dropdownInput: {
        width: '100%',
        border: '1px solid #d1d5db',
        padding: '12px 8px',
        fontSize: '14px',
      },
    removeButton: {
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
      },
  };

  
const VariableItem = ({ 
    variable, 
    expandedVariables, 
    toggleVariableExpand, 
    updateVariableValue, 
    removeVariable 
}) => {
    const isExpanded = expandedVariables[variable.id];

    return (
    <div style={variablesBlockStyles.toggleRowContainer}>
        <div style={variablesBlockStyles.toggleRow}>
        <span style={variablesBlockStyles.variableName}>
            {variable.name}
        </span>
        <button 
            style={variablesBlockStyles.toggleButton}
            onClick={() => toggleVariableExpand(variable.id)}
        >
            {isExpanded ? (
            <Minus size={16} color="#4b5563"/>
            ) : (
            <Plus size={16} color="#4b5563"/>
            )}
        </button>
        <button 
          onClick={() => removeVariable(variable.id)}
          style={variablesBlockStyles.removeButton}
        >
          <X size={16} />
        </button>
        </div>
        
        {isExpanded && (
        <div style={variablesBlockStyles.dropdown}>
            <input
            type="text"
            value={variable.value}
            onChange={(e) => updateVariableValue(variable.id, e.target.value)}
            style={variablesBlockStyles.dropdownInput}
            placeholder="Enter variable value"
            />
        </div>
        )}
    </div>
    );
};

const VariableNodePropertyPanel = ({ node, setNodes, onClose }) => {
    const [activeTab, setActiveTab] = useState('options');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [variables, setVariables] = useState(node.data?.variables || []);
    const [expandedVariables, setExpandedVariables] = useState({});


  // Load data when node changes
    useEffect(() => {
      if (node?.id) {
        setVariables(node.data?.variables || []);
      }
    }, [node?.id]);


    // Memoized update function for node data
    const updateNodeData = useCallback((updatedVariables) => {
      setNodes(nds => 
        nds.map(n => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                variables: updatedVariables
              }
            };
          }
          return n;
        })
      );
    }, [node?.id, setNodes]);

    // Add Variable
    const addVariable = () => {
        if (!name.trim() || !value) return;

        const newVariable = {
        id: Date.now(),
        name: name,
        value: value
        };

        const updatedVariables = [...variables, newVariable];
        setVariables(updatedVariables);
        updateNodeData(updatedVariables);

        // Reset input fields
        setName('');
        setValue('');
    };
    // Remove a variable
    const removeVariable = (variableId) => {
        const updatedVariables = variables.filter(variable => variable.id !== variableId);
        setVariables(updatedVariables);
        updateNodeData(updatedVariables);
    };

    // Toggle variable value visibility
    const toggleVariableExpand = (variableId) => {
        setExpandedVariables(prev => ({
        ...prev,
        [variableId]: !prev[variableId]
        }));
    };
    
    // Update variable value
    const updateVariableValue = (variableId, newValue) => {
        const updatedVariables = variables.map(variable => 
        variable.id === variableId 
            ? { ...variable, value: newValue }
            : variable
        );
        setVariables(updatedVariables);
        updateNodeData(updatedVariables);
    };

  // Handle key down for adding filter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        addVariable();
    }
  };

  return (
    <div className="properties-panel" style={variablesBlockStyles.container}>
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
              <div>
                <div style={variablesBlockStyles.headerContainer}>
                  <div style={variablesBlockStyles.iconContainer}>
                    <VariablePropIcon />
                  </div>
                </div>
                
                <hr style={{marginTop: '-7px'}}/>
                
                <div style={variablesBlockStyles.container}>
                  <div style={variablesBlockStyles.header}>
                    Variables
                    <button 
                      style={variablesBlockStyles.closeButton} 
                      onClick={onClose}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div style={variablesBlockStyles.row}>
                    <p style={variablesBlockStyles.label}>Name</p>
                    <input 
                      type="text" 
                      style={variablesBlockStyles.input} 
                      placeholder="Enter variable name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                  </div>
                  
                  <div style={variablesBlockStyles.row}>
                    <p style={{...variablesBlockStyles.label, color: '#237804'}}>Value</p>
                    <input 
                      type="text" 
                      style={variablesBlockStyles.input} 
                      placeholder="Enter variable value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
    
                <div style={variablesBlockStyles.variableList}>
                  {variables.map(variable => (
                    <VariableItem
                      key={variable.id}
                      variable={variable}
                      expandedVariables={expandedVariables}
                      toggleVariableExpand={toggleVariableExpand}
                      updateVariableValue={updateVariableValue}
                      removeVariable={removeVariable}
                    />
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

export default VariableNodePropertyPanel;