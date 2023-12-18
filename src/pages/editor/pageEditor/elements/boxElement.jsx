import { useContext, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { DropComponent } from "@/utils/dropElement";

import { BoxElementContext } from "./gridElement";

import elementsList from "@/utils/elementList.json";
import { generateId } from "@/utils/functions";
import { ContextMenu } from "../contextMenu/contextMenu";

import { ButtonElement } from "./buttonElement";
import { HeadingElement } from "./headingElement";
import { TextElement } from "./textElement";
import { ImageElement } from "./imageElement";
import { VideoElement } from "./videoElement";
import { LineElement } from "./lineElement";

export function BoxElement() {
  const { gridIndex, gridElements, setGridElements, boxIndex, boxElement } =
    useContext(BoxElementContext);

  const [displayContextMenu, setDisplayContextMenu] = useState(false);
  const [event, setEvent] = useState({ clientX: 0, clientY: 0 });
  const [gridOnFocus, setGridOnFocus] = useState({
    id: "",
    element: null,
  });
  const [boxOnFocus, setBoxOnFocus] = useState(null);
  const [elementOnFocus, setElementOnFocus] = useState({
    id: "",
    type: "",
    element: null,
    style: "",
  });

  const handleInsertBox = (order) => {
    const randomId = generateId({ name: "box" });
    let cloneGridElements = [...gridElements];
    const prevBoxElements = cloneGridElements[gridIndex].boxes;

    const newBox = {
      id: randomId,
      elements: [],
    };

    prevBoxElements.splice(order, 0, newBox);

    cloneGridElements[gridIndex] = {
      ...cloneGridElements[gridIndex],
      boxes: prevBoxElements,
    };
    setGridElements(cloneGridElements);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    setEvent({ clientX: e.clientX, clientY: e.clientY });
    setDisplayContextMenu(true);
    setElementOnFocus({ type: "", element: null, id: "", style: "" });
    setBoxOnFocus(null);
    setGridOnFocus({ element: null, id: "" });

    const element = e.target?.closest("[data-type]");

    if (
      element &&
      elementsList.find(
        (item) => item.type === element?.getAttribute("data-type")
      )
    ) {
      setElementOnFocus({
        element: element,
        type: element?.getAttribute("data-type"),
        id: element.closest("[data-grid='element']").id,
        style: element.getAttribute("data-style"),
      });
    }

    const boxElement = e.target.closest("[data-grid='box']");

    if (boxElement) {
      setBoxOnFocus(boxElement);
    }

    const gridElement = e.target.closest("[data-grid='grid']");
    if (gridElement) {
      setGridOnFocus({ element: gridElement, id: gridElement.id });
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    const boxElement = e.target.closest("[data-grid='box']");
    boxElement?.classList?.remove("element-focused");
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    const boxElement = e.target.closest("[data-grid='box']");
    boxElement?.classList?.add("element-focused");
  };

  const handleOnDrop = (e) => {
    e.preventDefault();

    const droppedType = e.dataTransfer.getData("text");
    const randomId = generateId({ name: droppedType });
    const newElement = {
      id: randomId,
      type: droppedType,
    };

    const cloneBoxElements = [...gridElements];
    const prevBoxElement = cloneBoxElements[gridIndex].boxes[boxIndex];

    cloneBoxElements[gridIndex].boxes[boxIndex] = {
      ...prevBoxElement,
      elements: [...prevBoxElement.elements, newElement],
    };

    setGridElements(cloneBoxElements);
    handleDragLeave(e);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    const items = reorder(
      boxElement.elements,
      result.source.index,
      result.destination.index
    );

    const cloneBoxElements = [...gridElements];
    const prevBoxElement = cloneBoxElements[gridIndex].boxes[boxIndex];
    cloneBoxElements[gridIndex].boxes[boxIndex] = {
      ...prevBoxElement,
      elements: items,
    };

    setGridElements(cloneBoxElements);
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
        id={boxElement.id}
        className="h-full relative group/box"
        onContextMenu={(e) => handleContextMenu(e)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleOnDrop(e)}
      >
        {gridElements[gridIndex].boxes[boxIndex].elements.length === 0 ? (
          <div
            data-grid="box"
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
                  data-grid="box"
                  onDragOver={(e) => handleDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  className="flex flex-col w-full h-full border-2 p-3 border-transparent border-dashed rounded-lg group-hover/box:border-slate-200"
                >
                  {gridElements[gridIndex].boxes[boxIndex].elements.map(
                    (element, index) => (
                      <Draggable
                        key={element.id}
                        draggableId={element.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            data-grid="element"
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
                                heading: <HeadingElement />,
                                text: <TextElement />,
                                button: <ButtonElement />,
                                image: <ImageElement id={element.id} />,
                                video: <VideoElement id={element.id} />,
                                line: <LineElement />,
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

      {displayContextMenu && (
        <ContextMenu
          onClose={() => setDisplayContextMenu(false)}
          event={event}
          elementOnFocus={elementOnFocus}
          boxOnFocus={boxOnFocus}
          gridOnFocus={gridOnFocus}
        />
      )}
    </>
  );
}
