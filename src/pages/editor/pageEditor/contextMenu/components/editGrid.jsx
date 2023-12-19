import { useContext } from "react";
import { PageEditorContext } from "../../pageEditor";
import { generateId } from "@/utils/functions";
import { MenuContext } from "../contextMenu";

export const EditGrid = () => {
  const { gridElements, setGridElements } = useContext(PageEditorContext);
  const { gridIndex, gridOnFocus, onClose } = useContext(MenuContext);

  const handleDuplicateGrid = () => {
    const newGrid = {
      id: generateId({ name: "grid" }),
      boxes: gridElements[gridIndex].boxes.map((box) => ({
        id: generateId({ name: "box" }),
        elements: box.elements.map((element) => ({
          id: generateId({ name: element.type }),
          type: element.type,
        })),
      })),
    };

    setGridElements({
      type: "ADD_GRID",
      payload: { gridIndex: gridIndex + 1, newGrid },
    });
    onClose();
  };

  const handleDeleteGrid = () => {
    setGridElements({
      type: "DELETE_GRID",
      payload: { gridIndex: gridIndex },
    });
    onClose();
  };

  return (
    <>
      <div
        onMouseEnter={() => gridOnFocus?.classList?.add("element-focused")}
        onMouseLeave={() => gridOnFocus?.classList?.remove("element-focused")}
      >
        <button
          data-type="dropdown"
          className="flex gap-2 items-center w-[-webkit-fill-available]"
          onClick={handleDuplicateGrid}
        >
          <span className="mgc_copy_3_line" />
          <p>Duplicate Grid</p>
        </button>
        <button
          data-type="dropdown"
          data-color="danger"
          className="flex gap-2 items-center w-[-webkit-fill-available]"
          onClick={handleDeleteGrid}
        >
          <span className="mgc_folder_minus_line" />
          <p className="text-right">Delete Grid</p>
        </button>
      </div>
    </>
  );
};
