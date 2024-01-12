import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { Button } from "@/components/button/button";
import { DropDown } from "@/components/dropdown/dropdown";

export const WebsiteCard = ({ page, index }) => {
  const [menuOptions, setMenuOptions] = useState(false);

  return (
    <Link to={`/website/${page.id}`}>
      <div
        data-animation="entrance-fade"
        className="col-span-1 rounded-lg cursor-pointer border-slate-200 border bg-white flex flex-col px-3 pb-3 pt-2 gap-2 transition-all relative z-1"
        style={{
          animationDelay: index * 0.15 + "s",
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between items-center">
            <p className="text-[1.1em] leading-none font-semibold truncate">
              {page.title}
            </p>

            <div className="flex gap-2 items-center">
              <div
                className={`py-1 capitalize rounded font-semibold text-xs px-2 ${
                  page.status === "active"
                    ? " text-teal-400"
                    : "text-violet-400"
                }`}
              >
                {page.status}
              </div>

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
                    <Button type="dropdown">Edit Page</Button>
                    <Button type="dropdown" isDisabled>
                      Transfer Page
                    </Button>
                    <Button type="dropdown">Settings</Button>
                    <div className="border-b my-1"></div>
                    <Button type="dropdown" color="danger">
                      Delete Page
                    </Button>
                  </DropDown.Popup>
                )}
              </DropDown.Trigger>
            </div>
          </div>
          <div className="flex gap-3 justify-between">
            <Button type="link">{page.url}</Button>

            <p className="text-slate-400 text-xs truncate">
              Last updated:{" "}
              {moment().diff(moment(page.updateDate), "hours") < 24
                ? moment(page.updateDate).fromNow()
                : moment(page.updateDate).format("DD MMM YYYY")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
