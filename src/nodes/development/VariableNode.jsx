import React, { useState } from 'react';
import { Handle } from '@xyflow/react';
import { VariableIcon } from '../../modules/projectIcons';
import { Trash2, Copy, Edit3 } from 'lucide-react';
import DeleteConfirmationModal from '../../modules/deleteConfirmationModal';

  

const VariableNode = (props) => {
   
  const { data, isConnectable, selected, id } = props;
  const { deleteNode, duplicateNode, closePropertiesPanel } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [nodeName, setNodeName] = useState(data.title || 'Variable Block');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    
  const handleNameChange = (e) => {
    setNodeName(e.target.value);
  };

  const handleNameSubmit = () => {
    if (data.onNodeUpdate) {
      data.onNodeUpdate(id, { ...data, title: nodeName });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
  };

  const handleDelete = () => {
    deleteNode(props.id);

    // Give a small delay to ensure state updates don't conflict
    setTimeout(() => {
      closePropertiesPanel();
    }, 0);
  };

  const confirmDelete = () => {
    handleDelete();
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
        <div
        className={`media-node variable-node ${selected ? 'selected' : ''}`}
        
        >
        <Handle type="target" position="left" />
        
        {/* Action buttons that appear when selected */}
        {selected && (
            <div className="node-actions">
            <button className="delete-node"
              onClick={() => setShowDeleteConfirmation(true)}
              title="Delete node"
            >
                <Trash2 size={16} />
            </button>

            <button className="duplicate-node"
                onClick={() => duplicateNode(id)}
                title="Duplicate node"
            >
                <Copy size={16} />
            </button>
            </div>
        )}
        
        <div className="node-header">
            {isEditing ? (
            <input
                type="text"
                value={nodeName}
                onChange={handleNameChange}
                onBlur={handleNameSubmit}
                onKeyDown={handleKeyDown}
                autoFocus
            />
            ) : (
            <h3>{nodeName}</h3>
            )}
            
            {selected && !isEditing && (
            <button
                onClick={() => setIsEditing(true)}
                title="Rename node"
            >
                <Edit3 size={14} />
            </button>
            )}
        </div>

        <div className="media-list variable-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.variables?.slice(0, 3).map((variable, index) => (
            <div
                key={index}
                className="media-item variable-item"
                style={{
                
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#c8e6c9'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#e8f5e9'}
            >
                <VariableIcon />
                <span>{variable.name ? (variable.name.length > 25 ? `${variable.name.slice(0, 25)}...` : variable.name) : `Variable ${index + 1}`}</span>
            </div>
            ))}
            
            {data.variables?.length > 3 && (
            <div style={{ color: '#666', fontSize: '0.8em' }}>
                + {data.variables.length - 3} more variables
            </div>
            )}
        </div>

        <Handle type="source" position="right" />
        </div>
        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && (
        <DeleteConfirmationModal 
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default VariableNode;
