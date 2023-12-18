import { useEffect, useState } from "react";

import { GridElement } from "./components/sections/gridElement";
import { generateId } from "./functions";

import defaultAle from "../../defaultAle.json";
import "./pageEditor.css";

function PageEditor() {
  const [gridElements, setGridElements] = useState([]);

  useEffect(() => {
    const randomGridId = generateId({ name: "grid" });
    const randomBoxId = generateId({ name: "box" });
    const newGrid = {
      id: randomGridId,
      boxes: [
        {
          id: randomBoxId,
          elements: [],
        },
      ],
    };
    setGridElements([newGrid]);
  }, []);

  return (
    <div className="h-[100vh] w-full flex flex-col">
      <div className="border-b-2 w-full flex py-3 px-4 justify-end gap-2">
        <button>Cancel</button>
        <button data-type="ghost">Preview</button>
        <button data-type="primary" onClick={() => console.log(gridElements)}>
          Save
        </button>
      </div>
      <div
        className="h-full flex flex-col w-full overflow-y-auto px-4 pt-4 pb-6 gap-5"
        id="page-editor"
      >
        {gridElements.map((gridElement, gridIndex) => (
          <GridElement
            key={gridElement.id}
            gridIndex={gridIndex}
            gridElement={gridElement}
            gridElements={gridElements}
            setGridElements={setGridElements}
          />
        ))}
      </div>
    </div>
  );
}

export default PageEditor;
