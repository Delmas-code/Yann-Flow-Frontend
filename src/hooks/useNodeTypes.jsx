import { useMemo } from 'react';
import TextNode from '../nodes/message/TextNode';
import ImageNode from '../nodes/message/ImageNode';
import VideoNode from '../nodes/message/VideoNode';
import AudioNode from '../nodes/message/AudioNode';
import FileNode from '../nodes/message/FileNode';
import LocationNode from '../nodes/message/locationNode';
import ButtonNode from '../nodes/message/ButtonNode';
import CardNode from '../nodes/message/CardNode';
import CarouselNode from '../nodes/message/CarouselNode';
import TextInputNode from '../nodes/listen_to/TextInputNode';
import VoiceNode from '../nodes/listen_to/voiceNode';
import AINode from '../nodes/message/AINode';
import FilterNode from '../nodes/logic/FilterNode';
import RandomizerNode from '../nodes/logic/RandomizerNode';
import ConditionNode from '../nodes/logic/ConditionNode';
import SmartDelayNode from '../nodes/logic/SmartDelayNode';
import ApiNode from '../nodes/development/ApiNode';
import CodeNode from '../nodes/development/CodeNode';
import FunctionNode from '../nodes/development/FunctionNode';
import VariableNode from '../nodes/development/VariableNode';

const useNodeTypes = ({ deleteNode, duplicateNode, onNodeUpdate, closePropertiesPanel }) => {
  return useMemo(() => ({
    imageNode: (props) => (
      <ImageNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    textNode: (props) => (
      <TextNode
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
      />
    ),
    videoNode: (props) => (
      <VideoNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    audioNode: (props) => (
      <AudioNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    fileNode: (props) => (
      <FileNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    locationNode: (props) => (
      <LocationNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    buttonNode: (props) => (
      <ButtonNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    cardNode: (props) => (
      <CardNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    carouselNode: (props) => (
      <CarouselNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    aiNode: (props) => (
      <AINode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    textInputNode: (props) => (
      <TextInputNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    voiceNode: (props) => (
      <VoiceNode 
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    filterNode: (props) => (
      <FilterNode
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    randomizerNode: (props) => (
      <RandomizerNode
        {...props}
        deleteNode={deleteNode}
        onNodeUpdate={onNodeUpdate}
      />
    ),
    conditionNode: (props) => (
      <ConditionNode
        {...props}
        deleteNode={deleteNode}
        onNodeUpdate={onNodeUpdate}
      />
    ),
    smartDelayNode: (props) => (
      <SmartDelayNode
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    apiNode: (props) => (
      <ApiNode
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    codeNode: (props) => (
      <CodeNode
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    functionNode: (props) => (
      <FunctionNode
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
    variableNode: (props) => (
      <VariableNode
        {...props}
        deleteNode={deleteNode}
        duplicateNode={duplicateNode}
        onNodeUpdate={onNodeUpdate}
        closePropertiesPanel={closePropertiesPanel}
      />
    ),
  }), [deleteNode, duplicateNode, onNodeUpdate]);
};

export { useNodeTypes };