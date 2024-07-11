import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./components/HomePage";

import Products from "./components/products/Products";
import Orders from './components/orders/Orders'
import { Provider } from "react-redux";

import store from './store';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    )
  );

  return( <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>);
}

export default App;
