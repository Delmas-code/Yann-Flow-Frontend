import React, { useState, useEffect, useCallback } from 'react';
import { X, Filter, PlusCircle } from 'lucide-react';
import { FilterIcon, FilterPropIcon } from '../../modules/projectIcons';
import { filterNodeStyles } from '../../modules/panelStyles';

const FilterNodePropertyPanel = ({ node, setNodes, onClose }) => {
  const [activeTab, setActiveTab] = useState('options');
  const [expression, setExpression] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [filters, setFilters] = useState(node.data?.filters || []);

  // Load data when node changes
  useEffect(() => {
    if (node?.id) {
      setFilters(node.data?.filters || []);
    }
  }, [node?.id]);

  // Memoized update function for node data
  const updateNodeData = useCallback((updatedFilters) => {
    setNodes(nds => 
      nds.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              filters: updatedFilters
            }
          };
        }
        return n;
      })
    );
  }, [node?.id, setNodes]);

  // Add a new filter
  const addFilter = () => {
    if (!expression || !selectedCollection) return;
    
    const newFilter = {
      id: Date.now(),
      name: `Filter ${filters.length + 1}`,
      expression,
      collection: selectedCollection
    };

    const updatedFilters = [...filters, newFilter];
    console.log("updatedFilters", updatedFilters)
    setFilters(updatedFilters);
    updateNodeData(updatedFilters);

    // Clear inputs
    setExpression('');
    setSelectedCollection('');
  };

  // Remove a filter
  const removeFilter = (filterId) => {
    const updatedFilters = filters.filter(filter => filter.id !== filterId);
    setFilters(updatedFilters);
    updateNodeData(updatedFilters);
  };

  // Handle key down for adding filter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addFilter();
    }
  };

  return (
    <div className="properties-panel" style={filterNodeStyles.container}>
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
          <div>
            <div style={filterNodeStyles.headerContainer}>
              <div style={filterNodeStyles.iconContainer}>
                <FilterPropIcon />
              </div>
              
            </div>
            
            {/* <hr style={filterNodeStyles.divider}/> */}
            <hr style={{marginTop: '-7px'}}/>
            
            <div style={filterNodeStyles.inputContainer}>
              {/* <label htmlFor="expression">Enter expression</label> */}
              <p style={{fontSize: '17px', marginTop: '30px', paddingLeft: 0}}>Enter expression</p>
              <input 
                id="expression"
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="{age} * 2"
                style={filterNodeStyles.input}
              />
            </div>
            
            <div style={filterNodeStyles.inputContainer}>
              {/* <label htmlFor="collection">Select Collection</label> */}
              <select
                id="collection"
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                onKeyDown={handleKeyDown}
                style={filterNodeStyles.selectInput}
              >
                <option value="">Select Collection</option>
                <option value="collection1">Collection 1</option>
                <option value="collection2">Collection 2</option>
                <option value="collection3">Collection 3</option>
              </select>
            </div>

            <button 
              onClick={addFilter}
              disabled={!expression || !selectedCollection}
              style={filterNodeStyles.addButton}
            >
              <PlusCircle size={16} color="#237804"/>
              Add Filter
            </button>

            {/* Filters List */}
            {/* <div style={filterNodeStyles.filtersList}>
              {filters.map(filter => (
                <div key={filter.id} style={filterNodeStyles.filterItem}>
                  <div style={filterNodeStyles.filterDetails}>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{filter.expression}</p>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.8em' }}>{filter.collection}</p>
                  </div>
                  <button 
                    onClick={() => removeFilter(filter.id)}
                    style={filterNodeStyles.removeButton}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div> */}

            <div style={filterNodeStyles.filterList}>
                {filters.map(filter => (
                    <div key={filter.id} style={filterNodeStyles.filterItem}>
                        <div style={filterNodeStyles.filterIcon}>
                            <FilterIcon size={24} color="#4B5563" />
                        </div>
                        <div style={filterNodeStyles.filterDetails}>
                            <p style={filterNodeStyles.filterName}>{filter.name}</p>
                            <p style={filterNodeStyles.filterExp}>
                            {filter.expression}, {filter.collection}
                            </p>
                        </div>
                        <button
                            onClick={() => removeFilter(filter.id)}
                            style={filterNodeStyles.removeButton}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

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

export default FilterNodePropertyPanel;