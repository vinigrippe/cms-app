import { LogoBuilder } from "@/icons/logo/logo";

export const Layout = ({ borderBottom, children }) => {
  return (
    <div className="flex items-center flex-col w-full min-h-[100vh]">
      <div
        className={`bg-white w-full flex items-center justify-center ${
          borderBottom ? "border-b" : ""
        }`}
      >
        <div className="py-5 px-3 w-full max-w-[1000px]">
          <LogoBuilder size="150" />
        </div>
      </div>
      {children}
    </div>
  );
};

const LayoutHeader = ({ children }) => {
  return (
    <div className="bg-white w-full flex items-center justify-center border-b">
      <div className="px-3 w-full max-w-[1000px]">{children}</div>
    </div>
  );
};

const LayoutContent = ({ children }) => {
  return <div className="w-full max-w-[1000px] px-3">{children}</div>;
};

Layout.Header = LayoutHeader;
Layout.Content = LayoutContent;
