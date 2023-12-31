import { useContext } from "react";
import { getElement, getStyle } from "../pageEditorFunctions";
import { PageEditorContext } from "../../editor";

export const ButtonElement = ({ id }) => {
  const { gridElements, setGridElements, designSystem } =
    useContext(PageEditorContext);

  const { element } = getElement(gridElements.elements, id);
  const value = element.fields;
  const styleId = element.style || "primary-button";
  const { style } = getStyle(designSystem, "button", styleId);

  const handleOnChange = (e, field) => {
    const updatedElement = {
      ...element,
      fields: { [field]: e.target.value },
    };

    setGridElements({
      type: "UPDATE_ELEMENT",
      payload: {
        elementId: id,
        newElement: updatedElement,
      },
    });
  };

  return (
    <div className="relative w-full">
      <label data-value={value?.text} data-type="button" style={style}>
        <input
          type="text"
          size="10"
          value={value?.text}
          onChange={(e) => handleOnChange(e, "text")}
          placeholder="Button"
        />
      </label>
    </div>
  );
};
