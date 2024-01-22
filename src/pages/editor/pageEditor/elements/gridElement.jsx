import { useContext } from "react";
import { BoxElement } from "./boxElement";
import { generateId } from "@/utils/functions";
import { PageEditorContext } from "../../editor";
import { getElement } from "../../editorFunctions";
import { PaddingView } from "./components/paddingView";
import { Button } from "../../../../components/button/button";

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
      type: "ADD_GRID",
      payload: {
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
      <>
        <div
          id={id}
          className={`group/grid relative w-full grid ${
            elementOnFocus?.grid?.id === id ? "element-focused" : ""
          }`}
          onDragLeave={() => {
            const gridId = document.getElementById(id);
            if (gridId) {
              gridId.classList.remove("drag-enter");
            }
          }}
          onMouseLeave={() => {
            const gridId = document.getElementById(id);
            if (gridId) {
              gridId.classList.remove("drag-enter");
            }
          }}
          onDragEnter={(e) => {
            const boxId = e.target.closest("[data-element='box']");
            const gridId = e.target.closest("[data-element='grid']");

            if (gridId) {
              console.log(gridId);
              gridId.classList.add("drag-enter");
            }
          }}
          onDrop={(e) => {
            const droppedType = e.dataTransfer.getData("text");
            console.log(droppedType);
          }}
          data-element="grid"
          data-animation="entrance-fade"
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
          {element.elements.map((boxElement) => (
            <BoxElement key={boxElement.id} id={boxElement.id} />
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
        {/* onClick={() => handleInsertGrid(index + 1)} */}
      </>
    );
}
