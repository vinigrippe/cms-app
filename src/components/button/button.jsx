import { LoadingIcon } from "../../icons/loading";
import "./style.button.css";

export const Button = ({
  isActive,
  isDisabled,
  isLoading,
  type,
  color,
  size,
  icon,
  iconRight,
  children,
  ...props
}) => {
  let loadingColor = "#475569";

  if (type === "primary") {
    loadingColor = "#FFFFFF";
  }

  return (
    <button
      data-component="button"
      data-type={type || "primary"}
      aria-disabled={isDisabled}
      data-color={color}
      data-active={isActive}
      data-size={size}
      {...props}
    >
      {isLoading ? (
        <LoadingIcon size="13" color={loadingColor} />
      ) : (
        icon && <span className={`mgc_${icon}_${isActive ? "fill" : "line"}`} />
      )}
      {children && <span className="w-full">{children}</span>}
      {iconRight && <span className={`mgc_${iconRight}_line`} />}
    </button>
  );
};
