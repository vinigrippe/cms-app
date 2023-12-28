import { createContext, useContext, useEffect, useRef, useState } from "react";

import { EditElement } from "./components/editElement";
import { EditBox } from "./components/editBox";
import { EditGrid } from "./components/editGrid";
import { NewElement } from "./components/newElement";
import { PageEditorContext } from "../../editor";

export const MenuContext = createContext();

export function ContextMenu({ event, isOpen, onClose }) {
  const refContextMenuEl = useRef(null);
  const [posContextMenu, setPosContextMenu] = useState({
    x: 0,
    y: 0,
    boundary: false,
  });
  const { elementOnFocus } = useContext(PageEditorContext);

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
    const elementParent = elementOnFocus?.element?.closest(
      "[data-element='element']"
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
        posSubMenu: !posContextMenu.boundary ? "left-[100%]" : "right-[100%]",
      }}
    >
      {!!elementOnFocus && (
        <div
          ref={refContextMenuEl}
          className="fixed z-[50] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col"
          style={{
            left: `${posContextMenu.x}px`,
            top: `${posContextMenu.y}px`,
            opacity: posContextMenu.x !== 0 && posContextMenu.y !== 0 ? 100 : 0,
          }}
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
        >
          {!!elementOnFocus?.box && <NewElement />}
          {!!elementOnFocus?.element && <EditElement />}
          {!!elementOnFocus?.box && <EditBox />}
          {!!elementOnFocus?.grid && <EditGrid />}
        </div>
      )}
    </MenuContext.Provider>
  );
}
