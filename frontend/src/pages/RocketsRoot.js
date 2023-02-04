import { Outlet } from 'react-router-dom';

import RocketsNavigation from '../components/RocketsNavigation';

function RocketsRootLayout() {
  return (
    <>
      <RocketsNavigation />
      <Outlet />
    </>
  );
}

export default RocketsRootLayout;
