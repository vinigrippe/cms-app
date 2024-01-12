import { useState } from "react";
import { logout } from "../../services/login";
import { useAuth } from "../../context/authContext";

import { LogoBuilder } from "@/icons/logo/logo";
import { Button } from "@/components/button/button";
import { DropDown } from "@/components/dropdown/dropdown";

export const Layout = ({ borderBottom = true, children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();

      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center flex-col w-full min-h-[100vh]">
      <div
        className={`bg-white w-full flex items-center justify-center ${
          borderBottom ? "border-b" : ""
        }`}
      >
        <div className="py-5 px-3 w-full max-w-[1000px] flex justify-between items-center">
          <LogoBuilder size="150" />
          <div className="flex gap-1">
            <Button type="flat">Docs</Button>
            <div className="relative mr-2">
              <Button icon="notification" type="bubble" />
              <span className="absolute top-2 right-2 p-1 bg-red-500 rounded-full"></span>
            </div>
            <DropDown.Trigger onClose={() => setShowUserMenu(false)}>
              <div onClick={() => setShowUserMenu(true)}>
                {user?.avatar ? (
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="object-cover rounded-full p-5 bg-slate-300 cursor-pointer"
                  />
                ) : (
                  <div className="cursor-pointer object-cover rounded-full p-2 w-[35.5px] text-center font-bold bg-slate-200 text-slate-500">
                    {user?.name[0]}
                  </div>
                )}
              </div>
              {showUserMenu && (
                <DropDown.Popup
                  position={{
                    x: "right-0 left-auto",
                    y: "top-[100%]",
                  }}
                >
                  <div className="px-[14px] pt-2 pb-3 text-slate-500 border-b mb-1">
                    {user.email}
                  </div>
                  <Button
                    icon="settings_4"
                    type="dropdown"
                    onClick={handleLogout}
                  >
                    Account
                  </Button>
                  <Button icon="exit" type="dropdown" onClick={handleLogout}>
                    Logout
                  </Button>
                </DropDown.Popup>
              )}
            </DropDown.Trigger>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const LayoutHeader = ({ children }) => {
  return (
    <div className="bg-white w-full flex items-center justify-center border-b">
      <div className="w-full max-w-[1000px]">{children}</div>
    </div>
  );
};

const LayoutContent = ({ children }) => {
  return <div className="w-full max-w-[1000px] px-3">{children}</div>;
};

Layout.Header = LayoutHeader;
Layout.Content = LayoutContent;
