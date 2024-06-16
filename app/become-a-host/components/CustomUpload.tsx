"use client";
import React, { useRef, useState } from "react";

import { uploadPhoto } from "@/lib/actions/host/createObject";
const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const formRef = useRef();

  async function handleInputFiles(e) {
    const files = e.target.files;
    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        return file;
      }
    });
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => console.log(file));
    formRef.current.reset();
  }

  async function handleDeleteFile(index) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  async function handleUpload() {
    if (!files.length) return alert("No files to upload");
    if (files.length > 10) return alert("Max 10 files");

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await uploadPhoto(formData);
    if (res?.errMsg) return alert(res.errMsg);
    setFiles([]);
  }

  return (
    <form action={handleUpload} ref={formRef}>
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputFiles}
        />
      </div>
      <ButtonSubmit value="Upload to cloudinary" />
    </form>
  );
};

export default UploadForm;
