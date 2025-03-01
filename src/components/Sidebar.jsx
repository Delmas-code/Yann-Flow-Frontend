// src/components/Sidebar.jsx
import React, { useState } from 'react';
import "@fontsource/outfit"
import {MyNewIcon, WifiIcon,TicketIcon, TextIcon2, ImageIcon, VideoIcon, AudioIcon, 
  FileIcon, LocationIcon, ButtonIcon, MessagesIcon, CardIcon, VoiceIcon
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
];

const listenToNodeTypes = [
  { type: NodeTypes.TEXT_INPUT_NODE, label: 'Text', color: '#ffffff', textColor: '#000000', icon: MessagesIcon },
  { type: NodeTypes.VOICE_NODE, label: 'Voice', color: '#ffffff', textColor: '#000000', icon: VoiceIcon },
];

const appsNodeTypes = [
  { type: 'airTime', label: 'Airtime', color: '#ffffff', textColor: '#000000', icon: TicketIcon },
  { type: 'dataBundles', label: 'Data Bundles', color: '#ffffff', textColor: '#000000', icon: WifiIcon },
  { type: 'vouchers', label: 'Vouchers', color: '#ffffff', textColor: '#000000', icon: TicketIcon },
  { type: 'disbursments', label: 'Disbursments', color: '#ffffff', textColor: '#000000', icon: WifiIcon },
  { type: 'collections', label: 'Collections', color: '#ffffff', textColor: '#000000', icon: TicketIcon },
  { type: 'transactions', label: 'Transactions', color: '#ffffff', textColor: '#000000', icon: WifiIcon },
];

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('nodes');

  return (
    <div className="sidebar" style={{
      width: '25%',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #ddd',
      height: '100vh',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column'
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