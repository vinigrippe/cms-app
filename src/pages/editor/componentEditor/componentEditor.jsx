import React, { useContext } from "react";
import { PageEditorContext } from "../editor";

import { Button } from "@/components/button/button";
import BoxOptions from "./boxOptions";
import GridOptions from "./gridOptions";
import ElementOptions from "./elementOptions";
import { getElement } from "../pageEditor/pageEditorFunctions";

const ComponentEditor = () => {
  const { showTreeWalker, setShowTreeWalker, gridElements, elementOnFocus } =
    useContext(PageEditorContext);

  const { element } = getElement(
    gridElements.elements,
    elementOnFocus?.grid?.id
  );

  return (
    <div
      className="relative min-w-[220px] max-w-[220px] bg-white/75 rounded-[20px] z-10 border m-2 shadow-lg border-slate-200 flex flex-col justify-between gap-5 overflow-y-auto"
      onFocus={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className="flex flex-col gap-5 px-3 pt-3">
        {!element ? (
          <div className="flex flex-col gap-3 text-slate-400 items-center justify-center h-full">
            <span className="mgc_edit_3_line before:!text-slate-400 text-lg"></span>
            <p className="text-center">
              Well done! Select an element for editing
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <ElementOptions />
            <BoxOptions />
            <GridOptions />
          </div>
        )}
      </div>
      <div className="sticky bottom-0 px-2 w-[-webkit-fill-available] bg-white pb-3 pt-2 border-t">
        <Button
          type="flat"
          icon="tree_2"
          onClick={() => setShowTreeWalker(!showTreeWalker)}
          isActive={showTreeWalker}
        >
          {showTreeWalker ? "Hide" : "See"} Tree
        </Button>
      </div>
    </div>
  );
};

export default ComponentEditor;
