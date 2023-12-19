import { useContext } from "react";
import { PageEditorContext } from "../../pageEditor";

import { generateId } from "@/utils/functions";
import elementList from "@/utils/elementList.json";
import { MenuContext } from "../contextMenu";

export const NewElement = () => {
  const { setGridElements } = useContext(PageEditorContext);
  const {
    elementIndex,
    gridIndex,
    boxIndex,
    boxElement,
    subMenu,
    setSubMenu,
    posSubMenu,
    onClose,
  } = useContext(MenuContext);

  const handleInsertElement = ({ type }) => {
    const newElement = {
      id: generateId({ name: type }),
      type: type,
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

  return (
    <>
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
          <div
            className={`absolute top-0  ${posSubMenu} z-[30] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col`}
          >
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
    </>
  );
};
