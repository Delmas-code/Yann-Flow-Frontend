import React, { memo } from "react";
import "@fontsource/outfit"
import { Handle, Position } from "@xyflow/react"
import DOMPurify from 'dompurify';

const TextNode = ({ data, isConnectable }) => {

    // truncate and strip HTML tags for node display
    const getTruncatedText = (htmlContent, maxLength = 100) => {
        // Create a temporary div to render HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = DOMPurify.sanitize(htmlContent || '');
        const textContent = tempDiv.textContent || tempDiv.innerText;
        
        if (textContent.length <= maxLength) return textContent;
        return textContent.substring(0, maxLength) + '...';
    };

    return (
        <div className="text-node" style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            background: 'white',
            minWidth: '200px',
            maxWidth: '300px'
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

            <div className="node-content" style={{
                padding: '8px',
                fontSize: '13px',
                lineHeight: '1.4',
                minHeight: '40px',
                maxHeight: '80px',
                overflow: 'hidden'
            }}>
                {getTruncatedText(data.text) || 'Enter your message...'}
            </div>

            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={isConnectable}
            />
        </div>
    );
};

// export default memo(TextNode);
export default TextNode;