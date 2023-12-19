import { useContext } from "react";
import { PageEditorContext } from "../../pageEditor";
import { generateId } from "@/utils/functions";

import designSystem from "@/utils/designSystem.json";
import elementList from "@/utils/elementList.json";
import { MenuContext } from "../contextMenu";

export const EditElement = () => {
  const {
    element,
    boxElement,
    elementOnFocus,
    gridIndex,
    boxIndex,
    elementIndex,
    onClose,
    subMenu,
    setSubMenu,
    posSubMenu,
  } = useContext(MenuContext);
  const { setGridElements } = useContext(PageEditorContext);

  const designSystemByType = designSystem.find(
    (item) => item.type === element.type
  );

  const handleChangeStyle = (style) => {
    elementOnFocus.setAttribute("data-style", style.class);
    setGridElements({
      type: "UPDATE_ELEMENT",
      payload: {
        elementId: element.id,
        change: {
          field: "style",
          value: style.class,
        },
      },
    });
    onClose();
  };

  const handleDuplicateElement = () => {
    const elementType = element.type;

    const newElement = {
      id: generateId({ name: elementType }),
      type: elementType,
      style: "",
      fields: {},
    };

    setGridElements({
      type: "ADD_ELEMENT",
      payload: {
        gridIndex: gridIndex,
        boxIndex: boxIndex,
        elementIndex: elementIndex + 1 ?? boxElement.elements.length,
        newElement,
      },
    });
    onClose();
  };

  const handleDeleteElement = () => {
    setGridElements({
      type: "DELETE_ELEMENT",
      payload: {
        gridIndex: gridIndex,
        boxIndex: boxIndex,
        elementIndex: elementIndex,
      },
    });
    onClose();
  };

  const handleChangeElement = ({ type }) => {
    const updatedElement = {
      id: element.id,
      type: type,
    };

    setGridElements({
      type: "CHANGE_ELEMENT",
      payload: {
        gridIndex: gridIndex,
        boxIndex: boxIndex,
        elementIndex: elementIndex,
        updatedElement: updatedElement,
      },
    });
    onClose();
  };

  return (
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
          <div
            className={`absolute top-0 ${posSubMenu} z-[30] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col`}
          >
            {elementList.map((elementItem) => (
              <button
                key={elementItem.type}
                data-type="dropdown"
                className="flex gap-2 items-center"
                onClick={() => handleChangeElement({ type: elementItem.type })}
                aria-disabled={elementItem.type === element.type}
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
            <div
              className={`absolute top-0  ${posSubMenu} z-[30] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col`}
            >
              {designSystemByType.styles.map((itemStyle) => (
                <button
                  key={itemStyle.id}
                  data-active={
                    element.style === itemStyle.class ? "true" : "false"
                  }
                  data-type="dropdown"
                  className="flex gap-2 items-center"
                  onClick={() => handleChangeStyle(itemStyle)}
                  aria-disabled={element.style === itemStyle.class}
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
  );
};
