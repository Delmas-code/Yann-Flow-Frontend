import React, { useState, useEffect, useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { Info, Brain } from 'lucide-react';
import ToolbarPlugin from '../../editor/ToolbarPlugin';

const aiNodeStyles = {
  container: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '100%',
    boxSizing: 'border-box',
    // overflowX: 'hidden'
  },
  aiIcon: {
    width: '50px',
    height: '50px',
    backgroundColor: '#4CAF50',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  editorContainer: {
    border: '1px solid #ddd',
    borderRadius: '1px',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
  },
  editor: {
    minHeight: '100px',
    resize: 'vertical',
    overflow: 'auto',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  modelSelector: {
    marginTop: '15px',
    width: '100%',
    boxSizing: 'border-box',
  },
  modelLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '8px',
    fontWeight: '500',
    position: 'relative',
    fontFamily: 'Outfit',
  },
  infoIcon: {
    cursor: 'help',
    marginLeft: '4px',
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '220px',
    padding: '8px 12px',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: '4px',
    fontSize: '12px',
    lineHeight: '1.4',
    zIndex: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity 0.2s, visibility 0.2s',
  },
  tooltipVisible: {
    visibility: 'visible',
    opacity: 1,
  },
  dropdown: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '1px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    boxSizing: 'border-box',
  },
  infoText: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px',
    fontFamily: 'Outfit',
    maxWidth: '100%',
  },
  saveButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '15px',
    alignSelf: 'flex-start',
  },
  divider: {
    width: '100%',
    margin: 0,
    border: 'none',
    borderTop: '1px solid #eee',
  },
  promptLabel: {
    margin: '-10px 0 0 0',
    fontFamily: 'Outfit',
  }
};

const ModelInfoTooltip = ({ isVisible }) => {
  const tooltipStyle = {
    ...aiNodeStyles.tooltip,
    ...(isVisible ? aiNodeStyles.tooltipVisible : {})
  };

  return (
    <div style={tooltipStyle}>  
        Different AI models offer varying capabilities, token limits, and response speeds. 
        Right now the models we support are: GPT-4, GPT 4 Turbo and Claude 3 Opus
    </div>
  );
};

const AINodePropertyPanel = ({ node, setNodes, onClose }) => {
  const [title, setTitle] = useState(node.data?.title || 'AI Node');
  const [prompt, setPrompt] = useState(node.data?.prompt || '');
  const [modelType, setModelType] = useState(node.data?.modelType || 'gpt-4-turbo');
  const [activeTab, setActiveTab] = useState('options');
  const [editorState, setEditorState] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Load data when node ID changes
  useEffect(() => {
    if (node?.id) {
      setTitle(node.data?.title || 'AI Node');
      setPrompt(node.data?.prompt || '');
      setModelType(node.data?.modelType || 'gpt-4-turbo');
    }
  }, [node?.id]);

  // Update node data
  const updateNodeData = useCallback(() => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              prompt: prompt,
              modelType: modelType,
              title: title
            }
          };
        }
        return n;
      })
    );
  }, [node?.id, setNodes, prompt, modelType, title]);

  // Handle editor changes
  const handleEditorChange = useCallback((editorState) => {
    setEditorState(editorState);
    
    // Get plain text from editor
    editorState.read(() => {
      const textContent = document.querySelector('.editor-content')?.textContent || '';
      setPrompt(textContent);
    });
  }, []);

  // Handle model selection
  const handleModelChange = (e) => {
    setModelType(e.target.value);
  };

  // Save changes
  const handleSave = useCallback(() => {
    updateNodeData();
  }, [updateNodeData]);

  // Lexical editor configuration
  const editorConfig = {
    namespace: 'AINodeEditor',
    theme: {
      root: 'editor-root',
      text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
        underline: 'editor-text-underline',
      },
    },
    onError: (error) => console.error(error),
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      TableNode,
      TableCellNode,
      TableRowNode
    ]
  };

  return (
    // <div className="properties-panel" style={{ overflowX: 'hidden', boxSizing: 'border-box', width: '100%' }}>
    <div className="properties-panel">
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
      
      <div className="property-panel-content" style={{ overflowX: 'hidden', width: '100%', boxSizing: 'border-box' }}>
        {activeTab === 'options' ? (
          <div style={aiNodeStyles.container}>
            <Brain size={40} color='#237804'/>
            {/* <div style={aiNodeStyles.aiIcon}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12L12 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12L20 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12L4 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div> */}
            <hr style={aiNodeStyles.divider}/>
            <p style={aiNodeStyles.promptLabel}>Enter AI prompt</p>
            
            <div style={aiNodeStyles.editorContainer}>
              <LexicalComposer initialConfig={editorConfig}>
                <div className="editor-container" style={{ width: '100%', boxSizing: 'border-box' }}>
                  <ToolbarPlugin />
                  <div style={aiNodeStyles.editor}>
                    <RichTextPlugin
                      contentEditable={<ContentEditable className="editor-content" />}
                      ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <OnChangePlugin onChange={handleEditorChange} />
                  </div>
                </div>
              </LexicalComposer>
            </div>

            <div style={aiNodeStyles.modelSelector}>
              <div style={aiNodeStyles.modelLabel}>
                Select Model 
                <div 
                  style={aiNodeStyles.infoIcon}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Info size={16} color="#666" />
                  <ModelInfoTooltip isVisible={showTooltip} />
                </div>
              </div>
              <select 
                style={aiNodeStyles.dropdown}
                value={modelType}
                onChange={handleModelChange}
              >
                <option value="gpt-4-turbo">GPT 4 Turbo</option>
                <option value="gpt-4">GPT 4</option>
                <option value="gpt-3.5-turbo">GPT 3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="claude-3-haiku">Claude 3 Haiku</option>
              </select>
              {/* <div style={aiNodeStyles.infoText}>
                Select the AI model that will process your prompt
              </div> */}
            </div>

            {/* <button 
              style={aiNodeStyles.saveButton}
              onClick={handleSave}
            >
              Save Changes
            </button> */}
          </div>
        ) : (
          <div className="sandbox-tab" style={{ padding: '15px', boxSizing: 'border-box', width: '100%' }}>
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

export default AINodePropertyPanel;
