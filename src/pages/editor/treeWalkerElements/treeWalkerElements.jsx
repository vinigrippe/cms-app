import React, { useContext, useState } from "react";
import { PageEditorContext } from "../editor";
import elementList from "@/utils/elementList";
import { Button } from "../../../components/button/button";

const TreeWalkerElements = () => {
  const { gridElements } = useContext(PageEditorContext);
  const [isFocused, setIsFocused] = useState("");

  return (
    <div className="min-w-[200px] p-4 bg-slate-100 border-l-2 border-slate-200 flex flex-col gap-5 overflow-y-auto">
      <div className="flex flex-col gap-3">
        <p className="font-medium">TreeWalker</p>
        <div className="flex  flex-col gap-2">
          {gridElements.elements.map((element) => {
            return (
              <TreeWalkerElement
                element={element}
                level={0}
                key={element.id}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TreeWalkerElement = ({ element, level, isFocused, setIsFocused }) => {
  const { setGridElements, setElementOnFocus } = useContext(PageEditorContext);
  const elementInfo = elementList.find((item) => item.type === element.type);

  const handleDeleteComponent = (id) => {
    setGridElements({
      type: "DELETE_ELEMENT",
      payload: {
        elementId: id,
      },
    });
  };

  const handleElementOnFocus = (id) => {
    const elementFocus = document.getElementById(id);
    if (!elementFocus) return;

    let elementsFound;

    setIsFocused("");
    setElementOnFocus({
      element: null,
      box: null,
      grid: null,
    });

    const elementDOM = elementFocus?.closest("[data-element='element']");
    if (elementDOM) {
      elementsFound = { element: elementDOM };
    }

    const boxElementDOM = elementFocus.closest("[data-element='box']");
    if (boxElementDOM) {
      elementsFound = { ...elementsFound, box: boxElementDOM };
    }

    const gridElementDOM = elementFocus.closest("[data-element='grid']");
    if (gridElementDOM) {
      elementsFound = { ...elementsFound, grid: gridElementDOM };
    }

    setIsFocused(id);
    setElementOnFocus(elementsFound);
    elementFocus.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div>
      <div
        className={`group flex flex-row items-center justify-between gap-2 cursor-pointer rounded-md transition-all px-2 py-1 ${
          element.type === "grid"
            ? "hover:bg-violet-100"
            : element.type === "box"
            ? "hover:bg-sky-100"
            : "hover:bg-teal-50"
        } ${isFocused === element.id ? "bg-slate-200" : ""}`}
        style={{ marginLeft: `${level * 10}px` }}
        onClick={() => handleElementOnFocus(element.id)}
      >
        <div className="flex gap-2 items-center">
          <span className={elementInfo?.icon}></span>
          <p>{element.type}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100">
          <Button
            type="link"
            size="sm"
            color="danger"
            onClick={() => handleDeleteComponent(element.id)}
            icon="delete_2"
          />
        </div>
      </div>
      {element.elements?.map((element) => (
        <TreeWalkerElement
          element={element}
          level={level + 1}
          key={element.id}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
      ))}
    </div>
  );
};

export default TreeWalkerElements;
