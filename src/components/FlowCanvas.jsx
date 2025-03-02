import React from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';

const FlowCanvas = ({ nodes, edges, nodeTypes, handlers }) => (
  <div className="flow-canvas" style={{ 
    flex: 1,
    marginLeft: '20%',
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
      // fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  </div>
);

export default FlowCanvas;