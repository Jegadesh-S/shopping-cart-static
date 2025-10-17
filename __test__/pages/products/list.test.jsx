import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, vi, expect } from "vitest";
import ProductList from "../../../src/pages/products/list";

// Mock custom hook
vi.mock("@customHooks/useProducts", () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Mock shimmer and product components
vi.mock("@components/productTile", () => ({
  __esModule: true,
  default: ({ id, title, children }) => (
    <div data-testid={`product-tile-card`}>
      <span>{title}</span>
      {children}
    </div>
  ),
}));

vi.mock("@components/productShopFooter", () => ({
  __esModule: true,
  default: ({ id, addToCart }) => (
    <button data-testid={`btn-product-to-cart-${id}`} onClick={addToCart}>
      Add to Cart
    </button>
  ),
}));

vi.mock("@shimmers/ShimmerProductList", () => ({
  __esModule: true,
  ShimmerProductList: () => <div data-testid="shimmer">Loading...</div>,
}));

// import mock after mocking modules
import useProducts from "@customHooks/useProducts";

describe("ProductList Component", () => {
  test("renders loading shimmer while waiting", async () => {
    const mockPromise = new Promise(() => {}); // unresolved promise (loading)
    useProducts.mockReturnValue({
      productsPromise: mockPromise,
      products: [],
      addToCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(screen.getByTestId("shimmer")).toBeInTheDocument();
  });

  test("renders 'No Products available...' when empty", async () => {
    const mockPromise = Promise.resolve([]);
    useProducts.mockReturnValue({
      productsPromise: mockPromise,
      products: [],
      addToCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/No Products available/i)).toBeInTheDocument()
    );
  });

  test("renders product list when products are available", async () => {
    const mockProducts = [
      {
        id: 1,
        image: "img1.jpg",
        description: "Sample 1",
        title: "Product 1",
        price: 100,
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        image: "img2.jpg",
        description: "Sample 2",
        title: "Product 2",
        price: 200,
        rating: { rate: 4.0, count: 5 },
      },
    ];

    const addToCartMock = vi.fn();
    const mockPromise = Promise.resolve(mockProducts);

    useProducts.mockReturnValue({
      productsPromise: mockPromise,
      products: mockProducts,
      addToCart: addToCartMock,
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        const tiles = screen.getAllByTestId("product-tile-card");
        expect(tiles).toHaveLength(2);
      },
      { timeout: 3000 }
    );

    // Check footer buttons
    const button = screen.getByTestId("btn-product-to-cart-1");
    button.click();
    expect(addToCartMock).toHaveBeenCalledWith(1);
  });
});
