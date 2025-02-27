import React, { useState, useEffect, useCallback } from 'react';
import { X, Loader, MapPin } from 'lucide-react';
import { locationStyles } from '../../modules/panelStyles';
import { LocationPropIcon } from '../../modules/projectIcons';


const LocationNodePropertyPanel = ({ node, setNodes }) => {

    const [title, setTitle] = useState(node.data?.title || 'Location Block');
    const [search, setSearch] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [locations, setLocations] = useState(node.data?.locations || []);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [activeTab, setActiveTab] = useState('options');
  
    useEffect(() => {
        if (node?.id) {
            setTitle(node.data?.title || 'Location Block');
            setLocations(node.data?.locations || []);
        }
    }, [node.id]);
  
    useEffect(() => {
        const timer = setTimeout(() => {
        if (search && search.length > 2) {
            searchPlaces(search);
        } else {
            setSearchResults([]);
            setHasSearched(false);
        }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);
  
    const searchPlaces = async (query) => {
        setIsLoading(true);
        setHasSearched(true);
        
        try {
            // Mock API call - replace with actual Google Places API
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            const mockResults = [
                { id: 1, name: query + ' City Center', lat: '40.7128', lng: '-74.0060' },
                { id: 2, name: query + ' Station', lat: '40.7589', lng: '-73.9851' },
            ];
            setSearchResults(mockResults);
        } catch (error) {
            console.error('Error searching places:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };
  
    const handleResultSelect = (result) => {
        setLatitude(result.lat);
        setLongitude(result.lng);
        setSearch(result.name);
        setSearchResults([]);
        setHasSearched(false);
    };
  

    const addLocation = () => {
        if (!latitude || !longitude) return;

        const newLocation = {
            id: Date.now(),
            name: search || `Location ${locations.length + 1}`,
            latitude,
            longitude
        };

        const updatedLocations = [...locations, newLocation];
        setLocations(updatedLocations);
        updateNodeData(updatedLocations, title);

        // Clear inputs
        setSearch('');
        setLatitude('');
        setLongitude('');
    };

    const removeLocation = (locationId) => {
        const updatedLocations = locations.filter(loc => loc.id !== locationId);
        setLocations(updatedLocations);
        updateNodeData(updatedLocations, title);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addLocation();
        }
    };

    const updateNodeData = useCallback((updatedLocations, nodeTitle) => {
        setNodes(nds => 
          nds.map(n => {
            if (n.id === node.id) {
              return {
                ...n,
                data: {
                  ...n.data,
                  locations: updatedLocations,
                  title: nodeTitle
                }
              };
            }
            return n;
          })
        );
    }, [node?.id, setNodes]);


  return (
    <div className="properties-panel">
      {/* Tab Navigation (Same as Image panel) */}

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
          <div style={locationStyles.container}>
            <div style={{ width: "50px", height: "50px" }}>
                <LocationPropIcon />
            </div>

            <hr/>
            <p>Location</p>
            
            <div style={locationStyles.searchSection}>
                <div style={locationStyles.inputGroup}>
                    {/* <label style={locationStyles.label}>Location</label> */}
                    <div style={locationStyles.searchContainer}>
                    <input
                        style={locationStyles.input}
                        type="text"
                        value={search}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Location"
                    />
                    {isLoading && (
                        <div style={locationStyles.loadingSpinner}>
                            <Loader className="animate-spin" size={16} />
                        </div>
                    )}
                    </div>
                    {(searchResults.length > 0 || (hasSearched && !isLoading)) && (
                        <div style={locationStyles.searchResults}>
                            {searchResults.length > 0 ? (
                            searchResults.map(result => (
                                <div
                                    key={result.id}
                                    style={locationStyles.searchResult}
                                    onClick={() => handleResultSelect(result)}
                                >
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-500" />
                                        {result.name}
                                    </div>
                                </div>
                            ))
                            ) : (
                            <div style={locationStyles.noResults}>
                                No locations found
                            </div>
                            )}
                        </div>
                    )}
                </div>

                <div style={locationStyles.coordinateInputs}>
                    <div style={locationStyles.longInput}>
                        <p>Long</p>
                        <input
                        style={locationStyles.input}
                        type="number"
                        value={longitude}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Enter longitude"
                        />
                    </div>
                    <div style={locationStyles.latInput}>
                        <p style={locationStyles.p}>Lat</p>
                        <input
                        style={locationStyles.input}
                        type="number"
                        value={latitude}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Enter latitude"
                        />
                    </div>
                </div>

                {/* <button 
                    style={locationStyles.addButton} 
                    onClick={addLocation}
                    disabled={!latitude || !longitude}
                    >
                    Add Location
                </button> */}
            </div>

            <div style={locationStyles.locationsList}>
                {locations.map(location => (
                    <div key={location.id} style={locationStyles.locationItem}>
                        <div style={locationStyles.locationIcon}>
                            <MapPin size={24} color="#4B5563" />
                        </div>
                        <div style={locationStyles.locationDetails}>
                            <p style={locationStyles.locationName}>{location.name}</p>
                            <p style={locationStyles.coordinates}>
                            {location.latitude}, {location.longitude}
                            </p>
                        </div>
                        <button
                            onClick={() => removeLocation(location.id)}
                            style={locationStyles.removeButton}
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

export default LocationNodePropertyPanel;