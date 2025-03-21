"use client";

import { useState } from "react";
import { Image } from "antd";

const ImagesSection = ({ urls }: { urls: string[] }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const numberOfImages = urls.length;

  const handleOverlayClick = () => {
    setCurrentPreviewIndex(3);
    setPreviewVisible(true);
  };
  const handleImageClick = (index: number) => {
    setCurrentPreviewIndex(index);
    setPreviewVisible(true);
  };

  return (
    <Image.PreviewGroup
      preview={{
        visible: previewVisible,
        current: currentPreviewIndex,
        onChange: (current, prev) => {
          console.log(`current index: ${current}, prev index: ${prev}`);
          setCurrentPreviewIndex(current);
        },
        onVisibleChange: (visible) => setPreviewVisible(visible),
      }}
    >
      {urls?.slice(1, 4).map((url: string, index: number) => (
        <Image
          key={index}
          alt={`Property Image ${index + 1}`}
          className="w-full rounded-lg object-cover"
          height="150"
          src={url || "/placeholder.svg"}
          style={{
            aspectRatio: "250/150",
            objectFit: "cover",
          }}
          width="250"
          onClick={() => handleImageClick(index)}
        />
      ))}
      {numberOfImages > 4 && (
        <div
          className="relative h-48 w-full cursor-pointer overflow-hidden rounded-lg"
          onClick={handleOverlayClick}
        >
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/90">
            <span className="text-2xl font-bold text-white">
              +{numberOfImages - 4}
            </span>
          </div>

          {urls.slice(4, numberOfImages).map((url: string, index: number) => (
            <Image
              key={index + 5}
              alt={`Property Image ${index + 5}`}
              className="w-full rounded-lg object-cover"
              height="150"
              src={url || "/placeholder.svg"}
              style={{
                aspectRatio: "250/150",
                objectFit: "cover",
              }}
              width="250"
              onClick={() => handleImageClick(index + 4)}
            />
          ))}
        </div>
      )}
    </Image.PreviewGroup>
  );
};

export default ImagesSection;
