import { useContext, useState } from "react";
import { PageEditorContext } from "../../editor";

import elementsList from "@/utils/elementList.json";
import { generateId } from "@/utils/functions";

import { ButtonElement } from "./buttonElement";
import { HeadingElement } from "./headingElement";
import { TextElement } from "./textElement";
import { ImageElement } from "./imageElement";
import { VideoElement } from "./videoElement";
import { LineElement } from "./lineElement";
import { GridElement } from "./gridElement";
import { getElement } from "../pageEditorFunctions";

export function BoxElement({ boxIndex, id }) {
  const { gridElements, setGridElements, elementOnFocus } =
    useContext(PageEditorContext);
  const { element } = getElement(gridElements.elements, id);

  const handleInsertBox = (order) => {
    const newElement = {
      id: generateId({ name: "box" }),
      type: "box",
      elements: [],
    };

    setGridElements({
      type: "ADD_ELEMENT",
      payload: {
        elementType: "box",
        elementId: element.id,
        elementIndex: order,
        newElement,
      },
    });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    const boxElement = e.target.closest("[data-element='box']");
    boxElement?.classList?.remove("element-focused");
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    const boxElement = e.target.closest("[data-element='box']");
    boxElement?.classList?.add("element-focused");
  };

  const handleOnDrop = (e) => {
    e.preventDefault();

    const droppedType = e.dataTransfer.getData("text");
    const boxId = e.target.closest("[data-element='box']").id;

    if (boxId !== id) return;

    const elementAttributes = elementsList.find(
      (item) => item.type === droppedType
    );

    if (!elementAttributes) return;

    const newElement = {
      id: generateId({ name: droppedType }),
      type: elementAttributes.type,
      style: elementAttributes.style,
    };

    if (elementAttributes.type === "grid") {
      newElement.elements = [
        {
          id: generateId({ name: "box" }),
          type: "box",
          elements: [],
        },
      ];
    } else {
      newElement.fields = {};
    }

    setGridElements({
      type: "ADD_ELEMENT",
      payload: {
        elementType: elementAttributes.type,
        elementId: boxId,
        newElement,
      },
    });
    handleDragLeave(e);
  };

  const borderStyle = `${element?.classes?.borderWidth || "0"}px ${
    element?.classes?.borderStyle || "solid"
  } ${element?.classes?.borderColor || "initial"}`;

  return (
    <>
      <div
        className="h-full w-full relative"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleOnDrop(e)}
      >
        {element.elements?.length === 0 ? (
          <div
            data-element="box"
            className="w-full h-full outline-1 outline-slate-200 outline-dashed rounded-md flex flex-col items-center justify-center p-5"
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            id={id}
          >
            <p>This is a box</p>
            <p className="text-slate-400">Drop elements on me</p>
          </div>
        ) : (
          <div
            data-element="box"
            id={id}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            className={`flex flex-col w-full h-full ${
              elementOnFocus?.box?.id === element.id ? "element-focused" : ""
            }`}
            style={{
              paddingTop: element?.classes?.paddingTop + "px" || "0px",
              paddingBottom: element?.classes?.paddingBottom + "px" || "0px",
              paddingLeft: element?.classes?.paddingLeft + "px" || "0px",
              paddingRight: element?.classes?.paddingRight + "px" || "0px",
              borderTop: element?.classes?.borderTop ? borderStyle : "none",
              borderLeft: element?.classes?.borderLeft ? borderStyle : "none",
              borderRight: element?.classes?.borderRight ? borderStyle : "none",
              borderBottom: element?.classes?.borderBottom
                ? borderStyle
                : "none",
              gap: element?.classes?.gap + "px" || "0px",
            }}
          >
            {element.elements?.map((element, elementIndex) => (
              <div
                data-element="element"
                className={`relative flex items-center gap-1 group/element w-full max-w-full overflow-hidden ${
                  elementOnFocus?.element?.id === element.id
                    ? "element-focused"
                    : ""
                }`}
                data-form-bold={element?.classes?.bold || false}
                data-form-italic={element?.classes?.italic || false}
                data-form-underline={element?.classes?.underline || false}
                data-form-textalign={element?.classes?.textAlign || "left"}
                data-form-fontsize={element?.classes?.fontSize || "initial"}
                data-link={element?.link || false}
                style={{
                  color: element?.classes?.color || "initial",
                  borderRadius:
                    element?.classes?.borderRadius + "px" || "initial",
                  height: element?.classes?.height + "px" || "initial",
                  width: element?.classes?.width + "px" || "100%",
                  paddingTop: element?.classes?.paddingTop + "px" || "0px",
                  paddingBottom:
                    element?.classes?.paddingBottom + "px" || "0px",
                  paddingLeft: element?.classes?.paddingLeft + "px" || "0px",
                  paddingRight: element?.classes?.paddingRight + "px" || "0px",
                }}
                id={element.id}
                key={element.id}
              >
                {
                  {
                    heading: <HeadingElement id={element.id} />,
                    text: <TextElement id={element.id} />,
                    button: <ButtonElement id={element.id} />,
                    image: <ImageElement id={element.id} />,
                    video: <VideoElement id={element.id} />,
                    line: <LineElement id={element.id} />,
                    grid: <GridElement id={element.id} index={elementIndex} />,
                    box: <BoxElement id={element.id} boxIndex={elementIndex} />,
                  }[element.type]
                }
              </div>
            ))}
          </div>
        )}
        <div
          className={`rounded-full bg-slate-200 flex items-center justify-center min-w-[24px] h-[24px] z-40 absolute top-1/2 -left-[12px] -mt-3 opacity-100 transition-all cursor-pointer hover:bg-blue-600`}
          onClick={() => handleInsertBox(boxIndex)}
        >
          <span className="mgc_add_fill before:!text-white text-[10px]" />
        </div>
        <div
          className={`rounded-full bg-slate-200 flex items-center justify-center min-w-[24px] h-[24px] z-40 absolute top-1/2 -right-[12px] -mt-3 opacity-100 transition-all cursor-pointer hover:bg-blue-600`}
          onClick={() => handleInsertBox(boxIndex + 1)}
        >
          <span className="mgc_add_fill before:!text-white text-[10px]" />
        </div>
      </div>
    </>
  );
}
