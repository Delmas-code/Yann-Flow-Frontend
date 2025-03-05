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
import { AIPropIcon } from '../../modules/projectIcons';
import { aiNodeStyles } from '../../modules/panelStyles';

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

  // TODO: Recheck AINODe creation
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
            <div style={{display: "flex"}}>
              <div style={{ width: "32px", height: "32px",  }}>
                  <AIPropIcon />
              </div>
              {/* <p>Video</p> */}
            </div>
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
