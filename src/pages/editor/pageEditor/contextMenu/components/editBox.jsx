import { useContext } from "react";
import { PageEditorContext } from "../../pageEditor";
import { generateId } from "@/utils/functions";

export const EditBox = ({
  gridIndex,
  boxIndex,
  boxElement,
  boxOnFocus,
  onClose,
}) => {
  const { setGridElements } = useContext(PageEditorContext);

  const handleDeleteBox = () => {
    setGridElements({
      type: "DELETE_BOX",
      payload: { gridIndex: gridIndex, boxIndex: boxIndex },
    });
    onClose();
  };

  const handleDuplicateBox = () => {
    const newElements = boxElement.elements.map((element) => ({
      ...element,
      id: generateId({ name: element.type }),
    }));

    const newBox = {
      id: generateId({ name: "box" }),
      elements: newElements,
    };

    setGridElements({
      type: "ADD_BOX",
      payload: {
        gridIndex: gridIndex,
        boxIndex: boxIndex + 1,
        newBox,
      },
    });
    onClose();
  };

  return (
    <>
      <div
        onMouseEnter={() => boxOnFocus?.classList?.add("element-focused")}
        onMouseLeave={() => boxOnFocus?.classList?.remove("element-focused")}
      >
        <button
          data-type="dropdown"
          className="flex gap-2 items-center w-[-webkit-fill-available]"
          onClick={handleDuplicateBox}
        >
          <span className="mgc_copy_3_line" />
          <p>Duplicate Box</p>
        </button>
        <button
          data-type="dropdown"
          data-color="danger"
          className="flex gap-2 items-center w-[-webkit-fill-available]"
          onClick={handleDeleteBox}
        >
          <span className="mgc_folder_minus_line" />
          <p className="text-right">Delete Box</p>
        </button>
      </div>
    </>
  );
};
