import React from 'react';
import { NodeTypes } from '../utils/Enum';
import { ReactFlow, Controls, Background, ConnectionMode } from '@xyflow/react';


const FlowCanvas = ({ nodes, edges, nodeTypes, handlers }) => {
  
  const isValidConnection = (connection) => {
    // Find the source node
    const sourceNode = nodes.find(n => n.id === connection.source);
    
    // Allow all connections from the special node
    if (sourceNode?.type === NodeTypes.RANDOMIZER_NODE || 
        sourceNode?.type === NodeTypes.CONDITION_NODE
      ) return true;

    // Check if the source handle already has a connection
    const hasExistingConnection = edges.some(edge => 
      edge.source == connection.source && 
      edge.sourceHandle == connection.sourceHandle
    );

    return !hasExistingConnection;
  };


  return (
  <div className="flow-canvas" style={{ 
    flex: 1,
    marginLeft: '22%',
    height: '100vh',
    width: '75%'
  }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      {...handlers}
      defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
      fitView={false}
      // connectionMode={ConnectionMode.Loose}
      isValidConnection={isValidConnection}
    >
      <Controls />
      <Background />
    </ReactFlow>
  </div>
  )
};

export default FlowCanvas;