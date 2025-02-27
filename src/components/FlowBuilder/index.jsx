import React from 'react';
import FlowCanvas from '../FlowCanvas';
import Sidebar from '../Sidebar';
import PropertiesPanel from '../PropertyPanels/index';
import { useFlowBuilder } from '../../hooks/useFlowBuilder';

const FlowBuilder = () => {
  const {
    nodes,
    edges,
    selectedNode,
    handlers,
    nodeTypes,
    setNodesWithPanelUpdate,
    closePropertiesPanel
  } = useFlowBuilder();

  return (
    <div className="flow-builder-container" style={{ height: '100vh', display: 'flex' }}>
      <Sidebar />
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        handlers={handlers}
      />
      <PropertiesPanel
        selectedNode={selectedNode}
        setNodes={setNodesWithPanelUpdate}
        onClose={closePropertiesPanel}
      />
    </div>
  );
};

export default FlowBuilder;