import React, { useState } from 'react';
import { Handle } from '@xyflow/react';
import { SmartDelayIcon2 } from '../../modules/projectIcons';
import { Trash2, Copy, Edit3 } from 'lucide-react';
import DeleteConfirmationModal from '../../modules/deleteConfirmationModal';

  

const SmartDelayNode = (props) => {
   
  const { data, isConnectable, selected, id } = props;
  const { deleteNode, duplicateNode, closePropertiesPanel } = props;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
        className={`smart-delay ${selected ? 'selected' : ''}`}
        
      >
        <Handle type="target" position="left" />
        
          {/* Action buttons that appear when selected */}
          {selected && (
              <div className="node-actions" style={{ right: 0}}>
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
          <div>
            <SmartDelayIcon2 />
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

export default SmartDelayNode;
