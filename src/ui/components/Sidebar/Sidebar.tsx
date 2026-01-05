import { Link } from "react-router";

import { LuLogOut } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";

import Logo from "../../../assets/pictures/logo.png";
import "./Sidebar.css";
import { useLogout } from "../../../utils/helpers.ts";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
  const logout = useLogout();

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="sidebar-navigation">
          <Link to="/" className="sidebar-navigation-item">
            <MdOutlineSpaceDashboard />
            <p>Dashboard</p>
          </Link>
        </div>
      </div>
      <div className="sidebar-logout" onClick={logout}>
        <LuLogOut />
        <p>Logout</p>
      </div>
      <div className="hamburger-menu">
        <Menu
          menuButton={
            <MenuButton className="menu-button">
              <GiHamburgerMenu size={35} className="hamburger-menu__icon" />
            </MenuButton>
          }
        >
          <MenuItem>
            <Link to="/" className="sidebar-navigation-item">
              <MdOutlineSpaceDashboard />
              <p>Dashboard</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={logout}>
            <div className="logout">
              <LuLogOut />
              <p>Logout</p>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
