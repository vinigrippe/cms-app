import { useContext, useState } from "react";
import { PageEditorContext } from "../../../editor";
import { generateId } from "@/utils/functions";

import elementList from "@/utils/elementList.json";
import { MenuContext } from "../contextMenu";
import { getElement, getParentElement } from "../../../editorFunctions";

import { Button } from "@/components/button/button";
import { DropDown } from "@/components/dropdown/dropdown";

export const EditElement = () => {
  const [subMenuChange, setSubMenuChange] = useState(false);
  const { onClose, posSubMenu } = useContext(MenuContext);
  const {
    copyPaste,
    setCopyPaste,
    gridElements,
    setGridElements,
    elementOnFocus,
    designSystem,
  } = useContext(PageEditorContext);
  const { element, index } = getElement(
    gridElements.elements,
    elementOnFocus?.element?.id
  );

  const handleDuplicateElement = () => {
    const { parentElement } = getParentElement(
      gridElements.elements,
      element.id
    );
    const newElement = {
      id: generateId({ name: element.type }),
      type: element.type,
      style: element.style,
    };
    if (element.type === "grid") {
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
        elementType: element.type,
        elementId: parentElement?.id,
        elementIndex: index + 1,
        newElement: newElement,
      },
    });
    onClose();
  };

  const handleDeleteElement = () => {
    setGridElements({
      type: "DELETE_ELEMENT",
      payload: {
        elementId: elementOnFocus?.element?.id,
      },
    });
    onClose();
  };

  const handleChangeElement = ({ type }) => {
    const newTypeElement = designSystem.find((item) => item.type === type) ?? {
      styles: [],
    };

    const updatedElement = {
      ...element,
      id: generateId({ name: type }),
      type: type,
      style: newTypeElement.styles[0]?.style_id ?? "",
    };

    setGridElements({
      type: "UPDATE_ELEMENT",
      payload: {
        elementId: elementOnFocus?.element?.id,
        newElement: updatedElement,
      },
    });
    onClose();
  };

  const handleCopyElement = () => {
    setCopyPaste(element);
    onClose();
  };

  const handlePasteElement = () => {
    if (!copyPaste) return;

    const newElement = {
      ...copyPaste,
      id: generateId({ name: copyPaste.type }),
    };

    setGridElements({
      type: "ADD_ELEMENT",
      payload: {
        elementType: copyPaste.type,
        elementId: elementOnFocus?.box?.id,
        elementIndex: index + 1,
        newElement,
      },
    });

    onClose();
  };

  return (
    <>
      <Button type="dropdown" icon="copy_2" onClick={handleCopyElement}>
        Copy
      </Button>
      <Button
        type="dropdown"
        icon="documents"
        isDisabled={!copyPaste}
        onClick={handlePasteElement}
      >
        Paste
      </Button>

      <div className="border-b w-full pt-1 mb-1"></div>

      <Button type="dropdown" icon="copy_3" onClick={handleDuplicateElement}>
        Duplicate
      </Button>
      <Button
        type="dropdown"
        color="danger"
        icon="delete_2"
        onClick={handleDeleteElement}
      >
        Delete
      </Button>

      <DropDown.Trigger onClose={() => setSubMenuChange(false)}>
        <Button
          type="dropdown"
          isActive={subMenuChange}
          className="flex gap-2 justify-between w-[-webkit-fill-available]"
          onClick={() => setSubMenuChange(!subMenuChange)}
          icon="transfer"
          iconRight="right"
        >
          Change Element
        </Button>

        {subMenuChange && (
          <DropDown.Popup position={{ x: posSubMenu }}>
            {elementList.map((elementItem) => (
              <Button
                key={elementItem.type}
                type="dropdown"
                icon={elementItem.icon}
                onClick={() => handleChangeElement({ type: elementItem.type })}
                isDisabled={elementItem.type === element.type}
              >
                {elementItem.title}
              </Button>
            ))}
          </DropDown.Popup>
        )}
      </DropDown.Trigger>

      <div className="border-b w-full pt-1 mb-1"></div>
    </>
  );
};
