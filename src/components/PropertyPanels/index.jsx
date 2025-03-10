import React from 'react';
import { NodeTypes } from '../../utils/Enum';
import DefaultPropertiesPanel from '../PropertyPanels/DefaultPropertiesPanel';
import TextNodePropertyPanel from '../PropertyPanels/TextNodePropertyPanel';
import ImagePropertyPanel from '../PropertyPanels/ImageNodePropertyPanel';
import VideoNodePropertyPanel from '../PropertyPanels/VideoNodePropertyPanel';
import AudioNodePropertyPanel from '../PropertyPanels/AudioNodePropertyPanel';
import FileNodePropertyPanel from '../PropertyPanels/FileNodePropertyPanel';
import LocationNodePropertyPanel from './LocationNodePropertyPanel';
import ButtonNodePropertyPanel from './ButtonNodePropertyPanel';
import CardNodePropertyPanel from './CardNodePropertyPanel ';
import TextInputNodePropertyPanel from './TextInputNodePropertyPanel';
import VoiceNodePropertyPanel from './VoiceNodePropertyPanel';
import CarouselNodePropertyPanel from './CarouselNodePropertyPanel ';
import AINodePropertyPanel from './AINodePropertyPanel';
import FilterNodePropertyPanel from './FilterNodePropertyPanel';
import ConditionNodePropertyPanel from './ConditionNodeNodePropertyPanel';
import RandomizerNodePropertyPanel from './RandomizerNodeNodePropertyPanel';
import SmartDelayNodePropertyPanel from './SmartNodeNodePropertyPanel';
import APINodePropertyPanel from './ApiNodePropertyPanel';
import CodeNodePropertyPanel from './CodeNodePropertyPanel';
import FunctionNodePropertyPanel from './FunctionNodePropertyPanel';
import VariableNodePropertyPanel from './VariableNodePropertyPanel';
const PropertiesPanel = ({ selectedNode, setNodes, onClose }) => {
  const propertyPanels = {
    [NodeTypes.IMAGE_NODE]: ImagePropertyPanel,
    [NodeTypes.TEXT_NODE]: TextNodePropertyPanel,
    [NodeTypes.VIDEO_NODE]: VideoNodePropertyPanel,
    [NodeTypes.AUDIO_NODE]: AudioNodePropertyPanel,
    [NodeTypes.FILE_NODE]: FileNodePropertyPanel,
    [NodeTypes.LOCATION_NODE]: LocationNodePropertyPanel,
    [NodeTypes.BUTTON_NODE]: ButtonNodePropertyPanel,
    [NodeTypes.CARD_NODE]: CardNodePropertyPanel,
    [NodeTypes.CAROUSEL_NODE]: CarouselNodePropertyPanel,
    [NodeTypes.AI_NODE]: AINodePropertyPanel,
    [NodeTypes.TEXT_INPUT_NODE]: TextInputNodePropertyPanel,
    [NodeTypes.VOICE_NODE]: VoiceNodePropertyPanel,
    [NodeTypes.FILTER_NODE]: FilterNodePropertyPanel,
    [NodeTypes.RANDOMIZER_NODE]: RandomizerNodePropertyPanel,
    [NodeTypes.CONDITION_NODE]: ConditionNodePropertyPanel,

    [NodeTypes.SMART_DELAY_NODE]: SmartDelayNodePropertyPanel,
    [NodeTypes.API_NODE]: APINodePropertyPanel,
    [NodeTypes.CODE_NODE]: CodeNodePropertyPanel,
    [NodeTypes.FUNCTION_NODE]: FunctionNodePropertyPanel,
    [NodeTypes.VARIABLE_NODE]: VariableNodePropertyPanel,
    default: DefaultPropertiesPanel
  };

  if (!selectedNode) return null;

  // Get the appropriate panel component or use default
  const PanelComponent = propertyPanels[selectedNode.type] || propertyPanels.default;
  

  return (
    <div style={{
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '280px'
    }}>
      <PanelComponent 
        node={selectedNode}
        setNodes={setNodes}
        onClose={onClose}
      />
    </div>
  );
};

export default PropertiesPanel;