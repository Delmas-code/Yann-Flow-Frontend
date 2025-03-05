import React, { useState } from 'react';
// import { Handle, Position } from 'reactflow';
import { Handle, Position } from '@xyflow/react';
import { RandomizerIcon2 } from '../../modules/projectIcons';
import { Trash2 } from 'lucide-react';
import DeleteConfirmationModal from '../../modules/deleteConfirmationModal';



const RandomizerNode = ( props ) => {
    const { isConnectable, selected } = props;
    const { deleteNode } = props;
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
      <div className={`randomizer ${selected ? 'selected' : ''}`}>
        {/* Input Handle (Single Source) */}
        {/* <Handle 
          type="target" 
          position={Position.Left} 
          style={{ 
            background: '#ffffff', 
            border: '2px solid #237804',
            width: '10px', 
            height: '10px' 
          }} 
        /> */}
          <Handle type="target" position="left" />
              {selected && (
                  <div className="node-actions" style={{ right: '25%'}}>
                  <button className="delete-node"
                  onClick={() => setShowDeleteConfirmation(true)}
                  title="Delete node"
                  >
                      <Trash2 size={16} />
                  </button>

                  </div>
              )}
              <div>
                  <RandomizerIcon2 />
              </div>


          {/* Multiple Output Handles */}
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

export default RandomizerNode;