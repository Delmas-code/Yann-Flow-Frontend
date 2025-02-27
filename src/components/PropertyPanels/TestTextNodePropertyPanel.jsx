import React, { useEffect, useRef } from 'react';


"https://www.youtube.com/watch?v=AreW3Q-13Ok"
const TextNodePropertyPanel = ({ node, setNodes, onClose }) => {
    const editorRef = useRef(null);

    // Function to handle content changes
    const handleContentChange = () => {
        if (editorRef.current) {
            setNodes((nodes) =>
                nodes.map((n) => {
                    if (n.id === node.id) {
                        return {
                            ...n,
                            data: {
                                ...n.data,
                                text: editorRef.current.innerHTML
                            },
                        };
                    }
                    return n;
                })
            );
        }
    };

    // Function to execute commands
    const executeCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    // Focus the editor when mounted
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = node.data.text || 'Enter your message...';
        }
    }, [node.data.text]);

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

            {/* Toolbar */}
            <div style={{
                padding: '0 15px',
                display: 'flex',
                gap: '5px',
                flexWrap: 'wrap',
                borderBottom: '1px solid #ddd',
                paddingBottom: '10px'
            }}>
                <button
                    onClick={() => executeCommand('bold')}
                    style={{
                        padding: '5px 10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Bold
                </button>
                <button
                    onClick={() => executeCommand('italic')}
                    style={{
                        padding: '5px 10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Italic
                </button>
                <button
                    onClick={() => executeCommand('insertUnorderedList')}
                    style={{
                        padding: '5px 10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Bullet List
                </button>
                <button
                    onClick={() => executeCommand('insertOrderedList')}
                    style={{
                        padding: '5px 10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Numbered List
                </button>
            </div>

            {/* Editor */}
            <div style={{ 
                flex: 1, 
                padding: '15px',
                overflowY: 'auto'
            }}>
                <div
                    style={{
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: '10px',
                        minHeight: '200px',
                        marginBottom: '20px'
                    }}
                >
                    <div
                        ref={editorRef}
                        contentEditable={true}
                        onInput={handleContentChange}
                        onBlur={handleContentChange}
                        style={{
                            outline: 'none',
                            minHeight: '100%'
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
    );
};

export default TextNodePropertyPanel;