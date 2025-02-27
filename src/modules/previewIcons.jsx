import React from 'react';
import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileJson,
  FilePlus,
  FileSpreadsheet,
  File,
  FileArchive,
//   FilePresentation,
  FileQuestion
} from 'lucide-react';

const PreviewFileIcon = ({ fileName, size = 24, color = "#000000" }) => {
  // Get file extension
  const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
  };

  // Get icon based on file extension
  const getFileIcon = (extension) => {
    // Document types
    const documentTypes = {
      pdf: { icon: FileText },
      doc: { icon: FileText },
      docx: { icon: FileText },
      txt: { icon: FileText },
      rtf: { icon: FileText },
      odt: { icon: FileText }
    };

    // Spreadsheet types
    const spreadsheetTypes = {
      xls: { icon: FileSpreadsheet },
      xlsx: { icon: FileSpreadsheet },
      csv: { icon: FileSpreadsheet },
      ods: { icon: FileSpreadsheet }
    };

    // Presentation types
    // const presentationTypes = {
    //   ppt: { icon: FilePresentation },
    //   pptx: { icon: FilePresentation },
    //   odp: { icon: FilePresentation }
    // };

    // Image types
    const imageTypes = {
      jpg: { icon: FileImage },
      jpeg: { icon: FileImage },
      png: { icon: FileImage },
      gif: { icon: FileImage },
      svg: { icon: FileImage },
      webp: { icon: FileImage }
    };

    // Video types
    const videoTypes = {
      mp4: { icon: FileVideo },
      mov: { icon: FileVideo },
      avi: { icon: FileVideo },
      mkv: { icon: FileVideo },
      webm: { icon: FileVideo }
    };

    // Audio types
    const audioTypes = {
      mp3: { icon: FileAudio },
      wav: { icon: FileAudio },
      ogg: { icon: FileAudio },
      m4a: { icon: FileAudio }
    };

    // Code types
    const codeTypes = {
      js: { icon: FileCode },
      jsx: { icon: FileCode },
      ts: { icon: FileCode },
      tsx: { icon: FileCode },
      html: { icon: FileCode },
      css: { icon: FileCode },
      py: { icon: FileCode },
      java: { icon: FileCode },
      php: { icon: FileCode },
      rb: { icon: FileCode },
      swift: { icon: FileCode },
      go: { icon: FileCode }
    };

    // Data types
    const dataTypes = {
      json: { icon: FileJson },
      xml: { icon: FileCode },
      yaml: { icon: FileCode },
      yml: { icon: FileCode }
    };

    // Archive types
    const archiveTypes = {
      zip: { icon: FileArchive },
      rar: { icon: FileArchive },
      '7z': { icon: FileArchive },
      tar: { icon: FileArchive },
      gz: { icon: FileArchive }
    };

    // Combine all file types
    const allFileTypes = {
      ...documentTypes,
      ...spreadsheetTypes,
    //   ...presentationTypes,
      ...imageTypes,
      ...videoTypes,
      ...audioTypes,
      ...codeTypes,
      ...dataTypes,
      ...archiveTypes
    };

    return allFileTypes[extension] || { icon: FileQuestion };
  };

  const extension = getFileExtension(fileName);
  const { icon: IconComponent } = getFileIcon(extension);

  return (
    <div className="flex items-center justify-center">
      <IconComponent size={size} color="#237804" />
    </div>
  );
};

export default PreviewFileIcon;