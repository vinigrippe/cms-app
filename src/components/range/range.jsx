import "./style.range.css";

export const Range = ({ isDisabled, value, onChange, id, min, max }) => {
  return (
    <div className="relative leading-none w-full">
      <input
        type="range"
        data-component="range"
        id={id}
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        disabled={isDisabled}
      />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[5px] rounded-full bg-slate-200 z-[-1]"></div>
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 h-[5px] bg-teal-300 rounded-full z-[-1]"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );
};
