import React from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';

const FlowCanvas = ({ nodes, edges, nodeTypes, handlers }) => (
  <div className="flow-canvas" style={{ 
    flex: 1,
    marginLeft: '25%',
    height: '100vh',
    width: '75%'
  }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      {...handlers}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  </div>
);

export default FlowCanvas;