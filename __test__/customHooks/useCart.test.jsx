import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCart from "@customHooks/useCart";
import {
  updateItemToCart,
  removeItemFromCart,
  updateAllProductsSelectedStatusFromCart,
  updateSelectedProductStatusToCart,
} from "@app/cartSlice";

// 🧩 Mock dependencies
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("@app/cartSlice", () => ({
  updateItemToCart: vi.fn(),
  removeItemFromCart: vi.fn(),
  updateAllProductsSelectedStatusFromCart: vi.fn(),
  updateSelectedProductStatusToCart: vi.fn(),
}));

describe("useCart custom hook", () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  const mockCartItems = [
    { id: 1, price: 100, productCount: 2, isSelectedForCart: true },
    { id: 2, price: 50, productCount: 1, isSelectedForCart: false },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({
        cart: { cartItems: mockCartItems, allProductSelectedStatus: true },
      })
    );
  });

  test("returns cart items and allProductSelectedStatus", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cartItems).toEqual(mockCartItems);
    expect(result.current.allProductSelectedStatus).toBe(true);
  });

  test("computes totalProductsSum correctly", () => {
    const { result } = renderHook(() => useCart());
    // Only selected product (id:1) contributes to total = 100 * 2 = 200
    expect(result.current.totalProductsSum).toBe(200);
  });

  test("navigateTo calls navigate with /products", () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.navigateTo());
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  test("onUpdatingCartItemQuantity dispatches updateItemToCart action", () => {
    const { result } = renderHook(() => useCart());
    const mockAction = { type: "updateItemToCart" };
    updateItemToCart.mockReturnValue(mockAction);

    act(() => result.current.onUpdatingCartItemQuantity(1, "increment"));

    expect(updateItemToCart).toHaveBeenCalledWith({
      thisItem: mockCartItems[0],
      operation: "increment",
    });
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  });

  test("onRemovingItemFromCart dispatches removeItemFromCart", () => {
    const { result } = renderHook(() => useCart());
    const mockAction = { type: "removeItemFromCart" };
    removeItemFromCart.mockReturnValue(mockAction);

    act(() => result.current.onRemovingItemFromCart(2));

    expect(removeItemFromCart).toHaveBeenCalledWith(2);
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  });

  test("onDeselectingAllProductsFromCart dispatches updateAllProductsSelectedStatusFromCart(false)", () => {
    const { result } = renderHook(() => useCart());
    const mockAction = { type: "updateAllProductsSelectedStatusFromCart" };
    updateAllProductsSelectedStatusFromCart.mockReturnValue(mockAction);

    act(() => result.current.onDeselectingAllProductsFromCart());

    expect(updateAllProductsSelectedStatusFromCart).toHaveBeenCalledWith(false);
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  });

  test("onSelectingAllProductsToCart dispatches updateAllProductsSelectedStatusFromCart(true)", () => {
    const { result } = renderHook(() => useCart());
    const mockAction = { type: "updateAllProductsSelectedStatusFromCart" };
    updateAllProductsSelectedStatusFromCart.mockReturnValue(mockAction);

    act(() => result.current.onSelectingAllProductsToCart());

    expect(updateAllProductsSelectedStatusFromCart).toHaveBeenCalledWith(true);
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  });

  test("onSelectingProductToCart dispatches updateSelectedProductStatusToCart with id and isChecked", () => {
    const { result } = renderHook(() => useCart());
    const mockAction = { type: "updateSelectedProductStatusToCart" };
    updateSelectedProductStatusToCart.mockReturnValue(mockAction);

    act(() => result.current.onSelectingProductToCart(true, 1));

    expect(updateSelectedProductStatusToCart).toHaveBeenCalledWith({
      id: 1,
      isChecked: true,
    });
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  });
});
