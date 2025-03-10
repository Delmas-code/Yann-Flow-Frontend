import React, { useState, useRef, useEffect } from 'react';
import "@fontsource/outfit"
import {MyNewIcon, VoucherIcon, dataBundlesIcon, disbursmentsIcon, airtimeIcon, 
  collectionsIcon, transactionsIcon, invoicesIcon, creditCardIcon,
  TextIcon2, ImageIcon, VideoIcon, AudioIcon, 
  FileIcon, LocationIcon, ButtonIcon, TextInputIcon, CardIcon, VoiceIcon, CarouselIcon,
  AIIcon, SmartDelayIcon1, RandomizerIcon1, ConditionIcon1, FilterIcon, ApiIcon, CodeIcon,
  CustomFunctionIcon, VariableIcon, ContactsIcon, LibraryIcon, TutorialIcon, SupportIcon, PottaIcon,
  MiniTextIcon, MiniListenIcon, MiniLogicIcon, MiniDevIcon, MiniLibraryIcon, MiniSettingIcon
} from '../modules/projectIcons';
import NodeHolder from './NodeHolder';
import { NodeTypes } from '../utils/Enum';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactDOM from 'react-dom';

// Create colored versions of the mini icons
const ColoredIcon = ({ IconComponent, isHovered }) => {
  return (
    <div style={{ color: isHovered ? '#237804' : 'inherit' }}>
      {/* This div wrapper will affect the SVG's color through CSS inheritance */}
      <IconComponent />
    </div>
  );
};

const messageNodeTypes = [
    { type: NodeTypes.IMAGE_NODE, label: 'Image', color: '#ffffff', textColor: '#000000', icon: ImageIcon },
    { type: NodeTypes.TEXT_NODE, label: 'Text', color: '#ffffff', textColor: '#000000', icon: TextIcon2 },
    { type: NodeTypes.VIDEO_NODE, label: 'Video', color: '#ffffff', textColor: '#000000', icon: VideoIcon },
    { type: NodeTypes.AUDIO_NODE, label: 'Audio', color: '#ffffff', textColor: '#000000', icon: AudioIcon },
    { type: NodeTypes.FILE_NODE, label: 'File', color: '#ffffff', textColor: '#000000', icon: FileIcon },
    { type: NodeTypes.LOCATION_NODE, label: 'Location', color: '#ffffff', textColor: '#000000', icon: LocationIcon },
    { type: NodeTypes.BUTTON_NODE, label: 'Button', color: '#ffffff', textColor: '#000000', icon: ButtonIcon },
    { type: NodeTypes.CARD_NODE, label: 'Card', color: '#ffffff', textColor: '#000000', icon: CardIcon },
    { type: NodeTypes.CAROUSEL_NODE, label: 'Carousel', color: '#ffffff', textColor: '#000000', icon: CarouselIcon },
    { type: NodeTypes.AI_NODE, label: 'AI', color: '#ffffff', textColor: '#000000', icon: AIIcon },
];

const listenToNodeTypes = [
  { type: NodeTypes.TEXT_INPUT_NODE, label: 'Text', color: '#ffffff', textColor: '#000000', icon: TextInputIcon },
  { type: NodeTypes.VOICE_NODE, label: 'Voice', color: '#ffffff', textColor: '#000000', icon: VoiceIcon },
];

const logicNodeTypes = [
  { type: NodeTypes.FILTER_NODE, label: 'Filter', color: '#ffffff', textColor: '#000000', icon: FilterIcon },
  { type: NodeTypes.RANDOMIZER_NODE, label: 'Randomizer', color: '#ffffff', textColor: '#000000', icon: RandomizerIcon1 },
  { type: NodeTypes.CONDITION_NODE, label: 'Condition', color: '#ffffff', textColor: '#000000', icon: ConditionIcon1 },
  { type: NodeTypes.SMART_DELAY_NODE, label: 'Smart Delay', color: '#ffffff', textColor: '#000000', icon: SmartDelayIcon1 },
];

const developmentNodeTypes = [
  { type: NodeTypes.API_NODE, label: 'API', color: '#ffffff', textColor: '#000000', icon: ApiIcon },
  { type: NodeTypes.CODE_NODE, label: 'Javascript', color: '#ffffff', textColor: '#000000', icon: CodeIcon },
  { type: NodeTypes.FUNCTION_NODE, label: 'Function', color: '#ffffff', textColor: '#000000', icon: CustomFunctionIcon },
  { type: NodeTypes.VARIABLE_NODE, label: 'Set Variable', color: '#ffffff', textColor: '#000000', icon: VariableIcon },
];

const resourceNodeTypes = [
  { type: "NodeTypes.Contacts", label: 'Contacts', color: '#237804', textColor: '#ffffff', icon: ContactsIcon },
  { type: "NodeTypes.Library", label: 'Library', color: '#237804', textColor: '#ffffff', icon: LibraryIcon },
  { type: "NodeTypes.Tutorials", label: 'Tutorials', color: '#ffffff', textColor: '#000000', icon: TutorialIcon },
  { type: "NodeTypes.Support", label: 'Support', color: '#ffffff', textColor: '#000000', icon: SupportIcon },
];

const appsNodeTypes = [
  { type: 'airTime', label: 'Airtime', color: '#ffffff', textColor: '#000000', icon: airtimeIcon },
  { type: 'dataBundles', label: 'Data Bundles', color: '#ffffff', textColor: '#000000', icon: dataBundlesIcon },
  { type: 'vouchers', label: 'Vouchers', color: '#ffffff', textColor: '#000000', icon: VoucherIcon },
  { type: 'disbursments', label: 'Disbursments', color: '#ffffff', textColor: '#000000', icon: disbursmentsIcon },
  { type: 'collections', label: 'Collections', color: '#ffffff', textColor: '#000000', icon: collectionsIcon },
  { type: 'transactions', label: 'Transactions', color: '#ffffff', textColor: '#000000', icon: transactionsIcon },
  { type: 'invoices', label: 'Invoices', color: '#ffffff', textColor: '#000000', icon: invoicesIcon },
  { type: 'card', label: 'Card', color: '#ffffff', textColor: '#000000', icon: creditCardIcon },
];

// Category definitions with their associated node types
const categories = [
  { id: 'message', label: 'message', icon: MiniTextIcon, nodeTypes: messageNodeTypes },
  { id: 'listenTo', label: 'Listen', icon: MiniListenIcon, nodeTypes: listenToNodeTypes },
  { id: 'logic', label: 'Logic', icon: MiniLogicIcon, nodeTypes: logicNodeTypes },
  { id: 'development', label: 'Dev', icon: MiniDevIcon, nodeTypes: developmentNodeTypes },
  { id: 'resource', label: 'library', icon: MiniLibraryIcon, nodeTypes: resourceNodeTypes },
  { id: 'settings', label: 'Settings', icon: MiniSettingIcon, nodeTypes: [] }
];

// Renders a draggable node item that works in both full and minimal views
const NodeItem = ({ node, isCollapsed }) => {
  const Icon = node.icon;
  
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
    e.dataTransfer.effectAllowed = 'move';
  };
  
  return (
    <div 
      className="node-item"
      draggable
      onDragStart={(e) => onDragStart(e, node.type)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: isCollapsed ? '8px 4px' : '8px',
        margin: isCollapsed ? '4px 0' : '4px 0',
        background: node.color || '#ffffff',
        border: '1px solid #eee',
        borderRadius: '4px',
        cursor: 'grab',
        color: node.textColor || '#000000',
        fontSize: isCollapsed ? '12px' : '14px',
        whiteSpace: 'nowrap',
        justifyContent: isCollapsed ? 'center' : 'flex-start'
      }}
    >
      <div style={{ marginRight: isCollapsed ? '0' : '8px' }}>
        <Icon size={isCollapsed ? 16 : 18} />
      </div>
      {!isCollapsed && <span>{node.label}</span>}
    </div>
  );
};

const Sidebar = ({isCollapsed, setIsCollapsed}) => {
  const [activeTab, setActiveTab] = useState('nodes');
  const [popupPortalNode, setPopupPortalNode] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const categoryRefs = useRef({});

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setHoveredCategory(null); // Reset hovered category when toggling
  };
  
  useEffect(() => {
    // Create a div for our portal
    const portalNode = document.createElement('div');
    portalNode.style.position = 'absolute';
    portalNode.style.top = '0';
    portalNode.style.left = '0';
    portalNode.style.zIndex = '99999';
    document.body.appendChild(portalNode);
    
    setPopupPortalNode(portalNode);
    
    // Cleanup on unmount
    return () => {
      document.body.removeChild(portalNode);
    };
  }, []);

  // Update popup position when category is hovered
  useEffect(() => {
    if (hoveredCategory && categoryRefs.current[hoveredCategory]) {
      const rect = categoryRefs.current[hoveredCategory].getBoundingClientRect();
      setPopupPosition({
        top: rect.top,
        left: rect.right + 10
      });
    }
  }, [hoveredCategory]);

  // Define sidebar width based on collapsed state
  const sidebarWidth = isCollapsed ? '7%' : '22%';

  // Function to render portal content
  const renderPortalContent = (category) => {
    if (!popupPortalNode) return null;
    
    return ReactDOM.createPortal(
      <div 
        className="node-popup"
        style={{
          position: 'fixed',
          left: `${popupPosition.left}px`,
          top: `${popupPosition.top}px`,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 10000,
          width: '180px'
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {category.label === 'message' ? 'Messaging' : 
           category.label === 'listenTo' ? 'Listen To' : 
           category.label === 'logic' ? 'Logic' : 
           category.label === 'development' ? 'Development' : 
           category.label === 'library' ? 'Resources' : 
           category.label}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {category.nodeTypes.map((node) => (
            <NodeItem key={node.label} node={node} isCollapsed={true} />
          ))}
        </div>
      </div>,
      popupPortalNode
    );
  };

  // Dynamic style for icon wrapper to affect SVG fill color
  const getIconWrapperStyle = (isHovered) => {
    return {
      marginBottom: '5px',
      color: isHovered ? '#237804' : 'inherit',
      // Add a CSS filter to change the SVG fill color
      filter: isHovered ? 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(90%) contrast(85%)' : 'none'
    };
  };

  return (
    <div className="sidebar" style={{
      width: sidebarWidth,
      backgroundColor: '#ffffff',
      borderRight: '1px solid #ddd',
      height: '100vh',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease-in-out',
      // zIndex: 1000,          
      isolation: 'isolate'
    }}>
      
      {/* Toggle Button */}
      <div 
        className="sidebar-toggle" 
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          right: '-12px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '24px',
          height: '24px',
          background: '#ffffff',
          borderRadius: '50%',
          border: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </div>
      
      {/* Tab Navigation - Only show if not collapsed */}
      {!isCollapsed && (
        <div className="sidebar-tabs" style={{
          display: 'flex',
          borderBottom: '1px solid #ddd',
        }}>
          <button
            className={`tab ${activeTab === 'nodes' ? 'active' : ''}`}
            onClick={() => setActiveTab('nodes')}
            style={{
              flex: 1,
              padding: '12px 0',
              background: activeTab === 'nodes' ? '#fff' : '#f5f5f5',
              border: 'none',
              borderBottom: activeTab === 'nodes' ? '2px solid #237804' : 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'nodes' ? 'bold' : 'normal',
              color: activeTab === 'nodes' ? '#237804' : '#666'
            }}
          >
            Content
          </button>
          
          <button
            className={`tab ${activeTab === 'apps' ? 'active' : ''}`}
            onClick={() => setActiveTab('apps')}
            style={{
              flex: 1,
              padding: '12px 0',
              background: activeTab === 'apps' ? '#fff' : '#f5f5f5',
              border: 'none',
              borderBottom: activeTab === 'apps' ? '2px solid #237804' : 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'apps' ? 'bold' : 'normal',
              color: activeTab === 'apps' ? '#237804' : '#666'
            }}
          >
            Apps
          </button>
        </div>
      )}
      
      {/* Tab Content */}
      <div className="sidebar-content" style={{
        flex: 1,
        padding: isCollapsed ? '10px 0' : '15px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCollapsed ? 'center' : 'stretch'
      }}>
        {activeTab === 'nodes' ? (
          <>
            {isCollapsed ? (
              // Minimal sidebar content - only icons with labels
              <div className="minimal-sidebar" style={{paddingTop: '30px'}}>
                {categories.map((category) => {
                  const CategoryIcon = category.icon;
                  const isHovered = hoveredCategory === category.id;
                  return (
                    <div 
                      key={category.id}
                      className="category-container"
                      ref={el => categoryRefs.current[category.id] = el}
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      style={{ 
                        position: 'relative',
                        marginBottom: '24px',
                        width: '100%',
                      }}
                    >
                      <div className="category" style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        padding: '0 5px'
                      }}>
                        <div style={getIconWrapperStyle(isHovered)}>
                          <CategoryIcon />
                        </div>
                        <span style={{ 
                          fontSize: '12px', 
                          textAlign: 'center',
                          color: isHovered ? '#237804' : 'inherit',
                          transition: 'color 0.2s ease-in-out'
                        }}>
                          {category.label}
                        </span>
                      </div>
                      
                      {/* Popup menu on hover (only if the category has nodes) */}
                      {isHovered && category.nodeTypes.length > 0 && renderPortalContent(category)}
                    </div>
                  );
                })}
              </div>
            ) : (
              // Full sidebar content
              <>
                <NodeHolder
                  title={"Messaging"}
                  nodeTypes={messageNodeTypes}
                />
                <NodeHolder
                  title={"Listen To"}
                  nodeTypes={listenToNodeTypes}
                />
                <NodeHolder
                  title={"Logic"}
                  nodeTypes={logicNodeTypes}
                />
                <NodeHolder
                  title={"Development"}
                  nodeTypes={developmentNodeTypes}
                />
                <NodeHolder
                  title={"Resources"}
                  nodeTypes={resourceNodeTypes}
                />
              </>
            )}
          </>
        ) : (
          <div className="apps-tab" style={{display: 'flex'}}>
            {isCollapsed ? (
              // Minimal apps view
              <div 
                className="category-container"
                ref={el => categoryRefs.current['apps'] = el}
                onMouseEnter={() => setHoveredCategory('apps')}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{ 
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div className="category" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center'
                }}>
                  <div style={getIconWrapperStyle(hoveredCategory === 'apps')}>
                    <PottaIcon />
                  </div>
                  <span style={{ 
                    fontSize: '12px', 
                    textAlign: 'center',
                    color: hoveredCategory === 'apps' ? '#237804' : 'inherit',
                    transition: 'color 0.2s ease-in-out'
                  }}>
                    Potta
                  </span>
                </div>
                
                {/* Popup menu for Apps on hover */}
                {hoveredCategory === 'apps' && ReactDOM.createPortal(
                  <div 
                    className="node-popup"
                    style={{
                      position: 'fixed',
                      left: `${popupPosition.left}px`,
                      top: `${popupPosition.top}px`,
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '10px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      zIndex: 10000,
                      width: '180px'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                      Potta
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {appsNodeTypes.map((node) => (
                        <NodeItem key={node.label} node={node} isCollapsed={true} />
                      ))}
                    </div>
                  </div>,
                  popupPortalNode
                )}
              </div>
            ) : (
              // Full apps view
              <div style={{ width: '100%' }}>
                <NodeHolder
                  title={"Potta"}
                  nodeTypes={appsNodeTypes}
                  icon={<PottaIcon size={18} />}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;