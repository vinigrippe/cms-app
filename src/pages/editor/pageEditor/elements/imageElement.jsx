import React, { useState } from "react";

export const ImageElement = ({ id }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <figure
      className="relative h-[200px] w-full group/image rounded-lg overflow-hidden"
      data-type="image"
    >
      <label htmlFor={id + "_input"} className="cursor-pointer">
        <input
          id={id + "_input"}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: "none" }}
        />
        {selectedImage && (
          <img
            src={selectedImage && URL.createObjectURL(selectedImage)}
            alt="test"
            className="relative z-10 object-cover object-center w-full h-full group-hover/image:opacity-20 transition-all"
          />
        )}
        <div className="absolute top-0 left-0 flex items-center justify-center gap-2 flex-col w-full h-full bg-slate-100 px-5 py-8 cursor-pointer hover:bg-slate-200 transition-all">
          <span className="mgc_pic_line text-lg before:!text-blue-600" />
          {!selectedImage ? (
            <p>
              Select <strong>Image</strong> to add an image to your page.
            </p>
          ) : (
            <p>Select a different image</p>
          )}
        </div>
      </label>
    </figure>
  );
};
