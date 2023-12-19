import { useContext } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { DropComponent } from "@/utils/dropElement";
import { PageEditorContext } from "../pageEditor";

import elementsList from "@/utils/elementList.json";
import { generateId } from "@/utils/functions";

import { ButtonElement } from "./buttonElement";
import { HeadingElement } from "./headingElement";
import { TextElement } from "./textElement";
import { ImageElement } from "./imageElement";
import { VideoElement } from "./videoElement";
import { LineElement } from "./lineElement";

export function BoxElement({ boxIndex, boxElement, gridIndex }) {
  const { gridElements, setGridElements } = useContext(PageEditorContext);

  const handleInsertBox = (order) => {
    const newBox = {
      id: generateId({ name: "box" }),
      elements: [],
    };

    setGridElements({
      type: "ADD_BOX",
      payload: { gridIndex: gridIndex, boxIndex: order, newBox },
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
    const elementAttributes = elementsList.find(
      (item) => item.type === droppedType
    );
    const newElement = {
      id: generateId({ name: droppedType }),
      type: elementAttributes.type,
      style: elementAttributes.style,
      fields: {},
    };

    setGridElements({
      type: "ADD_ELEMENT",
      payload: {
        gridIndex: gridIndex,
        boxIndex: boxIndex,
        elementIndex: boxElement.elements.length,
        newElement,
      },
    });
    handleDragLeave(e);
  };

  const handleDragEnd = (result) => {
    if (result.destination) {
      setGridElements({
        type: "REORDER_ELEMENTS",
        payload: {
          gridIndex: gridIndex,
          boxIndex: boxIndex,
          sourceIndex: result.source.index,
          destinationIndex: result.destination.index,
        },
      });
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "#fff" : " ",
    outline: isDragging ? "2px solid #3b82f6" : "2px solid transparent",
    borderRadius: isDragging ? "0.25rem" : "0px",
    outlineOffset: "3px",
    marginBottom: "0.5rem",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#f8fafc" : " ",
    position: "relative",
  });

  return (
    <>
      <div
        className="h-full relative group/box"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleOnDrop(e)}
      >
        {gridElements[gridIndex].boxes[boxIndex].elements.length === 0 ? (
          <div
            data-element="box"
            className="w-full h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-5"
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >
            <p>This is a box</p>
            <p className="text-slate-400">Drop elements on me</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <DropComponent id="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  data-element="box"
                  id={boxElement.id}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  className="flex flex-col w-full h-full border-2 p-3 border-transparent border-dashed rounded-lg group-hover/box:border-slate-200"
                >
                  {gridElements[gridIndex].boxes[boxIndex].elements.map(
                    (element, elementIndex) => (
                      <Draggable
                        key={element.id}
                        draggableId={element.id.toString()}
                        index={elementIndex}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            data-element="element"
                            className="flex items-center gap-1 group/element w-full"
                            id={element.id}
                            ref={provided.innerRef}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="mgc_dots_line text-lg opacity-0 group-hover/element:opacity-100 group-focus-within/element:opacity-100 transition-all"
                            />
                            {
                              {
                                heading: <HeadingElement id={element.id} />,
                                text: <TextElement id={element.id} />,
                                button: <ButtonElement id={element.id} />,
                                image: <ImageElement id={element.id} />,
                                video: <VideoElement id={element.id} />,
                                line: <LineElement id={element.id} />,
                              }[element.type]
                            }
                          </div>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </DropComponent>
          </DragDropContext>
        )}
        <div
          className="rounded-full bg-slate-200 flex items-center justify-center min-w-[24px] h-[24px] absolute top-1/2 -left-[10px] -mt-3 opacity-0 group-hover/box:opacity-100 transition-all cursor-pointer hover:bg-blue-600"
          onClick={() => handleInsertBox(boxIndex)}
        >
          <span className="mgc_add_fill before:!text-white text-[10px]" />
        </div>
        <div
          className="rounded-full bg-slate-200 flex items-center justify-center min-w-[24px] h-[24px] absolute top-1/2 -right-[10px] -mt-3 opacity-0 group-hover/box:opacity-100 transition-all cursor-pointer hover:bg-blue-600"
          onClick={() => handleInsertBox(boxIndex + 2)}
        >
          <span className="mgc_add_fill before:!text-white text-[10px]" />
        </div>
      </div>
    </>
  );
}
