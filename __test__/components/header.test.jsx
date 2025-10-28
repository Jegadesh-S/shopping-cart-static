import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { vi } from "vitest";
import Header from "@components/header";

// Mock store setup
const mockStore = (cartItems = []) => ({
  getState: () => ({
    cart: { cartItems },
  }),
  subscribe: vi.fn(),
  dispatch: vi.fn(),
});

vi.mock("@customHooks/useGlobalSearch", () => ({
  default: vi.fn(),
}));

vi.mock("./globalSearch", () => ({
  __esModule: true,
  default: () => (
    <div
      data-testid="global-search-ddl"
      itemProp={{ "data-testid": "global-search-ddl" }}
    >
      Global Search Box
    </div>
  ),
}));

import useGlobalSearch from "@customHooks/useGlobalSearch";

describe("Header Component", () => {
  const mockUseGlobalSearch = useGlobalSearch;
  it("renders logo and navigation links", () => {
    const store = mockStore([]);
    mockUseGlobalSearch.mockReturnValue({
      allCategories: ["all", "electronics", "fashion"],
      onChangingCategories: vi.fn(),
      globalSearchCategory: "all",
      onSearchingProduct: vi.fn(),
      onChangingSearchItems: vi.fn(),
      onSelectingProducts: vi.fn(),
      handleSubmit: vi.fn(),
      filteredProducts: [],
      searchBoxRef: { current: null },
      selectedProductItem: [],
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header className="header-row" />
        </MemoryRouter>
      </Provider>
    );

    // Check if logo is rendered
    const logo = screen.getByAltText("Equal Expert shopping cart");
    expect(logo).toBeInTheDocument();

    // Check NavLinks
    // expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  it("shows correct cart count from Redux store", () => {
    const store = mockStore([{ id: 1 }, { id: 2 }]);
    mockUseGlobalSearch.mockReturnValue({
      allCategories: ["all", "electronics", "fashion"],
      onChangingCategories: vi.fn(),
      globalSearchCategory: "all",
      onSearchingProduct: vi.fn(),
      onChangingSearchItems: vi.fn(),
      onSelectingProducts: vi.fn(),
      handleSubmit: vi.fn(),
      filteredProducts: [],
      searchBoxRef: { current: null },
      selectedProductItem: [],
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    // Check cart count display
    expect(screen.getByText("(2)")).toBeInTheDocument();
  });

  it("renders the GlobalSearchBox component", () => {
    const store = mockStore([]);
    mockUseGlobalSearch.mockReturnValue({
      allCategories: ["all", "electronics", "fashion"],
      onChangingCategories: vi.fn(),
      globalSearchCategory: "all",
      onSearchingProduct: vi.fn(),
      onChangingSearchItems: vi.fn(),
      onSelectingProducts: vi.fn(),
      handleSubmit: vi.fn(),
      filteredProducts: [],
      searchBoxRef: { current: null },
      selectedProductItem: [],
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("product-quick-search")).toBeInTheDocument();
  });

  it("applies the className passed as prop", () => {
    const store = mockStore([]);
    mockUseGlobalSearch.mockReturnValue({
      allCategories: ["all", "electronics", "fashion"],
      onChangingCategories: vi.fn(),
      globalSearchCategory: "all",
      onSearchingProduct: vi.fn(),
      onChangingSearchItems: vi.fn(),
      onSelectingProducts: vi.fn(),
      handleSubmit: vi.fn(),
      filteredProducts: [],
      searchBoxRef: { current: null },
      selectedProductItem: [],
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header className="test-class" />
        </MemoryRouter>
      </Provider>
    );

    const row = screen.getByTestId("header");
    expect(row).toHaveClass("test-class");
  });
});
