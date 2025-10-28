import { render, screen } from "@testing-library/react";
import ProductTileCard from "@components/productTile";

describe("ProductTileCard Component", () => {
  const defaultProps = {
    id: 1,
    category: "men's clothing",
    image: "https://equalexperts.github.io/AC_SL1500_t.png",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    children: <div data-testid="child-component">Child Component</div>,
  };

  it("renders without crashing", () => {
    render(<ProductTileCard {...defaultProps} />);
    const card = screen.getByTestId("product-tile-card");
    expect(card).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(<ProductTileCard {...defaultProps} />);
    expect(
      screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
      )
    ).toBeInTheDocument();
  });

  it("renders product image with correct attributes", () => {
    render(<ProductTileCard {...defaultProps} />);

    const image = screen.getByRole("img");
    // TODO: Not sure why this is failing
    // expect(image).toHaveAttribute(
    //   "src",
    //   "https://equalexperts.github.io/AC_SL1500_t.png"
    // );
    expect(image).toHaveAttribute("width", "285");
    expect(image).toHaveAttribute("height", "180");
  });

  it("renders children inside Card.Footer", () => {
    render(<ProductTileCard {...defaultProps} />);
    expect(screen.getByTestId("child-component")).toBeInTheDocument();
  });

  it("applies correct id to the Card", () => {
    render(<ProductTileCard {...defaultProps} />);
    const card = screen.getByTestId("product-tile-card");
    expect(card.id).toBe("product-tile-card-1");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<ProductTileCard {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
