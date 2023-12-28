import { createContext, useEffect, useReducer, useState } from "react";

import { elementsReducer } from "./editorService";
import api from "@/utils/api";

import PageEditor from "./pageEditor/pageEditor";
import ComponentEditor from "./componentEditor/componentEditor";
import TreeWalkerElements from "./treeWalkerElements/treeWalkerElements";

export const PageEditorContext = createContext();

function Editor() {
  const pageId = 4;
  const [gridElements, setGridElements] = useReducer(elementsReducer, {
    elements: [],
    history: [],
    historyPointer: 1,
  });
  const [isLoading, setIsLoading] = useState("load");
  const [copyPaste, setCopyPaste] = useState(null);
  const [showTreeWalker, setShowTreeWalker] = useState(false);
  const [elementOnFocus, setElementOnFocus] = useState({
    element: null,
    box: null,
    grid: null,
  });

  useEffect(() => {
    handleLoadPage();
  }, []);

  const handleLoadPage = async () => {
    setIsLoading("load");

    await api
      .get("/pages/" + pageId)
      .then((response) => {
        setGridElements({
          type: "SET_GRID",
          payload: {
            loadElements: JSON.parse(response.data.elements),
            loadHistory: [JSON.parse(response.data.elements)],
          },
        });
      })
      .finally(() => setIsLoading(""));
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

export default Editor;
