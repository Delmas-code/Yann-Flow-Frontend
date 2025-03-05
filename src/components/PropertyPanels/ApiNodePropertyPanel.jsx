import React, { useState, useEffect, useCallback } from 'react';
import { X, Link2 } from 'lucide-react';
import './APINodePropertyPanel.css';

/* Example icon (or keep your existing one) */
const APIPropIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v10.2l5.84-3.35L17 8.4zm0 0l-5.84 3.35.84.7L12 13.8V3z" />
    <path d="M12 13.8v7.2l5.84-8.55L18 12.6 12 13.8zm0 0l-5.84-.75L6 12.6l5.84 8.55v-7.2z" />
  </svg>
);

const APINodePropertyPanel = ({ node, setNodes, onClose }) => {
  const [activeTab, setActiveTab] = useState('options');

  // Form state
  const [apiUrl, setApiUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [bodyParams, setBodyParams] = useState([
    { key: 'first_name', value: 'John Doe' },
  ]);
  const [responseAction, setResponseAction] = useState('Set variable');
  const [responseVariable, setResponseVariable] = useState('');

  // APIs list state (multiple APIs per node)
  const [apis, setApis] = useState(node.data?.apis || []);
  const [editingApiId, setEditingApiId] = useState(null);

  // Load data when node changes
  useEffect(() => {
    if (node?.id) {
      setApis(node.data?.apis || []);
    }
  }, [node?.id, node.data?.apis]);

  // Memoized update function for node data
  const updateNodeData = useCallback(
    (updatedApis) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                apis: updatedApis,
              },
            };
          }
          return n;
        })
      );
    },
    [node, setNodes]
  );

  // Reset form to initial state
  const resetForm = () => {
    setEditingApiId(null);
    setApiUrl('');
    setMethod('GET');
    setPublicKey('');
    setPrivateKey('');
    setBodyParams([{ key: 'first_name', value: 'John Doe' }]);
    setResponseAction('Set variable');
    setResponseVariable('');
  };

  // Add or update API
  const saveAPI = () => {
    if (!apiUrl.trim()) return;

    const apiData = {
      id: editingApiId || Date.now(),
      apiUrl,
      method,
      publicKey,
      privateKey,
      bodyParams,
      responseAction,
      responseVariable,
    };

    let updatedApis;
    if (editingApiId) {
      // Update existing API
      updatedApis = apis.map((api) =>
        api.id === editingApiId ? apiData : api
      );
    } else {
      // Add new API
      updatedApis = [...apis, apiData];
    }

    setApis(updatedApis);
    updateNodeData(updatedApis);

    // Reset form
    resetForm();
  };

  // Edit an existing API
  const editAPI = (api) => {
    setEditingApiId(api.id);
    setApiUrl(api.apiUrl);
    setMethod(api.method);
    setPublicKey(api.publicKey);
    setPrivateKey(api.privateKey);
    setBodyParams(api.bodyParams);
    setResponseAction(api.responseAction);
    setResponseVariable(api.responseVariable);
    setActiveTab('options'); // ensure we switch to Options tab when editing
  };

  // Remove an API
  const removeAPI = (apiId) => {
    const updatedApis = apis.filter((api) => api.id !== apiId);
    setApis(updatedApis);
    updateNodeData(updatedApis);
  };

  // Update a single body parameter
  const updateBodyParam = (index, key, value) => {
    const newBodyParams = [...bodyParams];
    newBodyParams[index] = { key, value };
    setBodyParams(newBodyParams);
  };

  // Add new body parameter
  const addBodyParam = () => {
    setBodyParams([...bodyParams, { key: '', value: '' }]);
  };

  // Remove body parameter
  const removeBodyParam = (index) => {
    const newBodyParams = bodyParams.filter((_, i) => i !== index);
    setBodyParams(newBodyParams);
  };

  return (
    <div className="api-prop-panel">
      {/* Tabs at the top */}
      <div className="api-prop-panel-tabs">
        <button
          className={`api-prop-tab ${activeTab === 'options' ? 'active' : ''}`}
          onClick={() => setActiveTab('options')}
        >
          Options
        </button>
        <button
          className={`api-prop-tab ${activeTab === 'sandbox' ? 'active' : ''}`}
          onClick={() => setActiveTab('sandbox')}
        >
          Sandbox
        </button>
      </div>

      {/* Content area */}
      <div className="api-prop-panel-content">
        {activeTab === 'options' ? (
          <>
            {/* Header with icon + title */}
            <div className="api-prop-header">
              <div className="api-prop-header-icon">
                <APIPropIcon />
              </div>
              <p className="api-prop-header-text">API Node</p>
            </div>
            <hr className="api-prop-divider" />

            {/* API URL + Method */}
            <div className="api-prop-row">
              <label>API Url</label>
              <input
                className="api-prop-url-input"
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="URL or {variable}"
              />
              <select
                className="api-prop-method-select"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            {/* Headers (public/private keys) */}
            <p className="api-prop-section-label">Headers</p>
            <div className="api-prop-item-row">
              <span className="api-prop-item-label">Public-key</span>
              <input
                className="api-prop-item-input"
                type="text"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="public key"
              />
              {/* Example: no separate remove for public/private unless you want them dynamic */}
            </div>
            <div className="api-prop-item-row">
              <span className="api-prop-item-label">Private-key</span>
              <input
                className="api-prop-item-input"
                type="text"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="private key"
              />
            </div>

            {/* Body */}
            <p className="api-prop-section-label">Body</p>
            {bodyParams.map((param, index) => (
              <div key={index} className="api-prop-item-row">
                <input
                  className="api-prop-item-input"
                  type="text"
                  value={param.key}
                  onChange={(e) =>
                    updateBodyParam(index, e.target.value, param.value)
                  }
                  placeholder="Parameter"
                />
                <input
                  className="api-prop-item-input"
                  type="text"
                  value={param.value}
                  onChange={(e) =>
                    updateBodyParam(index, param.key, e.target.value)
                  }
                  placeholder="Value"
                />
                <button
                  className="api-prop-remove-btn"
                  onClick={() => removeBodyParam(index)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button className="api-prop-add-btn" onClick={addBodyParam}>
              + Add
            </button>

            {/* Response */}
            <p className="api-prop-section-label">Response</p>
            <label style={{ fontSize: '13px' }}>Select Action</label>
            <select
              className="api-prop-response-select"
              value={responseAction}
              onChange={(e) => setResponseAction(e.target.value)}
            >
              <option value="Set variable">Set variable</option>
              <option value="Other Action">Other Action</option>
            </select>

            <label style={{ marginTop: '10px', fontSize: '13px' }}>
              Select variable
            </label>
            <input
              className="api-prop-response-input"
              type="text"
              value={responseVariable}
              onChange={(e) => setResponseVariable(e.target.value)}
              placeholder="Variable name"
            />

            {/* Save / Update button */}
            <button
              className="api-prop-add-btn"
              style={{ marginTop: '12px', backgroundColor: '#1976d2' }}
              onClick={saveAPI}
            >
              {editingApiId ? 'Update API' : 'Add API'}
            </button>

            {/* Existing APIs list (if you want a preview of all APIs) */}
            <div className="api-prop-apis-list">
              {apis.map((api) => (
                <div key={api.id} className="api-prop-apis-item">
                  <div className="api-prop-apis-info">
                    <p className="api-prop-apis-title">{api.apiUrl}</p>
                    <p className="api-prop-apis-sub">{api.method}</p>
                  </div>
                  <button
                    className="api-prop-apis-btn"
                    onClick={() => editAPI(api)}
                  >
                    <Link2 size={16} />
                  </button>
                  <button
                    className="api-prop-apis-btn"
                    onClick={() => removeAPI(api.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Sandbox tab */
          <div>
            <h3>Connected Apps</h3>
            <p style={{ fontSize: '13px', color: '#666' }}>
              No Sandbox environment connected yet. You’ll be able to test
              integrations here in the future.
            </p>
            <button
              style={{
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 14px',
                cursor: 'pointer',
                fontSize: '13px',
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
