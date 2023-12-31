import { useContext, useLayoutEffect, useRef } from "react";
import { PageEditorContext } from "../../editor";
import { handleAutoResize } from "@/utils/functions";
import { getElement, getStyle } from "../pageEditorFunctions";

export const HeadingElement = ({ id }) => {
  const { gridElements, setGridElements, designSystem } =
    useContext(PageEditorContext);
  const refText = useRef(null);

  const { element } = getElement(gridElements.elements, id);
  const value = element.fields.text;
  const styleId = element.style || "heading-one";
  const { style } = getStyle(designSystem, "heading", styleId);

  useLayoutEffect(() => {
    handleAutoResize(refText);
  }, [style, styleId]);

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
    <span className={`relative w-full leading-[0] rounded-lg `}>
      <textarea
        ref={refText}
        value={value || ""}
        onChange={handleOnChange}
        data-type="heading"
        style={style}
        placeholder="Type some fun text here"
        rows="1"
      />
    </span>
  );
};
