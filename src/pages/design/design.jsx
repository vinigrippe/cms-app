import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Layout } from "@/components/layout/layout";
import { NavTab } from "../pages/navTab/navTab";
import { Button } from "@/components/button/button";
import { DropDown } from "@/components/dropdown/dropdown";

import elementsList from "@/utils/elementList.json";
import { findAllDesign } from "@/services/design";
import { ModalCreateStyle } from "./createStyle/createStyle";
import { BuildStyleComponent } from "./buildStyleComponent/buildStyleComponent";

export const Design = () => {
  const [modalCreateStyle, setModalCreateStyle] = useState(false);
  const [activeComponent, setActiveComponent] = useState("heading");
  const [designSystem, setDesignSystem] = useState([]);
  const navigate = useNavigate();
  const { websiteId } = useParams();

  useEffect(() => {
    handleLoadDesign(websiteId);
  }, [websiteId]);

  const handleLoadDesign = async (id) => {
    const response = await findAllDesign(id);
    setDesignSystem(response);
  };

  const styles = designSystem.find((item) => item.element === activeComponent);

  return (
    <Layout borderBottom={false}>
      <Layout.Header>
        <div className="pb-4 px-3">
          <Button
            type="flat"
            icon="arrow_left"
            onClick={() => {
              navigate("/websites");
            }}
            size="small"
          >
            Back to websites
          </Button>
        </div>

        <NavTab isActive="design" />
      </Layout.Header>
      <Layout.Content>
        <div className="flex gap-4 pt-5 pb-6 flex-col">
          <div className="flex gap-6">
            <div className="flex flex-col gap-3 min-w-[200px]">
              <h1 className="text-md font-semibold md:w-fit w-full">
                Components
              </h1>
              <div className="w-[-webkit-fill-available]">
                {elementsList.map((itemEl) => (
                  <Button
                    icon={itemEl.icon}
                    type="flat"
                    isActive={activeComponent === itemEl.type}
                    onClick={() => setActiveComponent(itemEl.type)}
                  >
                    {itemEl.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-md font-semibold md:w-fit w-full">
                    Styles
                  </h1>
                  <span className="text-slate-400">
                    {styles?.styles?.length} registers
                  </span>
                </div>
                <Button icon="add" onClick={() => setModalCreateStyle(true)}>
                  Create Style
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {styles?.styles?.length > 0 &&
                  styles?.styles?.map((styleItem) => (
                    <ComponentStyle
                      style={styleItem}
                      element={activeComponent}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        {modalCreateStyle && (
          <ModalCreateStyle
            isOpen={modalCreateStyle}
            onClose={() => setModalCreateStyle(false)}
            style={styles}
            handleLoadDesign={handleLoadDesign}
          />
        )}
      </Layout.Content>
    </Layout>
  );
};

const ComponentStyle = ({ style, element }) => {
  const [menuOptions, setMenuOptions] = useState(false);

  return (
    <div className="border p-4 rounded-lg bg-white group">
      <div className="flex justify-between gap-2 items-center">
        <span className="text-xs text-slate-800">{style.name}</span>
        <div className="flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-all">
          <Button type="flat" size="xsmall" icon="eye" />
          <DropDown.Trigger onClose={() => setMenuOptions(false)}>
            <Button
              type="flat"
              size="xsmall"
              icon="more_1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMenuOptions(true);
              }}
              isActive={menuOptions}
            />
            {menuOptions && (
              <DropDown.Popup
                position={{
                  x: "right-0 left-auto",
                  y: "top-[100%]",
                }}
              >
                <Button type="dropdown">Edit Style</Button>
                <Button type="dropdown" color="danger">
                  Delete Style
                </Button>
              </DropDown.Popup>
            )}
          </DropDown.Trigger>
        </div>
      </div>
      <div className="border-t pt-2 mt-2 w-full">
        <BuildStyleComponent element={element} style={style}>
          {element}
        </BuildStyleComponent>
      </div>
    </div>
  );
};
