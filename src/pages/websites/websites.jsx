import { useEffect, useState } from "react";
import moment from "moment";
import { findAllWebsites } from "@/services/website";

import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { LoadingIcon } from "@/icons/loading";
import { Layout } from "@/components/layout/layout";

import { WebsiteCard } from "./websiteCard/websiteCard";
import { Modal } from "@/components/modal/modal";

export const Websites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [websites, setWebsitesList] = useState([]);
  const [inputFilters, setInputFilters] = useState({
    search: "",
    sort: "activity",
    view: "grid",
  });
  const [modalCreatePage, setModalCreatePage] = useState(false);

  useEffect(() => {
    handleLoadPages();
  }, []);

  const handleLoadPages = async () => {
    setIsLoading(true);

    Promise.all([findAllWebsites()])
      .then((response) => {
        setWebsitesList(response[0]);
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
    <Layout>
      <Layout.Content>
        <div className="flex justify-between items-center gap-2 py-5 flex-col md:flex-row">
          <h1 className="text-lg font-semibold md:w-fit w-full">
            Your Websites
          </h1>
          <div className="flex items-center gap-2 md:w-fit w-full">
            <div className="w-full md:w-[250px] min-w-[120px]">
              <Input
                placeholder="Search website"
                onChange={(e) => handleOnChangeFilter(e.target.value, "search")}
                value={inputFilters.search}
              />
            </div>

            <div>
              <Button
                type="primary"
                icon="add"
                onClick={() => setModalCreatePage(true)}
                isDisabled
              >
                New Website
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
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1"
          }
          `}
          >
            {websites
              .filter((website) =>
                website.title
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
              .map((website, index) => (
                <WebsiteCard website={website} index={index} key={website.id} />
              ))}
          </div>
        )}

        {modalCreatePage && (
          <Modal onClose={() => setModalCreatePage(false)}>
            <Modal.Header title="Create a new website" />
            <Modal.Body>
              <div className="flex flex-col gap-2">
                <Input placeholder="Website name" />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="ghost" onClick={() => setModalCreatePage(false)}>
                Cancel
              </Button>
              <Button type="primary">Create</Button>
            </Modal.Footer>
          </Modal>
        )}
      </Layout.Content>
    </Layout>
  );
};
