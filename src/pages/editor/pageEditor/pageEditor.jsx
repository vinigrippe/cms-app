import { useContext, useState } from "react";
import { ContextMenu } from "./contextMenu/contextMenu";

import { PageEditorContext } from "../editor";
import { GridElement } from "./elements/gridElement";
import { LoadingIcon } from "../../../icons/loading";

import "./pageEditor.css";

function PageEditor() {
  const { gridElements, isLoading, setElementOnFocus } =
    useContext(PageEditorContext);
  const [displayContextMenu, setDisplayContextMenu] = useState(false);
  const [event, setEvent] = useState({ clientX: 0, clientY: 0 });

  const handleElementOnFocus = (e) => {
    setElementOnFocus({
      element: null,
      box: null,
      grid: null,
    });
    let elementsFound;

    const element = e.target?.closest("[data-type]");
    const elementDOM = element?.closest("[data-element='element']");
    if (elementDOM) {
      elementsFound = { element: elementDOM };
    }

    const boxElementDOM = e.target.closest("[data-element='box']");
    if (boxElementDOM) {
      elementsFound = { ...elementsFound, box: boxElementDOM };
    }

    const gridElementDOM = e.target.closest("[data-element='grid']");
    if (gridElementDOM) {
      elementsFound = { ...elementsFound, grid: gridElementDOM };
    }

    setElementOnFocus(elementsFound);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    setEvent({ clientX: e.clientX, clientY: e.clientY });
    setDisplayContextMenu(true);
    handleElementOnFocus(e);
  };

  return (
    <div
      id="page-editor"
      className="animate-entrance-fade relative px-3 rounded-md border py-3 mb-2 h-full w-full overflow-y-auto flex flex-col z-40"
      onContextMenu={(e) => handleContextMenu(e)}
      onClick={(e) => handleElementOnFocus(e)}
      onScroll={() => setDisplayContextMenu(false)}
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      {isLoading === "load" ? (
        <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full z-50 backdrop-blur-xl">
          <div className="w-full h-full bg-slate-100 absolute" />
          <div className="flex items-center gap-2 flex-col z-40">
            <LoadingIcon size="40" color="#0d9488" />
            <p>Please hold your horses!</p>
          </div>
        </div>
      ) : (
        gridElements.elements.map((gridElement, gridIndex) => (
          <GridElement
            key={gridElement.id}
            id={gridElement.id}
            index={gridIndex}
          />
        ))
      )}

      {displayContextMenu && (
        <ContextMenu
          isOpen={displayContextMenu}
          onClose={() => setDisplayContextMenu(false)}
          event={event}
        />
      )}
    </div>
  );
}

export default PageEditor;
