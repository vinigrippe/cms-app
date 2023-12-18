import React from "react";
import elementsList from "@/utils/elementList.json";

const SideBarElements = () => {
  return (
    <div className="min-w-[170px] p-4 bg-slate-100 border-r-2 border-slate-200">
      <p className="font-medium">Elements</p>
      <div className="grid grid-cols-1 gap-2 items-center justify-center pt-3">
        {elementsList.map((itemEl) => (
          <Element
            key={itemEl.id}
            title={itemEl.title}
            icon={itemEl.icon}
            type={itemEl.type}
          />
        ))}
      </div>
    </div>
  );
};

const Element = ({ title, icon, type }) => {
  return (
    <div
      data-type="button-element"
      onDragStart={(event) => {
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", type);
      }}
      draggable="true"
    >
      <span className={icon} />
      <p>{title}</p>
    </div>
  );
};

export default SideBarElements;
