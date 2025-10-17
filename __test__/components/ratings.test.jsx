import { render, screen } from "@testing-library/react";
import Ratings from "@components/ratings";
import useRatings from "@customHooks/useRatings";

// Mock the custom hook
vi.mock("@customHooks/useRatings");

describe("Ratings Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders rating value correctly", () => {
    useRatings.mockReturnValue({
      computeWidthInPercentage: vi.fn(() => "60%"),
    });

    render(<Ratings rating={3} customerCount={120} />);

    const ratingText = screen.getByTestId("product-rating");
    expect(ratingText).toHaveTextContent("3");
  });

  test("renders correct number of stars", () => {
    useRatings.mockReturnValue({
      computeWidthInPercentage: vi.fn(() => "80%"),
    });

    render(<Ratings rating={4} customerCount={250} />);

    const starsContainer = screen.getByTestId("prodcut-rating-stars");
    const stars = starsContainer.querySelectorAll("img");
    expect(stars).toHaveLength(5);
  });

  test("applies computed width style to stars container", () => {
    const mockComputeWidth = vi.fn(() => "75%");
    useRatings.mockReturnValue({
      computeWidthInPercentage: mockComputeWidth,
    });

    render(<Ratings rating={4.5} customerCount={300} />);

    expect(mockComputeWidth).toHaveBeenCalledWith(4.5);
    const coloredStarsDiv = screen.getByTestId(
      "prodcut-rating-stars"
    ).firstChild;
    expect(coloredStarsDiv).toHaveStyle({ width: "75%" });
  });

  test("displays customer count correctly", () => {
    useRatings.mockReturnValue({
      computeWidthInPercentage: vi.fn(() => "90%"),
    });

    render(<Ratings rating={5} customerCount={450} />);

    const customerCountText = screen.getByTestId("product-customers-count");
    expect(customerCountText).toHaveTextContent("450 global ratings");
  });
});
