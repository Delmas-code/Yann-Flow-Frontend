import React, { useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '@ckeditor/ckeditor5-build-classic/build/ckeditor.css'; // CSS import


const TextNodePropertyPanel = ({ node, setNodes, onClose }) => {
    

    const handleChange = useCallback(
        (newContent) => {
          setNodes((nodes) =>
            nodes.map((n) => {
              if (n.id === node.id) {
                return {
                  ...n,
                  data: { ...n.data, text: newContent }
                };
              }
              return n;
            })
          );
        },
        [node.id, setNodes]
      );

    return (
        <div className="properties-panel" style={{
            width: '280px',
            backgroundColor: '#f5f5f5',
            borderLeft: '1px solid #ddd',
            height: '100vh',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column'
        }}>
                {/* Close button */}
                <button 
                    onClick={onClose}
                    style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            fontSize: '18px',
                            cursor: 'pointer',
                            color: '#666',
                            zIndex: 1
                    }}
                    aria-label="Close properties panel"
                >
                    ✕
                </button>

                <div style={{ padding: '15px' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Text Properties</h3>
                </div>


                {/* Editor */}
                <div style={{ 
                    flex: 1, 
                    padding: '15px',
                    overflowY: 'auto'
                }}>
                    {/* <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Initial content.</p>"
                        onReady={ editor => {
                        setEditorInstance(editor); // Store the editor instance if needed
                        } }
                        onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // Update your ReactFlow node data with the new content
                        {handleChange}; // Assuming you have a prop to update the node
                        } }
                        onBlur={ ( event, editor ) => {
                        // Handle blur event if necessary
                        {handleChange}
                        } }
                        onFocus={ ( event, editor ) => {
                        // Handle focus event if necessary
                        {handleChange}
                        } }
                    /> */}

                        <div style={{ padding: '15px', flex: 1 }}>
                            <div style={{ minHeight: '300px' }}> {/* Height container */}
                            <CKEditor
                                editor={ClassicEditor}
                                data={node.data.text || "<p>Enter text here</p>"}
                                onReady={(editor) => {/* Optional setup */}}
                                onChange={(event, editor) => {
                                handleChange(editor.getData());
                                }}
                            />
                        </div>
                    
                    {/* Delete button */}
                    <button
                        onClick={() => setNodes((nodes) => nodes.filter((n) => n.id !== node.id))}
                        style={{
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginTop: '20px',
                            width: '100%'
                        }}
                    >
                        Delete Node
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextNodePropertyPanel;