import React, { useContext, useState } from "react";
import { PageEditorContext } from "../../editor";
import { getElement } from "../../pageEditor/pageEditorFunctions";

import { Button } from "@/components/button/button";
import { Select } from "@/components/select/select";
import { Input } from "@/components/input/input";

const BoxOptions = () => {
  const { gridElements, setGridElements, elementOnFocus } =
    useContext(PageEditorContext);
  const [paddingFocus, setPaddingFocus] = useState("");

  const { element: elementBox } = getElement(
    gridElements.elements,
    elementOnFocus?.box?.id
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

  if (elementBox)
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 pb-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold">Vertical Alignment</p>
            <div className="flex gap-2 justify-between">
              <Button
                icon="align_left_2"
                type="flat"
                size="small"
                isActive={
                  elementBox?.classes?.justifyContent === "flex-start" ||
                  !elementBox?.classes?.justifyContent
                }
                onClick={() =>
                  handleChangeClass(elementBox, "justifyContent", "flex-start")
                }
              />
              <Button
                icon="align_horizontal_center"
                type="flat"
                size="small"
                isActive={elementBox?.classes?.justifyContent === "center"}
                onClick={() =>
                  handleChangeClass(elementBox, "justifyContent", "center")
                }
              />
              <Button
                icon="align_right_2"
                type="flat"
                size="small"
                isActive={elementBox?.classes?.justifyContent === "flex-end"}
                onClick={() =>
                  handleChangeClass(elementBox, "justifyContent", "flex-end")
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold">Horizontal Alignment</p>
            <div className="flex gap-2 justify-between">
              <Button
                icon="align_top"
                type="flat"
                size="small"
                isActive={
                  elementBox?.classes?.alignItems === "flex-start" ||
                  !elementBox?.classes?.alignItems
                }
                onClick={() =>
                  handleChangeClass(elementBox, "alignItems", "flex-start")
                }
              />
              <Button
                icon="align_vertical_center"
                type="flat"
                size="small"
                isActive={elementBox?.classes?.alignItems === "center"}
                onClick={() =>
                  handleChangeClass(elementBox, "alignItems", "center")
                }
              />
              <Button
                icon="align_bottom"
                type="flat"
                size="small"
                isActive={elementBox?.classes?.alignItems === "flex-end"}
                onClick={() =>
                  handleChangeClass(elementBox, "alignItems", "flex-end")
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">Padding</p>
              <div className="flex flex-col gap-1 items-center">
                <Input
                  type="number"
                  className="!w-[16px] text-center"
                  onFocus={() => setPaddingFocus("top")}
                  onBlur={() => setPaddingFocus("")}
                  onChange={(e) =>
                    handleChangeClass(elementBox, "paddingTop", e.target.value)
                  }
                  value={elementBox?.classes?.paddingTop ?? "0"}
                />

                <div className="flex flex-row gap-2 items-center">
                  <Input
                    type="number"
                    className="!w-[16px] text-center"
                    onFocus={() => setPaddingFocus("left")}
                    onBlur={() => setPaddingFocus("")}
                    onChange={(e) =>
                      handleChangeClass(
                        elementBox,
                        "paddingLeft",
                        e.target.value
                      )
                    }
                    value={elementBox?.classes?.paddingLeft ?? "0"}
                  />
                  <div className="rounded-md bg-slate-50 overflow-hidden relative p-3">
                    <div
                      className={`pt-1 bg-sky-600 w-full absolute top-0 left-0 transition-all ${
                        paddingFocus === "top" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <div
                      className={`pl-1 bg-sky-600 h-full absolute top-0 left-0 transition-all ${
                        paddingFocus === "left" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <div
                      className={`pr-1 bg-sky-600 h-full absolute top-0 right-0 transition-all ${
                        paddingFocus === "right" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <div
                      className={`pb-1 bg-sky-600 w-full absolute bottom-0 left-0 transition-all ${
                        paddingFocus === "bottom" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                  </div>
                  <Input
                    type="number"
                    className="!w-[16px] text-center"
                    onFocus={() => setPaddingFocus("right")}
                    onBlur={() => setPaddingFocus("")}
                    onChange={(e) =>
                      handleChangeClass(
                        elementBox,
                        "paddingRight",
                        e.target.value
                      )
                    }
                    value={elementBox?.classes?.paddingRight ?? "0"}
                  />
                </div>

                <Input
                  type="number"
                  className="!w-[16px] text-center"
                  onFocus={() => setPaddingFocus("bottom")}
                  onBlur={() => setPaddingFocus("")}
                  onChange={(e) =>
                    handleChangeClass(
                      elementBox,
                      "paddingBottom",
                      e.target.value
                    )
                  }
                  value={elementBox?.classes?.paddingBottom ?? "0"}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold">Border</p>
            <div className="flex flex-row gap-2 items-center">
              <div className="rounded-md bg-slate-50 overflow-hidden relative p-3">
                <div
                  className={`cursor-pointer pt-1 bg-sky-600 w-full absolute top-0 left-0 transition-all ${
                    elementBox?.classes?.borderTop
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                  onClick={() =>
                    handleChangeClass(
                      elementBox,
                      "borderTop",
                      !elementBox?.classes?.borderTop ? true : false
                    )
                  }
                />
                <div
                  className={`cursor-pointer pl-1 bg-sky-600 h-full absolute top-0 left-0 transition-all ${
                    elementBox?.classes?.borderLeft
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                  onClick={() =>
                    handleChangeClass(
                      elementBox,
                      "borderLeft",
                      !elementBox?.classes?.borderLeft ? true : false
                    )
                  }
                />
                <div
                  className={`cursor-pointer pr-1 bg-sky-600 h-full absolute top-0 right-0 transition-all ${
                    elementBox?.classes?.borderRight
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                  onClick={() =>
                    handleChangeClass(
                      elementBox,
                      "borderRight",
                      !elementBox?.classes?.borderRight ? true : false
                    )
                  }
                />
                <div
                  className={`cursor-pointer pb-1 bg-sky-600 w-full absolute bottom-0 left-0 transition-all ${
                    elementBox?.classes?.borderBottom
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                  onClick={() =>
                    handleChangeClass(
                      elementBox,
                      "borderBottom",
                      !elementBox?.classes?.borderBottom ? true : false
                    )
                  }
                />
              </div>
              <Input
                type="number"
                className="!w-[16px] text-center"
                onChange={(e) =>
                  handleChangeClass(elementBox, "borderWidth", e.target.value)
                }
                value={elementBox?.classes?.borderWidth ?? "0"}
              />
              <Select value={elementBox?.classes?.borderStyle || "solid"}>
                <Select.Option
                  onClick={() =>
                    handleChangeClass(elementBox, "borderStyle", "solid")
                  }
                  isActive={elementBox?.classes?.borderStyle === "solid"}
                >
                  Solid
                </Select.Option>
                <Select.Option
                  onClick={() =>
                    handleChangeClass(elementBox, "borderStyle", "dotted")
                  }
                  isActive={elementBox?.classes?.borderStyle === "dotted"}
                >
                  Dotted
                </Select.Option>
                <Select.Option
                  onClick={() =>
                    handleChangeClass(elementBox, "borderStyle", "dashed")
                  }
                  isActive={elementBox?.classes?.borderStyle === "dashed"}
                >
                  Dashed
                </Select.Option>
              </Select>
              <div className="relative">
                <Input
                  type="color"
                  id="format-bordercolor-box"
                  name="format-bordercolor-box"
                  value={elementBox?.classes?.borderColor ?? "#000000"}
                  onInput={(e) => {
                    handleChangeClass(
                      elementBox,
                      "borderColor",
                      e.target.value
                    );
                  }}
                />
                <Button
                  icon="palette"
                  type="flat"
                  size="small"
                  onClick={() => {
                    const color = document.getElementById(
                      "format-bordercolor-box"
                    );
                    color.click();
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold">Gap</p>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col border rounded-md overflow-hidden w-[24px]">
                <div className="bg-slate-100 py-[3px] w-full"></div>
                <div className="bg-sky-500 py-[5px] w-full"></div>
                <div className="bg-slate-100 py-[3px] w-full"></div>
              </div>
              <Input
                type="number"
                className="!w-[16px] text-center"
                onChange={(e) =>
                  handleChangeClass(elementBox, "gap", e.target.value)
                }
                value={elementBox?.classes?.gap ?? "0"}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default BoxOptions;
