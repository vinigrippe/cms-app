import { useContext, useState } from "react";
import { PageEditorContext } from "../../../editor";
import { MenuContext } from "../contextMenu";

import { generateId } from "@/utils/functions";
import { getElement } from "../../../editorFunctions";

import { Button } from "../../../../../components/button/button";
import { SubMenu } from "@/components/dropdown/dropdown";

export const EditGrid = () => {
  const [subMenu, setSubMenu] = useState("");
  const { gridElements, setGridElements, elementOnFocus } =
    useContext(PageEditorContext);
  const { onClose, posSubMenu } = useContext(MenuContext);

  const handleDuplicateGrid = () => {
    const { element, index } = getElement(
      gridElements.elements,
      elementOnFocus?.grid?.id
    );

    const newElement = {
      id: generateId({ name: "grid" }),
      type: "grid",
      elements: element.elements || [],
    };

    setGridElements({
      type: "ADD_ELEMENT",
      payload: {
        elementType: "grid",
        elementId: elementOnFocus?.grid?.id,
        elementIndex: index + 1,
        newElement,
      },
    });
    onClose();
  };

  const handleDeleteGrid = () => {
    setGridElements({
      type: "DELETE_ELEMENT",
      payload: {
        elementId: elementOnFocus?.grid?.id,
      },
    });
    onClose();
  };

  return (
    <SubMenu.Trigger
      onClose={() => setSubMenu(false)}
      onMouseEnter={() =>
        elementOnFocus?.grid?.classList?.add("element-focused")
      }
      onMouseLeave={() =>
        elementOnFocus?.grid?.classList?.remove("element-focused")
      }
    >
      <Button
        type="dropdown"
        isActive={subMenu}
        icon="columns_2"
        iconRight="right"
        onClick={() => setSubMenu(!subMenu)}
      >
        Grid Options
      </Button>

      {subMenu && (
        <SubMenu.Popup position={{ x: posSubMenu }}>
          <Button type="dropdown" icon="copy_3" onClick={handleDuplicateGrid}>
            Duplicate Grid
          </Button>
          <Button
            type="dropdown"
            color="danger"
            icon="delete_2"
            onClick={handleDeleteGrid}
          >
            Delete Grid
          </Button>
        </SubMenu.Popup>
      )}
    </SubMenu.Trigger>
  );
};
