import { useEffect, useState } from "react";

import { Modal } from "@/components/modal/modal";
import { Select } from "@/components/select/select";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";

import { createPage, findAllPages } from "../../../services/page";
import { useParams } from "react-router-dom";

export const ModalCreatePage = ({ isOpen, onClose, handleLoadPages }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageList, setPageList] = useState([]);
  const [pageField, setPageField] = useState({
    title: "",
    url: "",
    status: "Private",
    template: null,
    duplicate: "",
  });
  const { websiteId } = useParams();

  const templateDummy = [
    {
      id: 1,
      title: "About",
      thumbnail: " ",
    },
    {
      id: 2,
      title: "Contact",
      thumbnail: " ",
    },
    {
      id: 3,
      title: "Home",
      thumbnail: " ",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    Promise.all([findAllPages(websiteId)])
      .then((response) => {
        setPageList(response[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleOnChange = (field, value) => {
    setPageField({
      ...pageField,
      [field]: value,
    });
  };

  const handleCreatePage = async () => {
    setIsLoading(true);

    await createPage({
      title: pageField.title,
      url: pageField.url,
      status: pageField.status,
      elements: [],
      userCreator: 1,
    });
    await handleLoadPages();

    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="700px">
      <Modal.Header
        title="Let's build something new"
        subtitle="Create a brand new page or get started with one of our Templates"
      />
      <Modal.Body>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
          <div className="flex flex-col gap-2 p-4 border rounded-md h-fit">
            <h2 className="text-nd font-semibold">Brand New</h2>
            <div className="flex flex-col gap-2 items-center">
              <div className="w-full">
                <Input
                  label="Title"
                  placeholder="My Page Title"
                  onChange={(e) => handleOnChange("title", e.target.value)}
                  value={pageField.title}
                />
              </div>
              <div className="w-full">
                <Input
                  label="URL"
                  placeholder="Slug name, eg: about"
                  onChange={(e) => handleOnChange("url", e.target.value)}
                  value={pageField.url}
                />
              </div>
              <div className="w-full">
                <Select label="Status" value={pageField.status || "Select"}>
                  <Select.Option
                    value="Active"
                    isActive={pageField.status === "Active"}
                    onClick={() => handleOnChange("status", "Active")}
                  >
                    Active
                  </Select.Option>
                  <Select.Option
                    value="Private"
                    isActive={pageField.status === "Private"}
                    onClick={() => handleOnChange("status", "Private")}
                  >
                    Private
                  </Select.Option>
                </Select>
              </div>
              <div className="w-full border-b border-slate-200 my-2" />
              <div className="w-full">
                <Select
                  label="Duplicate"
                  value={pageField.duplicate?.title || "Select"}
                >
                  {pageList.map((page) => (
                    <Select.Option
                      onClick={() => handleOnChange("duplicate", page)}
                      isActive={pageField.duplicate?.id === page.id}
                      key={page.id}
                    >
                      {page.title}
                    </Select.Option>
                  ))}
                </Select>
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
              {templateDummy.map((template, index) => (
                <TemplateOption
                  handleOnChange={handleOnChange}
                  pageField={pageField.template}
                  template={template}
                  index={index + 1}
                  key={template.id}
                />
              ))}
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
            onClick={handleCreatePage}
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
