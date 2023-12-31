import { getParentElement } from "./pageEditor/pageEditorFunctions";

export function elementsReducer(state, action) {
  const {
    newElement,
    elementId,
    elementType,
    elementIndex,
    loadHistory,
    loadElements,
    asElement,
  } = action.payload;
  const { elements, history, historyPointer } = state;
  const { parentElement } = getParentElement(state.elements, elementId);
  let newElements, newHistoryPointer;

  switch (action.type) {
    case "SET_GRID":
      return {
        elements: loadElements,
        history: loadHistory,
        historyPointer: loadHistory.length,
      };

    case "ADD_ELEMENT":
      switch (elementType) {
        case "grid":
        case "box":
          if (asElement && parentElement) {
            newElements = handleInsertElement(
              elements,
              parentElement.id,
              elementIndex,
              newElement
            );
          } else {
            newElements = handleInsertElement(
              elements,
              elementId,
              elementIndex,
              newElement
            );
          }
          break;

        default:
          newElements = handleInsertElement(
            elements,
            elementId,
            elementIndex,
            newElement
          );
          break;
      }
      return {
        historyPointer: history.length,
        history: handleStoreHistory(history, newElements),
        elements: newElements,
      };

    case "DELETE_ELEMENT":
      newElements = handleRemoveElement(
        elements,
        parentElement ? parentElement.id : elementId,
        elementId
      );
      return {
        historyPointer: history.length,
        history: handleStoreHistory(history, newElements),
        elements: newElements.filter(Boolean),
      };

    case "UPDATE_ELEMENT":
      newElements = handleUpdateElement(elements, elementId, newElement);
      return {
        historyPointer: history.length,
        history: handleStoreHistory(history, newElements),
        elements: newElements,
      };

    case "REORDER_ELEMENTS":
      const reorderElement = (elements) => {
        return elements.map((element) => {
          if (element.id === elementId) {
            return {
              ...element,
              elements: handleReorderDragDrop(
                element.elements,
                action.payload.sourceIndex,
                action.payload.destinationIndex
              ),
            };
          } else if (element.elements) {
            return {
              ...element,
              elements: reorderElement(element.elements),
            };
          } else {
            return element;
          }
        });
      };

      newElements = [...reorderElement(elements)];

      return {
        historyPointer: history.length,
        history: handleStoreHistory(history, newElements),
        elements: newElements,
      };

    case "UNDO":
      newHistoryPointer = historyPointer - 1;
      const newHistoryUndo = history[newHistoryPointer];

      return {
        historyPointer: newHistoryPointer,
        history: history,
        elements: newHistoryUndo,
      };

    case "REDO":
      newHistoryPointer = historyPointer + 1;
      let newHistoryRedo = history[newHistoryPointer];

      return {
        history: history,
        historyPointer: newHistoryPointer,
        elements: newHistoryRedo,
      };

    default:
      return state;
  }
}

const handleInsertElement = (state, id, index, newElement) => {
  const replaceElement = (elements) => {
    return elements.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          elements:
            index !== null && index !== undefined
              ? [
                  ...element.elements.slice(0, index),
                  newElement,
                  ...element.elements.slice(index),
                ]
              : [...element.elements, newElement],
        };
      } else if (element.elements) {
        return {
          ...element,
          elements: replaceElement(element.elements),
        };
      } else {
        return element;
      }
    });
  };
  return [...replaceElement(state)];
};

const handleRemoveElement = (state, parentId, id) => {
  const replaceElement = (elements) => {
    return elements.map((element) => {
      if (element.id === parentId) {
        if (parentId === id) {
          return null;
        } else {
          return {
            ...element,
            elements: element.elements.filter((element) => element.id !== id),
          };
        }
      } else if (element.elements) {
        return {
          ...element,
          elements: replaceElement(element.elements),
        };
      } else {
        return element;
      }
    });
  };
  return [...replaceElement(state)];
};

const handleUpdateElement = (state, id, updatedElement) => {
  const replaceElement = (elements) => {
    return elements.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          ...updatedElement,
        };
      } else if (element.elements) {
        return {
          ...element,
          elements: replaceElement(element.elements),
        };
      } else {
        return element;
      }
    });
  };

  return [...replaceElement(state)];
};

const handleStoreHistory = (history, elements) => {
  const newHistory = [...history, elements];
  return newHistory;
};

const handleReorderDragDrop = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
