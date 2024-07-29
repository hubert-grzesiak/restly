"use client";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Button } from "antd";
import type { UploadFile, UploadProps } from "antd";

type FileType = Blob | File;

// Helper function to convert URLs to UploadFile objects
const urlToUploadFile = (url: string, index: number): UploadFile => ({
  uid: String(index), // unique identifier for each file
  name: `image${index}`, // name for display
  status: "done", // status for antd Upload
  url: url, // the URL of the image
});

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Uploader: React.FC<{
  onFilesChange?: (files: UploadFile[]) => void;
  defaultFiles?: string[]; // array of URLs
}> = ({ onFilesChange, defaultFiles = [] }) => {
  // Convert URLs to UploadFile objects
  const initialFiles = defaultFiles.map((url, index) =>
    urlToUploadFile(url, index),
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(initialFiles);

  useEffect(() => {
    setFileList(initialFiles);
  }, [defaultFiles]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onFilesChange) {
      onFilesChange(newFileList);
    }
  };

  const uploadButton = (
    <Button type="default" style={{ border: 0, background: "none" }}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </Button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        multiple
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        itemRender={(originNode, file, currFileList) => (
          <div
            style={{
              border: currFileList.indexOf(file) === 0 ? "relative" : "none",
            }}
          >
            {currFileList.indexOf(file) === 0 && (
              <div className="absolute z-10 flex translate-x-[-8px] translate-y-[-3px] -rotate-[20deg] items-center justify-center rounded-md bg-red-500 px-2 py-[2px] text-[8px] font-semibold text-white">
                Main
              </div>
            )}
            <div style={{ width: 100, height: 100, overflow: "hidden" }}>
              {originNode}
            </div>
          </div>
        )}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
          alt="Preview Image"
        />
      )}
    </>
  );
};

export default Uploader;
