import { useContext } from "react";
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
import { getElement } from "../../editorFunctions";
import { PaddingView } from "./components/paddingView";

export function BoxElement({ id }) {
  const { gridElements, setGridElements, elementOnFocus } =
    useContext(PageEditorContext);
  const { element } = getElement(gridElements.elements, id);

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
        className="h-full w-full relative group/box animate-entrance-fade"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleOnDrop(e)}
      >
        {element.elements?.length === 0 ? (
          <div
            data-element="box"
            className="w-full h-full border border-dashed border-slate-300 bg-slate-50/20 rounded-lg flex flex-col items-center justify-center p-5"
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            id={id}
          >
            <p className="text-slate-500">This is a box</p>
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
              alignItems: element?.classes?.alignItems || "flex-start",
              justifyContent: element?.classes?.justifyContent || "flex-start",
            }}
          >
            {element.elements?.map((component, elementIndex) => (
              <>
                <div
                  data-element="element"
                  className={`relative flex items-center gap-1 group/element w-full max-w-full ${
                    elementOnFocus?.element?.id === component.id
                      ? "element-focused"
                      : ""
                  }`}
                  data-form-bold={component?.classes?.bold || false}
                  data-form-italic={component?.classes?.italic || false}
                  data-form-underline={component?.classes?.underline || false}
                  data-form-textalign={component?.classes?.textAlign || "left"}
                  data-form-fontsize={component?.classes?.fontSize || "initial"}
                  data-link={component?.link || false}
                  style={{
                    color: component?.classes?.color || "initial",
                    borderRadius:
                      component?.classes?.borderRadius + "px" || "initial",
                    height: component?.classes?.height + "px" || "initial",
                    width: component?.classes?.width + "px" || "100%",
                    paddingTop: component?.classes?.paddingTop + "px" || "0px",
                    paddingBottom:
                      component?.classes?.paddingBottom + "px" || "0px",
                    paddingLeft:
                      component?.classes?.paddingLeft + "px" || "0px",
                    paddingRight:
                      component?.classes?.paddingRight + "px" || "0px",
                  }}
                  id={component.id}
                  key={component.id}
                >
                  {
                    {
                      heading: <HeadingElement id={component.id} />,
                      text: <TextElement id={component.id} />,
                      button: <ButtonElement id={component.id} />,
                      image: <ImageElement id={component.id} />,
                      video: <VideoElement id={component.id} />,
                      line: <LineElement id={component.id} />,
                      grid: (
                        <GridElement id={component.id} index={elementIndex} />
                      ),
                      box: <BoxElement id={component.id} />,
                    }[component.type]
                  }
                  {elementOnFocus?.element?.id === component.id && (
                    <PaddingView
                      element="element"
                      pt={component?.classes?.paddingTop}
                      pr={component?.classes?.paddingRight}
                      pl={component?.classes?.paddingLeft}
                      pb={component?.classes?.paddingBottom}
                    />
                  )}
                </div>
                {element?.classes?.gap > 0 &&
                  element.elements.length - 1 !== elementIndex &&
                  elementOnFocus?.box?.id === id && (
                    <div
                      className="w-full bg-sky-100"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, dodgerblue, dodgerblue 1px, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0) 8px )`,
                        marginBottom: "-" + element?.classes?.gap + "px" || 0,
                        marginTop: "-" + element?.classes?.gap + "px" || 0,
                        height: element?.classes?.gap + "px" || 0,
                      }}
                    />
                  )}
              </>
            ))}

            {elementOnFocus?.box?.id === id && (
              <PaddingView
                element="box"
                pt={element?.classes?.paddingTop}
                pr={element?.classes?.paddingRight}
                pl={element?.classes?.paddingLeft}
                pb={element?.classes?.paddingBottom}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
