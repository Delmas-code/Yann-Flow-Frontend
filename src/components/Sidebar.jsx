// src/components/Sidebar.jsx
import React, { useState } from 'react';
import "@fontsource/outfit"
import {MyNewIcon, VoucherIcon, dataBundlesIcon, disbursmentsIcon, airtimeIcon, 
  collectionsIcon, transactionsIcon, invoicesIcon, creditCardIcon,
  TextIcon2, ImageIcon, VideoIcon, AudioIcon, 
  FileIcon, LocationIcon, ButtonIcon, TextInputIcon, CardIcon, VoiceIcon, CarouselIcon,
  AIIcon, SmartDelayIcon1, RandomizerIcon1, ConditionIcon1, FilterIcon, ApiIcon, CodeIcon,
  CustomFunctionIcon, VariableIcon, ContactsIcon, LibraryIcon, TutorialIcon, SupportIcon
} from '../modules/projectIcons';
import NodeHolder from './NodeHolder';
import { NodeTypes } from '../utils/Enum';

// import myImage from '../assets/potta.png';


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
  { type: "NodeTypes.API_NODE", label: 'API', color: '#ffffff', textColor: '#000000', icon: ApiIcon },
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

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('nodes');

  return (
    <div className="sidebar" style={{
      width: '22%',
      // width: '280px',
      // overflowX: 'hidden',
      // boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #ddd',
      height: '100vh',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      
      // backgroundColor: 'rgb(255, 255, 255)',
      // borderRight: '1px solid rgb(221, 221, 221)'
    }}>
        
      {/* Tab Navigation */}
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
      
      {/* Tab Content */}
      <div className="sidebar-content" style={{
        flex: 1,
        padding: '15px',
        overflowY: 'auto'
      }}>
        {activeTab === 'nodes' ? (
            <>
            <NodeHolder
                title={"Messaging"}
                nodeTypes = {messageNodeTypes}
            />
            <NodeHolder
                title={"Listen To"}
                nodeTypes = {listenToNodeTypes}
            />
            <NodeHolder
                title={"Logic"}
                nodeTypes = {logicNodeTypes}
            />
            <NodeHolder
                title={"Development"}
                nodeTypes = {developmentNodeTypes}
            />
            <NodeHolder
                title={"Resources"}
                nodeTypes = {resourceNodeTypes}
            />
            
          </>
          
        ) : (
          <div className="apps-tab">
            {/* <img src='C:/Users/User/Desktop/Ongoing Project/Instanvi/Yann Flow/Frontend/yann-flow/src/assets/potta.PNG'></img> */}
            <NodeHolder
                title={"Potta"}
                nodeTypes = {appsNodeTypes}
            />
            {/* <img src={myImage} alt="Description" />
            <h3 style={{ 
                marginTop: 0, 
                marginBottom: '15px',
                fontWeight: '400',
                fontSize: '16px',
                fontFamily:'Outfit',
                lineHeight: '18px',
                paddingTop: '5px',
                    }}>Potta</h3>
            <hr style={{
                width:'100%',
                textAlign:'left',
                border: '1px solid #EEEEEE',
                marginLeft:'0'
                }} ></hr> */}
            
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;