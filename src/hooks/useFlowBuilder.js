import { useState, useCallback, useMemo } from 'react';
import { useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { NodeTypes } from '../utils/Enum';
import { useNodeActions } from './useNodeActions';
import { useNodeTypes } from './useNodeTypes';

const useFlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const {
    deleteNode,
    duplicateNode,
    onNodeUpdate,
    setNodesWithPanelUpdate,
    closePropertiesPanel,
    addImageNode,
    addVideoNode,
    addAudioNode,
    addFileNode,
    addLocationNode,
    addButtonNode,
    addCardNode,
    addCarouselNode,
    addAINode,
    addTextInputNode,
    addVoiceNode,
    addFilterNode,
    addSmartDelayNode,
    addRandomizerNode,
    addConditionNode,
    addApiNode,
    addCodeNode,
    addFunctionNode,
    addVariableNode
  } = useNodeActions(setNodes, setEdges, setSelectedNode, selectedNode);

  const nodeTypes = useNodeTypes({ deleteNode, duplicateNode, onNodeUpdate, closePropertiesPanel });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDragStart  = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const position = { 
      x: event.clientX, 
      y: event.clientY 
    };
    
    if (type === NodeTypes.IMAGE_NODE) {
      addImageNode(position, type);
    } else if (type === NodeTypes.TEXT_NODE) {
      const newNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { label: `New ${type}` },
      };
      setNodesWithPanelUpdate((nds) => nds.concat(newNode));
    } else if (type === NodeTypes.VIDEO_NODE) {
      addVideoNode(position, type);
    } else if (type === NodeTypes.AUDIO_NODE) {
      addAudioNode(position, type);
    } else if (type === NodeTypes.FILE_NODE) {
      addFileNode(position, type);
    } else if (type === NodeTypes.LOCATION_NODE) {
      addLocationNode(position, type);
    } else if (type === NodeTypes.BUTTON_NODE) {
      addButtonNode(position, type);
    } else if (type === NodeTypes.CARD_NODE) {
      addCardNode(position, type);
    } else if (type === NodeTypes.CAROUSEL_NODE) {
      addCarouselNode(position, type);
    } else if (type === NodeTypes.AI_NODE) {
      addAINode(position, type);
    } else if (type === NodeTypes.TEXT_INPUT_NODE) {
      addTextInputNode(position, type);
    } else if (type === NodeTypes.VOICE_NODE) {
      addVoiceNode(position, type);
    } else if (type === NodeTypes.FILTER_NODE) {
      addFilterNode(position, type);
    } else if (type === NodeTypes.RANDOMIZER_NODE) {
      addRandomizerNode(position, type);
    } else if (type === NodeTypes.CONDITION_NODE) {
      addConditionNode(position, type);
    } else if (type === NodeTypes.SMART_DELAY_NODE) {
      addSmartDelayNode(position, type);
    } else if (type === NodeTypes.API_NODE) {
      addApiNode(position, type);
    } else if (type === NodeTypes.CODE_NODE) {
      addCodeNode(position, type);
    } else if (type === NodeTypes.FUNCTION_NODE) {
      addFunctionNode(position, type);
    } else if (type === NodeTypes.VARIABLE_NODE) {
      addVariableNode(position, type);
    }
    

  }, [
    addImageNode, addVideoNode, addAudioNode, addFileNode,addLocationNode, addButtonNode, 
    addCardNode, addCarouselNode, addAINode, addTextInputNode, addVoiceNode, addFilterNode,
    addRandomizerNode, addConditionNode, addSmartDelayNode, addApiNode, addCodeNode, 
    addFunctionNode, addVariableNode, setNodesWithPanelUpdate
  ]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handlers = {
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStart,
    onNodeClick,
    onPaneClick: closePropertiesPanel,
    onDrop,
    onDragOver
  };

  return {
    nodes,
    edges,
    selectedNode,
    handlers,
    nodeTypes,
    setNodesWithPanelUpdate,
    closePropertiesPanel
  };
};

export { useFlowBuilder };