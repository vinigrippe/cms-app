import { useContext, useEffect, useRef, useState } from "react";
import { getElement } from "../pageEditorService";
import { PageEditorContext } from "../pageEditor";

export const ButtonElement = ({ id }) => {
  const { gridElements, setGridElements } = useContext(PageEditorContext);
  const element = getElement(gridElements, id);

  const value = element.fields;
  const style = element.style;

  const [isFocused, setIsFocused] = useState(false);
  const refButtonEl = useRef(null);

  const handleOnChange = (e, field) => {
    setGridElements({
      type: "UPDATE_ELEMENT",
      payload: {
        elementId: id,
        change: {
          field: "fields",
          value: { [field]: e.target.value },
        },
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refButtonEl.current && !refButtonEl.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refButtonEl]);

  return (
    <span ref={refButtonEl} className="w-full relative">
      <label
        data-value={value.text}
        data-type="button"
        data-style={style || "primary-button"}
      >
        <input
          type="text"
          size="10"
          value={value.text}
          onChange={(e) => handleOnChange(e, "text")}
          placeholder="Button"
          onClick={() => setIsFocused(true)}
        />
      </label>

      {isFocused && (
        <div className="absolute z-[10] mt-1 bg-white rounded-lg border shadow-lg py-3 px-4 w-[200px] flex flex-col gap-1">
          <div className="grid grid-cols-3 gap-2 items-center">
            <p className="text-right">Action:</p>
            <input
              type="text"
              value={value.action}
              onChange={(e) => handleOnChange(e, "action")}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <p className="text-right">Icon:</p>
          </div>
        </div>
      )}
    </span>
  );
};
