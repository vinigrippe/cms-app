import { useState } from "react";

import { Modal } from "@/components/modal/modal";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";

import { useParams } from "react-router-dom";
import { createStyle } from "@/services/design";

export const ModalCreateStyle = ({
  isOpen,
  onClose,
  designId,
  handleLoadDesign,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageField, setPageField] = useState({
    name: "",
    styleInline: "",
    styleHover: "",
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
      designId: designId,
    });
    await handleLoadDesign(websiteId);

    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="700px">
      <Modal.Header
        title="Catwalk cheers you on!"
        subtitle="Create a brand new style or get started with one of our Templates"
      />
      <Modal.Body>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
          <div className="flex flex-col gap-2 p-4 border rounded-md h-fit">
            <h2 className="text-nd font-semibold">Brand New</h2>
            <div className="flex flex-col gap-2 items-center">
              <div className="w-full">
                <Input
                  label="Name"
                  placeholder="My Style Name"
                  onChange={(e) => handleOnChange("name", e.target.value)}
                  value={pageField.name}
                />
              </div>
              <div className="w-full">
                <Input
                  label="styleInline"
                  placeholder="CSS Style Inline"
                  onChange={(e) =>
                    handleOnChange("styleInline", e.target.value)
                  }
                  value={pageField.styleInline}
                />
              </div>
              <div className="w-full">
                <Input
                  label="styleHover"
                  placeholder="CSS Style Inline"
                  onChange={(e) => handleOnChange("styleHover", e.target.value)}
                  value={pageField.styleHover}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-3">
            <h2 className="text-md font-semibold">Use Template</h2>
            <div className="grid grid-cols-2 gap-3 w-full">
              <TemplateOption
                handleOnChange={handleOnChange}
                pageField={pageField.template}
                template={{
                  id: null,
                  title: "None",
                  thumbnail: " ",
                }}
              />
              {/* {templateDummy.map((template, index) => (
                <TemplateOption
                  handleOnChange={handleOnChange}
                  pageField={pageField.template}
                  template={template}
                  index={index + 1}
                  key={template.id}
                />
              ))} */}
              <div>
                <Button type="link" iconRight="arrow_right">
                  See all templates
                </Button>
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

const TemplateOption = ({ template, index, pageField, handleOnChange }) => {
  const isActive = pageField === template.id;

  return (
    <div
      data-animation="entrance-fade"
      className={`w-full rounded-md cursor-pointer border outline-2 outline outline-offset-2   ${
        isActive ? "outline-teal-500" : "outline-transparent"
      }`}
      style={{
        animationDelay: index * 0.15 + "s",
      }}
      onClick={() => {
        handleOnChange("template", template.id);
      }}
    >
      <div className="bg-slate-200 h-[70px]"></div>
      <p
        className={`p-2 font-medium ${
          isActive ? "text-teal-500" : "text-slate-400"
        }`}
      >
        {template.title}
      </p>
    </div>
  );
};
