import { useContext, useState } from "react";
import { ContextMenu } from "./contextMenu/contextMenu";
import { PageEditorContext } from "../editor";
import elementsList from "@/utils/elementList.json";
import api from "@/utils/api";

import { GridElement } from "./elements/gridElement";
import { Button } from "../../../components/button/button";
import { SubMenu } from "@/components/dropdown/dropdown";
import { LoadingIcon } from "../../../icons/loading";

import "./pageEditor.css";

function PageEditor() {
  const pageId = 4;
  const {
    gridElements,
    setGridElements,
    isLoading,
    setIsLoading,
    setElementOnFocus,
  } = useContext(PageEditorContext);
  const [displayContextMenu, setDisplayContextMenu] = useState(false);
  const [displayMenuElements, setDisplayMenuElements] = useState(false);
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

  const handleUndo = () => {
    setGridElements({ type: "UNDO", payload: {} });
  };

  const handleRedo = () => {
    setGridElements({ type: "REDO", payload: {} });
  };

  const handleSavePage = async () => {
    setIsLoading("save");

    await api
      .post("/pages", {
        pageId: pageId,
        title: "home",
        url: "/home",
        status: "active",
        userId: 1,
        elements: gridElements.elements,
        history: gridElements.history,
      })
      .finally(() => setIsLoading(""));
  };

  return (
    <div className={`relative h-[100vh] w-full flex flex-col mr-2`}>
      <div className="z-50 my-2 rounded-[20px] backdrop-blur-xl shadow-xl border bg-white/75 w-[-webkit-fill-available] flex py-3 px-4 justify-between gap-2">
        <div className="flex justify-end gap-2">
          <SubMenu.Trigger onClose={() => setDisplayMenuElements(false)}>
            <Button
              type="flat"
              onClick={() => setDisplayMenuElements(!displayMenuElements)}
              icon="add"
              isActive={displayMenuElements}
            ></Button>
            {displayMenuElements && (
              <SubMenu.Popup
                position={{
                  x: "left-0",
                  y: "top-full",
                }}
              >
                <div className="flex flex-col">
                  <div className="bg-teal-50 rounded-md p-2 border-teal-100 border mb-1">
                    <div className="flex gap-2">
                      <span className="mgc_light_line pt-1"></span>
                      <span>Fancy a hint?</span>
                    </div>
                  </div>
                  {elementsList.map((itemEl) => (
                    <div
                      onDragStart={(event) => {
                        event.dataTransfer.clearData();
                        event.dataTransfer.setData("text/plain", itemEl.type);
                      }}
                      draggable="true"
                      className="w-[-webkit-fill-available]"
                    >
                      <Button icon={itemEl.icon} type="dropdown">
                        {itemEl.title}
                      </Button>
                    </div>
                  ))}
                </div>
              </SubMenu.Popup>
            )}
          </SubMenu.Trigger>
          <Button
            type="ghost"
            onClick={handleUndo}
            isDisabled={
              gridElements.historyPointer === 0 ||
              gridElements.history.length === 1
            }
            icon="back_2"
          ></Button>
          <Button
            type="ghost"
            onClick={handleRedo}
            isDisabled={
              gridElements.historyPointer >= gridElements.history.length - 1
            }
            icon="forward_2"
          ></Button>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="flat">Cancel</Button>
          <Button type="ghost">Preview</Button>
          <Button
            type="primary"
            onClick={handleSavePage}
            isLoading={isLoading === "save"}
            isDisabled={isLoading === "save"}
          >
            Save
          </Button>
        </div>
      </div>

      <div
        id="page-editor"
        className="relative px-3 rounded-md border py-3 mb-2 h-full w-full overflow-y-auto"
        onContextMenu={(e) => handleContextMenu(e)}
        onClick={(e) => handleElementOnFocus(e)}
        onScroll={() => setDisplayContextMenu(false)}
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        {isLoading === "load" ? (
          <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full z-50 backdrop-blur-xl">
            <div className="w-full h-full bg-teal-500/40 absolute opacity-60" />
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
    </div>
  );
}

export default PageEditor;
