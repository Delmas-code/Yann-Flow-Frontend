import React, { useState } from 'react';
// import { Handle, Position } from 'reactflow';
import { Handle, Position } from '@xyflow/react';
import { ConditionIcon2 } from '../../modules/projectIcons';
import { Trash2 } from 'lucide-react';
import DeleteConfirmationModal from '../../modules/deleteConfirmationModal';



const ConditionNode = ( props ) => {
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
        <div className={`condition ${selected ? 'selected' : ''}`}>
        
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
                    <ConditionIcon2 />
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

export default ConditionNode;