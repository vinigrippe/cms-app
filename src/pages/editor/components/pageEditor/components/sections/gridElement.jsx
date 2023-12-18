import { createContext } from "react";

import { BoxElement } from "./boxElement/boxElement";
import { generateId } from "../../functions";

export const BoxElementContext = createContext();

export function GridElement({
  gridIndex,
  gridElement,
  gridElements,
  setGridElements,
}) {
  const handleInsertGrid = (order) => {
    const randomGridId = generateId({ name: "grid" });
    const randomBoxId = generateId({ name: "box" });
    const cloneGridElements = [...gridElements];

    const newGrid = {
      id: randomGridId,
      boxes: [
        {
          id: randomBoxId,
          elements: [],
        },
      ],
    };

    cloneGridElements.splice(order, 0, newGrid);
    setGridElements(cloneGridElements);
  };

  if (gridElements[gridIndex].boxes.length > 0)
    return (
      <div className="relative group/grid" id={gridElement.id}>
        <div
          className="grid grid-cols-2 w-full gap-4"
          style={{
            gridTemplateColumns: `repeat(${gridElements[gridIndex].boxes.length}, minmax(0, 1fr))`,
          }}
        >
          {gridElements[gridIndex].boxes.map((boxElement, boxIndex) => (
            <BoxElementContext.Provider
              key={boxElement.id}
              value={{
                gridIndex,
                gridElements,
                setGridElements,
                boxIndex,
                boxElement,
              }}
            >
              <BoxElement />
            </BoxElementContext.Provider>
          ))}
        </div>
        <div className="absolute bottom-0 -mb-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 opacity-0 group-hover/grid:opacity-100 transition-all">
          <button
            className="flex items-center justify-center gap-1 py-1 px-4 rounded-[20px] bg-slate-200 text-white hover:bg-blue-600 transition-all cursor-pointer"
            onClick={() => handleInsertGrid(gridIndex + 1)}
          >
            <span className="mgc_add_fill before:!text-white text-[10px] transition-all" />
            <span>Add Grid</span>
          </button>
        </div>
      </div>
    );
}
