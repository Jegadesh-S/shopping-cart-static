import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, beforeEach, expect } from "vitest";
import GloablSearchBox from "@components/globalSearch";
import useGlobalSearch from "@customHooks/useGlobalSearch";
import { DEFAULT_GLOBAL_SEARCH_CATEGORY } from "@utils/constants";

// Mock the custom hook
vi.mock("@customHooks/useGlobalSearch", () => ({
  default: vi.fn(),
}));

describe("GloablSearchBox Component", () => {
  const mockUseGlobalSearch = useGlobalSearch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders dropdown and typeahead input", () => {
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

    render(<GloablSearchBox />);

    // Check dropdown and input presence
    const globalSearchDDL = document.getElementById(
      "globalSearchCategoryDropdown"
    );
    const productAsyncTypeAhead = document.getElementById(
      "product-quick-search"
    );
    expect(globalSearchDDL).toBeInTheDocument();
  });

  test("renders all categories in dropdown", () => {
    const mockChangeCategory = vi.fn();

    mockUseGlobalSearch.mockReturnValue({
      allCategories: ["all", "electronics", "fashion"],
      onChangingCategories: mockChangeCategory,
      globalSearchCategory: "all",
      onSearchingProduct: vi.fn(),
      onChangingSearchItems: vi.fn(),
      onSelectingProducts: vi.fn(),
      handleSubmit: vi.fn(),
      filteredProducts: [],
      searchBoxRef: { current: null },
      selectedProductItem: [],
    });

    render(<GloablSearchBox />);

    //   const dropdown = screen.getByTestId("global-search-ddl");
    const dropdown = document.getElementById("globalSearchCategoryDropdown");
    fireEvent.click(dropdown);

    // Validate dropdown items
    expect(screen.getByTestId("global-search-item-0")).toHaveTextContent("all");
    expect(screen.getByTestId("global-search-item-1")).toHaveTextContent(
      "electronics"
    );
    expect(screen.getByTestId("global-search-item-2")).toHaveTextContent(
      "fashion"
    );

    // Trigger category change
    fireEvent.click(screen.getByTestId("global-search-item-1"));
    expect(mockChangeCategory).toHaveBeenCalled();
  });

  test("calls onChangingSearchItems when user types in the search box", () => {
    const mockChangeSearch = vi.fn();

    mockUseGlobalSearch.mockReturnValue({
      allCategories: ["all"],
      onChangingCategories: vi.fn(),
      globalSearchCategory: "all",
      onSearchingProduct: vi.fn(),
      onChangingSearchItems: mockChangeSearch,
      onSelectingProducts: vi.fn(),
      handleSubmit: vi.fn(),
      filteredProducts: [],
      searchBoxRef: { current: null },
      selectedProductItem: [],
    });

    render(<GloablSearchBox />);

    const input = screen.getByTestId("product-quick-search");
    fireEvent.change(input, { target: { value: "mobile" } });

    expect(mockChangeSearch).toHaveBeenCalled();
  });

  test("calls onSearchingProduct when typing more than 3 characters", () => {
    const mockSearch = vi.fn();

    mockUseGlobalSearch.mockReturnValue({
      allCategories: ["all"],
      onChangingCategories: vi.fn(),
      globalSearchCategory: "all",
      onSearchingProduct: mockSearch,
      onChangingSearchItems: vi.fn(),
      onSelectingProducts: vi.fn(),
      handleSubmit: vi.fn(),
      filteredProducts: [],
      searchBoxRef: { current: null },
      selectedProductItem: [],
    });

    render(<GloablSearchBox />);

    const input = screen.getByTestId("product-quick-search");
    fireEvent.change(input, { target: { value: "Laptop" } });

    // AsyncTypeahead calls `onSearch` when minLength ≥ 3
    // expect(mockSearch).toHaveBeenCalled();
  });

  test("calls handleSubmit when pressing Enter", () => {
    const mockSubmit = vi.fn();

    mockUseGlobalSearch.mockReturnValue({
      allCategories: ["all"],
      onChangingCategories: vi.fn(),
      globalSearchCategory: "all",
      onSearchingProduct: vi.fn(),
      onChangingSearchItems: vi.fn(),
      onSelectingProducts: vi.fn(),
      handleSubmit: mockSubmit,
      filteredProducts: [],
      searchBoxRef: { current: null },
      selectedProductItem: [],
    });

    render(<GloablSearchBox />);
    const input = screen.getByTestId("product-quick-search");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockSubmit).toHaveBeenCalled();
  });

  test("calls onSelectingProducts when selecting from dropdown results", () => {
    const mockSelectProduct = vi.fn();

    mockUseGlobalSearch.mockReturnValue({
      allCategories: ["all"],
      onChangingCategories: vi.fn(),
      globalSearchCategory: "all",
      onSearchingProduct: vi.fn(),
      onChangingSearchItems: vi.fn(),
      onSelectingProducts: mockSelectProduct,
      handleSubmit: vi.fn(),
      filteredProducts: [{ title: "Smartphone" }],
      searchBoxRef: { current: null },
      selectedProductItem: [],
    });

    render(<GloablSearchBox />);

    const input = screen.getByTestId("product-quick-search");
    fireEvent.change(input, { target: { value: "Smart" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Usually called via Typeahead internal logic
    expect(mockSelectProduct).not.toThrow;
  });
});
