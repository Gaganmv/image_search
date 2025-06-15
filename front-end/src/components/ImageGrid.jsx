import React from 'react';

const ImageGrid = ({ images, selectedImages, handleSelect }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {images.map((img) => (
      <div
        key={img.id}
        className="relative group overflow-hidden border rounded-lg shadow hover:shadow-lg"
      >
        <img
          src={img.urls.small}
          alt={img.alt_description}
          className="w-full h-auto"
        />
        <input
          type="checkbox"
          checked={selectedImages.some((i) => i.id === img.id)}
          onChange={() => handleSelect(img)}
          className="absolute top-2 left-2 w-5 h-5 hidden group-hover:block"
        />
      </div>
    ))}
  </div>
);

export default ImageGrid;
