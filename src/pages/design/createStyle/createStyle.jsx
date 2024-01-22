import { useState } from "react";

import { Modal } from "@/components/modal/modal";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";

import { useParams } from "react-router-dom";
import { createStyle } from "@/services/design";
import { BuildStyleComponent } from "../buildStyleComponent/buildStyleComponent";

export const ModalCreateStyle = ({
  isOpen,
  onClose,
  style,
  handleLoadDesign,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [paddingFocus, setPaddingFocus] = useState("");
  const [pageField, setPageField] = useState({
    name: "",
    style: {
      background: {
        color: "#FFFFFF",
        opacity: "100%",
      },
      border: {
        color: "",
        opacity: "",
        type: "",
        width: "",
      },
      padding: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
      gap: "",
      display: "",
      borderRadius: "",
    },
  });
  const { websiteId } = useParams();

  const handleOnChange = (field, value) => {
    setPageField({
      ...pageField,
      [field]: value,
    });
  };

  const handleCreateStyle = async () => {
    setIsLoading(true);

    await createStyle({
      name: pageField.name,
      styleInline: pageField.styleInline,
      styleHover: pageField.styleHover,
      designId: style.id,
    });
    await handleLoadDesign(websiteId);

    setIsLoading(false);
    onClose();
  };

  const convertToInlineStyle = (style) => {
    let styleInline = "";
    if (style.background.color) {
      styleInline += `background-color: ${style.background.color};`;
    }
    if (style.background.opacity) {
      styleInline += `opacity: ${style.background.opacity};`;
    }
    if (style.border.color) {
      styleInline += `border-color: ${style.border.color};`;
    }
    if (style.border.opacity) {
      styleInline += `border-opacity: ${style.border.opacity};`;
    }
    if (style.border.type) {
      styleInline += `border-style: ${style.border.type};`;
    }
    if (style.border.width) {
      styleInline += `border-width: ${style.border.width};`;
    }
    if (style.padding.top) {
      styleInline += `padding-top: ${style.padding.top}px;`;
    }
    if (style.padding.right) {
      styleInline += `padding-right: ${style.padding.right}px;`;
    }
    if (style.padding.bottom) {
      styleInline += `padding-bottom: ${style.padding.bottom}px;`;
    }
    if (style.padding.left) {
      styleInline += `padding-left: ${style.padding.left}px;`;
    }
    if (style.gap) {
      styleInline += `gap: ${style.gap}px;`;
    }
    if (style.display) {
      styleInline += `display: ${style.display};`;
    }
    if (style.borderRadius) {
      styleInline += `border-radius: ${style.borderRadius}px;`;
    }
    return { styleInline: styleInline };
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="600px">
      <Modal.Header
        title="Catwalk cheers you on!"
        subtitle={`Create a new style for ${style.element} component`}
      />
      <Modal.Body>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
          <div className="flex flex-col gap-2 col-span-1 pt-4">
            <div className="flex flex-col gap-2 items-center">
              <div className="w-full">
                <Input
                  label="Style Name"
                  placeholder="Eg: Primary Button"
                  onChange={(e) => handleOnChange("name", e.target.value)}
                  value={pageField.name}
                />
              </div>
              <div className="w-full flex flex-col gap-3 pt-4">
                <span className="font-medium">Preview</span>
                <div className="border rounded-md bg-slate-50 p-4 flex items-center justify-center">
                  <BuildStyleComponent
                    element={style.element}
                    style={convertToInlineStyle(pageField.style)}
                  >
                    {style.element}
                  </BuildStyleComponent>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4 border rounded-md h-fit ">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-xs font-semibold">Background</p>
                <div className="grid grid-cols-7 gap-2 items-center">
                  <div
                    className="p-3 rounded border"
                    style={{
                      backgroundColor: pageField.style.background.color,
                      opacity: pageField.style.background.opacity,
                    }}
                    onClick={() => {
                      const color = document.getElementById(
                        "format-bordercolor-box"
                      );
                      color.click();
                    }}
                  />
                  <div className="relative col-span-4">
                    <Input
                      type="text"
                      placeholder="#00000"
                      value={pageField.style.background.color}
                      onClick={() => {
                        const color = document.getElementById(
                          "format-bordercolor-box"
                        );
                        color.click();
                      }}
                      onChange={(e) => {
                        setPageField({
                          ...pageField,
                          style: {
                            ...pageField.style,
                            background: {
                              ...pageField.background,
                              color: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                    <Input
                      type="color"
                      id="format-bordercolor-box"
                      name="format-bordercolor-box"
                      value={pageField.style.background.color}
                      onInput={(e) => {
                        setPageField({
                          ...pageField,
                          style: {
                            ...pageField.style,
                            background: {
                              ...pageField.background,
                              color: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="text"
                      placeholder="100%"
                      value={pageField.style.background.opacity}
                      onChange={(e) => {
                        setPageField({
                          ...pageField,
                          style: {
                            ...pageField.style,
                            background: {
                              ...pageField.background,
                              opacity: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b" />

              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold">Padding</p>
                <div className="flex flex-col gap-1 items-center">
                  <Input
                    type="number"
                    className="!w-[16.32px] text-center"
                    onFocus={() => setPaddingFocus("top")}
                    onBlur={() => setPaddingFocus("")}
                    onChange={(e) => {
                      setPageField({
                        ...pageField,
                        style: {
                          ...pageField.style,
                          padding: {
                            ...pageField.padding,
                            top: e.target.value,
                          },
                        },
                      });
                    }}
                    value={pageField.style.padding.top}
                  />

                  <div className="flex flex-row gap-2 items-center">
                    <Input
                      type="number"
                      className="!w-[16.32px] text-center"
                      onFocus={() => setPaddingFocus("left")}
                      onBlur={() => setPaddingFocus("")}
                      onChange={(e) => {
                        setPageField({
                          ...pageField,
                          style: {
                            ...pageField.style,
                            padding: {
                              ...pageField.padding,
                              left: e.target.value,
                            },
                          },
                        });
                      }}
                      value={pageField.style.padding.left}
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
                          paddingFocus === "right"
                            ? "opacity-100"
                            : "opacity-20"
                        }`}
                      />
                      <div
                        className={`pb-1 bg-teal-600 w-full absolute bottom-0 left-0 transition-all ${
                          paddingFocus === "bottom"
                            ? "opacity-100"
                            : "opacity-20"
                        }`}
                      />
                    </div>
                    <Input
                      type="number"
                      className="!w-[16.32px] text-center"
                      onFocus={() => setPaddingFocus("right")}
                      onBlur={() => setPaddingFocus("")}
                      onChange={(e) => {
                        setPageField({
                          ...pageField,
                          style: {
                            ...pageField.style,
                            padding: {
                              ...pageField.padding,
                              right: e.target.value,
                            },
                          },
                        });
                      }}
                      value={pageField.style.padding.right}
                    />
                  </div>

                  <Input
                    type="number"
                    className="!w-[16.32px] text-center"
                    onFocus={() => setPaddingFocus("bottom")}
                    onBlur={() => setPaddingFocus("")}
                    onChange={(e) => {
                      setPageField({
                        ...pageField,
                        style: {
                          ...pageField.style,
                          padding: {
                            ...pageField.padding,
                            left: e.target.value,
                          },
                        },
                      });
                    }}
                    value={pageField.style.padding.left}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-between gap-2">
          <Button type="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleCreateStyle}
            isLoading={isLoading}
          >
            Create
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
