import React, { useState, useEffect, useCallback, memo } from 'react';
import { FileText, PlusCircle, X } from 'lucide-react';
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
import ToolbarPlugin from '../../editor/ToolbarPlugin';
import { textInputStyles } from '../../modules/panelStyles';
import { TextInputPropIcon } from '../../modules/projectIcons';

// Memoized text preview component
const TextEntryPreview = memo(({ entry, onRemove, index }) => (
  <div style={textInputStyles.previewContainer}>
    <div style={textInputStyles.textPreview} dangerouslySetInnerHTML={{ __html: entry.html }} />
    <button
      onClick={() => onRemove(entry.id)}
      style={textInputStyles.removeButton}
    >
      <X size={16} />
    </button>
  </div>
));

const TextInputNodePropertyPanel = ({ node, setNodes, onClose }) => {
  const [title, setTitle] = useState(node.data?.title || 'Text Block');
  const [textEntries, setTextEntries] = useState(node.data?.textEntries || []);
  const [activeTab, setActiveTab] = useState('options');
  const [editorState, setEditorState] = useState(null);
  const [currentHTML, setCurrentHTML] = useState('');
  const [currentPlainText, setCurrentPlainText] = useState('');

  // Load data only when node ID changes
  useEffect(() => {
    if (node?.id) {
      setTitle(node.data?.title || 'Text Block');
      setTextEntries(node.data?.textEntries || []);
    }
  }, [node?.id]);

  // Memoized update function
  const updateNodeData = useCallback((entries, nodeTitle) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              textEntries: entries,
              title: nodeTitle
            }
          };
        }
        return n;
      })
    );
  }, [node?.id, setNodes]);

  // Handle editor changes
  const handleEditorChange = useCallback((editorState) => {
    setEditorState(editorState);
    
    // Get HTML and plain text from editor
    editorState.read(() => {
      const editorStateJSON = editorState.toJSON();
      
      // This is simplified - in a real implementation,
      // you would use a proper serializer to HTML
      const htmlOutput = document.querySelector('.editor-content')?.innerHTML || '';
      setCurrentHTML(htmlOutput);
      
      // For plain text preview
      const textContent = document.querySelector('.editor-content')?.textContent || '';
      setCurrentPlainText(textContent);
    });
  }, []);

  // Add current text entry to the list
  const addTextEntry = useCallback(() => {
    if (currentHTML.trim()) {
      if (currentPlainText != "") {
        const newEntry = {
          id: `text-input-${Date.now()}`,
          html: currentHTML,
          plainText: currentPlainText,
          editorState: editorState ? editorState.toJSON() : null
        };
        
        const updatedEntries = [...textEntries, newEntry];
        setTextEntries(updatedEntries);
        updateNodeData(updatedEntries, title);
        
        // Reset editor - in a real implementation you would
        // clear the Lexical editor state
        setCurrentHTML('');
        setCurrentPlainText('');
        // You'd need to reset the editor content here
      }
    }
  }, [currentHTML, currentPlainText, editorState, textEntries, updateNodeData, title]);

  // Remove a text entry
  const removeTextEntry = useCallback((entryId) => {
    setTextEntries(prev => {
      const newEntries = prev.filter(entry => entry.id !== entryId);
      updateNodeData(newEntries, title);
      return newEntries;
    });
  }, [updateNodeData, title]);

  // Lexical editor configuration
  const editorConfig = {
    namespace: 'TextNodeEditor',
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
      
      <div className="property-panel-content">
        {activeTab === 'options' ? (
          <div style={textInputStyles.container}>
            <div style={{display: "flex"}}>
              <div style={{ width: "32px", height: "32px",  }}>
                  <TextInputPropIcon />
              </div>
              <p style={{ marginBottom: '-10px'}}>Text Input</p>
            </div>
            <hr style={{marginTop: '-7px'}}/>
            <p style={{marginTop: '-10px', fontSize: '17px', paddingLeft: 0, margin: '-10px 0 0 0',}}>Enter your text prompt</p>
            
            <div style={textInputStyles.editorContainer}>
              <LexicalComposer initialConfig={editorConfig}>
                <div className="editor-container">
                  <ToolbarPlugin />
                  <div style={textInputStyles.editor}>
                    <RichTextPlugin
                      contentEditable={<ContentEditable className="editor-content" />}
                      // placeholder={<div className="editor-placeholder">Enter some rich text...</div>}
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

            <button 
              style={textInputStyles.addButton}
              onClick={addTextEntry}
            >
              <PlusCircle size={16} color="#237804"/>
              Add Text Entry
            </button>

            <div style={textInputStyles.previewList}>
              {textEntries.map((entry, index) => (
                <TextEntryPreview 
                  key={entry.id}
                  entry={entry}
                  index={index}
                  onRemove={removeTextEntry}
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

export default TextInputNodePropertyPanel;