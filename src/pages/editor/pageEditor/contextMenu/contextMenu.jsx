import { createContext, useContext, useEffect, useRef, useState } from "react";
import { PageEditorContext } from "../pageEditor";

import { EditElement } from "./components/editElement";
import { EditBox } from "./components/editBox";
import { EditGrid } from "./components/editGrid";
import { NewElement } from "./components/newElement";

export const MenuContext = createContext();

export function ContextMenu({
  event,
  elementOnFocus,
  boxOnFocus,
  gridOnFocus,
  isOpen,
  onClose,
}) {
  const refContextMenuEl = useRef(null);
  const { gridElements } = useContext(PageEditorContext);
  const [subMenu, setSubMenu] = useState("");
  const [posContextMenu, setPosContextMenu] = useState({
    x: 0,
    y: 0,
    boundary: false,
  });

  const gridIndex = gridElements.findIndex(
    (item) => item.id === gridOnFocus?.id
  );
  const boxIndex = gridElements[gridIndex]?.elements.findIndex(
    (item) => item.id === boxOnFocus?.id
  );
  const elementIndex = gridElements[gridIndex]?.elements[
    boxIndex
  ]?.elements.findIndex((item) => item.id === elementOnFocus?.id);

  const element =
    gridElements[gridIndex]?.elements[boxIndex]?.elements[elementIndex] ?? {};
  const boxElement = gridElements[gridIndex]?.elements[boxIndex] ?? {};

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
    const elementParent = elementOnFocus?.closest("[data-element='element']");

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

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const contextMenuWidth = refContextMenuEl.current?.offsetWidth;
    const contextMenuHeight = refContextMenuEl.current?.offsetHeight;

    let x = event.clientX;
    let y = event.clientY;
    let boundary = false;

    if (event.clientX + contextMenuWidth > windowWidth - 100) {
      x = event.clientX - contextMenuWidth;
      boundary = true;
    }

    if (event.clientY + contextMenuHeight > windowHeight) {
      y = event.clientY - contextMenuHeight;
    }

    setPosContextMenu({ x, y, boundary });
  }, [event, isOpen]);

  return (
    <MenuContext.Provider
      value={{
        onClose,
        subMenu,
        setSubMenu,
        posSubMenu: !posContextMenu.boundary ? "left-[100%]" : "right-[100%]",

        elementOnFocus,
        elementIndex,
        element,

        boxOnFocus,
        boxIndex,
        boxElement,

        gridOnFocus,
        gridIndex,
      }}
    >
      {(!!boxOnFocus || !!gridOnFocus || !!elementOnFocus) && (
        <div
          ref={refContextMenuEl}
          className="fixed z-[20] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col"
          style={{
            left: `${posContextMenu.x}px`,
            top: `${posContextMenu.y}px`,
            opacity: posContextMenu.x !== 0 && posContextMenu.y !== 0 ? 100 : 0,
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {!!boxOnFocus && <NewElement />}
          {!!elementOnFocus && <EditElement />}
          {!!boxOnFocus && <EditBox />}
          {!!gridOnFocus && <EditGrid />}
        </div>
      )}
    </MenuContext.Provider>
  );
}
