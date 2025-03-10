import React, { useState, useEffect, useCallback } from 'react';
import { X, Info, PlusCircle, Plus, Trash2, Edit2 } from 'lucide-react';
import { ApiPropIcon } from '../../modules/projectIcons';
import { capitalize } from 'lodash';
import { apiNodeStyles } from '../../modules/panelStyles';


const ModelInfoTooltip = ({ isVisible, content }) => {
  const tooltipStyle = {
    ...apiNodeStyles.tooltip,
    ...(isVisible ? apiNodeStyles.tooltipVisible : {})
  };

  return (
    <div style={tooltipStyle}>  
      {content || 'Choose the API Method and set its URL.'}
    </div>
  );
};

const APINodePropertyPanel = ({ node, setNodes, onClose }) => {
  const [activeTab, setActiveTab] = useState('options');
  
  // API State
  const [apis, setApis] = useState(node.data?.apis || []);
  const [apiName, setApiName] = useState('');
  const [url, setURL] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('GET');
  
  // Headers State
  const [headers, setHeaders] = useState([]);
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  
  // Body Parameters State
  const [bodyParams, setBodyParams] = useState([]);
  const [paramName, setParamName] = useState('');
  const [paramValue, setParamValue] = useState('');
  
  // Response State
  const [selectedAction, setSelectedAction] = useState('Set variable');
  const [selectedVariable, setSelectedVariable] = useState('');
  
  // Edit Mode State
  const [editMode, setEditMode] = useState(false);
  const [editingApiId, setEditingApiId] = useState(null);
  
  // UI State
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  
  // Load data when node changes
  useEffect(() => {
    if (node?.id) {
      setApis(node.data?.apis || []);
    }
  }, [node?.id]);

  // Memoized update API for node data
  const updateNodeData = useCallback((updatedApis) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              apis: updatedApis
            }
          };
        }
        return n;
      })
    );
  }, [node?.id, setNodes]);

  // Reset form fields
  const resetForm = () => {
    setApiName('');
    setURL('');
    setSelectedMethod('GET');
    setHeaders([]);
    setHeaderKey('');
    setHeaderValue('');
    setBodyParams([]);
    setParamName('');
    setParamValue('');
    setSelectedAction('Set variable');
    setSelectedVariable('');
    setEditMode(false);
    setEditingApiId(null);
  };

  // Add a new header
  const addHeader = () => {
    if (!headerKey) return;
    
    const newHeader = {
      id: `api-header-${Date.now()}`,
      key: headerKey,
      value: headerValue
    };
    
    setHeaders([...headers, newHeader]);
    setHeaderKey('');
    setHeaderValue('');
  };

  // Remove a header
  const removeHeader = (headerId) => {
    setHeaders(headers.filter(header => header.id !== headerId));
  };

  // Add a new body parameter
  const addBodyParam = () => {
    if (!paramName) return;
    
    const newParam = {
      id: `api-body-${Date.now()}`,
      name: paramName,
      value: paramValue
    };
    
    setBodyParams([...bodyParams, newParam]);
    setParamName('');
    setParamValue('');
  };

  // Remove a body parameter
  const removeBodyParam = (paramId) => {
    setBodyParams(bodyParams.filter(param => param.id !== paramId));
  };

  // Add or update API
  const saveApi = () => {
    if (!url || !selectedMethod) return;
    
    const apiData = {
      id: editMode ? editingApiId : Date.now(),
      name: apiName || `${selectedMethod} ${url.substring(0, 15)}...`,
      method: selectedMethod,
      url: url,
      headers: headers,
      bodyParams: bodyParams,
      response: {
        action: selectedAction,
        variable: selectedVariable
      }
    };
    
    let updatedApis;
    
    if (editMode) {
      updatedApis = apis.map(api => 
        api.id === editingApiId ? apiData : api
      );
    } else {
      updatedApis = [...apis, apiData];
    }
    
    setApis(updatedApis);
    updateNodeData(updatedApis);
    resetForm();
  };

  // Remove an API
  const removeApi = (apiId) => {
    const updatedApis = apis.filter(api => api.id !== apiId);
    setApis(updatedApis);
    updateNodeData(updatedApis);
    
    if (editingApiId === apiId) {
      resetForm();
    }
  };

  // Edit an API
  const editApi = (api) => {
    setEditMode(true);
    setEditingApiId(api.id);
    setApiName(api.name);
    setSelectedMethod(api.method);
    setURL(api.url);
    setHeaders(api.headers || []);
    setBodyParams(api.bodyParams || []);
    setSelectedAction(api.response?.action || 'Set variable');
    setSelectedVariable(api.response?.variable || '');
  };

  // Cancel editing
  const cancelEdit = () => {
    resetForm();
  };

  // Handle key down for adding
  const handleKeyDown = (e, addFunction) => {
    if (e.key === 'Enter') {
      addFunction();
    }
  };

  return (
    <div className="properties-panel" style={apiNodeStyles.container}>
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
            <div style={apiNodeStyles.container}>
              <div style={apiNodeStyles.iconContainer}>
                <ApiPropIcon />
              </div>
            </div>
            
            <hr style={{marginTop: '-7px'}}/>
            
            {/* API List */}
            {apis.length > 0 && !editMode && (
              <div style={{marginBottom: '20px'}}>
                <div style={apiNodeStyles.sectionTitle}>
                  Configured APIs
                </div>
                {apis.map(api => (
                  <div 
                    key={api.id} 
                    style={apiNodeStyles.apiListItem}
                    onClick={() => editApi(api)}
                  >
                    <div>
                      {/* <strong>{api.method}</strong> {api.name} */}
                      {api.name}
                    </div>
                    <div style={apiNodeStyles.apiActions}>
                      <span 
                        style={{...apiNodeStyles.actionButton, color: '#1890ff'}}
                        onClick={(e) => {
                          e.stopPropagation();
                          editApi(api);
                        }}
                      >
                        <Edit2 size={16} />
                      </span>
                      <span 
                        style={{...apiNodeStyles.actionButton, color: '#ff4d4f'}}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeApi(api.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* API URL Section */}
            <div style={apiNodeStyles.inputContainer}>
              <div style={apiNodeStyles.functionName}>
                <div style={apiNodeStyles.functionNameLabel}>
                  API URL
                  <div 
                    style={apiNodeStyles.infoIcon}
                    onMouseEnter={() => {
                      setTooltipContent('Choose the API Method and set its URL');
                      setShowTooltip(true);
                    }}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <Info size={16} color="#666" />
                    <ModelInfoTooltip isVisible={showTooltip} content={tooltipContent} />
                  </div>
                </div>
                <div style={{
                  display: 'flex'
                }}>
                  <select
                    id="api-method"
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    style={{...apiNodeStyles.selectInput, width:'40%', padding: 0, fontSize:'13px', textAlign:'center'}}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                  <input 
                    id="api-url"
                    type="text"
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, () => {})}
                    placeholder="URL or {{Variable}}"
                    style={apiNodeStyles.input}
                  />
                </div>
              </div>
            </div>
            
            {/* Headers Section */}
            <div>
              <div style={apiNodeStyles.sectionTitle}>
                Headers
              </div>
              <hr style={{marginTop: '7px'}}/>
              
              {/* Header inputs */}
                
                <div style={apiNodeStyles.headerContainer}>
                  <div style={apiNodeStyles.header}>
                    Headers
                  </div>
                  
                  <div style={apiNodeStyles.headerRow}>
                    <input 
                      type="text" 
                      style={apiNodeStyles.input} 
                      placeholder="Key"
                      value={headerKey}
                      onChange={(e) => setHeaderKey(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, addHeader)}
                    />
                  </div>
                  
                  <div style={apiNodeStyles.headerRow}>
                    <input 
                      type="text" 
                      style={{...apiNodeStyles.input, color: '#237804'}} 
                      placeholder="Value"
                      value={headerValue}
                      onChange={(e) => setHeaderValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, addHeader)}
                    />
                  </div>
                </div>
                <button
                  onClick={addHeader}
                  style={apiNodeStyles.addValuesBtn}
                >
                  <Plus size={16}/>
                  Add values
                </button>
              
              {/* Header values list */}
              {headers.map(header => (
                <div key={header.id} style={{...apiNodeStyles.headerContainer, marginTop: '20px'}}>
                    <div style={apiNodeStyles.header}>
                        Headers
                        <div 
                            style={apiNodeStyles.headerCloseButton}
                            onClick={() => removeHeader(header.id)}
                        >
                            <X size={16} />
                        </div>
                    </div>
                    
                    <div style={apiNodeStyles.headerRow}>
                        <input 
                            type="text" 
                            style={apiNodeStyles.input} 
                            placeholder="Key"
                            disabled
                            value={header.key}
                        />
                    </div>
                    
                    <div style={apiNodeStyles.headerRow}>
                        <input 
                            type="text" 
                            style={{...apiNodeStyles.input, color: '#237804'}} 
                            placeholder="Value"
                            disabled
                            value={header.value}
                        />
                    </div>
                </div>
              ))}
            </div>
            
            {/* Body Section */}
            
            <div>
              <div style={apiNodeStyles.sectionTitle}>
                Body
              </div>
              <hr style={{marginTop: '7px'}}/>
              
              {/* Body parameter inputs */}
                <div style={apiNodeStyles.headerContainer}>
                  <div style={apiNodeStyles.header}>
                    Body
                  </div>
                  
                  <div style={apiNodeStyles.headerRow}>
                    <input 
                      type="text" 
                      style={apiNodeStyles.input} 
                      placeholder="Parameter"
                      value={paramName}
                      onChange={(e) => setParamName(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, addBodyParam)}
                    />
                  </div>
                  
                  <div style={apiNodeStyles.headerRow}>
                    <input 
                      type="text" 
                      style={{...apiNodeStyles.input, color: '#237804'}} 
                      placeholder="Value"
                      value={paramValue}
                      onChange={(e) => setParamValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, addBodyParam)}
                    />
                  </div>
                </div>
                
                <button
                  onClick={addBodyParam}
                  style={apiNodeStyles.addValuesBtn}
                >
                  <Plus size={16}/>
                  Add value
                </button>

              
              {/* Body parameters list */}
                {bodyParams.map(param => (
                    <div key={param.id} style={{...apiNodeStyles.headerContainer, marginTop: '20px'}}>
                        <div style={apiNodeStyles.header}>
                            Body
                            <div 
                                style={apiNodeStyles.headerCloseButton}
                                onClick={() => removeBodyParam(param.id)}
                            >
                                <X size={16} />
                            </div>
                        </div>
                        
                        <div style={apiNodeStyles.headerRow}>
                            <input 
                                type="text" 
                                style={apiNodeStyles.input} 
                                placeholder="Key"
                                disabled
                                value={param.key}
                            />
                        </div>
                        
                        <div style={apiNodeStyles.headerRow}>
                            <input 
                                type="text" 
                                style={{...apiNodeStyles.input, color: '#237804'}} 
                                placeholder="Value"
                                disabled
                                value={param.value}
                            />
                        </div>
                    </div>
                ))}
                
            </div>
            
            {/* Response Section */}
            <div style={apiNodeStyles.responseSection}>
              <div style={apiNodeStyles.sectionTitle}>
                Response
                
              </div>
              <hr style={{marginTop: '7px'}}/>
              
              <div style={{marginBottom: '10px'}}>
                <div style={apiNodeStyles.functionNameLabel}>Select Action</div>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  style={apiNodeStyles.selectInput}
                >
                  <option value="Set variable">Set variable</option>
                  <option value="Transform response">Transform response</option>
                  <option value="Trigger event">Trigger event</option>
                </select>
              </div>
              
              <div style={{marginBottom: '10px'}}>
                {/* <div style={apiNodeStyles.functionNameLabel}>Select variable</div> */}
                <select
                  value={selectedVariable}
                  onChange={(e) => setSelectedVariable(e.target.value)}
                  style={apiNodeStyles.selectInput}
                >
                  <option value="">Select a variable</option>
                  <option value="response">response</option>
                  <option value="data">data</option>
                  <option value="result">result</option>
                </select>
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
              <button 
                onClick={saveApi}
                disabled={!url || !selectedMethod}
                style={{
                  ...apiNodeStyles.addButton,
                  backgroundColor: '#237804',
                  color: 'white',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                {editMode ? 'Update API' : 'Add API'}
              </button>
              
              {editMode && (
                <button 
                  onClick={cancelEdit}
                  style={{
                    ...apiNodeStyles.addButton,
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #d9d9d9',
                    justifyContent: 'center',
                    width: '50%'
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

            {/* No APIs message */}
            {/* {apis.length === 0 && !editMode && (
              <div style={apiNodeStyles.noApisMessage}>
                No APIs configured yet. Add your first API above.
              </div>
            )} */}

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

export default APINodePropertyPanel;