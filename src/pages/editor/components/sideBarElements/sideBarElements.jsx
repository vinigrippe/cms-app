import React from "react";

const SideBarElements = () => {
  const elementsList = [
    {
      id: 3,
      title: "Heading",
      icon: "mgc_text_2_line",
      type: "heading",
    },
    {
      id: 1,
      title: "Text",
      icon: "mgc_textbox_line",
      type: "text",
    },
    {
      id: 2,
      title: "Button",
      icon: "mgc_bling_line",
      type: "button",
    },
    {
      id: 4,
      title: "Icon",
      icon: "mgc_emoji_line",
      type: "icon",
    },
    {
      id: 5,
      title: "Image",
      icon: "mgc_pic_line",
      type: "pic",
    },
    {
      id: 6,
      title: "Video",
      icon: "mgc_video_line",
      type: "video",
    },
  ];
  return (
    <div className="min-w-[200px] border-r-2 p-4 bg-slate-100">
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
      className="select-none border-2 rounded-lg flex flex-row gap-2 items-center justify-start px-2 py-1 cursor-pointer bg-white hover:border-blue-600 transition-all"
      onDragStart={(event) => {
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", type);
      }}
      draggable
    >
      <span className={icon} />
      <p>{title}</p>
    </div>
  );
};

export default SideBarElements;
