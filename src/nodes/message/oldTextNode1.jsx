import React, { memo } from "react";
import "@fontsource/outfit"
import { Handle, Position } from "@xyflow/react"

const TextNode = ({ data, isConnectable }) => {
    return (
        <div className="text-node" style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            background: 'white',
            minWidth: '20px'
        }}>
        <Handle 
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
        />

        <div className="node-header" style={{
            borderBottom: '1px solid #eee',
            paddingBottom: '8px',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Text
        </div>

        <div className="node-content">
          <textarea 
          value={data.text || 'Enter your message...'}
          onChange={(e) => data.onChange('text', e.target.value)}
          style={{
            width: '90%',
            height: '80px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '8px',
            resize: 'none'
          }}
          />
        </div>

        <Handle
        type="source"
        position={Position.Right}
        id= "a"
        isConnectable= {isConnectable}
        />

        </div>
    )
}

export default memo(TextNode)
