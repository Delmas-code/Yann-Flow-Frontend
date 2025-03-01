
const imageStyles = {
    container: {
      width: '90%',
      maxWidth: '800px',
      margin: '0 auto',
      // marginTop: '40%',
      padding: '16px'
    },
    uploadArea: {
      border: '2px solid #ddd',
      padding: '14px',
      marginBottom: '16px'
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    previewGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      padding: '8px'
    },
    previewContainer: {
      position: 'relative'
    },
    imagePreview: {
      width: '100%',
      height: '44px',
      objectFit: 'cover',
      borderRadius: '8px'
    },
    removeButton: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px'
    }
};


const textStyles = {
  container: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  previewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px',
  },
  previewContainer: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #ddd',
  },
  textPreview: {
    padding: '12px',
    backgroundColor: '#f5f9ff',
    width: '100%',
    minHeight: '60px',
    maxHeight: '120px',
    overflow: 'auto',
  },
  removeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    borderRadius: '50%',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editorContainer: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  editor: {
    height: '200px',
    resize: 'vertical',
    overflow: 'auto',
    padding: '10px',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    background: '#e3f2fd',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};



const videoStyles = {
    container: {
      width: '90%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '16px'
    },
    uploadArea: {
      border: '2px solid #ddd',
      padding: '14px',
      marginBottom: '16px',
      textAlign: 'center'
    },
    previewList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '8px'
    },
    previewContainer: {
      position: 'relative',
      width: '100%'
    },
    videoPreview: {
      width: '100%',
      maxHeight: '120px',
      // borderRadius: '8px',
      backgroundColor: '#000'
    },
    removeButton: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px'
    }
};

const audioStyles = {
    container: {
      width: '90%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '16px'
    },
    uploadArea: {
      border: '2px solid #ddd',
      padding: '14px',
      marginBottom: '16px',
      textAlign: 'center'
    },
    previewList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '8px'
    },
    previewContainer: {
      position: 'relative',
      width: '100%',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      padding: '12px'
    },
    audioPreview: {
      width: '100%',
      height: '40px'
    },
    videoPreview: {
      width: '100%',
      maxHeight: '120px',
      // borderRadius: '8px',
      backgroundColor: '#000'
    },
    imagePreview: {
      width: '100%',
      height: '44px',
      objectFit: 'cover',
      borderRadius: '8px'
    },
    fileName: {
      marginTop: '8px',
      fontSize: '12px',
      color: '#666',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    removeButton: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px'
    }
};

const fileStyles = {
  container: {
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '16px'
  },
  uploadArea: {
    border: '2px solid #ddd',
    padding: '14px',
    marginBottom: '16px',
    textAlign: 'center'
  },
  previewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px'
  },
  previewContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '4px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  fileIcon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  fileDetails: {
    flex: 1,
    overflow: 'hidden'
  },
  fileName: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
    color: '#212529',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  fileSize: {
    margin: 0,
    fontSize: '12px',
    color: '#6c757d'
  },
  removeButton: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px'
  }
};


const locationStyles = {
  container: {
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '16px'
  },
  searchSection: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#4B5563',
    marginBottom: '4px',
    fontFamily: 'Outfit'
  },
  inputGroup: {
    marginBottom: '12px'
  },
  input: {
    width: '90%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    // borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'Outfit'
  },
  coordinateInputs: {
    
    // display: 'flex',
    // gap: '8px',
    // marginBottom: '16px'
  },
  longInput: {
    display: 'flex',
    gap: '8px',
    marginBottom: '7px',
  },
  latInput: {
    display: 'flex',
    gap: '8px',
    marginBottom: '7px'
  },
  p: {
    paddingRight: '13px',
  }, 
  searchResults: {
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    marginTop: '4px',
    maxHeight: '200px',
    overflowY: 'auto'
  },
  searchResult: {
    padding: '8px 12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F3F4F6'
    }
  },
  locationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '16px'
  },
  locationItem: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '4px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  locationIcon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  locationDetails: {
    flex: 1,
    overflow: 'hidden'
  },
  locationName: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
    color: '#212529',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  coordinates: {
    margin: 0,
    fontSize: '12px',
    color: '#6c757d'
  },
  removeButton: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px'
  },
  addButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '8px'
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '8px'
  },
  loadingSpinner: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6B7280'
  },
  noResults: {
    padding: '8px 12px',
    color: '#6B7280',
    fontSize: '14px',
    textAlign: 'center',
    borderTop: '1px solid #E5E7EB'
  },
  searchResults: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    marginTop: '4px',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 10,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  searchResult: {
    padding: '8px 12px',
    cursor: 'pointer',
    borderBottom: '1px solid #E5E7EB',
    '&:hover': {
      backgroundColor: '#F3F4F6'
    },
    // '&:last-child': {
    //   borderBottom: 'none'
    // }
    '&:lastChild': {
      borderBottom: 'none'
    }
  }
};



const buttonStyles = {
  container: {
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '16px'
  },
  buttonSection: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#4B5563',
    marginBottom: '4px',
    fontFamily: 'Outfit'
  },
  inputGroup: {
    marginBottom: '12px'
  },
  input: {
    width: '90%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    fontFamily: 'Outfit'
  },
  labelInput: {
    display: 'flex',
    gap: '20px',
    marginBottom: '7px',
  },
  actionInput: {
    display: 'flex',
    // gap: '8px',
    marginBottom: '7px'
  },
  p: {
    paddingRight: '13px',
  }, 
  buttonsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '16px'
  },
  locationItem: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '4px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  locationIcon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  locationDetails: {
    flex: 1,
    overflow: 'hidden'
  },
  locationName: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
    color: '#212529',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  coordinates: {
    margin: 0,
    fontSize: '12px',
    color: '#6c757d'
  },
  removeButton: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px'
  },
  addButton: {
    marginTop: '12px',
    height: '30%',
    backgroundColor: '#fff',
    color: '#237804',
    border: '1px solid #237804',
    padding: '6px 10px',
    cursor: 'pointer',
  },
  buttonContainer: {
    position: 'relative',
    marginBottom: '8px'
  }
};


const cardStyles = {
  container: {
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '16px'
  },
  section: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#4B5563',
    marginBottom: '4px',
    fontFamily: 'Outfit'
  },
  inputGroup: {
    marginBottom: '12px'
  },
  input: {
    width: '90%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'Outfit'
  },
  previewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '15px',
    backgroundColor: '#f0f0f0', // WhatsApp chat background color
    borderRadius: '8px',
    minHeight: '200px'
  },
  uploadArea: {
    border: '2px solid #ddd',
    padding: '14px',
    marginBottom: '16px'
  },
  
  editorContainer: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  editor: {
    height: '70px',
    resize: 'vertical',
    overflow: 'auto',
    padding: '10px',
  },
  addButton: {
    marginTop: '12px',
    height: '30%',
    backgroundColor: '#fff',
    color: '#237804',
    border: '1px solid #237804',
    padding: '6px 10px',
    cursor: 'pointer',
  },
  previewContainer: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '10px',
    backgroundColor: '#e7f7d4', // WhatsApp light green
    maxWidth: '90%',
    border: '1px solid #ddd',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  imagePreviewContainer: {
    width: '100%',
    height: '140px',
    overflow: 'hidden',
    position: 'relative'
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  textPreview: {
    padding: '12px',
    fontSize: '14px',
    color: '#333'
  },
  buttonPreview: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(29, 29, 29, 0.25)',
    borderRadius: '2px',
    color: '#7BB9FE',
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Outfit',
    width: 'auto',
    background: 'transparent',
    cursor: 'pointer',
    padding: '8px 12px',
    margin: '12px'
  },
  removeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    zIndex: 10
  },
  selectButton: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    zIndex: 10
  },
  labelInput: {
    display: 'flex',
    gap: '20px',
    marginBottom: '7px',
  },
  actionInput: {
    display: 'flex',
    marginBottom: '7px'
  },
  p: {
    paddingRight: '13px',
  },
  selectedCard: {
    border: '2px solid #3b82f6',
  },
  videoContainer: {
    width: '100%',
    height: '160px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000'
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }
};



const textInputStyles = {
  container: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  previewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px',
  },
  previewContainer: {
    position: 'relative',
    borderRadius: '1px',
    overflow: 'hidden',
    border: '1px solid #ddd',
  },
  textPreview: {
    padding: '12px',
    backgroundColor: '#f5f9ff',
    width: '100%',
    minHeight: '20px',
    maxHeight: '70px',
    overflow: 'auto',
  },
  removeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    borderRadius: '50%',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editorContainer: {
    border: '1px solid #ddd',
    borderRadius: '1px',
    overflow: 'hidden',
  },
  editor: {
    height: '70px',
    resize: 'vertical',
    overflow: 'auto',
    padding: '10px',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    border: '1px solid #237804',
    borderRadius: '1px',
    padding: '8px 12px',
    cursor: 'pointer',
    marginTop: '10px',
    // '&:hover': {
    //   backgroundColor: 'rgb(138, 207, 113)'
    // }
  }
};


const voiceStyles = {
  container: {
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '16px'
  },
  uploadArea: {
    border: '2px solid #ddd',
    padding: '14px',
    marginBottom: '16px',
    textAlign: 'center'
  },
  previewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '8px'
  },
  previewContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '12px'
  },
  voicePreview: {
    width: '100%',
    height: '40px'
  },
  fileName: {
    marginTop: '8px',
    fontSize: '12px',
    color: '#666',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  removeButton: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px'
  }
};


// In ../../modules/panelStyles.js


export { imageStyles, textStyles, videoStyles, audioStyles, fileStyles, locationStyles, buttonStyles, cardStyles, textInputStyles, voiceStyles }