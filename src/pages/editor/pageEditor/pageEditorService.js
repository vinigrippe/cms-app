export function reducer(state, action) {
  switch (action.type) {
    case "SET_GRID":
      return action.payload;

    case "ADD_GRID":
      return [
        ...state.slice(0, action.payload.gridIndex),
        action.payload.newGrid,
        ...state.slice(action.payload.gridIndex),
      ];

    case "ADD_BOX":
      return state.map((grid, index) => {
        if (index === action.payload.gridIndex) {
          return {
            ...grid,
            elements: [
              ...grid.elements.slice(0, action.payload.boxIndex),
              action.payload.newBox,
              ...grid.elements.slice(action.payload.boxIndex),
            ],
          };
        } else {
          return grid;
        }
      });

    case "ADD_ELEMENT":
      const newElement = action.payload.newElement;
      const elementId = action.payload.elementId;

      const replaceElement = (elements) => {
        return elements.map((element) => {
          if (element.id === elementId) {
            return {
              ...element,
              elements: [...element.elements, newElement],
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

      return state.map((element) => {
        return {
          ...element,
          elements: replaceElement(element.elements),
        };
      });

    case "CHANGE_ELEMENT":
      return state.map((grid, index) => {
        if (index === action.payload.gridIndex) {
          return {
            ...grid,
            elements: grid.elements.map((box, boxIndex) => {
              if (boxIndex === action.payload.boxIndex) {
                return {
                  ...box,
                  elements: box.elements.map((element, elementIndex) => {
                    if (elementIndex === action.payload.elementIndex) {
                      return {
                        ...element,
                        ...action.payload.updatedElement,
                      };
                    } else {
                      return element;
                    }
                  }),
                };
              } else {
                return box;
              }
            }),
          };
        } else {
          return grid;
        }
      });

    case "UPDATE_ELEMENT":
      const updateElement = (elements) => {
        return elements.map((element) => {
          if (element.id === action.payload.elementId) {
            return {
              ...element,
              [action.payload.change.field]: action.payload.change.value,
            };
          } else if (element.elements) {
            return {
              ...element,
              elements: updateElement(element.elements),
            };
          } else if (element.elements) {
            return {
              ...element,
              elements: element.elements.map((box) => ({
                ...box,
                elements: updateElement(box.elements),
              })),
            };
          } else {
            return element;
          }
        });
      };

      return state.map((grid) => {
        return {
          ...grid,
          elements: grid.elements.map((box) => {
            return {
              ...box,
              elements: updateElement(box.elements),
            };
          }),
        };
      });

    case "DELETE_GRID":
      return state.filter((_, index) => index !== action.payload.gridIndex);

    case "DELETE_BOX":
      return state.map((grid, index) => {
        if (index === action.payload.gridIndex) {
          return {
            ...grid,
            elements: grid.elements.filter(
              (_, boxIndex) => boxIndex !== action.payload.boxIndex
            ),
          };
        } else {
          return grid;
        }
      });

    case "DELETE_ELEMENT":
      return state.map((grid, index) => {
        if (index === action.payload.gridIndex) {
          return {
            ...grid,
            elements: grid.elements.map((box, boxIndex) => {
              if (boxIndex === action.payload.boxIndex) {
                return {
                  ...box,
                  elements: box.elements.filter(
                    (_, elementIndex) =>
                      elementIndex !== action.payload.elementIndex
                  ),
                };
              } else {
                return box;
              }
            }),
          };
        } else {
          return grid;
        }
      });

    case "REORDER_ELEMENTS":
      return state.map((grid, gridIdx) => {
        if (gridIdx === action.payload.gridIndex) {
          return {
            ...grid,
            elements: grid.elements.map((box, boxIdx) => {
              if (boxIdx === action.payload.boxIndex) {
                return {
                  ...box,
                  elements: reorder(
                    box.elements,
                    action.payload.sourceIndex,
                    action.payload.destinationIndex
                  ),
                };
              } else {
                return box;
              }
            }),
          };
        } else {
          return grid;
        }
      });

    default:
      return state;
  }
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getElement = (elements, elementId) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.id === elementId) {
      return element;
    } else if (element.elements) {
      const foundElement = getElement(element.elements, elementId);
      if (foundElement) return foundElement;
    } else if (element.elements) {
      for (let j = 0; j < element.elements.length; j++) {
        const box = element.elements[j];
        const foundElement = getElement(box.elements, elementId);
        if (foundElement) return foundElement;
      }
    }
  }
};
