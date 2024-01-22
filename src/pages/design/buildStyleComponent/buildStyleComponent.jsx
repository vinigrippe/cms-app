import styled from "styled-components";

export const BuildStyleComponent = ({ style, element, children }) => {
  const StyleComponent = styled[element]`
    ${style.styleInline};

    &:hover {
      ${style.styleHover};
    }
  `;

  console.log(style);

  return <StyleComponent>{children}</StyleComponent>;
};
