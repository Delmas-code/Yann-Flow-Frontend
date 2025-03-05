import { useCallback } from 'react';
import { NodeTypes } from '../utils/Enum';
import { cloneDeep } from 'lodash';

const useNodeActions = (setNodes, setEdges, setSelectedNode, selectedNode) => {
  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    ));
  }, [setNodes, setEdges]);


  const duplicateNode = useCallback((nodeId) => {
    setNodes((nds) => {
      const nodeToClone = nds.find((node) => node.id === nodeId);
      if (!nodeToClone) return nds;

      // Generate a unique timestamp for this duplication operation
      const timestamp = Date.now();

      // Helper function to handle media arrays
      const cloneMediaArray = (mediaArray, mediaType) => {
        if (!mediaArray) return [];
        return mediaArray.map(media => ({
          ...media,
          id: `${media.id}-copy-${timestamp}`,
          // For files that use preview URLs, create new ones to avoid reference issues
          preview: media.preview ? `${media.preview}#${timestamp}` : undefined
        }));
      };

      // Create new node with type-specific data handling
      const newNode = {
        ...cloneDeep(nodeToClone), // Deep clone the base node structure
        id: `${nodeToClone.type}-${timestamp}`,
        position: {
          x: nodeToClone.position.x + 70,
          y: nodeToClone.position.y + 70
        },
        // selected: true, // Select the new node automatically
        data: {
          ...cloneDeep(nodeToClone.data),
          title: `${nodeToClone.data.title || nodeToClone.type} (Copy)`,
        }, selected: false
      };

      // Handle type-specific data cloning
      switch (nodeToClone.type) {
        case NodeTypes.IMAGE_NODE:
          newNode.data.images = cloneMediaArray(nodeToClone.data.images, 'image');
          break;
        
        case NodeTypes.VIDEO_NODE:
          newNode.data.videos = cloneMediaArray(nodeToClone.data.videos, 'video');
          break;
        
        case NodeTypes.AUDIO_NODE:
          newNode.data.audio = cloneMediaArray(nodeToClone.data.audio, 'audio');
          break;
        case NodeTypes.FILE_NODE:
          newNode.data.files = cloneMediaArray(nodeToClone.data.files, 'file');
          break;
        case NodeTypes.LOCATION_NODE:
          newNode.data.locations = cloneMediaArray(nodeToClone.data.locations, 'location');
          break;
        case NodeTypes.BUTTON_NODE:
          newNode.data.buttons = cloneMediaArray(nodeToClone.data.buttons, 'button');
          break;
        // case NodeTypes.CARD_NODE:
        //   newNode.data.locations = cloneMediaArray(nodeToClone.data.buttons, 'card');
        //   break;

        case NodeTypes.CARD_NODE:
          newNode.data.cards = nodeToClone.data.cards;
          newNode.data.formatting = cloneDeep(nodeToClone.data.formatting);
          break;
        case NodeTypes.CAROUSEL_NODE:
          newNode.data.carousels = nodeToClone.data.carousels;
          newNode.data.formatting = cloneDeep(nodeToClone.data.formatting);
          break;
        case NodeTypes.AI_NODE:
          newNode.data.aiContents = nodeToClone.data.aiContents;
          newNode.data.formatting = cloneDeep(nodeToClone.data.formatting);
          break;

        
        case NodeTypes.TEXT_NODE:
          // Ensure text content is properly cloned
          newNode.data.content = nodeToClone.data.content;
          newNode.data.formatting = cloneDeep(nodeToClone.data.formatting);
          break;

        case NodeTypes.TEXT_INPUT_NODE:
          newNode.data.content = nodeToClone.data.content;
          newNode.data.formatting = cloneDeep(nodeToClone.data.formatting);
          break;
        
        case NodeTypes.VOICE_NODE:
          newNode.data.voice = cloneMediaArray(nodeToClone.data.voice, 'voice');
          break;

        case NodeTypes.FILTER_NODE:
            newNode.data.filters = cloneMediaArray(nodeToClone.data.filters, 'filter');
            break;
        
        case NodeTypes.SMART_DELAY_NODE:
          newNode.data.delayTime = nodeToClone.data.delayTime;
          newNode.data.formatting = cloneDeep(nodeToClone.data.formatting);
          break;
        case NodeTypes.API_NODE:
            newNode.data.apis = cloneMediaArray(nodeToClone.data.apis, 'api');
            break;
        case NodeTypes.API_NODE:
          newNode.data.codes = cloneMediaArray(nodeToClone.data.codes, 'code');
          break;
        case NodeTypes.API_NODE:
          newNode.data.customFunctions = cloneMediaArray(nodeToClone.data.customFunctions, 'customFunction');
          break;
        case NodeTypes.API_NODE:
          newNode.data.variables = cloneMediaArray(nodeToClone.data.variables, 'variable');
          break;
        

        default:
          // For unknown node types, ensure data is deeply cloned
          newNode.data = cloneDeep(nodeToClone.data);
      }

      // Deselect all other nodes and select the new one
      return nds.map(n => ({
          ...n,
          // selected: false
        })).concat(newNode);
      });
    }, [setNodes]);




  const onNodeUpdate = useCallback((nodeId, newData) => {
    setNodes((nds) => nds.map((node) => 
      node.id === nodeId ? { ...node, data: { ...newData, onNodeUpdate } } : node
    ));
  }, [setNodes]);

  const setNodesWithPanelUpdate = useCallback((updater) => {
    setNodes((currentNodes) => {
      const result = typeof updater === 'function' ? updater(currentNodes) : updater;
      if (selectedNode && !result.find(node => node.id === selectedNode.id)) {
        setSelectedNode(null);
      }
      return result;
    });
  }, [selectedNode, setNodes, setSelectedNode]);

  const closePropertiesPanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const addImageNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Image Block',
        label: `New ${type}`,
        images: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addVideoNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Video Block',
        label: `New ${type}`,
        videos: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addAudioNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Audio Block',
        label: `New ${type}`,
        audios: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addFileNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'File Block',
        label: `New ${type}`,
        files: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addLocationNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Location Block',
        label: `New ${type}`,
        locations: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addButtonNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Button Block',
        label: `New ${type}`,
        buttons: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addCardNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Card Block',
        label: `New ${type}`,
        cards: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addCarouselNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Carousel Block',
        label: `New ${type}`,
        carousels: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addAINode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'AI Block',
        label: `New ${type}`,
        aiContents: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addTextInputNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Text Input Block',
        label: `New ${type}`,
        textEntries: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addVoiceNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Voice Block',
        label: `New ${type}`,
        audios: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addFilterNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Filter Block',
        label: `New ${type}`,
        filters: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);
  const addSmartDelayNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Smart Delay Block',
        label: `New ${type}`,
        delayTime: {},
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addRandomizerNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Randomizer Block',
        label: `New ${type}`,
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addConditionNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Condition Block',
        label: `New ${type}`,
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addApiNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'API Block',
        label: `New ${type}`,
        apis: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);
  const addCodeNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Code Block',
        label: `New ${type}`,
        codes: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addFunctionNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Function Block',
        label: `New ${type}`,
        customFunctions: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);

  const addVariableNode = useCallback((position, type) => {
    const newNode = {
      id: `node_${type}_${Date.now()}`,
      type,
      position,
      data: { 
        title: 'Variable Block',
        label: `New ${type}`,
        variables: [],
        onNodeUpdate
      }
    };
    setNodesWithPanelUpdate((nds) => nds.concat(newNode));
  }, [setNodesWithPanelUpdate, onNodeUpdate]);


  return {
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
    addVariableNode,
    deleteNode,
    duplicateNode,
    onNodeUpdate,
    setNodesWithPanelUpdate,
    closePropertiesPanel,
  };
};

export { useNodeActions };