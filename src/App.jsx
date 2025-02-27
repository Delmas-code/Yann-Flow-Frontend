import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import FlowBuilder from './components/FlowBuilder';
import '@xyflow/react/dist/style.css';

function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}

export default App;