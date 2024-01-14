import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { findAllPages } from "@/services/page";

import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Select } from "@/components/select/select";
import { LoadingIcon } from "@/icons/loading";
import { Layout } from "@/components/layout/layout";

import { ModalCreatePage } from "./createPage/createPage";
import { PageCard } from "./pageCard/pageCard";
import { NavTab } from "./navTab/navTab";

export const Pages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageList, setPageList] = useState([]);
  const [inputFilters, setInputFilters] = useState({
    search: "",
    sort: "activity",
    view: "grid",
  });
  const [modalCreatePage, setModalCreatePage] = useState(false);

  const { websiteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleLoadPages();
  }, []);

  const handleLoadPages = async () => {
    setIsLoading(true);

    Promise.all([findAllPages(websiteId)])
      .then((response) => {
        setPageList(response[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnChangeFilter = (value, field) => {
    setInputFilters({
      ...inputFilters,
      [field]: value,
    });
  };

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

        <NavTab />
      </Layout.Header>

      <Layout.Content>
        <div className="flex justify-between items-center gap-2 py-5 flex-col md:flex-row">
          <h1 className="text-lg font-semibold md:w-fit w-full">Alexandre</h1>
          <div className="flex items-center gap-2 md:w-fit w-full">
            <div className="w-full md:w-[250px] min-w-[120px]">
              <Input
                placeholder="Search pages"
                onChange={(e) => handleOnChangeFilter(e.target.value, "search")}
                value={inputFilters.search}
              />
            </div>
            <div className="sm:flex hidden items-center gap-2">
              <div className="w-fit md:w-[150px]">
                <Select
                  placeholder="Select a sort"
                  value={
                    inputFilters.sort === "activity"
                      ? "Sort by activity"
                      : "Sort by name"
                  }
                >
                  <Select.Option
                    isActive={inputFilters.sort === "activity"}
                    onChange={() => handleOnChangeFilter("activity", "sort")}
                  >
                    Sort by activity
                  </Select.Option>
                  <Select.Option
                    isActive={inputFilters.sort === "date"}
                    onChange={() => handleOnChangeFilter("date", "sort")}
                  >
                    Sort by name
                  </Select.Option>
                </Select>
              </div>
              <div className="flex border p-[1.8px] gap-1 bg-white rounded-lg">
                <Button
                  type="flat"
                  icon="layout_grid"
                  size="small"
                  isActive={inputFilters.view === "grid"}
                  onClick={() => handleOnChangeFilter("grid", "view")}
                />
                <Button
                  type="flat"
                  icon="list_check_3"
                  size="small"
                  isActive={inputFilters.view === "list"}
                  onClick={() => handleOnChangeFilter("list", "view")}
                />
              </div>
            </div>
            <div>
              <Button
                type="primary"
                icon="add"
                onClick={() => setModalCreatePage(true)}
              >
                New Page
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center p-6 gap-2 flex-col z-40 w-full">
            <LoadingIcon size="40" color="#0d9488" />
            <p>Deers are working hard to bring you your pages!</p>
          </div>
        ) : (
          <div
            className={`grid gap-4 
          ${
            inputFilters.view === "grid"
              ? "grid-cols-2 md:grid-cols-3"
              : "grid-cols-1"
          }
          `}
          >
            {pageList
              .filter((page) =>
                page.title
                  .toLowerCase()
                  .includes(inputFilters.search.toLowerCase())
              )
              .sort((a, b) => {
                switch (inputFilters.sort) {
                  default:
                  case "activity":
                    return (
                      moment(b.updateDate).unix() - moment(a.updateDate).unix()
                    );

                  case "name":
                    return a.title.localeCompare(b.title);
                }
              })
              .map((page, index) => (
                <PageCard page={page} index={index} key={page.id} />
              ))}
          </div>
        )}

        {modalCreatePage && (
          <ModalCreatePage
            isOpen={modalCreatePage}
            onClose={() => setModalCreatePage(false)}
            handleLoadPages={handleLoadPages}
          />
        )}
      </Layout.Content>
    </Layout>
  );
};
