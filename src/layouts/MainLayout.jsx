import { NavLink, Outlet } from 'react-router-dom';
import Header from '../components/Header';

function MainLayout() {
  return (
    <>
       <nav>
       <Header />
        
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
