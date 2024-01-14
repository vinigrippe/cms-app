import { Link } from "react-router-dom";
import moment from "moment";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/button/button";

export const WebsiteCard = ({ website, index }) => {
  return (
    <Link to={`/website/${website.id}/pages`}>
      <div
        data-animation="entrance-fade"
        className="col-span-1 rounded-lg cursor-pointer border-slate-200 border bg-white flex flex-col px-3 py-3 gap-2 transition-all relative z-1"
        style={{
          animationDelay: index * 0.15 + "s",
        }}
      >
        <div className="flex items-start gap-4">
          <div>
            <div className="bg-slate-100 rounded-lg w-[50px] h-[50px] flex items-center justify-center">
              <DevicePhoneMobileIcon className="w-[20px] h-[20px] text-slate-400" />
            </div>
          </div>
          <div className="flex flex-col gap-2  w-full">
            <div className="flex gap-2 justify-between items-center">
              <p className="text-[1.1em] leading-none font-semibold truncate">
                {website.title}
              </p>

              <div className="flex gap-2 items-center">
                <div
                  className={`py-1 capitalize rounded font-semibold text-xs ${
                    website.status === "active"
                      ? " text-teal-400"
                      : "text-violet-400"
                  }`}
                >
                  {website.status}
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-between">
              <Button type="link">{website.url}</Button>

              <p className="text-slate-400 text-xs truncate">
                Last updated:{" "}
                {moment().diff(moment(website.creationDate), "hours") < 24
                  ? moment(website.creationDate).fromNow()
                  : moment(website.creationDate).format("DD MMM YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
