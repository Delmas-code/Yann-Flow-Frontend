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
      pdf: { icon: FileText, color: "#FF0000" },
      doc: { icon: FileText, color: "#2B579A" },
      docx: { icon: FileText, color: "#2B579A" },
      txt: { icon: FileText, color: "#000000" },
      rtf: { icon: FileText, color: "#000000" },
      odt: { icon: FileText, color: "#000000" }
    };

    // Spreadsheet types
    const spreadsheetTypes = {
      xls: { icon: FileSpreadsheet, color: "#217346" },
      xlsx: { icon: FileSpreadsheet, color: "#217346" },
      csv: { icon: FileSpreadsheet, color: "#217346" },
      ods: { icon: FileSpreadsheet, color: "#217346" }
    };

    // Presentation types
    // const presentationTypes = {
    //   ppt: { icon: FilePresentation, color: "#B7472A" },
    //   pptx: { icon: FilePresentation, color: "#B7472A" },
    //   odp: { icon: FilePresentation, color: "#B7472A" }
    // };

    // Image types
    const imageTypes = {
      jpg: { icon: FileImage, color: "#FFB13B" },
      jpeg: { icon: FileImage, color: "#FFB13B" },
      png: { icon: FileImage, color: "#FFB13B" },
      gif: { icon: FileImage, color: "#FFB13B" },
      svg: { icon: FileImage, color: "#FFB13B" },
      webp: { icon: FileImage, color: "#FFB13B" }
    };

    // Video types
    const videoTypes = {
      mp4: { icon: FileVideo, color: "#FF0000" },
      mov: { icon: FileVideo, color: "#FF0000" },
      avi: { icon: FileVideo, color: "#FF0000" },
      mkv: { icon: FileVideo, color: "#FF0000" },
      webm: { icon: FileVideo, color: "#FF0000" }
    };

    // Audio types
    const audioTypes = {
      mp3: { icon: FileAudio, color: "#1DB954" },
      wav: { icon: FileAudio, color: "#1DB954" },
      ogg: { icon: FileAudio, color: "#1DB954" },
      m4a: { icon: FileAudio, color: "#1DB954" }
    };

    // Code types
    const codeTypes = {
      js: { icon: FileCode, color: "#F7DF1E" },
      jsx: { icon: FileCode, color: "#61DAFB" },
      ts: { icon: FileCode, color: "#3178C6" },
      tsx: { icon: FileCode, color: "#3178C6" },
      html: { icon: FileCode, color: "#E34F26" },
      css: { icon: FileCode, color: "#1572B6" },
      py: { icon: FileCode, color: "#3776AB" },
      java: { icon: FileCode, color: "#007396" },
      php: { icon: FileCode, color: "#777BB4" },
      rb: { icon: FileCode, color: "#CC342D" },
      swift: { icon: FileCode, color: "#FA7343" },
      go: { icon: FileCode, color: "#00ADD8" }
    };

    // Data types
    const dataTypes = {
      json: { icon: FileJson, color: "#000000" },
      xml: { icon: FileCode, color: "#000000" },
      yaml: { icon: FileCode, color: "#000000" },
      yml: { icon: FileCode, color: "#000000" }
    };

    // Archive types
    const archiveTypes = {
      zip: { icon: FileArchive, color: "#FFB13B" },
      rar: { icon: FileArchive, color: "#FFB13B" },
      '7z': { icon: FileArchive, color: "#FFB13B" },
      tar: { icon: FileArchive, color: "#FFB13B" },
      gz: { icon: FileArchive, color: "#FFB13B" }
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

    return allFileTypes[extension] || { icon: FileQuestion, color: "#6C757D" };
  };

  const extension = getFileExtension(fileName);
  const { icon: IconComponent, color: iconColor } = getFileIcon(extension);

  return (
    <div className="flex items-center justify-center">
      <IconComponent size={size} color={iconColor} />
    </div>
  );
};

export default PreviewFileIcon;