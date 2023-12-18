import { useState } from "react";

export const HeadingElement = () => {
  const [value, setValue] = useState("");

  return (
    <span className="relative w-full leading-[0]">
      <textarea
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type some fun text here"
        data-type="heading"
        data-style="heading-one"
        rows="1"
      />
    </span>
  );
};
