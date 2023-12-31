export const getElement = (elements, elementId) => {
  for (let i = 0; i < elements.length; i++) {
    const elementComponent = elements[i];
    if (elementComponent.id === elementId) {
      return { element: elementComponent, index: i };
    } else if (elementComponent.elements) {
      const { element, index } = getElement(
        elementComponent.elements,
        elementId
      );
      if (element)
        return {
          element,
          index,
        };
    }
  }
  return { element: null, index: null };
};

export const getParentElement = (elements, elementId) => {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id === elementId) {
      return { parentElement: null, parentIndex: null };
    } else if (elements[i].elements) {
      for (let j = 0; j < elements[i].elements.length; j++) {
        if (elements[i].elements[j].id === elementId) {
          return { parentElement: elements[i], parentIndex: i };
        }
      }
      const { parentElement, parentIndex } = getParentElement(
        elements[i].elements,
        elementId
      );
      if (parentElement) {
        return { parentElement, parentIndex };
      }
    }
  }
  return { parentElement: null, parentIndex: null };
};

export const getStyle = (designSystem, elementName, styleId) => {
  const styles = designSystem.find((i) => i.type === elementName);
  if (!styles) return { style: null };

  const styleInline = styles.styles.find((s) => s.style_id === styleId);
  if (!styleInline) return { style: null };

  return { style: styleInline.style };
};
