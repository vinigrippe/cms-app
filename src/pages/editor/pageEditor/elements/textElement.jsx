import { useContext, useRef, useLayoutEffect, useState } from "react";
import { PageEditorContext } from "../../editor";
import { getElement, getStyle } from "../../editorFunctions";
import { handleAutoResize } from "@/utils/functions";

export const TextElement = ({ id }) => {
  const { gridElements, setGridElements, designSystem } =
    useContext(PageEditorContext);
  const refText = useRef(null);

  const { element } = getElement(gridElements.elements, id);
  const value = element.fields.text;
  const styleId = element.style || "paragraph";
  const { style } = getStyle(designSystem, "paragraph", styleId);

  useLayoutEffect(() => {
    handleAutoResize(refText);
  }, [style]);

  const handleOnChange = (e) => {
    const updatedElement = {
      ...element,
      fields: { text: e.target.value || "" },
    };

    setGridElements({
      type: "UPDATE_ELEMENT",
      payload: {
        elementId: id,
        newElement: updatedElement,
      },
    });
    handleAutoResize(refText);
  };

  return (
    <span className={`relative w-full leading-[0] rounded-lg`}>
      <textarea
        ref={refText}
        value={value || ""}
        onChange={handleOnChange}
        data-type="text"
        style={style}
        placeholder="Type some fun text here"
        rows="1"
      />
    </span>
  );
};
