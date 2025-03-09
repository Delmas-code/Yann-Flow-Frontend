import React, { useState, useEffect, useCallback } from 'react';
import { X, Info, PlusCircle } from 'lucide-react';
import { CustomFunctionIcon, CustomFunctionPropIcon } from '../../modules/projectIcons';
import { functionNodeStyles } from '../../modules/panelStyles';
import { capitalize } from 'lodash';


const ModelInfoTooltip = ({ isVisible }) => {
  const tooltipStyle = {
    ...functionNodeStyles.tooltip,
    ...(isVisible ? functionNodeStyles.tooltipVisible : {})
  };

  return (
    <div style={tooltipStyle}>  
        This is the name with which you shall use to identify the function with 
        This Function Name should always be unique.
    </div>
  );
};

const FunctionNodePropertyPanel = ({ node, setNodes, onClose }) => {
  const [activeTab, setActiveTab] = useState('options');
  const [functionName, setFunctionName] = useState('');
  const [expression, setExpression] = useState('');
  const [selectedVariable, setSelectedVariable] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [customFunctions, setCustomFunctions] = useState(node.data?.customFunctions || []);

  const [showTooltip, setShowTooltip] = useState(false);

  // Load data when node changes
  useEffect(() => {
    if (node?.id) {
      setCustomFunctions(node.data?.customFunctions || []);
    }
  }, [node?.id]);

  // Memoized update function for node data
  const updateNodeData = useCallback((updatedFunctions) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              customFunctions: updatedFunctions
            }
          };
        }
        return n;
      })
    );
  }, [node?.id, setNodes]);

  // Add a new function
  const addFunction = () => {
    if (!functionName || !expression || !selectedVariable || !selectedBlock) return;
    
    const newFunction = {
      id: Date.now(),
      // name: `Function ${customFunctions.length + 1}`,
      name: functionName,
      expression: expression,
      variable: selectedVariable,
      block: selectedBlock
    };

    const updatedFunctions = [...customFunctions, newFunction];
    setCustomFunctions(updatedFunctions);
    updateNodeData(updatedFunctions);

    // Clear inputs
    setFunctionName('')
    setExpression('');
    setSelectedVariable('');
    setSelectedBlock('');
  };

  // Remove a Function
  const removeFunction = (functionId) => {
    const updatedFunctions = customFunctions.filter(customFunction => customFunction.id !== functionId);
    setCustomFunctions(updatedFunctions);
    updateNodeData(updatedFunctions);
  };

  // Handle key down for adding filter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addFunction();
    }
  };

  return (
    <div className="properties-panel" style={functionNodeStyles.container}>
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
            <div style={functionNodeStyles.headerContainer}>
              <div style={functionNodeStyles.iconContainer}>
                <CustomFunctionPropIcon />
              </div>
              
            </div>
            
            {/* <hr style={functionNodeStyles.divider}/> */}
            <hr style={{marginTop: '-7px'}}/>
            
            <div style={functionNodeStyles.inputContainer}>
              {/* <p style={{fontSize: '17px', marginTop: '30px', paddingLeft: 0}}>Function Name</p> */}
              <div style={functionNodeStyles.functionName}>
                <div style={functionNodeStyles.functionNameLabel}>
                  Function Name
                  <div 
                    style={functionNodeStyles.infoIcon}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <Info size={16} color="#666" />
                    <ModelInfoTooltip isVisible={showTooltip} />
                  </div>
                </div>
                <input 
                  id="functionName"
                  type="text"
                  value={functionName}
                  onChange={(e) => setFunctionName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Function Name"
                  style={functionNodeStyles.input}
                />
              </div>
              
            </div>

            <div style={functionNodeStyles.inputContainer}>
              {/* <label htmlFor="expression">Enter expression</label> */}
              <p style={{fontSize: '17px', marginBottom: '8px', paddingLeft: 0}}>Enter expression</p>
              <input 
                id="expression"
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="{age} * 2"
                style={functionNodeStyles.input}
              />
            </div>
            
            <div style={functionNodeStyles.inputContainer}>
              <p style={{fontSize: '17px', marginBottom: '8px', paddingLeft: 0}}>Select Action</p>
              <select
                id="functionVariable"
                value={selectedVariable}
                onChange={(e) => setSelectedVariable(e.target.value)}
                onKeyDown={handleKeyDown}
                style={functionNodeStyles.selectInput}
              >
                <option value="">Set Variable</option>
                <option value="variable1">Variable 1</option>
                <option value="variable2">Variable 2</option>
                <option value="variable3">Variable 3</option>
              </select>
              <select
                id="functionBlock"
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{...functionNodeStyles.selectInput, marginTop: '10px'}}
              >
                <option value="">Select Block</option>
                <option value="block1">Block 1</option>
                <option value="block2">Block 2</option>
                <option value="block3">Block 3</option>
              </select>
            </div>

            <button 
              onClick={addFunction}
              disabled={!functionName || !expression || !selectedVariable || !selectedBlock}
              style={functionNodeStyles.addButton}
            >
              <PlusCircle size={16} color="#237804"/>
              Add Function
            </button>

            <div style={functionNodeStyles.filterList}>
                {customFunctions.map(customFunction => (
                    <div key={customFunction.id} style={functionNodeStyles.filterItem}>
                        <div style={functionNodeStyles.filterIcon}>
                            <CustomFunctionIcon size={24} color="#4B5563" />
                        </div>
                        <div style={functionNodeStyles.filterDetails}>
                            <p style={functionNodeStyles.filterName}>{capitalize(customFunction.name)}</p>
                            <p style={functionNodeStyles.filterExp}>
                            {customFunction.expression}, {customFunction.variable}, {customFunction.block}
                            </p>
                        </div>
                        <button
                            onClick={() => removeFunction(customFunction.id)}
                            style={functionNodeStyles.removeButton}
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

export default FunctionNodePropertyPanel;