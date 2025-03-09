import React, { useState, useEffect, useCallback } from 'react';
import { X, Code } from 'lucide-react';
import { CodePropIcon } from '../../modules/projectIcons';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { CodeIcon } from '../../modules/projectIcons';
import { PlusCircle } from 'lucide-react';
import { codeNodeStyles } from '../../modules/panelStyles';

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
    <div className="properties-panel" style={codeNodeStyles.container}>
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
            <div style={codeNodeStyles.headerContainer}>
              <div style={codeNodeStyles.iconContainer}>
                <CodePropIcon />
              </div>
              {/* <p style={codeNodeStyles.headerText}>Javascript Node</p> */}
            </div>
            
            <hr style={codeNodeStyles.divider}/>

            {/* Code Editor */}
            <div style={codeNodeStyles.codeMirrorContainer}>
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
              style={codeNodeStyles.addButton}
            >
              Add Code
            </button> */}
            <button 
              style={codeNodeStyles.addButton}
              onClick={addCode}
            >
              <PlusCircle size={16} color="#237804"/>
              Add Code Block
            </button>

            {/* Codes List */}
            <div style={codeNodeStyles.codeList}>
              {codes.map(code => (
                <div key={code.id} style={codeNodeStyles.codeItem}>
                    <div style={codeNodeStyles.codeIcon}>
                        <CodeIcon size={24} color="#4B5563" />
                    </div>
                  <div style={codeNodeStyles.codeDetails}>
                    <p style={codeNodeStyles.codeName}>
                      {code.name}
                    </p>
                    <p style={codeNodeStyles.codeSplit}>
                      {code.code.split('\n')[0]}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeCode(code.id)}
                    style={codeNodeStyles.removeButton}
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