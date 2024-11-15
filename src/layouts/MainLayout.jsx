import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 mt-4 mb-4">
        <div className="text-xl text-left  border border-4 mb-4 for-bgcolor flex">
          <Outlet />
        </div>
      </main> 
      <Footer />
    </>
  );
}

export default MainLayout;
