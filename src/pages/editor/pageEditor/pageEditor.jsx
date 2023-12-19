import { createContext, useEffect, useReducer, useState } from "react";
import { ContextMenu } from "./contextMenu/contextMenu";

import { GridElement } from "./elements/gridElement";
import { generateId } from "@/utils/functions";
import { reducer } from "./pageEditorService";

import defaultAle from "@/utils/defaultAle.json";
import "./pageEditor.css";

export const PageEditorContext = createContext();

function PageEditor() {
  const [gridElements, setGridElements] = useReducer(reducer, []);

  const [displayContextMenu, setDisplayContextMenu] = useState(false);
  const [event, setEvent] = useState({ clientX: 0, clientY: 0 });
  const [gridOnFocus, setGridOnFocus] = useState(null);
  const [boxOnFocus, setBoxOnFocus] = useState(null);
  const [elementOnFocus, setElementOnFocus] = useState(null);

  useEffect(() => {
    const defaultGrid = [
      {
        id: generateId({ name: "grid" }),
        boxes: [
          {
            id: generateId({ name: "box" }),
            elements: [],
          },
        ],
      },
    ];

    setGridElements({ type: "SET_GRID", payload: defaultAle });
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();

    setEvent({ clientX: e.clientX, clientY: e.clientY });
    setDisplayContextMenu(true);
    setElementOnFocus(null);
    setBoxOnFocus(null);
    setGridOnFocus(null);

    const element = e.target?.closest("[data-type]");
    const elementDOM = element?.closest("[data-element='element']");
    if (elementDOM) {
      setElementOnFocus(elementDOM);
    }

    const boxElementDOM = e.target.closest("[data-element='box']");
    if (boxElementDOM) {
      setBoxOnFocus(boxElementDOM);
    }

    const gridElementDOM = e.target.closest("[data-element='grid']");
    if (gridElementDOM) {
      setGridOnFocus(gridElementDOM);
    }
  };

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
        onContextMenu={(e) => handleContextMenu(e)}
      >
        <PageEditorContext.Provider
          value={{
            gridElements,
            setGridElements,
          }}
        >
          {gridElements.map((gridElement, gridIndex) => (
            <GridElement
              key={gridElement.id}
              gridElement={gridElement}
              gridIndex={gridIndex}
            />
          ))}

          {displayContextMenu && (
            <ContextMenu
              isOpen={displayContextMenu}
              onClose={() => setDisplayContextMenu(false)}
              elementOnFocus={elementOnFocus}
              boxOnFocus={boxOnFocus}
              gridOnFocus={gridOnFocus}
              event={event}
            />
          )}
        </PageEditorContext.Provider>
      </div>
    </div>
  );
}

export default PageEditor;
