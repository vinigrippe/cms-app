import { useEffect, useState } from "react";
import api from "@/utils/api";
import moment from "moment";

import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { LogoBuilder } from "@/icons/logo/logo";
import { LoadingIcon } from "@/icons/loading";

export const Pages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageList, setPageList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([handleLoadDesignSystem()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleLoadDesignSystem = async () => {
    await api.get("/pages?page=1").then((response) => {
      setPageList(response.data);
    });
  };

  return (
    <div className="p-4 flex items-center flex-col w-full h-[100vh]">
      <div className="p-4 w-[1000px]">
        <div className="pb-4 border-b">
          <LogoBuilder size="150" />
        </div>

        <div className="flex justify-between items-center py-3">
          <h1 className="text-lg font-semibold">Pages</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search pages"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <Button type="primary" icon="add">
              New Page
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center p-6 gap-2 flex-col z-40 w-full">
            <LoadingIcon size="40" color="#0d9488" />
            <p>Deers are working hard to bring you your pages!</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {pageList
              .filter((page) =>
                page.title.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((page) => (
                <a href={`/editor/${page.id}`}>
                  <div
                    key={page.id}
                    className="animate-entrance-bottom col-span-1 rounded-lg cursor-pointer shadow-xl border bg-white flex flex-col p-2 gap-2"
                  >
                    <div className="rounded-lg bg-slate-200 w-full h-[150px]"></div>
                    <div className="flex flex-col">
                      <div className="flex gap-2 justify-between">
                        <p className="text-[1.1em] font-semibold truncate">
                          {page.title}
                        </p>
                        <div className="py-1 capitalize rounded bg-teal-100 text-teal-600 font-semibold text-xs px-2">
                          {page.status}
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs pb-1">
                        Last updated:{" "}
                        {moment(page.updatedDate).format("DD/MM/YY - h:mm a")}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
