import { useEffect, useRef, useState } from "react";

export const ButtonElement = () => {
  const refButtonEl = useRef(null);

  const [isFocused, setIsFocused] = useState(false);

  const [value, setValue] = useState("");
  const [action, setAction] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refButtonEl.current && !refButtonEl.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refButtonEl]);

  return (
    <span ref={refButtonEl} className="w-full relative">
      <label data-value={value} data-type="button" data-style="primary-button">
        <input
          type="text"
          size="10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Button"
          onClick={() => setIsFocused(true)}
        />
      </label>

      {isFocused && (
        <div className="absolute z-[10] mt-1 bg-white rounded-lg border shadow-lg py-3 px-4 w-[200px] flex flex-col gap-1">
          <div className="grid grid-cols-3 gap-2 items-center">
            <p className="text-right">Action:</p>
            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <p className="text-right">Icon:</p>
          </div>
        </div>
      )}
    </span>
  );
};
