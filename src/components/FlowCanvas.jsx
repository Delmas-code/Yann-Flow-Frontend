import React from 'react';
import { NodeTypes } from '../utils/Enum';
import { ReactFlow, Controls, Background, ConnectionMode } from '@xyflow/react';


const FlowCanvas = ({ nodes, edges, nodeTypes, handlers, sidebarCollapsed  }) => {
  
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
  // Dynamically calculate margins and width based on sidebar state
  // const sidebarWidth = sidebarCollapsed ? '70px' : '22%';
  const sidebarWidth = sidebarCollapsed ? '7%' : '22%';


  return (
  <div className="flow-canvas" style={{ 
    flex: 1,
    height: '100vh',
    width: `calc(100% - ${sidebarWidth})`,
    marginLeft: sidebarWidth,
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
    // zIndex: 1
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
      // style={{ zIndex: 1 }}
    >
      <Controls />
      <Background />
    </ReactFlow>
  </div>
  )
};

export default FlowCanvas;