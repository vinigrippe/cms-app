import "./style.input.css";

export const Input = ({ isDisabled, label, type = "text", ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <p className="font-semibold text-xs text-slate-600">{label}</p>}
      <input
        type={type}
        data-component="input"
        aria-disabled={isDisabled}
        {...props}
      />
    </div>
  );
};
