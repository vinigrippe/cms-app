import React, { useState } from "react";
import { Button } from "@/components/button/button";
import { useNavigate } from "react-router-dom";

export const NavTab = () => {
  const [activeTab, setActiveTab] = useState("pages");
  const navigate = useNavigate();

  const tabs = [
    {
      label: "Pages",
      value: "pages",
      link: "/pages",
    },
    {
      label: "Design System",
      value: "design",
      link: "/design",
    },
    {
      label: "Analytics",
      value: "analytics",
      disabled: true,
    },
    {
      label: "Storage",
      value: "storage",
      disabled: true,
    },
    {
      label: "Settings",
      value: "settings",
      disabled: true,
    },
  ];

  return (
    <div className="w-full flex gap-2">
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
