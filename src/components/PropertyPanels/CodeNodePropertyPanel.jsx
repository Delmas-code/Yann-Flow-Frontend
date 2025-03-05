import React, { useState, useEffect, useCallback } from 'react';
import { X, Code } from 'lucide-react';
import { CodePropIcon } from '../../modules/projectIcons';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { CodeIcon } from '../../modules/projectIcons';
import { PlusCircle } from 'lucide-react';

const javascriptNodeStyles = {
  container: {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
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
  headerText: {
    margin: 0,
    fontSize: '16px',
  },
  divider: {
    margin: '10px 0',
    border: 'none',
    borderTop: '1px solid #e0e0e0',
  },
  codeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '16px'
  },
  codeItem: {
    position: 'relative',
    width: '90%',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '4px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  codeIcon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  codeDetails: {
    flex: 1,
    overflow: 'hidden'
  },
  codeName: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
    color: '#212529',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  codeSplit: {
    margin: 0, 
    color: '#666', 
    fontSize: '0.8em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '200px'
  },
  removeButton: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
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
    padding: '4px'
  },
    addButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        border: '1px solid #237804',
        borderRadius: '1px',
        padding: '8px 12px',
        cursor: 'pointer',
        marginTop: '10px',
        
    },
  codeMirrorContainer: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  }
};


const CodeNodePropertyPanel = ({ node, setNodes, onClose }) => {
  const [activeTab, setActiveTab] = useState('options');
  
  // Code editor state
  const [codeSnippet, setCodeSnippet] = useState(`// Write your JavaScript code here
function example() {
  console.log('Hello, World!');
}`);
  
  // Codes list state
  const [codes, setCodes] = useState(node.data?.codes || []);

  // Load data when node changes
  useEffect(() => {
    if (node?.id) {
      setCodes(node.data?.codes || []);
    }
  }, [node?.id]);

  // Memoized update function for node data
  const updateNodeData = useCallback((updatedCodes) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              codes: updatedCodes
            }
          };
        }
        return n;
      })
    );
  }, [node?.id, setNodes]);

  // Add Code
  const addCode = () => {
    if (!codeSnippet.trim()) return;

    const newCode = {
      id: Date.now(),
      name: `Code Block ${codes.length + 1}`,
      code: codeSnippet
    };

    const updatedCodes = [...codes, newCode];
    setCodes(updatedCodes);
    updateNodeData(updatedCodes);

    // Reset code snippet
    setCodeSnippet(`// Write your JavaScript code here
function example() {
  console.log('Hello, World!');
}`);
  };

  // Remove a code snippet
  const removeCode = (codeId) => {
    const updatedCodes = codes.filter(code => code.id !== codeId);
    setCodes(updatedCodes);
    updateNodeData(updatedCodes);
  };

  return (
    <div className="properties-panel" style={javascriptNodeStyles.container}>
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
            <div style={javascriptNodeStyles.headerContainer}>
              <div style={javascriptNodeStyles.iconContainer}>
                <CodePropIcon />
              </div>
              {/* <p style={javascriptNodeStyles.headerText}>Javascript Node</p> */}
            </div>
            
            <hr style={javascriptNodeStyles.divider}/>

            {/* Code Editor */}
            <div style={javascriptNodeStyles.codeMirrorContainer}>
              <CodeMirror
                value={codeSnippet}
                height="300px"
                theme={vscodeDark}
                extensions={[javascript()]}
                onChange={(value) => setCodeSnippet(value)}
              />
            </div>

            {/* Add Code Button */}
            {/* <button 
              onClick={addCode}
              style={javascriptNodeStyles.addButton}
            >
              Add Code
            </button> */}
            <button 
              style={javascriptNodeStyles.addButton}
              onClick={addCode}
            >
              <PlusCircle size={16} color="#237804"/>
              Add Code Block
            </button>

            {/* Codes List */}
            <div style={javascriptNodeStyles.codeList}>
              {codes.map(code => (
                <div key={code.id} style={javascriptNodeStyles.codeItem}>
                    <div style={javascriptNodeStyles.codeIcon}>
                        <CodeIcon size={24} color="#4B5563" />
                    </div>
                  <div style={javascriptNodeStyles.codeDetails}>
                    <p style={javascriptNodeStyles.codeName}>
                      {code.name}
                    </p>
                    <p style={javascriptNodeStyles.codeSplit}>
                      {code.code.split('\n')[0]}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeCode(code.id)}
                    style={javascriptNodeStyles.removeButton}
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

export default CodeNodePropertyPanel;