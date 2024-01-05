import { useContext, useState } from "react";
import { generateId } from "@/utils/functions";
import { PageEditorContext } from "../../../editor";
import { MenuContext } from "../contextMenu";
import { getElement } from "../../../editorFunctions";

import { Button } from "@/components/button/button";
import { SubMenu } from "@/components/dropdown/dropdown";

export const EditBox = () => {
  const [subMenu, setSubMenu] = useState("");
  const { gridElements, setGridElements, elementOnFocus } =
    useContext(PageEditorContext);
  const { onClose, posSubMenu } = useContext(MenuContext);

  const handleDeleteBox = () => {
    setGridElements({
      type: "DELETE_ELEMENT",
      payload: {
        elementId: elementOnFocus?.box.id,
      },
    });
    onClose();
  };

  const handleDuplicateBox = () => {
    const { element, index } = getElement(
      gridElements.elements,
      elementOnFocus?.box.id
    );

    const newElements = element.elements.map((element) => ({
      ...element,
      id: generateId({ name: element.type }),
    }));

    const newBox = {
      id: generateId({ name: "box" }),
      type: "box",
      elements: newElements,
    };

    setGridElements({
      type: "ADD_ELEMENT",
      payload: {
        elementType: "box",
        elementId: elementOnFocus?.box.id,
        elementIndex: index + 1,
        newElement: newBox,
      },
    });
    onClose();
  };

  return (
    <SubMenu.Trigger
      onMouseEnter={() =>
        elementOnFocus?.box?.classList?.add("element-focused")
      }
      onMouseLeave={() =>
        elementOnFocus?.box?.classList?.remove("element-focused")
      }
      onClose={() => setSubMenu("")}
    >
      <Button
        type="dropdown"
        isActive={subMenu === "edit_box" ? true : false}
        icon="square"
        iconRight="right"
        onClick={() => setSubMenu(subMenu === "edit_box" ? "" : "edit_box")}
      >
        Box Options
      </Button>
      {subMenu === "edit_box" && (
        <SubMenu.Popup position={{ x: posSubMenu }}>
          <Button type="dropdown" icon="copy_3" onClick={handleDuplicateBox}>
            Duplicate Box
          </Button>
          <Button
            type="dropdown"
            color="danger"
            icon="delete_2"
            onClick={handleDeleteBox}
          >
            Delete Box
          </Button>
        </SubMenu.Popup>
      )}
    </SubMenu.Trigger>
  );
};
