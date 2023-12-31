import { useContext } from "react";
import { BoxElement } from "./boxElement";
import { generateId } from "@/utils/functions";
import { PageEditorContext } from "../../editor";
import { getElement } from "../pageEditorFunctions";
import { PaddingView } from "./components/paddingView";

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
      <div className="group/grid">
        <div
          id={id}
          className={`relative w-full grid ${
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
            position: element?.classes?.position || "relative",
            zIndex: element?.classes?.zIndex || 0,
            backgroundColor: element?.classes?.backgroundColor || "transparent",
            top: element?.classes?.position === "sticky" ? -12 : 0,
          }}
        >
          {element.elements.map((boxElement, boxIndex) => (
            <>
              <BoxElement key={boxElement.id} id={boxElement.id} />
            </>
          ))}
          {elementOnFocus?.grid?.id === id && (
            <PaddingView
              element="grid"
              pt={element?.classes?.paddingTop}
              pr={element?.classes?.paddingRight}
              pl={element?.classes?.paddingLeft}
              pb={element?.classes?.paddingBottom}
            />
          )}
        </div>
      </div>
    );
}
