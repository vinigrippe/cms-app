import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PageEditorContext } from "../editor";
import elementsList from "@/utils/elementList.json";
import api from "@/utils/api";

import { Button } from "../../../components/button/button";
import { SubMenu } from "@/components/dropdown/dropdown";

export const TopPanel = () => {
  const { pageId } = useParams();
  const { gridElements, setGridElements, isLoading, setIsLoading } =
    useContext(PageEditorContext);
  const [displayMenuElements, setDisplayMenuElements] = useState(false);

  const handleDragStart = (e, item) => {
    e.dataTransfer.clearData();
    e.dataTransfer.setData("text/plain", item.type);
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
        elements: gridElements.elements,
      })
      .finally(() => setIsLoading(""));
  };
  return (
    <div className="animate-entrance-top z-50 my-2 rounded-[20px] backdrop-blur-xl shadow-xl border bg-white/75 w-[-webkit-fill-available] flex py-3 px-4 justify-between gap-2">
      <div className="flex justify-end gap-2">
        <SubMenu.Trigger onClose={() => setDisplayMenuElements(false)}>
          <Button
            type="flat"
            onClick={() => setDisplayMenuElements(!displayMenuElements)}
            icon="add"
            isActive={displayMenuElements}
          />
          {displayMenuElements && (
            <SubMenu.Popup
              position={{
                x: "left-0",
                y: "top-full",
              }}
            >
              <div
                className="flex flex-col"
                onDragLeave={() => setDisplayMenuElements(false)}
              >
                <div className="bg-teal-50 rounded-md p-2 border-teal-100 border mb-1">
                  <div className="flex gap-2">
                    <span className="mgc_light_line pt-1"></span>
                    <span>Fancy a hint?</span>
                  </div>
                </div>
                {elementsList.map((itemEl) => (
                  <div
                    onDragStart={(e) => handleDragStart(e, itemEl)}
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
  );
};
