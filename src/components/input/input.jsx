import "./style.input.css";

export const Input = ({ isDisabled, type = "text", ...props }) => {
  return (
    <input
      type={type}
      data-component="input"
      aria-disabled={isDisabled}
      {...props}
    />
  );
};
