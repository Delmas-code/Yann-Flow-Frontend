

const NodeHolder = ({ title, nodeTypes}) => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="nodes-tab">
            <h3 style={{ 
                marginTop: 0, 
                marginBottom: '15px',
                fontWeight: '400',
                fontSize: '16px',
                fontFamily:'Outfit',
                lineHeight: '18px',
                paddingTop: '5px',
                    }}>{title}</h3>
            <hr style={{
                // width:'275px',
                width: '107%',
                textAlign:'left',
                border: '1px solid #EEEEEE',
                marginLeft:'-15px'
                }} ></hr>
            
            <div className="nodes-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                paddingBottom:'20px'
            }}>
                {nodeTypes.map((node) => {
                const IconComponent = node.icon;

                return (
                    <div
                        key={node.type}
                        className="node-item"
                        title={node.label}
                        onDragStart={(e) => onDragStart(e, node.type)}
                        draggable
                        style={{
                            backgroundColor: node.color,
                            color: node.textColor,
                            fontWeight: '300',
                            fontSize: '15px',
                            fontFamily:'Outfit',
                            lineHeight: '18px',
                            padding: '10px',
                            // borderRadius: '5px',
                            cursor: 'grab',
                            border: '1px solid #EEEEEE',
                            display: 'flex',
                            alignItems: 'center',
                            // justifyContent: 'left',
                            height: '25px',
                            // width: '90px',
                            textAlign: 'center',
                            // wordBreak: 'break-word',
                            whiteSpace: 'nowrap', // Prevent text wrapping
                            overflow: 'visible', // SHow overflow
                            textOverflow: 'ellipsis',
                        }}
                    >
                      
                        {IconComponent && (
                        <span style={{ display: 'flex', alignItems: 'center', paddingRight: '5px', paddingTop: '1px'}}>
                        <IconComponent size={18} color="#237804" />
                        </span>
                        )}
                        {node.label}
                        
                    </div>
                );
            })}

            </div>
        </div>
    )

}

export default NodeHolder;