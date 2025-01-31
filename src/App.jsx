import { lazy, Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./components/HomePage";
import Orders from './components/orders/Orders';
import { Provider } from "react-redux";
import ErrorBoundary from './components/ErrorBoundary';
import store from './store';
import ProductForm from './components/ProductForm'
const Products = lazy(() => import('./components/products/Products'));
const Cart = lazy(() => import('./components/Cart'));
import ErrorComponent from './components/ErrorComponent';
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './components/Login';
import Registration from './components/Registration';
import ResetPassword from './components/ResetPassword'
function ErrorFallback() {
  return <h1>Oops! Something went wrong. Please try again later.</h1>;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Registration />} />
         <Route path="/reset-password" element={<ResetPassword />} />
        <Route index element={
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<div>Loading Products...</div>}>
              <div className="products-cart-wrapper">
                <Products />
                <Cart />
              </div>
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="error" element={
          <ErrorBoundary fallback={<ErrorFallback />}>
            <ErrorComponent />
          </ErrorBoundary>
        } />
        <Route path="products" element={
         
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<div>Loading Products...</div>}>
              <div className="products-cart-wrapper">
                <Products />
                
                <Cart />
                
              </div>
            </Suspense>
          </ErrorBoundary>
         
        } />

<Route path="cart" element={
         
         <ErrorBoundary fallback={<ErrorFallback />}>
           <Suspense fallback={<div>Loading Products...</div>}>
             <div className="products-cart-wrapper">
              
               
               <Cart />
               
             </div>
           </Suspense>
         </ErrorBoundary>
        
       } />

        <Route path="/add-product" element={
          <ProtectedRoute>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<div>Adding Products...</div>}>
              <div className="products-cart-wrapper">
              <ProductForm />
              </div>
            </Suspense>
          </ErrorBoundary>
          </ProtectedRoute>
        } />
         
        {/* <Route path="/add-product" element={ <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>} /> */}
        {/* <Route path="orders" element={<Orders />} /> */}

        <Route path="orders" element={
          <ProtectedRoute>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<div>Order Processing...</div>}>
              <div className="products-cart-wrapper">
              <Orders />
              </div>
            </Suspense>
          </ErrorBoundary>
          </ProtectedRoute>
        } />
      </Route>
    )
  );

  return (
    <Provider store={store}>
        <ToastContainer />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
