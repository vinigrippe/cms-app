export const LogoSymbolBuilder = ({ size, color }) => {
  return (
    <svg
      width={size}
      height="auto"
      viewBox="0 0 460 342"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="230"
        cy="171"
        r="166"
        stroke={color ?? "black"}
        stroke-width="10"
      />
      <path
        d="M5 171H455"
        stroke={color ?? "black"}
        stroke-width="10"
        stroke-linecap="square"
      />
    </svg>
  );
};
