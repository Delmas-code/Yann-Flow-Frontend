import React, { useState } from 'react';
import { Handle } from '@xyflow/react';
import { VideoIcon } from '../../modules/projectIcons';
import { Trash2, Copy, Edit3 } from 'lucide-react';
  

const VideoNode = (props) => {
   
  const { data, isConnectable, selected, id } = props;
  const { deleteNode, duplicateNode, closePropertiesPanel } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [nodeName, setNodeName] = useState(data.title || 'Video Block');
    
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
      className={`media-node video-node ${selected ? 'selected' : ''}`}
      
    >
      <Handle type="target" position="left" />
      {/* <Handle 
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      /> */}
      
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

      <div className="media-list video-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.videos?.slice(0, 3).map((video, index) => (
          <div
            key={index}
            className="media-item video-item"
            onMouseEnter={(e) => e.currentTarget.style.background = '#c8e6c9'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#e8f5e9'}
          >
            <VideoIcon />
            <span>{video.name ? (video.name.length > 25 ? `${video.name.slice(0, 25)}...` : video.name) : `Video ${index + 1}`}</span>
          </div>
        ))}
        
        {data.videos?.length > 3 && (
          <div style={{ color: '#666', fontSize: '0.8em' }}>
            + {data.videos.length - 3} more videos
          </div>
        )}
      </div>

      <Handle type="source" position="right" />
    </div>
  );
};

export default VideoNode;
