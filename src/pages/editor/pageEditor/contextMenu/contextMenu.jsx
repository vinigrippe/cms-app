import { useContext, useEffect, useRef, useState } from "react";
import { BoxElementContext } from "../elements/gridElement";

import designSystem from "@/utils/designSystem.json";
import elementList from "@/utils/elementList.json";
import { generateId } from "@/utils/functions";

export function ContextMenu({
  event,
  elementOnFocus,
  gridOnFocus,
  boxOnFocus,
  onClose,
}) {
  const { gridIndex, gridElements, setGridElements, boxIndex, boxElement } =
    useContext(BoxElementContext);
  const refContextMenuEl = useRef(null);
  const [subMenu, setSubMenu] = useState("");

  const designSystemByType = designSystem.find(
    (item) => item.type === elementOnFocus.type
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refContextMenuEl.current &&
        !refContextMenuEl.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, refContextMenuEl]);

  useEffect(() => {
    const elementParent = elementOnFocus.element?.closest(
      "[data-grid='element']"
    );

    if (elementParent) {
      elementParent?.classList?.add("element-focused");
    }

    return () => {
      const allFocusedElements = document.querySelectorAll(".element-focused");

      allFocusedElements.forEach((element) => {
        element.classList.remove("element-focused");
      });
    };
  }, [elementOnFocus]);

  const handleChangeStyle = (style) => {
    elementOnFocus.element.setAttribute("data-style", style.class);
    onClose();
  };

  const handleDuplicateElement = () => {
    const elementId = elementOnFocus.id;
    const elementType = elementOnFocus.type;
    const randomId = generateId({ name: elementType });
    const elementIndex = boxElement.elements.findIndex(
      (element) => element.id === elementId
    );

    let cloneGridElements = [...gridElements];
    const prevBoxElements = cloneGridElements[gridIndex].boxes[boxIndex];

    const newElement = {
      id: randomId,
      type: elementType,
    };

    prevBoxElements.elements.splice(elementIndex + 1, 0, newElement);

    cloneGridElements[gridIndex].boxes[boxIndex] = {
      ...prevBoxElements,
      elements: [...prevBoxElements.elements],
    };

    setGridElements(cloneGridElements);
    onClose();
  };

  const handleDeleteElement = () => {
    const elementId = elementOnFocus.id;

    let cloneGridElements = [...gridElements];
    const prevBoxElements = cloneGridElements[gridIndex].boxes[boxIndex];

    const newElements = prevBoxElements.elements.filter(
      (element) => element.id !== elementId
    );

    prevBoxElements.elements.splice(boxIndex + 1, 0, newElements);

    cloneGridElements[gridIndex].boxes[boxIndex] = {
      ...prevBoxElements,
      elements: [...newElements],
    };

    setGridElements(cloneGridElements);
    onClose();
  };

  const handleDeleteBox = () => {
    let cloneGridElements = [...gridElements];
    const prevBoxElements = cloneGridElements[gridIndex];

    const newElements = prevBoxElements.boxes.filter(
      (box) => box.id !== boxElement.id
    );

    cloneGridElements[gridIndex] = {
      ...prevBoxElements,
      boxes: [...newElements],
    };
    setGridElements(cloneGridElements);
    onClose();
  };

  const handleDuplicateBox = () => {
    const randomId = generateId({ name: "box" });

    const newElements = boxElement.elements.map((element) => ({
      ...element,
      id: generateId({ name: element.type }),
    }));

    const newBox = {
      id: randomId,
      elements: newElements,
    };

    let cloneGridElements = [...gridElements];
    const prevBoxElements = cloneGridElements[gridIndex];

    prevBoxElements.boxes.splice(boxIndex + 1, 0, newBox);

    cloneGridElements[gridIndex] = {
      ...prevBoxElements,
      boxes: [...prevBoxElements.boxes],
    };

    setGridElements(cloneGridElements);
    onClose();
  };

  const handleChangeElement = ({ type }) => {
    const elementId = elementOnFocus.id;
    const elementIndex = boxElement.elements.findIndex(
      (element) => element.id === elementId
    );

    let cloneGridElements = [...gridElements];
    const prevBoxElements = cloneGridElements[gridIndex].boxes[boxIndex];

    const newElement = {
      id: elementId,
      type: type,
    };

    prevBoxElements.elements.splice(elementIndex, 1, newElement);

    cloneGridElements[gridIndex].boxes[boxIndex] = {
      ...prevBoxElements,
      elements: [...prevBoxElements.elements],
    };

    setGridElements(cloneGridElements);
    onClose();
  };

  const handleInsertElement = ({ type }) => {
    const elementId = elementOnFocus.id;
    const elementIndex = boxElement.elements.findIndex(
      (element) => element.id === elementId
    );
    const randomId = generateId({ name: type });
    const newElement = {
      id: randomId,
      type: type,
    };

    const cloneBoxElements = [...gridElements];
    const prevBoxElement = cloneBoxElements[gridIndex].boxes[boxIndex];

    if (elementIndex !== -1) {
      prevBoxElement.elements.splice(elementIndex + 1, 0, newElement);
    } else {
      prevBoxElement.elements.push(newElement);
    }

    cloneBoxElements[gridIndex].boxes[boxIndex] = {
      ...prevBoxElement,
      elements: [...prevBoxElement.elements],
    };

    setGridElements(cloneBoxElements);
    onClose();
  };

  const handleDuplicateGrid = () => {
    let cloneGridElements = [...gridElements];
    const cloneGrid = { ...gridElements[gridIndex] };
    const newGrid = {
      id: generateId({ name: "grid" }),
      boxes: [],
    };

    cloneGrid.boxes.forEach((box, index) => {
      newGrid.boxes[index] = {
        id: generateId({ name: "box" }),
        elements: [],
      };

      box.elements.forEach((element, indexEl) => {
        newGrid.boxes[index].elements[indexEl] = {
          id: generateId({ name: element.type }),
          type: element.type,
        };
      });
    });

    cloneGridElements.splice(gridIndex + 1, 0, newGrid);
    setGridElements(cloneGridElements);
    onClose();
  };

  const handleDeleteGrid = () => {
    let cloneGridElements = [...gridElements];
    const newElements = cloneGridElements.filter(
      (grid) => grid.id !== gridElements[gridIndex].id
    );

    setGridElements(newElements);
    onClose();
  };

  return (
    <div
      ref={refContextMenuEl}
      className="fixed z-[20] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col"
      style={{
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative">
        <button
          data-type="dropdown"
          data-active={subMenu === "new" ? "true" : "false"}
          className="flex gap-2 justify-between w-[-webkit-fill-available]"
          onClick={() => setSubMenu(subMenu === "new" ? "" : "new")}
        >
          <div className="flex gap-2 items-center">
            <span className="mgc_add_line" />
            <p>Add New Element</p>
          </div>
          <span className="mgc_right_line" />
        </button>

        {subMenu === "new" && (
          <div className="absolute top-0 left-[100%] z-[30] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col">
            {elementList.map((elementItem) => (
              <button
                key={elementItem.type}
                data-type="dropdown"
                className="flex gap-2 items-center"
                onClick={() => handleInsertElement({ type: elementItem.type })}
              >
                <span className={elementItem.icon} />
                <p>{elementItem.title}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-b w-full pt-1 mb-1"></div>
      {!!elementOnFocus.element && (
        <>
          <div className="relative">
            <button
              data-type="dropdown"
              data-active={subMenu === "change" ? "true" : "false"}
              className="flex gap-2 justify-between w-[-webkit-fill-available]"
              onClick={() => setSubMenu(subMenu === "change" ? "" : "change")}
            >
              <div className="flex gap-2 items-center">
                <span className="mgc_transfer_line" />
                <p>Change Element</p>
              </div>
              <span className="mgc_right_line" />
            </button>

            {subMenu === "change" && (
              <div className="absolute top-0 left-[100%] z-[30] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col">
                {elementList.map((elementItem) => (
                  <button
                    key={elementItem.type}
                    data-type="dropdown"
                    className="flex gap-2 items-center"
                    onClick={() =>
                      handleChangeElement({ type: elementItem.type })
                    }
                  >
                    <span className={elementItem.icon} />
                    <p>{elementItem.title}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
          {designSystemByType?.styles?.length > 0 && (
            <div className="relative">
              <button
                data-type="dropdown"
                data-active={subMenu === "style" ? "true" : "false"}
                className="flex gap-2 justify-between w-[-webkit-fill-available]"
                onClick={() => setSubMenu(subMenu === "style" ? "" : "style")}
              >
                <div className="flex gap-2 items-center">
                  <span className="mgc_paint_brush_line" />
                  <p>Edit Style</p>
                </div>
                <span className="mgc_right_line" />
              </button>

              {subMenu === "style" && (
                <div className="absolute top-0 left-[100%] z-[30] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col">
                  {designSystemByType.styles.map((itemStyle) => (
                    <button
                      key={itemStyle.id}
                      data-active={
                        elementOnFocus.style === itemStyle.class
                          ? "true"
                          : "false"
                      }
                      data-type="dropdown"
                      className="flex gap-2 items-center"
                      onClick={() => handleChangeStyle(itemStyle)}
                    >
                      <p>{itemStyle.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <button
            data-type="dropdown"
            className="flex gap-2 items-center"
            onClick={handleDuplicateElement}
          >
            <span className="mgc_copy_2_line" />
            <p>Duplicate Element</p>
          </button>
          <button
            data-type="dropdown"
            data-color="danger"
            className="flex gap-2 items-center"
            onClick={handleDeleteElement}
          >
            <span className="mgc_delete_2_line" />
            <p>Delete Element</p>
          </button>
          <div className="border-b w-full pt-1 mb-1"></div>
        </>
      )}

      <div
        onMouseEnter={() => boxOnFocus?.classList?.add("element-focused")}
        onMouseLeave={() => boxOnFocus?.classList?.remove("element-focused")}
      >
        <button
          data-type="dropdown"
          className="flex gap-2 items-center w-[-webkit-fill-available]"
          onClick={handleDuplicateBox}
        >
          <span className="mgc_copy_3_line" />
          <p>Duplicate Box</p>
        </button>
        <button
          data-type="dropdown"
          data-color="danger"
          className="flex gap-2 items-center w-[-webkit-fill-available]"
          onClick={handleDeleteBox}
        >
          <span className="mgc_folder_minus_line" />
          <p className="text-right">Delete Box</p>
        </button>
      </div>

      <div className="border-b w-full pt-1 mb-1"></div>
      <div
        onMouseEnter={() =>
          gridOnFocus?.element?.classList?.add("element-focused")
        }
        onMouseLeave={() =>
          gridOnFocus?.element?.classList?.remove("element-focused")
        }
      >
        <button
          data-type="dropdown"
          className="flex gap-2 items-center w-[-webkit-fill-available]"
          onClick={handleDuplicateGrid}
        >
          <span className="mgc_copy_3_line" />
          <p>Duplicate Grid</p>
        </button>
        <button
          data-type="dropdown"
          data-color="danger"
          className="flex gap-2 items-center w-[-webkit-fill-available]"
          onClick={handleDeleteGrid}
        >
          <span className="mgc_folder_minus_line" />
          <p className="text-right">Delete Grid</p>
        </button>
      </div>
    </div>
  );
}
