import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageEditorContext } from "../editor";

import { Button } from "@/components/button/button";
import BoxOptions from "./components/boxOptions";
import GridOptions from "./components/gridOptions";
import ElementOptions from "./components/elementOptions";
import { getElement } from "../editorFunctions";

export const SidePanel = () => {
  const { showTreeWalker, setShowTreeWalker, gridElements, elementOnFocus } =
    useContext(PageEditorContext);
  const [isTabFocused, setIsTabFocused] = useState(false);

  const navigate = useNavigate();

  const { element } = getElement(
    gridElements.elements,
    elementOnFocus?.grid?.id
  );

  useEffect(() => {
    if (elementOnFocus?.element) {
      setIsTabFocused("element");
    } else if (elementOnFocus?.box) {
      setIsTabFocused("box");
    } else if (elementOnFocus?.grid) {
      setIsTabFocused("grid");
    }
  }, [elementOnFocus]);

  return (
    <div
      className="animate-entrance-fade relative min-w-[250px] max-w-[250px] bg-white rounded-[20px] z-10 border m-2 shadow-lg border-slate-200 flex flex-col justify-between overflow-hidden"
      onFocus={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className="flex flex-col gap-5 px-3 py-3 h-full overflow-y-auto">
        <div className="flex justify-between pb-2 pt-0 border-b">
          <Button
            type="flat"
            icon="arrow_left"
            onClick={() => {
              navigate("/pages");
            }}
          >
            Back to Pages
          </Button>
          <Button icon="settings_4" type="flat" />
        </div>
        {!element ? (
          <div className="flex flex-col gap-3 text-slate-400 items-center justify-center h-full">
            <span className="mgc_edit_3_line before:!text-slate-400 text-lg"></span>
            <p className="text-center">
              Well done! Select an element for editing
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {elementOnFocus.element && (
                <p
                  className={`
                w-full text-center cursor-pointer font-medium outline-teal-500 outline-1 py-1 px-2 rounded-md
                ${
                  isTabFocused === "element"
                    ? "bg-teal-500 outline text-white"
                    : "bg-teal-50 outline-dashed text-teal-500"
                }
                `}
                  onClick={() => setIsTabFocused("element")}
                >
                  Element
                </p>
              )}

              {elementOnFocus.box && (
                <p
                  className={`
                w-full text-center cursor-pointer font-medium outline-blue-500 outline-1 py-1 px-2 rounded-md
                ${
                  isTabFocused === "box"
                    ? "bg-blue-500 outline text-white"
                    : "bg-blue-100 outline-dashed text-sky-500"
                }
                `}
                  onClick={() => setIsTabFocused("box")}
                >
                  Box
                </p>
              )}
              {elementOnFocus.grid && (
                <p
                  className={`
                w-full text-center cursor-pointer font-medium outline-violet-500 outline-1 py-1 px-2 rounded-md
                ${
                  isTabFocused === "grid"
                    ? "bg-violet-500 outline text-white"
                    : "bg-violet-100 outline-dashed text-violet-500"
                }
                `}
                  onClick={() => setIsTabFocused("grid")}
                >
                  Grid
                </p>
              )}
            </div>
            {isTabFocused === "element" && <ElementOptions />}
            {isTabFocused === "box" && <BoxOptions />}
            {isTabFocused === "grid" && <GridOptions />}
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
