import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, beforeEach, expect } from "vitest";
import CartItems from "@pages/products/cart";
import useCart from "@customHooks/useCart";

vi.mock("@customHooks/useCart"); // Mock the custom hook

describe("CartItems Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders empty cart message when no items are present", () => {
    useCart.mockReturnValue({
      cartItems: [],
      navigateTo: vi.fn(),
      totalProductsSum: 0,
    });

    render(<CartItems />);
    expect(screen.getByTestId("cart-is-empty-section")).toBeInTheDocument();
    expect(screen.getByText("Your cart is Empty.")).toBeInTheDocument();
  });

  test("navigates to product page when button is clicked", () => {
    const mockNavigate = vi.fn();
    useCart.mockReturnValue({
      cartItems: [],
      navigateTo: mockNavigate,
      totalProductsSum: 0,
    });

    render(<CartItems />);
    const button = screen.getByTestId("navigate-to-product");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  test("renders cart items when present", () => {
    useCart.mockReturnValue({
      cartItems: [
        {
          id: 1,
          title: "Test Product",
          description: "Test Description",
          image: "test.jpg",
          rating: { rate: 4, count: 20 },
          price: 100,
          productCount: 1,
          isSelectedForCart: true,
        },
      ],
      allProductSelectedStatus: true,
      totalProductsSum: 100,
      onSelectingProductToCart: vi.fn(),
      onDeselectingAllProductsFromCart: vi.fn(),
      onSelectingAllProductsToCart: vi.fn(),
      onUpdatingCartItemQuantity: vi.fn(),
      onRemovingItemFromCart: vi.fn(),
      navigateTo: vi.fn(),
    });

    render(<CartItems />);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/Total Amount:/)).toHaveTextContent("100.00");
  });

  test("calls onSelectingAllProductsToCart when 'Select all' clicked", () => {
    const mockSelectAll = vi.fn();

    useCart.mockReturnValue({
      cartItems: [
        {
          id: 1,
          title: "Product A",
          isSelectedForCart: false,
          rating: { rate: 4, count: 20 },
          price: 100,
          totalProductsSum: 100,
          productCount: 1,
        },
      ],
      allProductSelectedStatus: false,
      totalProductsSum: 0,
      onSelectingAllProductsToCart: mockSelectAll,
    });

    render(<CartItems />);
    const selectAllLink = screen.getByTestId("select-all-products");
    fireEvent.click(selectAllLink);
    expect(mockSelectAll).toHaveBeenCalled();
  });

  test("calls onDeselectingAllProductsFromCart when 'Deselect all' clicked", () => {
    const mockDeselectAll = vi.fn();

    useCart.mockReturnValue({
      cartItems: [
        {
          id: 1,
          title: "Product A",
          isSelectedForCart: true,
          rating: { rate: 4, count: 20 },
          price: 100,
          totalProductsSum: 100,
          productCount: 1,
        },
      ],
      allProductSelectedStatus: true,
      totalProductsSum: 100,
      onDeselectingAllProductsFromCart: mockDeselectAll,
    });

    render(<CartItems />);
    const deselectAllLink = screen.getByTestId("deselect-all-products");
    fireEvent.click(deselectAllLink);
    expect(mockDeselectAll).toHaveBeenCalled();
  });

  test("disables 'Proceed to pay' when total is 0", () => {
    useCart.mockReturnValue({
      cartItems: [
        {
          id: 1,
          title: "Item",
          isSelectedForCart: false,
          rating: { rate: 4, count: 20 },
          price: 100,
          totalProductsSum: 100,
          productCount: 1,
        },
      ],
      totalProductsSum: 0,
    });

    render(<CartItems />);
    const button = screen.getByTestId("proceed-to-pay");
    expect(button).toBeDisabled();
  });

  test("enables 'Proceed to pay' when total > 0", () => {
    useCart.mockReturnValue({
      cartItems: [
        {
          id: 1,
          title: "Item",
          isSelectedForCart: true,
          rating: { rate: 4, count: 20 },
          price: 100,
          totalProductsSum: 100,
          productCount: 1,
        },
      ],
      totalProductsSum: 500,
    });

    render(<CartItems />);
    const button = screen.getByTestId("proceed-to-pay");
    expect(button).not.toBeDisabled();
  });
});
