import React, { useState, useEffect, useCallback } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { VariablePropIcon } from '../../modules/projectIcons';
import { variablesStyles } from '../../modules/panelStyles';

  
const VariableItem = ({ 
    variable, 
    expandedVariables, 
    toggleVariableExpand, 
    updateVariableValue, 
    removeVariable 
}) => {
    const isExpanded = expandedVariables[variable.id];

    return (
    <div style={variablesStyles.toggleRowContainer}>
        <div style={variablesStyles.toggleRow}>
        <span style={variablesStyles.variableName}>
            {variable.name}
        </span>
        <button 
            style={variablesStyles.toggleButton}
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
          style={variablesStyles.removeButton}
        >
          <X size={16} />
        </button>
        </div>
        
        {isExpanded && (
        <div style={variablesStyles.dropdown}>
            <input
            type="text"
            value={variable.value}
            onChange={(e) => updateVariableValue(variable.id, e.target.value)}
            style={variablesStyles.dropdownInput}
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
    <div className="properties-panel" style={variablesStyles.container}>
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
                <div style={variablesStyles.headerContainer}>
                  <div style={variablesStyles.iconContainer}>
                    <VariablePropIcon />
                  </div>
                </div>
                
                <hr style={{marginTop: '-7px'}}/>
                
                <div style={variablesStyles.container}>
                  <div style={variablesStyles.header}>
                    Variables
                    <button 
                      style={variablesStyles.closeButton} 
                      onClick={onClose}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div style={variablesStyles.row}>
                    <p style={variablesStyles.label}>Name</p>
                    <input 
                      type="text" 
                      style={variablesStyles.input} 
                      placeholder="Enter variable name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                  </div>
                  
                  <div style={variablesStyles.row}>
                    <p style={{...variablesStyles.label, color: '#237804'}}>Value</p>
                    <input 
                      type="text" 
                      style={variablesStyles.input} 
                      placeholder="Enter variable value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
    
                <div style={variablesStyles.variableList}>
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