import { useEffect, useState } from "react";
import moment from "moment";

import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Select } from "@/components/select/select";
import { LoadingIcon } from "@/icons/loading";

import { ModalCreatePage } from "./createPage/createPage";
import { findAllPages } from "../../services/page";
import { Layout } from "../../components/layout/layout";
import { PageCard } from "./pageCard/pageCard";
import { NavTab } from "./navTab/navTab";
import { useNavigate } from "react-router-dom";

export const Pages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageList, setPageList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modalCreatePage, setModalCreatePage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleLoadPages();
  }, []);

  const handleLoadPages = async () => {
    setIsLoading(true);

    Promise.all([findAllPages()])
      .then((response) => {
        setPageList(response[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout borderBottom={false}>
      <Layout.Header>
        <div className="pb-4">
          <Button
            type="flat"
            icon="arrow_left"
            onClick={() => {
              navigate("/pages");
            }}
            size="small"
          >
            Back to dashboard
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
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </div>
            <div className="w-fit md:w-[150px]">
              <Select value="Sort by activity">
                <Select.Option value="activity">Sort by activity</Select.Option>
                <Select.Option value="date">Sort by name</Select.Option>
              </Select>
            </div>
            <div className="flex border p-1 bg-white rounded-lg">
              <Button type="flat" icon="layout_grid" size="small" isActive />
              <Button type="flat" icon="list_check_3" size="small" />
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {pageList
              .filter((page) =>
                page.title.toLowerCase().includes(searchInput.toLowerCase())
              )
              .sort((a, b) => {
                return (
                  moment(b.updateDate).unix() - moment(a.updateDate).unix()
                );
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
