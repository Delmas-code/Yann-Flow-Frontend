// editor/ToolbarPlugin.jsx
import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND
} from 'lexical';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND
} from '@lexical/list';
import {
  $createHeadingNode,
  $isHeadingNode
} from '@lexical/rich-text';
import {
  Bold, 
  Italic, 
  Underline,
  List, 
  ListOrdered,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  
  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };

  const formatUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
  };

  const formatNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
  };

  // You would implement these in a full version
  const formatLink = () => {
    // Logic to insert a link
  };

  const formatAlignLeft = () => {
    // Logic to align text left
  };

  const formatAlignCenter = () => {
    // Logic to align text center
  };

  const formatAlignRight = () => {
    // Logic to align text right
  };

  return (
    <div className="toolbar">
      <button onClick={formatBold} className="toolbar-item" title="Bold">
        <Bold size={18} />
      </button>
      <button onClick={formatItalic} className="toolbar-item" title="Italic">
        <Italic size={18} />
      </button>
      <button onClick={formatUnderline} className="toolbar-item" title="Underline">
        <Underline size={18} />
      </button>
      <span className="divider" />
      <button onClick={formatBulletList} className="toolbar-item" title="Bullet List">
        <List size={18} />
      </button>
      <button onClick={formatNumberedList} className="toolbar-item" title="Numbered List">
        <ListOrdered size={18} />
      </button>
      <span className="divider" />
      <button onClick={formatLink} className="toolbar-item" title="Insert Link">
        <Link size={18} />
      </button>
      <span className="divider" />
      <button onClick={formatAlignLeft} className="toolbar-item" title="Align Left">
        <AlignLeft size={18} />
      </button>
      <button onClick={formatAlignCenter} className="toolbar-item" title="Align Center">
        <AlignCenter size={18} />
      </button>
      <button onClick={formatAlignRight} className="toolbar-item" title="Align Right">
        <AlignRight size={18} />
      </button>
    </div>
  );
};

export default ToolbarPlugin;