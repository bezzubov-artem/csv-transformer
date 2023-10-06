import React from "react";

const FileUploader = React.memo(({ handleFileUpload, fileType, disabled }) => {
  return (
    <div className="mt-8 mb-2">
      <input
        className="border w-full p-3"
        type="file"
        disabled={disabled}
        accept={`.${fileType}`}
        onChange={(event) => handleFileUpload(event, fileType)}
      />
    </div>
  );
});

export default FileUploader;
