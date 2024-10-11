"use client";
import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Button } from "antd";
import type { UploadFile, UploadProps } from "antd";

type FileType = Blob | File;

const urlToUploadFile = (url: string, index: number): UploadFile => ({
  uid: String(index),
  name: `image${index}`,
  status: "done",
  url: url,
});

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Helper function to compare arrays
function arraysAreEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const Uploader: React.FC<{
  onFilesChange?: (files: UploadFile[]) => void;
  defaultFiles?: string[];
}> = ({ onFilesChange, defaultFiles = [] }) => {
  const initialFiles = defaultFiles.map((url, index) =>
    urlToUploadFile(url, index),
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(initialFiles);

  const prevDefaultFilesRef = useRef<string[]>(defaultFiles);

  useEffect(() => {
    if (!arraysAreEqual(prevDefaultFilesRef.current, defaultFiles)) {
      setFileList(initialFiles);
      prevDefaultFilesRef.current = defaultFiles;
    }
  }, [defaultFiles, initialFiles]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    newFileList.forEach((file) => {
      if (file.response && file.response.url) {
        file.url = file.response.url;
      }
    });

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
