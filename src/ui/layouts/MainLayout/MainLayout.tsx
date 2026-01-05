import { Outlet } from 'react-router';

import Sidebar from '../../components/Sidebar/Sidebar.tsx';

import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout-wrapper">
      <Sidebar />
      <div className="main-layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
