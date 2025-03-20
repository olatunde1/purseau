import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UploadImage from "../assets/images/upload-image.png";
import useImageSearch from "@/hooks/api/mutation/imageSearch/useImageSearch";

export default function ImageSearchModal() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateFile(selectedFile);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateFile(droppedFile);
    }
  };

  // Validate file type and size
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/tiff", "image/bmp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Unsupported file type. Please upload a JPG, PNG, TIFF, or BMP file."
      );
      return;
    }

    if (file.size > maxSize) {
      setError("File size exceeds the maximum limit of 10MB.");
      return;
    }

    setError(null);
    setFile(file);
  };

  // Handle file upload
  // const handleUpload = () => {
  //   if (file) {
  //     console.log("Uploading file:", file);
  //     // Add your file upload logic here (e.g., API call)
  //   }
  // };

  const { mutateAsync, isPending } = useImageSearch();

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);
    mutateAsync(formData, {
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error) => {
        console.log(error); // Handle error
      },
    });
  };

  return (
    <DialogContent className="dialog-content">
      <DialogHeader className="dialog-header">
        <DialogTitle className="dialog-title">
          Search any item by image
        </DialogTitle>
      </DialogHeader>

      {/* Drag and Drop Zone */}
      <div
        className={`drop-zone ${file ? "file-selected" : ""}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {!file ? (
          <>
            <img src={UploadImage} alt="" className="upload-image" />
            <p className="text-gray-500 drag-drop">
              Drag and drop an image here
            </p>
            <p className="text-gray-500 pt-2 pb-4 file-type">
              File types supported: JPG, PNG, TIFF, <br /> BMP. Max size 10MB
            </p>

            {/* Hidden File Input */}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.tiff,.bmp"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />

            {/* Clickable Label for File Input */}
            <label htmlFor="file-upload" className="mt-4 inline-block">
              <Button
                variant="outline"
                asChild
                onMouseDown={(e) => e.preventDefault()} // Prevents the blinking cursor
              >
                <span className="choose-image">Choose Image</span>
              </Button>
            </label>
          </>
        ) : (
          <div className="image-preview">
            <div className="flex justify-center ">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="preview-image w-48 h-48 object-contain"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setFile(null)}
              className="remove-button mt-4"
            >
              Remove Image
            </Button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Selected File Display */}
      {file && (
        <div className="mt-4">
          <p className="selected-file">Selected file: {file.name}</p>
          <Button onClick={handleUpload} className="upload-button">
            {isPending ? "uploading.." : "Upload"}
          </Button>
        </div>
      )}
    </DialogContent>
  );
}
