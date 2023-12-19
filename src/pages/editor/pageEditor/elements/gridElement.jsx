import { useContext } from "react";
import { BoxElement } from "./boxElement";
import { generateId } from "@/utils/functions";
import { PageEditorContext } from "../pageEditor";

export function GridElement({ gridIndex, gridElement }) {
  const { gridElements, setGridElements } = useContext(PageEditorContext);

  const handleInsertGrid = (order) => {
    const newGrid = {
      id: generateId({ name: "grid" }),
      boxes: [
        {
          id: generateId({ name: "box" }),
          elements: [],
        },
      ],
    };

    setGridElements({
      type: "ADD_GRID",
      payload: { gridIndex: order, newGrid },
    });
  };

  if (gridElements[gridIndex].boxes.length > 0)
    return (
      <div className="relative group/grid">
        <div
          id={gridElement.id}
          className="grid grid-cols-2 w-full gap-4"
          data-element="grid"
          style={{
            gridTemplateColumns: `repeat(${gridElements[gridIndex].boxes.length}, minmax(0, 1fr))`,
          }}
        >
          {gridElements[gridIndex].boxes.map((boxElement, boxIndex) => (
            <BoxElement
              key={boxElement.id}
              boxIndex={boxIndex}
              boxElement={boxElement}
              gridIndex={gridIndex}
            />
          ))}
        </div>
        <div className="absolute bottom-0 -mb-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 opacity-0 group-hover/grid:opacity-100 transition-all">
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
