import { useEffect, useRef, useState } from "react";
import { Button } from "../button/button";

import "./style.select.css";

export const Select = ({
  isDisabled,
  value,
  placeholder,
  id,
  children,
  label,
}) => {
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
      data-active={showSelect}
      aria-disabled={isDisabled}
      ref={refSelectEl}
      id={id}
    >
      {label && <p className="font-semibold text-xs text-slate-600">{label}</p>}
      <div className="select-button" onClick={() => setShowSelect(!showSelect)}>
        {value ? (
          <span>{value}</span>
        ) : (
          <span className="text-slate-400">{placeholder}</span>
        )}
        <span className="mgc_down_line"></span>
      </div>
      {showSelect && (
        <div
          className="absolute z-[20] w-[-webkit-fill-available] top-[100%] left-0 mt-1 bg-white rounded-lg border shadow-lg py-2 px-2 flex flex-col"
          onClick={() => setShowSelect(!showSelect)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const Option = ({ children, onChange, isActive, isDisabled }) => {
  return (
    <Button
      type="dropdown"
      onClick={onChange}
      isActive={isActive}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
};

Select.Option = Option;
