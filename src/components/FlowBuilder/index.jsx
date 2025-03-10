import React, { useState} from 'react';
import FlowCanvas from '../FlowCanvas';
import Sidebar from '../Sidebar';
import PropertiesPanel from '../PropertyPanels/index';
import { useFlowBuilder } from '../../hooks/useFlowBuilder';

const FlowBuilder = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        handlers={handlers}
        sidebarCollapsed={isCollapsed} 
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
