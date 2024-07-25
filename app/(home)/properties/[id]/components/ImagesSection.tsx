"use client";

import { useState } from "react";
import { Image } from "antd";

const ImagesSection = ({ property }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  const numberOfImages = property.urls.length;

  const handleOverlayClick = () => {
    setCurrentPreviewIndex(3); // Indeks czwartego zdjęcia (indeksy zaczynają się od 0)
    setPreviewVisible(true); // Wyświetlaj przeglądarkę zdjęć
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
      {property.urls.slice(1, 4).map((url: string, index: number) => (
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

          {property.urls
            .slice(4, numberOfImages)
            .map((url: string, index: number) => (
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
              />
            ))}
        </div>
      )}
    </Image.PreviewGroup>
  );
};

export default ImagesSection;
