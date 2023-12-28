import { useContext, useLayoutEffect, useRef, useState } from "react";
import { PageEditorContext } from "../../editor";
import { handleAutoResize } from "@/utils/functions";
import { getElement } from "../pageEditorFunctions";

export const HeadingElement = ({ id }) => {
  const { gridElements, setGridElements } = useContext(PageEditorContext);
  const { element } = getElement(gridElements.elements, id);
  const [isDragging, setIsDragging] = useState(false);

  const refText = useRef(null);
  const value = element.fields.text;
  const style = element.style;

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
    <span
      className={`relative w-full leading-[0] rounded-lg ${
        isDragging
          ? "outline-2 outline-blue-600 outline-dotted outline-offset-2 shadow-[0_0_0_5px_#dbeafe]"
          : ""
      }`}
      onDoubleClick={() => {
        setIsDragging(!isDragging);
      }}
      onMouseLeave={() => {
        setIsDragging(false);
      }}
    >
      <textarea
        ref={refText}
        value={value || ""}
        onChange={handleOnChange}
        data-type="heading"
        data-style={style || "heading-one"}
        placeholder="Type some fun text here"
        rows="1"
        className={isDragging ? "!pointer-events-none" : ""}
      />
    </span>
  );
};
