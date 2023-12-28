import "./style.checkbox.css";

export const Checkbox = ({ isDisabled, checked, onChange, id, children }) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        data-component="checkbox"
        id={id}
        onChange={onChange}
        checked={checked}
        disabled={isDisabled}
      />
      <label htmlFor={id} className="cursor-pointer">
        {children}
      </label>
    </div>
  );
};
