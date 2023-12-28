import { useEffect, useRef, useState } from "react";
import { Button } from "../button/button";

import "./style.select.css";

export const Select = ({ isDisabled, value, id, children }) => {
  const [showSelect, setShowSelect] = useState(false);
  const refSelectEl = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refSelectEl.current && !refSelectEl.current.contains(event.target)) {
        setShowSelect(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSelect, refSelectEl]);

  return (
    <div
      data-component="select"
      id={id}
      data-active={showSelect}
      ref={refSelectEl}
    >
      <Button
        onClick={() => setShowSelect(!showSelect)}
        type="flat"
        iconRight="down"
        isActive={showSelect}
        isDisabled={isDisabled}
      >
        {value}
      </Button>

      {showSelect && (
        <div className="absolute z-[20] w-[-webkit-fill-available] mx-1 left-0 mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 flex flex-col">
          {children}
        </div>
      )}
    </div>
  );
};

const Option = ({ children, onClick, isActive, isDisabled }) => {
  return (
    <Button
      type="dropdown"
      onClick={onClick}
      isActive={isActive}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
};

Select.Option = Option;
