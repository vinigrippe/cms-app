import { createContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import { elementsReducer } from "./editorService";
import api from "@/utils/api";

import PageEditor from "./pageEditor/pageEditor";
import ComponentEditor from "./componentEditor/componentEditor";
import TreeWalkerElements from "./treeWalkerElements/treeWalkerElements";

export const PageEditorContext = createContext();

export function Editor() {
  const { pageId } = useParams();
  const [gridElements, setGridElements] = useReducer(elementsReducer, {
    elements: [],
    history: [],
    historyPointer: 1,
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
    await api.get("/design_system").then((response) => {
      setDesignSystem(response.data);
    });
  };

  const handleLoadPage = async () => {
    await api.get("/pages/" + pageId).then((response) => {
      setGridElements({
        type: "SET_GRID",
        payload: {
          loadElements: response.data.elements,
          loadHistory: [response.data.elements],
        },
      });
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
        <ComponentEditor />
        <PageEditor />
        {showTreeWalker && <TreeWalkerElements />}
      </div>
    </PageEditorContext.Provider>
  );
}
