import { useContext, useRef, useLayoutEffect } from "react";
import { PageEditorContext } from "../pageEditor";
import { getElement } from "../pageEditorService";
import { handleAutoResize } from "@/utils/functions";

export const TextElement = ({ id }) => {
  const { gridElements, setGridElements } = useContext(PageEditorContext);
  const element = getElement(gridElements, id);

  const refText = useRef(null);
  const value = element.fields.text;
  const style = element.style;

  useLayoutEffect(() => {
    handleAutoResize(refText);
  }, [style]);

  const handleOnChange = (e) => {
    setGridElements({
      type: "UPDATE_ELEMENT",
      payload: {
        elementId: id,
        change: {
          field: "fields",
          value: { text: e.target.value || "" },
        },
      },
    });
    handleAutoResize(refText);
  };

  return (
    <textarea
      ref={refText}
      value={value || ""}
      onChange={handleOnChange}
      placeholder="Type some fun text here"
      data-type="text"
      data-style={style || "text"}
      rows="1"
    />
  );
};
