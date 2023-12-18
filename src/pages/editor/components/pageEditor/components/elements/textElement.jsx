import { useState } from "react";

export const TextElement = () => {
  const [value, setValue] = useState("");

  return (
    <textarea
      onInput={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type some fun text here"
      data-type="text"
      data-style="text"
      rows="1"
    />
  );
};
