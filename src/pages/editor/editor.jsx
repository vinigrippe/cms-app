import { createContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import { elementsReducer } from "./editorService";
import { generateId } from "@/utils/functions";

import { findPageById } from "../../services/page";
import { findAllDesign } from "../../services/design";

import PageEditor from "./pageEditor/pageEditor";
import { SidePanel } from "./sidePanel/sidePanel";
import { TreePanel } from "./treePanel/treePanel";
import { TopPanel } from "./topPanel/topPanel";

export const PageEditorContext = createContext();

export function Editor() {
  const { pageId } = useParams();
  const [gridElements, setGridElements] = useReducer(elementsReducer, {
    elements: [],
    history: [],
    historyPointer: 1,
    isSaved: true,
  });
  const [designSystem, setDesignSystem] = useState([]);
  const [isLoading, setIsLoading] = useState("load");
  const [copyPaste, setCopyPaste] = useState(null);
  const [showTreeWalker, setShowTreeWalker] = useState(false);
  const [elementOnFocus, setElementOnFocus] = useState({
    element: null,
    box: null,
    grid: null,
  });

  useEffect(() => {
    setIsLoading("load");
    Promise.all([handleLoadPage(), handleLoadDesignSystem()]).then(() => {
      setIsLoading("");
    });
  }, []);

  const handleLoadDesignSystem = async () => {
    const response = await findAllDesign();
    setDesignSystem(response);
  };

  const handleLoadPage = async () => {
    const response = await findPageById(pageId);
    const elements = response.elements;

    if (elements.length === 0) {
      const newElement = {
        id: generateId({ name: "grid" }),
        type: "grid",
        elements: [
          {
            id: generateId({ name: "box" }),
            type: "box",
            elements: [],
          },
        ],
      };
      elements.push(newElement);
    }

    setGridElements({
      type: "SET_GRID",
      payload: {
        loadElements: elements,
        loadHistory: [elements],
      },
    });
  };

  return (
    <PageEditorContext.Provider
      value={{
        isLoading,
        setIsLoading,
        gridElements,
        setGridElements,
        copyPaste,
        setCopyPaste,
        elementOnFocus,
        setElementOnFocus,
        showTreeWalker,
        setShowTreeWalker,
        designSystem,
      }}
    >
      <div className="h-[100vh] max-h-[100vh] min-h-[100vh] flex">
        <SidePanel />
        <div className={`relative h-[100vh] w-full flex flex-col mr-2`}>
          <TopPanel />
          <PageEditor />
        </div>
        {showTreeWalker && <TreePanel />}
      </div>
    </PageEditorContext.Provider>
  );
}
