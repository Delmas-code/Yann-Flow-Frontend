import { useMemo } from 'react';
import TextNode from '../nodes/message/TextNode';
import ImageNode from '../nodes/message/ImageNode';
import VideoNode from '../nodes/message/VideoNode';
import AudioNode from '../nodes/message/AudioNode';
import FileNode from '../nodes/message/FileNode';
import LocationNode from '../nodes/message/locationNode';
import ButtonNode from '../nodes/message/ButtonNode';
import TextInputNode from '../nodes/listen_to/TextInputNode';
import CardNode from '../nodes/message/CardNode';

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
    textInputNode: (props) => (
      <TextInputNode 
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