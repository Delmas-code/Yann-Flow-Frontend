import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SmartDelayPropIcon } from '../../modules/projectIcons';

const SmartDelayNodePropertyPanel = ({ node, setNodes, onClose }) => {
  const [activeTab, setActiveTab] = useState('options');
  const [delayTime, setDelayTime] = useState({
    months: '',
    days: '',
    hours: '',
    seconds: ''
  });

  const delayPreview = useMemo(() => {
    const { months, days, hours, seconds } = delayTime;
    
    // Only show preview if ALL fields are filled
    if (months && days && hours && seconds) {
      return `${months} months, ${days} days, ${hours} hours, ${seconds} seconds`;
    }
    return null;
  }, [delayTime]);

  
  // Load existing delay data when node changes
  useEffect(() => {

    const existingDelayTime = node?.data?.delayTime || {
      months: '',
      days: '',
      hours: '',
      seconds: ''
    };

    setDelayTime(existingDelayTime);
  }, [node?.id]);

  // Update node data when delay time changes
  const updateNodeData = useCallback((newDelayTime) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              delayTime: newDelayTime
            }
          };
        }
        return n;
      })
    );
  }, [node?.id, setNodes]);


  // Handle input changes for delay time
  const handleInputChange = (field, value) => {
    // Ensure only numbers are entered
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    
    const newDelayTime = {
      ...delayTime,
      [field]: sanitizedValue
    };

    setDelayTime(newDelayTime);
    updateNodeData(newDelayTime);
  };

  // Clear delay time
  const clearDelayTime = () => {
    const clearedTime = { months: '', days: '', hours: '', seconds: '' };
    setDelayTime(clearedTime);
    updateNodeData(clearedTime);
  };

  return (
    <div className="properties-panel">
      {/* Tab Navigation */}
      <div className="property-panel-tabs">
        <button
          className={`tab ${activeTab === 'options' ? 'active' : ''}`}
          onClick={() => setActiveTab('options')}
        >
          Options
        </button>
        
        <button
          className={`tab ${activeTab === 'sandbox' ? 'active' : ''}`}
          onClick={() => setActiveTab('sandbox')}
        >
          Sandbox
        </button>
      </div>
      
      <div className="property-panel-content">
        {activeTab === 'options' ? (
          <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px', 
            padding: '10px'
          }}>
            <div style={{display: "flex"}}>
                <div style={{ width: "32px", height: "32px",  }}>
                    <SmartDelayPropIcon />
                </div>
                <p style={{ marginBottom: '-10px'}}>Enter Delay</p>
            </div>
            <hr style={{marginTop: '-7px'}}/>

            <div style={{
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '25px',
              marginTop: '-30px',
              textAlign: 'center'
            }}>
                <div>
                    <p style={{ fontSize: '13px'}}>MM</p>
                    <input
                        type="text"
                        placeholder="00"
                        maxLength={2}
                        value={delayTime.months}
                        onChange={(e) => handleInputChange('months', e.target.value)}
                        style={{
                        width: '100%', 
                        padding: '8px', 
                        textAlign: 'center',
                        border: '1px solid #d9d9d9',
                        borderRadius: '1px'
                        }}
                    />
                </div>
                <div>
                <p style={{ fontSize: '13px'}}>DD</p>
                    <input
                        type="text"
                        placeholder="00"
                        maxLength={2}
                        value={delayTime.days}
                        onChange={(e) => handleInputChange('days', e.target.value)}
                        style={{
                        width: '100%', 
                        padding: '8px', 
                        textAlign: 'center',
                        border: '1px solid #d9d9d9',
                        borderRadius: '1px'
                        }}
                    />
                </div>
                <div>
                    <p style={{ fontSize: '13px'}}>HH</p>
                    <input
                        type="text"
                        placeholder="00"
                        maxLength={2}
                        value={delayTime.hours}
                        onChange={(e) => handleInputChange('hours', e.target.value)}
                        style={{
                        width: '100%', 
                        padding: '8px', 
                        textAlign: 'center',
                        border: '1px solid #d9d9d9',
                        borderRadius: '1px'
                        }}
                    />
                </div>
                <div>
                    <p style={{ fontSize: '13px'}}>SS</p>
                    <input
                        type="text"
                        placeholder="01"
                        maxLength={2}
                        value={delayTime.seconds}
                        onChange={(e) => handleInputChange('seconds', e.target.value)}
                        style={{
                        width: '100%', 
                        padding: '8px', 
                        textAlign: 'center',
                        border: '1px solid #d9d9d9',
                        borderRadius: '1px'
                        }}
                    />
                </div>
            </div>
            <p style={{ fontSize: '15px'}}>Fixed Date time</p>

            {delayPreview && (
              <div style={{
                backgroundColor: '#f6ffed',
                border: '1px solid #52c41a',
                borderRadius: '1px',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '-20px'
              }}>
                <span style={{ color: '#237804' }}>
                  {delayPreview}
                </span>
                <button 
                  onClick={clearDelayTime}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff4d4f',
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="sandbox-tab">
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Connected Apps</h3>
            
            <p style={{ color: '#666', fontSize: '14px' }}>
              No Sandbox environment connected yet. You'll be able to test integrations here in the future.
            </p>
            
            <button
              style={{
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '15px'
              }}
              disabled
            >
              Add Sandbox (Coming Soon)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartDelayNodePropertyPanel;