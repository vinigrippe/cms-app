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
            boxes: [
              ...grid.boxes.slice(0, action.payload.boxIndex),
              action.payload.newBox,
              ...grid.boxes.slice(action.payload.boxIndex),
            ],
          };
        } else {
          return grid;
        }
      });

    case "ADD_ELEMENT":
      const replaceElement = (elements, newElement) => {
        return elements.map((element) => {
          if (element.id === action.payload.elementId) {
            return newElement;
          } else if (element.elements) {
            return {
              ...element,
              elements: replaceElement(element.elements, newElement),
            };
          } else if (element.boxes) {
            return {
              ...element,
              boxes: element.boxes.map((box) => ({
                ...box,
                elements: replaceElement(box.elements, newElement),
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
          boxes: grid.boxes.map((box) => {
            return {
              ...box,
              elements: replaceElement(box.elements, action.payload.newElement),
            };
          }),
        };
      });
    case "CHANGE_ELEMENT":
      return state.map((grid, index) => {
        if (index === action.payload.gridIndex) {
          return {
            ...grid,
            boxes: grid.boxes.map((box, boxIndex) => {
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
          } else if (element.boxes) {
            return {
              ...element,
              boxes: element.boxes.map((box) => ({
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
          boxes: grid.boxes.map((box) => {
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
            boxes: grid.boxes.filter(
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
            boxes: grid.boxes.map((box, boxIndex) => {
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
            boxes: grid.boxes.map((box, boxIdx) => {
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

export const getElementIndex = (elements, elementId) => {
  let elementIndex;

  elements.forEach((item) => {
    item.boxes.forEach((box) => {
      box.elements.forEach((element, index) => {
        if (element.id === elementId) {
          elementIndex = index;
        }
      });
    });
  });

  return elementIndex;
};

export const getBoxIndex = (elements, elementId) => {
  let boxIndex;

  elements.forEach((item) => {
    item.boxes.forEach((box, index) => {
      box.elements.forEach((element) => {
        if (element.id === elementId) {
          boxIndex = index;
        }
      });
    });
  });

  return boxIndex;
};

export const getGridIndex = (elements, elementId) => {
  let gridIndex;

  elements.forEach((item, index) => {
    if (
      item.boxes.some((box) =>
        box.elements.some((element) => element.id === elementId)
      )
    ) {
      gridIndex = index;
    }
  });

  return gridIndex;
};

export const getIndexes = (elements, elementId) => {
  const gridIndex = getGridIndex(elements, elementId);
  const boxIndex = getBoxIndex(elements, elementId);
  const elementIndex = getElementIndex(elements, elementId);
  const element = elements[gridIndex].boxes[boxIndex].elements[elementIndex];

  return { gridIndex, boxIndex, elementIndex, element };
};

export const getElement = (elements, elementId) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.id === elementId) {
      return element;
    } else if (element.elements) {
      const foundElement = getElement(element.elements, elementId);
      if (foundElement) return foundElement;
    } else if (element.boxes) {
      for (let j = 0; j < element.boxes.length; j++) {
        const box = element.boxes[j];
        const foundElement = getElement(box.elements, elementId);
        if (foundElement) return foundElement;
      }
    }
  }
};
