
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
    paddingRight: '11px',
    fontSize: '15px'
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
    width: '100%',
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
    paddingRight: '14px',
    fontSize: '15px'
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
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
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
    paddingRight: '14px',
    fontSize: '15px'
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


const carouselStyles = {
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
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    fontFamily: 'Outfit'
  },
  previewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    minHeight: '200px'
  },
  uploadArea: {
    border: '2px solid #ddd',
    padding: '14px',
    marginBottom: '16px'
  },
  mediaUploadList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px'
  },
  mediaPreviewThumbnail: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  mediaUploadItem: {
    position: 'relative',
    width: '60px',
    height: '60px',
  },
  removeMediaButton: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    zIndex: 10
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
    backgroundColor: '#e7f7d4',
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
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: '160px'
  },
  navigationButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    backgroundColor: '#237804',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    opacity: 0.9
  },
  navigationButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
    opacity: 0.5
  },
  prevButton: {
    left: '8px',
  },
  nextButton: {
    right: '8px',
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
    paddingRight: '14px',
    fontSize: '15px'
  },
  selectedCarousel: {
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


const aiNodeStyles = {
  container: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '100%',
    boxSizing: 'border-box',
    // overflowX: 'hidden'
  },
  aiIcon: {
    width: '50px',
    height: '50px',
    backgroundColor: '#4CAF50',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  editorContainer: {
    border: '1px solid #ddd',
    borderRadius: '1px',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
  },
  editor: {
    minHeight: '100px',
    resize: 'vertical',
    overflow: 'auto',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  modelSelector: {
    marginTop: '15px',
    width: '100%',
    boxSizing: 'border-box',
  },
  modelLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '8px',
    fontWeight: '500',
    position: 'relative',
    fontFamily: 'Outfit',
  },
  infoIcon: {
    cursor: 'help',
    marginLeft: '4px',
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '220px',
    padding: '8px 12px',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: '4px',
    fontSize: '12px',
    lineHeight: '1.4',
    zIndex: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity 0.2s, visibility 0.2s',
  },
  tooltipVisible: {
    visibility: 'visible',
    opacity: 1,
  },
  dropdown: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '1px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    boxSizing: 'border-box',
  },
  infoText: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px',
    fontFamily: 'Outfit',
    maxWidth: '100%',
  },
  saveButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '15px',
    alignSelf: 'flex-start',
  },
  divider: {
    width: '100%',
    margin: 0,
    border: 'none',
    borderTop: '1px solid #eee',
  },
  promptLabel: {
    fontSize: '17px',
    paddingLeft: 0,
    margin: '-10px 0 0 0',
    fontFamily: 'Outfit',
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


const filterNodeStyles = {
  container: {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  iconContainer: {
    width: '32px',
    height: '32px',
    marginRight: '10px',
  },
  headerText: {
    margin: 0,
    fontSize: '16px',
  },
  inputContainer: {
    marginBottom: '10px',
  },
  input: {
    width: '90%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    fontFamily: 'Outfit'
  },
    selectInput: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '1px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    },
    addButton: {
        width: '100%',
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
    },
    filterList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '16px'
      },
    filterItem: {
        position: 'relative',
        width: '90%',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '4px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      },
    filterIcon: {
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      },
    filterDetails: {
        flex: 1,
        overflow: 'hidden'
      },
    filterName: {
        margin: 0,
        fontSize: '14px',
        fontWeight: 500,
        color: '#212529',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
    filterExp: {
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
  divider: {
    margin: '10px 0',
    border: 'none',
    borderTop: '1px solid #e0e0e0',
  },
};


const codeNodeStyles = {
  container: {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  iconContainer: {
    width: '32px',
    height: '32px',
    marginRight: '10px',
  },
  headerText: {
    margin: 0,
    fontSize: '16px',
  },
  divider: {
    margin: '10px 0',
    border: 'none',
    borderTop: '1px solid #e0e0e0',
  },
  codeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '16px'
  },
  codeItem: {
    position: 'relative',
    width: '90%',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '4px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  codeIcon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  codeDetails: {
    flex: 1,
    overflow: 'hidden'
  },
  codeName: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
    color: '#212529',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  codeSplit: {
    margin: 0, 
    color: '#666', 
    fontSize: '0.8em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '200px'
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
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        border: '1px solid #237804',
        borderRadius: '1px',
        padding: '8px 12px',
        cursor: 'pointer',
        marginTop: '10px',
        
    },
  codeMirrorContainer: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  }
};



const variablesStyles = {
  container: {
    width: '100%',
    border: '1px solid #d1d5db', // Light gray border
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
  },
  iconContainer: {
      width: '32px',
      height: '32px',
      marginRight: '10px',
  },
  header: {
    backgroundColor: '#fff', // Very light gray background
    padding: '8px 12px',
    borderBottom: '1px solid #d1d5db',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#374151', // Dark gray text
    fontFamily: 'Outfit',
    fontSize: '14px',
    fontWeight: '500',
    fontStyle: 'italic'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#ef4444', // Red color for close
    cursor: 'pointer',
    fontSize: '16px',
  },
  row: {
    display: 'flex',
    padding: '8px 12px',
    borderBottom: '1px solid #e5e7eb', // Light border between rows
    alignItems: 'center',
  },
  label: {
    color: '#4b5563', // Dark gray label color
    fontSize: '14px',
    flex: '0 0 80px', // Fixed width for labels
    fontWeight: '500',
  },
  input: {
      width: '100%',
    flex: '1',
    // border: '1px solid #d1d5db',
    border: 'none',
    padding: '6px 8px',
    fontFamily: 'Outfit',
    fontSize: '14px',
    color: '#111827', // Nearly black text
  },
  variableList: {
      display: 'flex',
      flexDirection: 'column',
      // gap: '4px',
      marginTop: '16px'
    },
  
  variableName: {
      // fontWeight: 'bold',
      fontFamily: 'Outfit',
      flex: 1,
  },
  toggleButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  toggleRowContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '16px'
  },
    toggleRow: {
      position: 'relative',
      width: '90%',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px'
    },
    dropdown: {
      width: '90%',
      backgroundColor: '#f9fafb',
      padding: '8px 12px',
      paddingLeft: 0,
      borderTop: '1px solid #e5e7eb',
    },
    dropdownInput: {
      width: '100%',
      border: '1px solid #d1d5db',
      padding: '12px 8px',
      fontSize: '14px',
    },
  removeButton: {
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
    },
};



const functionNodeStyles = {
  container: {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  iconContainer: {
    width: '32px',
    height: '32px',
    marginRight: '10px',
  },
  headerText: {
    margin: 0,
    fontSize: '16px',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '90%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    fontFamily: 'Outfit'
  },
    selectInput: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '1px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    },
    addButton: {
        width: '100%',
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
    },
    functionName: {
      marginTop: '15px',
      width: '100%',
      boxSizing: 'border-box',
    },
    functionNameLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginBottom: '8px',
      fontWeight: '500',
      position: 'relative',
      fontFamily: 'Outfit',
    },
    infoIcon: {
      cursor: 'help',
      marginLeft: '4px',
      position: 'relative',
    },
    tooltip: {
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '220px',
      padding: '8px 12px',
      backgroundColor: '#333',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      lineHeight: '1.4',
      zIndex: 10,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      visibility: 'hidden',
      opacity: 0,
      transition: 'opacity 0.2s, visibility 0.2s',
    },
    tooltipVisible: {
      visibility: 'visible',
      opacity: 1,
    },
    filterList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '20px'
      },
    filterItem: {
        position: 'relative',
        width: '90%',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '4px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      },
    filterIcon: {
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      },
    filterDetails: {
        flex: 1,
        overflow: 'hidden'
      },
    filterName: {
        margin: 0,
        fontSize: '14px',
        fontWeight: 500,
        color: '#212529',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
    filterExp: {
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
  divider: {
    margin: '10px 0',
    border: 'none',
    borderTop: '1px solid #e0e0e0',
  },
};

// In ../../modules/panelStyles.js


export { imageStyles, textStyles, videoStyles, audioStyles, fileStyles, locationStyles, 
        buttonStyles, cardStyles, aiNodeStyles, textInputStyles, voiceStyles, carouselStyles, filterNodeStyles,
        codeNodeStyles, variablesStyles, functionNodeStyles }