import React, { useContext, useState } from "react";
import { PageEditorContext } from "../../editor";
import { getElement } from "../../pageEditor/pageEditorFunctions";

import { Button } from "@/components/button/button";
import { Checkbox } from "@/components/checkbox/checkbox";
import { Range } from "@/components/range/range";
import { Select } from "../../../../components/select/select";
import { Input } from "@/components/input/input";

const ElementOptions = () => {
  const { gridElements, setGridElements, elementOnFocus, designSystem } =
    useContext(PageEditorContext);
  const [paddingFocus, setPaddingFocus] = useState("");

  const { element } = getElement(
    gridElements.elements,
    elementOnFocus?.element?.id
  );

  const designSystemByType = designSystem.find(
    (item) => item.type === element?.type
  ) ?? {
    styles: [],
  };

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

  const handleChangeStyle = (style) => {
    const updatedElement = {
      ...element,
      style: style.style_id,
    };

    setGridElements({
      type: "UPDATE_ELEMENT",
      payload: {
        elementId: element.id,
        newElement: updatedElement,
      },
    });
  };

  if (element)
    return (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-2 items-center justify-center">
          {element.type === "image" || element.type === "video" ? (
            <div className="flex flex-col gap-2 py-2">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold">Radius</p>
                <div className="flex items-center gap-2 -my-2">
                  <Range
                    id="borderRadius"
                    min="0"
                    max="99"
                    onChange={(e) =>
                      handleChangeClass(element, "borderRadius", e.target.value)
                    }
                    value={element?.classes?.borderRadius ?? 0}
                  />
                  <Input
                    type="number"
                    onChange={(e) =>
                      handleChangeClass(element, "borderRadius", e.target.value)
                    }
                    value={element?.classes?.borderRadius ?? 0}
                    className="!w-[34px] text-center"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold">Height</p>
                <div className="flex items-center gap-2 -my-2">
                  <Range
                    id="height"
                    min="0"
                    max="999"
                    onChange={(e) =>
                      handleChangeClass(element, "height", e.target.value)
                    }
                    value={element?.classes?.height}
                  />
                  <Input
                    type="text"
                    onChange={(e) =>
                      handleChangeClass(element, "height", e.target.value)
                    }
                    value={element?.classes?.height || "300"}
                    className="!w-[34px] text-center"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold">Width</p>
                <div className="flex items-center gap-2 -my-2">
                  <Range
                    id="width"
                    min="0"
                    max="999"
                    onChange={(e) =>
                      handleChangeClass(element, "width", e.target.value)
                    }
                    value={element?.classes?.width}
                  />
                  <Input
                    type="text"
                    onChange={(e) =>
                      handleChangeClass(element, "width", e.target.value)
                    }
                    value={element?.classes?.width || "100%"}
                    className="!w-[34px] text-center"
                  />
                </div>
                <div>
                  <Checkbox
                    id="width-full"
                    onChange={() => {
                      handleChangeClass(
                        element,
                        "width",
                        element?.classes?.width === "100%" ? "auto" : "100%"
                      );
                    }}
                    checked={
                      element?.classes?.width === "100%" ||
                      !element?.classes?.width
                    }
                  >
                    Set as 100%
                  </Checkbox>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">Formatting</p>
              <div className="flex gap-1 justify-between">
                <Button
                  icon="bold"
                  type="flat"
                  size="small"
                  isActive={element?.classes?.bold}
                  onClick={() =>
                    handleChangeClass(element, "bold", !element?.classes?.bold)
                  }
                />
                <Button
                  icon="italic"
                  type="flat"
                  size="small"
                  isActive={element?.classes?.italic}
                  onClick={() =>
                    handleChangeClass(
                      element,
                      "italic",
                      !element?.classes?.italic
                    )
                  }
                />
                <Button
                  icon="underline"
                  type="flat"
                  size="small"
                  isActive={element?.classes?.underline}
                  onClick={() =>
                    handleChangeClass(
                      element,
                      "underline",
                      !element?.classes?.underline
                    )
                  }
                />
                <div className="relative">
                  <Input
                    type="color"
                    id="format-bordercolor-element"
                    name="format-bordercolor-element"
                    value={element?.classes?.color ?? "#000000"}
                    onInput={(e) => {
                      handleChangeClass(element, "color", e.target.value);
                    }}
                  />
                  <Button
                    icon="palette"
                    type="flat"
                    size="small"
                    onClick={() => {
                      const color = document.getElementById(
                        "format-bordercolor-element"
                      );
                      color.click();
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold">Alignment</p>
            <div className="flex gap-2 justify-between">
              <Button
                icon="align_left"
                type="flat"
                size="small"
                isActive={
                  element?.classes?.textAlign === "left" ||
                  !element?.classes?.textAlign
                }
                onClick={() => handleChangeClass(element, "textAlign", "left")}
              />
              <Button
                icon="align_center"
                type="flat"
                size="small"
                isActive={element?.classes?.textAlign === "center"}
                onClick={() =>
                  handleChangeClass(element, "textAlign", "center")
                }
              />
              <Button
                icon="align_right"
                type="flat"
                size="small"
                isActive={element?.classes?.textAlign === "right"}
                onClick={() => handleChangeClass(element, "textAlign", "right")}
              />
              <Button
                icon="align_justify"
                type="flat"
                size="small"
                isActive={element?.classes?.textAlign === "justify"}
                onClick={() =>
                  handleChangeClass(element, "textAlign", "justify")
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
                    handleChangeClass(element, "paddingTop", e.target.value)
                  }
                  value={element?.classes?.paddingTop ?? "0"}
                />

                <div className="flex flex-row gap-2 items-center">
                  <Input
                    type="number"
                    className="!w-[16px] text-center"
                    onFocus={() => setPaddingFocus("left")}
                    onBlur={() => setPaddingFocus("")}
                    onChange={(e) =>
                      handleChangeClass(element, "paddingLeft", e.target.value)
                    }
                    value={element?.classes?.paddingLeft ?? "0"}
                  />
                  <div className="rounded-md bg-slate-50 overflow-hidden relative p-3">
                    <div
                      className={`pt-1 bg-teal-600 w-full absolute top-0 left-0 transition-all ${
                        paddingFocus === "top" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <div
                      className={`pl-1 bg-teal-600 h-full absolute top-0 left-0 transition-all ${
                        paddingFocus === "left" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <div
                      className={`pr-1 bg-teal-600 h-full absolute top-0 right-0 transition-all ${
                        paddingFocus === "right" ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <div
                      className={`pb-1 bg-teal-600 w-full absolute bottom-0 left-0 transition-all ${
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
                      handleChangeClass(element, "paddingRight", e.target.value)
                    }
                    value={element?.classes?.paddingRight ?? "0"}
                  />
                </div>

                <Input
                  type="number"
                  className="!w-[16px] text-center"
                  onFocus={() => setPaddingFocus("bottom")}
                  onBlur={() => setPaddingFocus("")}
                  onChange={(e) =>
                    handleChangeClass(element, "paddingBottom", e.target.value)
                  }
                  value={element?.classes?.paddingBottom ?? "0"}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold">Link</p>
            <div className="relative">
              <Input
                type="text"
                placeholder="https://"
                onChange={(e) => {
                  handleChangeClass("link", e.target.value);
                }}
                value={element?.link ?? ""}
              />
            </div>
          </div>

          {designSystemByType?.styles?.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold">Style</p>
              <div className="w-[-webkit-fill-available]">
                <Select
                  value={
                    designSystemByType?.styles?.find(
                      (i) => element?.style === i.style_id
                    )?.style_name
                  }
                >
                  {designSystemByType?.styles?.map((itemStyle) => (
                    <Select.Option
                      key={itemStyle.id}
                      isActive={
                        element?.style === itemStyle?.style_id ? true : false
                      }
                      onClick={() => handleChangeStyle(itemStyle)}
                      isDisabled={element?.style === itemStyle?.style_id}
                    >
                      <p>{itemStyle?.style_name}</p>
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold">Animation</p>
            <div className="w-[-webkit-fill-available]">
              <Select value={element?.classes?.hover ?? "None"}>
                <Select.Option
                  isActive={element?.classes?.hover === "" ? true : false}
                  onClick={() => handleChangeClass("hover", "")}
                  isDisabled={element?.classes?.hover === ""}
                >
                  None
                </Select.Option>
                <Select.Option
                  isActive={element?.classes?.hover === "scale" ? true : false}
                  onClick={() => handleChangeClass("hover", "scale")}
                  isDisabled={element?.classes?.hover === "scale"}
                >
                  Scale
                </Select.Option>
                <Select.Option
                  isActive={element?.classes?.hover === "fade" ? true : false}
                  onClick={() => handleChangeClass("hover", "fade")}
                  isDisabled={element?.classes?.hover === "fade"}
                >
                  Fade
                </Select.Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ElementOptions;
