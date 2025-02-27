import React, { useState } from 'react';
import { Handle } from '@xyflow/react';
import "@fontsource/outfit"
import { TextIcon2 } from '../../modules/projectIcons';
import { Trash2, Copy, Edit3 } from 'lucide-react';

const TextNode = (props) => {
   
  const { data, isConnectable, selected, id } = props;
  const { deleteNode, duplicateNode, closePropertiesPanel } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [nodeName, setNodeName] = useState(data.title || 'Text Block');
    
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

  return (
    <div
      className={`media-node text-node ${selected ? 'selected' : ''}`}
    >
      <Handle type="target" position="left" />
      
      {/* Action buttons that appear when selected */}
      {selected && (
        <div className="node-actions">
          <button className="delete-node"
            onClick={handleDelete}
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

      <div className="media-list text-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.textEntries?.slice(0, 3).map((entry, index) => (
          <div
            key={index}
            className="media-item text-item"
            onMouseEnter={(e) => e.currentTarget.style.background = '#e3f2fd'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f5f9ff'}
          >
            <TextIcon2 />
            <span>
              {entry.plainText 
                ? (entry.plainText.length > 25 ? `${entry.plainText.slice(0, 25)}...` : entry.plainText) 
                : `Text ${index + 1}`}
            </span>
          </div>
        ))}
        
        {data.textEntries?.length > 3 && (
          <div style={{ color: '#666', fontSize: '0.8em' }}>
            + {data.textEntries.length - 3} more text entries
          </div>
        )}
      </div>

      <Handle type="source" position="right" />
    </div>
  );
};

export default TextNode;