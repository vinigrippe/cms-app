import React, { useContext, useState } from "react";
import { PageEditorContext } from "../editor";
import { getElement } from "../pageEditor/pageEditorFunctions";

import { Button } from "@/components/button/button";
import { Select } from "@/components/select/select";

const GridOptions = () => {
  const { gridElements, setGridElements, elementOnFocus } =
    useContext(PageEditorContext);
  const [paddingFocus, setPaddingFocus] = useState("");

  const { element: elementGrid } = getElement(
    gridElements.elements,
    elementOnFocus?.grid?.id
  );

  const handleChangeClass = (element, format, value) => {
    const updatedElement = {
      ...element,
      classes: {
        ...element.classes,
        [format]: value,
      },
    };

    setGridElements({
      type: "UPDATE_ELEMENT",
      payload: {
        elementId: element?.id,
        newElement: updatedElement,
      },
    });
  };

  if (elementGrid)
    return (
      <div className="flex flex-col gap-3">
        <p className="font-medium bg-violet-100 outline-2 outline-violet-500 outline-dashed py-1 px-2 rounded-md">
          Grid Options
        </p>
        <div className="flex flex-col gap-2 pb-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">Padding</p>
              <div className="flex flex-col gap-1 items-center">
                <input
                  type="number"
                  className="!w-[16px] text-center"
                  onFocus={() => setPaddingFocus("top")}
                  onBlur={() => setPaddingFocus("")}
                  onChange={(e) =>
                    handleChangeClass(elementGrid, "paddingTop", e.target.value)
                  }
                  value={elementGrid?.classes?.paddingTop ?? "0"}
                />

                <div className="flex flex-row gap-2 items-center">
                  <input
                    type="number"
                    className="!w-[16px] text-center"
                    onFocus={() => setPaddingFocus("left")}
                    onBlur={() => setPaddingFocus("")}
                    onChange={(e) =>
                      handleChangeClass(
                        elementGrid,
                        "paddingLeft",
                        e.target.value
                      )
                    }
                    value={elementGrid?.classes?.paddingLeft ?? "0"}
                  />
                  <div className="rounded-md bg-slate-50 overflow-hidden relative p-3">
                    <div
                      className={`pt-1 bg-violet-600 w-full absolute top-0 left-0 transition-all ${
                        paddingFocus === "top" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <div
                      className={`pl-1 bg-violet-600 h-full absolute top-0 left-0 transition-all ${
                        paddingFocus === "left" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <div
                      className={`pr-1 bg-violet-600 h-full absolute top-0 right-0 transition-all ${
                        paddingFocus === "right" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <div
                      className={`pb-1 bg-violet-600 w-full absolute bottom-0 left-0 transition-all ${
                        paddingFocus === "bottom" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                  </div>
                  <input
                    type="number"
                    className="!w-[16px] text-center"
                    onFocus={() => setPaddingFocus("right")}
                    onBlur={() => setPaddingFocus("")}
                    onChange={(e) =>
                      handleChangeClass(
                        elementGrid,
                        "paddingRight",
                        e.target.value
                      )
                    }
                    value={elementGrid?.classes?.paddingRight ?? "0"}
                  />
                </div>

                <input
                  type="number"
                  className="!w-[16px] text-center"
                  onFocus={() => setPaddingFocus("bottom")}
                  onBlur={() => setPaddingFocus("")}
                  onChange={(e) =>
                    handleChangeClass(
                      elementGrid,
                      "paddingBottom",
                      e.target.value
                    )
                  }
                  value={elementGrid?.classes?.paddingBottom ?? "0"}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold">Border</p>
            <div className="flex flex-row gap-2 items-center">
              <div className="rounded-md bg-slate-50 overflow-hidden relative p-3">
                <div
                  className={`cursor-pointer pt-1 bg-violet-600 w-full absolute top-0 left-0 transition-all ${
                    elementGrid?.classes?.borderTop
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                  onClick={() =>
                    handleChangeClass(
                      elementGrid,
                      "borderTop",
                      !elementGrid?.classes?.borderTop ? true : false
                    )
                  }
                />
                <div
                  className={`cursor-pointer pl-1 bg-violet-600 h-full absolute top-0 left-0 transition-all ${
                    elementGrid?.classes?.borderLeft
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                  onClick={() =>
                    handleChangeClass(
                      elementGrid,
                      "borderLeft",
                      !elementGrid?.classes?.borderLeft ? true : false
                    )
                  }
                />
                <div
                  className={`cursor-pointer pr-1 bg-violet-600 h-full absolute top-0 right-0 transition-all ${
                    elementGrid?.classes?.borderRight
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                  onClick={() =>
                    handleChangeClass(
                      elementGrid,
                      "borderRight",
                      !elementGrid?.classes?.borderRight ? true : false
                    )
                  }
                />
                <div
                  className={`cursor-pointer pb-1 bg-violet-600 w-full absolute bottom-0 left-0 transition-all ${
                    elementGrid?.classes?.borderBottom
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                  onClick={() =>
                    handleChangeClass(
                      elementGrid,
                      "borderBottom",
                      !elementGrid?.classes?.borderBottom ? true : false
                    )
                  }
                />
              </div>
              <input
                type="number"
                className="!w-[16px] text-center"
                onChange={(e) =>
                  handleChangeClass(elementGrid, "borderWidth", e.target.value)
                }
                value={elementGrid?.classes?.borderWidth ?? "0"}
              />
              <Select value={elementGrid?.classes?.borderStyle || "solid"}>
                <Select.Option
                  onClick={() =>
                    handleChangeClass(elementGrid, "borderStyle", "solid")
                  }
                  isActive={elementGrid?.classes?.borderStyle === "solid"}
                >
                  Solid
                </Select.Option>
                <Select.Option
                  onClick={() =>
                    handleChangeClass(elementGrid, "borderStyle", "dotted")
                  }
                  isActive={elementGrid?.classes?.borderStyle === "dotted"}
                >
                  Dotted
                </Select.Option>
                <Select.Option
                  onClick={() =>
                    handleChangeClass(elementGrid, "borderStyle", "dashed")
                  }
                  isActive={elementGrid?.classes?.borderStyle === "dashed"}
                >
                  Dashed
                </Select.Option>
              </Select>
              <input
                type="color"
                id="format-borderColor"
                name="format-borderColor"
                value={elementGrid?.classes?.borderColor ?? "#000000"}
                onInput={(e) => {
                  handleChangeClass(elementGrid, "borderColor", e.target.value);
                }}
              />
              <Button
                icon="palette"
                type="flat"
                size="small"
                onClick={() => {
                  const color = document.getElementById("format-borderColor");
                  color.click();
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold">Gap</p>
            <div className="flex gap-2 items-center">
              <div className="flex flex-row border rounded-md overflow-hidden w-[24px] h-[24px]">
                <div className="bg-slate-100 py-[3px] w-full"></div>
                <div className="bg-violet-500 py-[5px] w-full"></div>
                <div className="bg-slate-100 py-[3px] w-full"></div>
              </div>
              <input
                type="number"
                className="!w-[16px] text-center"
                onChange={(e) =>
                  handleChangeClass(elementGrid, "gap", e.target.value)
                }
                value={elementGrid?.classes?.gap ?? "0"}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default GridOptions;
