import { useEffect, useRef } from "react";

export const SubMenu = ({
  children,
  position = { x: "top-0", y: "left-[100%]" },
}) => {
  return (
    <div
      className={`absolute ${position.y ?? "top-0"} ${
        position.x ?? "left-[100%]"
      } z-[30] mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 min-w-[150px] flex flex-col`}
    >
      {children}
    </div>
  );
};

export const SubMenuTrigger = ({
  children,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const refContextSubMenuEl = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refContextSubMenuEl.current &&
        !refContextSubMenuEl.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, refContextSubMenuEl]);

  return (
    <div
      className="relative w-[-webkit-fill-available]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={refContextSubMenuEl}
    >
      {children}
    </div>
  );
};

SubMenu.Trigger = SubMenuTrigger;
SubMenu.Popup = SubMenu;
