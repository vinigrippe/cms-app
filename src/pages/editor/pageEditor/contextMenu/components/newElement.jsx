import { useContext, useState } from "react";
import { PageEditorContext } from "../../../editor";

import { generateId } from "@/utils/functions";
import elementsList from "@/utils/elementList.json";
import { MenuContext } from "../contextMenu";
import { Button } from "@/components/button/button";
import { SubMenu } from "@/components/dropdown/dropdown";

export const NewElement = () => {
  const { setGridElements, elementOnFocus } = useContext(PageEditorContext);
  const { posSubMenu, onClose } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState("");

  const handleInsertElement = ({ type }) => {
    const elementAttributes = elementsList.find((item) => item.type === type);

    if (!elementAttributes) return;

    const newElement = {
      id: generateId({ name: type }),
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
        asElement: false,
        elementType: elementAttributes.type,
        elementId: elementOnFocus.box?.id,
        newElement,
      },
    });

    onClose();
  };

  return (
    <>
      <SubMenu.Trigger onClose={() => setSubMenu("")}>
        <Button
          type="dropdown"
          isActive={subMenu === "new" ? "true" : "false"}
          icon="add"
          iconRight="right"
          onClick={() => setSubMenu(subMenu === "new" ? "" : "new")}
        >
          Add New Element
        </Button>

        {subMenu === "new" && (
          <SubMenu.Popup position={{ x: posSubMenu }}>
            {elementsList.map((elementItem) => (
              <Button
                key={elementItem.type}
                type="dropdown"
                onClick={() => handleInsertElement({ type: elementItem.type })}
                icon={elementItem.icon}
              >
                {elementItem.title}
              </Button>
            ))}
          </SubMenu.Popup>
        )}
      </SubMenu.Trigger>

      <div className="border-b w-full pt-1 mb-1"></div>
    </>
  );
};
