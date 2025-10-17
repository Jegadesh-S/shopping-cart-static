import { Await } from "react-router-dom";
import useProducts from "@customHooks/useProducts";
import { Suspense } from "react";
import ProductTileCard from "@components/productTile";
import ProductShopFooter from "@components/productShopFooter";
import { ShimmerProductList } from "@shimmers/ShimmerProductList";

function ProductList() {
  const { productsPromise, products, addToCart } = useProducts();

  return (
    <>
      <h5>Product List</h5>
      <Suspense fallback={<ShimmerProductList />}>
        <Await resolve={productsPromise}>
          <div className="product-list-container">
            {!products.length && <center>No Products available...</center>}
            {products.map((product, key) => (
              <ProductTileCard
                id={key}
                productImage={product.image}
                description={product.description}
                title={product.title}
                price={product.price}
                rating={product.rating.rate}
                customerCount={product.rating.count}
              >
                <ProductShopFooter
                  id={product.id}
                  rating={product.rating.rate}
                  customerCount={product.rating.count}
                  addToCart={() => addToCart(product.id)}
                  price={product.price}
                ></ProductShopFooter>
              </ProductTileCard>
            ))}
          </div>
        </Await>
      </Suspense>
    </>
  );
}

export default ProductList;
