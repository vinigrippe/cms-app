import React, { useContext } from "react";
import { PageEditorContext } from "../../editor";
import { getElement } from "../../editorFunctions";

export const ImageElement = ({ id }) => {
  const { gridElements } = useContext(PageEditorContext);
  const { element } = getElement(gridElements.elements, id);
  const selectedImage = element.fields.src;

  return (
    <figure
      className={`
      relative ${
        selectedImage ? "h-full" : "h-[200px]"
      } w-full group/image rounded-[inherit] overflow-hidden`}
      data-type="image"
    >
      {!selectedImage ? (
        <div className="flex items-center justify-center gap-2 flex-col w-full h-full bg-slate-100 px-5 py-8 cursor-pointer hover:bg-slate-200 transition-all">
          <span className="mgc_pic_line text-lg" />
        </div>
      ) : (
        <img
          src={selectedImage}
          alt="test"
          className="relative z-10 object-center w-full h-full"
          style={{
            objectFit: element?.classes?.objectFit || "cover",
          }}
        />
      )}
    </figure>
  );
};
