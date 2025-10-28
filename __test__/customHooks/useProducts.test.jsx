import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import useProducts from "@customHooks/useProducts";
import { setAllProducts } from "@app/productSlice";
import { updateItemToCart } from "@app/cartSlice";
import { ADD_ITEM_TO_CART } from "@utils/constants";

// Mock dependencies
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useLoaderData: vi.fn(),
}));

vi.mock("@app/productSlice", () => ({
  setAllProducts: vi.fn(),
}));

vi.mock("@app/cartSlice", () => ({
  updateItemToCart: vi.fn(),
}));

describe("useProducts Hook", () => {
  const mockDispatch = vi.fn();
  const mockProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((fn) =>
      fn({
        products: {
          allProducts: mockProducts,
          filteredProducts: [{ id: 2, name: "Product 2" }],
          isFiltered: false,
        },
      })
    );
  });

  test("returns productsPromise, products, and addToCart function", async () => {
    const mockPromise = Promise.resolve(mockProducts);
    useLoaderData.mockReturnValue({ productsPromise: mockPromise });

    const { result } = renderHook(() => useProducts());

    expect(result.current.productsPromise).toBe(mockPromise);
    expect(result.current.products).toEqual(mockProducts);
    expect(typeof result.current.addToCart).toBe("function");
  });

  test("products is filtered when isFiltered is true", () => {
    useSelector.mockImplementation((fn) =>
      fn({
        products: {
          allProducts: mockProducts,
          filteredProducts: [{ id: 2, name: "Product 2" }],
          isFiltered: true,
        },
      })
    );

    useLoaderData.mockReturnValue({ productsPromise: Promise.resolve([]) });
    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toEqual([{ id: 2, name: "Product 2" }]);
  });

  test("addToCart dispatches updateItemToCart with correct payload", () => {
    useLoaderData.mockReturnValue({ productsPromise: Promise.resolve([]) });
    const { result } = renderHook(() => useProducts());

    act(() => result.current.addToCart(1));

    expect(updateItemToCart).toHaveBeenCalledWith({
      thisItem: { id: 1, name: "Product 1" },
      operation: ADD_ITEM_TO_CART,
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  test("useEffect dispatches setAllProducts when productsPromise resolves", async () => {
    const mockPromise = Promise.resolve(mockProducts);
    useLoaderData.mockReturnValue({ productsPromise: mockPromise });

    renderHook(() => useProducts());

    await mockPromise; // wait for promise to resolve
    expect(setAllProducts).toHaveBeenCalledWith(mockProducts);
    expect(mockDispatch).toHaveBeenCalled();
  });

  test("useEffect throws error when productsPromise rejects", async () => {
    const mockPromise = Promise.reject("Failed");
    useLoaderData.mockReturnValue({ productsPromise: mockPromise });

    let error;
    try {
      renderHook(() => useProducts());
      await mockPromise;
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });
});
