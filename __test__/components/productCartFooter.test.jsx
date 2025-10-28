import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ProductCartFooter from "@components/productCartFooter";
import { ADD_ITEM_TO_CART, REDUCE_ITEM_COUNT_TO_CART } from "@utils/constants";

vi.mock("./ratings", () => ({
  __esModule: true,
  default: ({ rating, customerCount }) => (
    <div data-testid="product-rating">
      {" "}
      <b>{rating}</b>
    </div>
  ),
}));

describe("ProductCartFooter Component", () => {
  const defaultProps = {
    id: 1,
    rating: 4.5,
    customerCount: 120,
    productCount: 2,
    price: 100,
    onRemovingItemFromCart: vi.fn(),
    onUpdatingCartItemQuantity: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with given props", () => {
    render(<ProductCartFooter {...defaultProps} />);

    expect(screen.getByTestId("product-to-buy")).toBeInTheDocument();
    expect(screen.getByTestId("product-rating")).toHaveTextContent("4.5");

    // Total price = productCount * price
    expect(screen.getByTestId("product-1-total-price")).toHaveTextContent(
      "200.00"
    );
    expect(screen.getByTestId("product-price-1")).toHaveTextContent("100.00");
  });

  it("calls onUpdatingCartItemQuantity with ADD_ITEM_TO_CART when + is clicked", () => {
    render(<ProductCartFooter {...defaultProps} />);

    const addButton = screen.getByTestId("product-1-count-increase");
    fireEvent.click(addButton);

    expect(defaultProps.onUpdatingCartItemQuantity).toHaveBeenCalledWith(
      1,
      ADD_ITEM_TO_CART
    );
  });

  it("calls onUpdatingCartItemQuantity with REDUCE_ITEM_COUNT_TO_CART when - is clicked", () => {
    render(<ProductCartFooter {...defaultProps} />);

    const minusButton = screen.getByTestId("product-1-count-decrease");
    fireEvent.click(minusButton);

    expect(defaultProps.onUpdatingCartItemQuantity).toHaveBeenCalledWith(
      1,
      REDUCE_ITEM_COUNT_TO_CART
    );
  });

  it("renders trash icon instead of minus when productCount == 1", () => {
    render(<ProductCartFooter {...defaultProps} productCount={1} />);

    // Trash icon should exist
    const trashIcon = screen.getByTestId("product-to-remove-1");
    expect(trashIcon).toBeInTheDocument();

    // Minus icon should not exist
    const minusIcon = screen.queryByTestId("product-1-count-decrease");
    expect(minusIcon).toBeNull();
  });

  it("calls onRemovingItemFromCart when trash icon is clicked", () => {
    render(<ProductCartFooter {...defaultProps} productCount={1} />);

    const trashIcon = screen.getByTestId("product-to-remove-1");
    fireEvent.click(trashIcon);

    expect(defaultProps.onRemovingItemFromCart).toHaveBeenCalledWith(1);
  });

  it("displays correct total and per-item price", () => {
    render(<ProductCartFooter {...defaultProps} />);

    const total = screen.getByTestId("product-1-total-price");
    const each = screen.getByTestId("product-price-1");

    expect(total.textContent).toContain("200.00");
    expect(each.textContent).toContain("100.00");
  });
});
