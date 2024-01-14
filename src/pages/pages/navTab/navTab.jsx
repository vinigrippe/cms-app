import React, { useState } from "react";
import { Button } from "@/components/button/button";
import { useNavigate, useParams } from "react-router-dom";

export const NavTab = () => {
  const [activeTab, setActiveTab] = useState("pages");
  const navigate = useNavigate();
  const { websiteId } = useParams();

  const tabs = [
    {
      label: "Pages",
      value: "pages",
      link: "/website/" + websiteId + "/pages",
    },
    {
      label: "Design System",
      value: "design",
      link: "/website/" + websiteId + "/design",
    },
    {
      label: "Analytics",
      value: "analytics",
      link: "/website/" + websiteId + "/analytics",
      disabled: true,
    },
    {
      label: "Storage",
      value: "storage",
      link: "/website/" + websiteId + "/storage",
      disabled: true,
    },
    {
      label: "Settings",
      value: "settings",
      link: "/website/" + websiteId + "/settings",
      disabled: true,
    },
  ];

  return (
    <div className="px-3 w-full flex gap-2 invisiblescroll">
      {tabs.map((tab) => (
        <div
          className={`border-b-2 pb-[6px] ${
            activeTab === tab.value ? "border-teal-400" : "border-transparent"
          }
          
      `}
          key={tab.value}
        >
          <Button
            type="flat"
            isActive={activeTab === tab.value}
            size="small"
            onClick={() => {
              setActiveTab(tab.value);
              navigate(tab.link);
            }}
            isDisabled={tab.disabled}
          >
            {tab.label}
          </Button>
        </div>
      ))}
    </div>
  );
};
