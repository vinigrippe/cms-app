import { useContext } from "react";
import { BoxElement } from "./boxElement";
import { generateId } from "@/utils/functions";
import { PageEditorContext } from "../../editor";
import { getElement } from "../pageEditorFunctions";

export function GridElement({ id, index }) {
  const { gridElements, setGridElements, elementOnFocus } =
    useContext(PageEditorContext);
  const { element } = getElement(gridElements.elements, id);

  const handleInsertGrid = (order) => {
    const newElement = {
      id: generateId({ name: "grid" }),
      type: "grid",
      elements: [
        {
          id: generateId({ name: "box" }),
          type: "box",
          elements: [],
        },
      ],
    };

    setGridElements({
      type: "ADD_ELEMENT",
      payload: {
        elementId: element.id,
        elementType: "grid",
        elementIndex: order,
        newElement,
      },
    });
  };

  const borderStyle = `${element?.classes?.borderWidth || "0"}px ${
    element?.classes?.borderStyle || "solid"
  } ${element?.classes?.borderColor || "#000000"}`;

  if (element.elements.length > 0)
    return (
      <div className={`relative w-full group/grid`}>
        <div
          id={id}
          className={`grid grid-cols-2 w-full ${
            elementOnFocus?.grid?.id === id ? "element-focused" : ""
          }`}
          data-element="grid"
          style={{
            gridTemplateColumns: `repeat(${element.elements.length}, minmax(0, 1fr))`,
            paddingTop: element?.classes?.paddingTop + "px" || "0px",
            paddingBottom: element?.classes?.paddingBottom + "px" || "0px",
            paddingLeft: element?.classes?.paddingLeft + "px" || "0px",
            paddingRight: element?.classes?.paddingRight + "px" || "0px",
            borderTop: element?.classes?.borderTop ? borderStyle : "none",
            borderLeft: element?.classes?.borderLeft ? borderStyle : "none",
            borderRight: element?.classes?.borderRight ? borderStyle : "none",
            borderBottom: element?.classes?.borderBottom ? borderStyle : "none",
            gap: element?.classes?.gap + "px" || "0px",
          }}
        >
          {element.elements.map((boxElement, boxIndex) => (
            <BoxElement
              key={boxElement.id}
              id={boxElement.id}
              boxIndex={boxIndex}
            />
          ))}
        </div>
        <div className="absolute bg-red bottom-0 -mb-[12px] w-full flex items-center justify-center gap-2 group-hover/grid:opacity-100 opacity-0">
          <div
            className={`rounded-full bg-slate-200 flex items-center justify-center min-w-[24px] h-[24px] transition-all cursor-pointer hover:bg-blue-600`}
            onClick={() => handleInsertGrid(index + 1)}
          >
            <span className="mgc_add_fill before:!text-white text-[10px] transition-all" />
          </div>
        </div>
      </div>
    );
}
