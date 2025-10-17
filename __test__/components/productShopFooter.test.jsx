import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ProductShopFooter from "@components/productShopFooter";

// ✅ Mock the Ratings component to isolate the test
vi.mock("./ratings", () => ({
  __esModule: true,
  default: ({ rating, customerCount }) => (
    <>
      <div data-testid="product-rating">{rating}</div>
      <small data-testid="product-customers-count">
        {customerCount} global ratings
      </small>
    </>
  ),
}));

describe("ProductShopFooter Component", () => {
  const defaultProps = {
    id: 1,
    rating: 4.3,
    customerCount: 128,
    addToCart: vi.fn(),
    price: 499.99,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with given props", () => {
    render(<ProductShopFooter {...defaultProps} />);

    // container
    expect(screen.getByTestId("product-to-cart")).toBeInTheDocument();

    // mock rating section
    expect(screen.getByTestId("product-rating")).toHaveTextContent("4.3");
    expect(screen.getByTestId("product-customers-count")).toHaveTextContent(
      "128"
    );

    // price
    expect(screen.getByText(/₹/i)).toHaveTextContent("499.99");

    // add-to-cart button
    expect(screen.getByTestId("btn-product-to-cart-1")).toBeInTheDocument();
    expect(screen.getByText("Add To Cart")).toBeInTheDocument();
  });

  it("calls addToCart when button is clicked", () => {
    render(<ProductShopFooter {...defaultProps} />);

    const button = screen.getByTestId("btn-product-to-cart-1");
    fireEvent.click(button);

    expect(defaultProps.addToCart).toHaveBeenCalledTimes(1);
  });

  it("renders correct price with two decimals", () => {
    render(<ProductShopFooter {...defaultProps} />);

    const priceText = screen.getByText(/₹/i);
    expect(priceText).toHaveTextContent("499.99");
  });

  it("renders Ratings component with correct props", () => {
    render(<ProductShopFooter {...defaultProps} />);

    const ratingEl = screen.getByTestId("product-rating");
    expect(ratingEl).toHaveTextContent("4.3");
    const customersEl = screen.getByTestId("product-customers-count");
    expect(customersEl).toHaveTextContent("128 global ratings");

    // expect(ratingEl).toHaveTextContent("Customers: 128");
  });
});
