"use client";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Button } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Uploader: React.FC<{ onFilesChange?: (files: UploadFile[]) => void }> = ({
  onFilesChange,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
            }}>
            {currFileList.indexOf(file) === 0 && (
              <div className="absolute translate-x-[-8px] translate-y-[-3px] bg-red-500 z-10 rounded-md flex items-center justify-center px-2 py-[2px] text-[8px] font-semibold text-white -rotate-[20deg]">
                Main
              </div>
            )}
            {originNode}
          </div>
        )}>
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
