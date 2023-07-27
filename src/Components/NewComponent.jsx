import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = e => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    if (selectedFiles.length > 100) {
      alert("You can select up to 100 files.");
      return;
    }

    const formData = new FormData();

    debugger;
    selectedFiles.forEach(file => {
      formData.append("files[]", file);
    });
    console.log(selectedFiles);
    try {
      const response = await axios.post(
        "https://api.yandex.disk/upload",
        formData
      );
      console.log("Response:", response);
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading files.");
    }
  };

  return (
    <div>
      <h1>Upload to Yandex.Disk</h1>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload Files</button>
    </div>
  );
};

export default FileUpload;
