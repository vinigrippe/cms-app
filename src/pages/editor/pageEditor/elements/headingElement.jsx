import { useContext, useLayoutEffect, useRef } from "react";
import { PageEditorContext } from "../pageEditor";
import { handleAutoResize } from "@/utils/functions";
import { getElement } from "../pageEditorService";

export const HeadingElement = ({ id }) => {
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
    <span className="relative w-full leading-[0]">
      <textarea
        ref={refText}
        value={value || ""}
        onChange={handleOnChange}
        data-type="heading"
        data-style={style || "heading-one"}
        placeholder="Type some fun text here"
        rows="1"
      />
    </span>
  );
};
