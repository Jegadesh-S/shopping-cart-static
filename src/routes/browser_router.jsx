import { createBrowserRouter } from "react-router-dom";
import ProductList from "@pages/products/list";
import MainLayout from "@layouts/mainLayout";
import fetchAllProdcuts from "@pages/products/productsLoaders";
import CartItems from "@pages/products/cart";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,

    children: [
      {
        index: true,
        element: <ProductList />,
        loader: fetchAllProdcuts,
      },
      {
        path: "/products",
        element: <ProductList />,
        loader: fetchAllProdcuts,
      },
      {
        path: "/cart",
        element: <CartItems />,
      },
    ],
  },
]);

export default routes;
