import { lazy, Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./components/HomePage";
import Orders from './components/orders/Orders';
import { Provider } from "react-redux";
import ErrorBoundary from './components/ErrorBoundary';
import store from './store';

const Products = lazy(() => import('./components/products/Products'));
const Cart = lazy(() => import('./components/Cart'));
import ErrorComponent from './components/ErrorComponent';

function ErrorFallback() {
  return <h1>Oops! Something went wrong. Please try again later.</h1>;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
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
        <Route path="orders" element={<Orders />} />
      </Route>
    )
  );

  return (
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
