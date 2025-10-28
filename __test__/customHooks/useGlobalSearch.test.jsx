import { renderHook, act } from "@testing-library/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import useGlobalSearch from "@customHooks/useGlobalSearch";
import * as productSlice from "@app/productSlice";

// Mock redux slice actions
vi.mock("@app/productSlice", () => ({
  filterProductsByString: vi.fn(),
  resetFilter: vi.fn(),
  updateProductFilterFlag: vi.fn(),
  applyFilterWithProductInfo: vi.fn(),
  setSelectedGlobalCategory: vi.fn(),
  updateSearchText: vi.fn(),
}));

// Mock react-redux
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => vi.fn(),
    useSelector: (callback) =>
      callback({
        products: {
          filteredProducts: [],
          productCategories: ["Electronics", "Clothing"],
          selectedGlobalCategory: "All",
          searchText: "",
        },
      }),
  };
});

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: "/home" }),
  };
});

const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

describe("useGlobalSearch hook", () => {
  it("should initialize with default state", () => {
    const { result } = renderHook(() => useGlobalSearch(), { wrapper });
    expect(result.current.globalSearchCategory).toBe("All Categories");
    expect(result.current.selectedProductItem).toEqual([]);
    expect(result.current.allCategories).toEqual(["Electronics", "Clothing"]);
  });

  it("should change categories and dispatch actions", () => {
    const { result } = renderHook(() => useGlobalSearch(), { wrapper });
    act(() => {
      result.current.onChangingCategories({ target: { text: "Electronics" } });
    });
    expect(result.current.globalSearchCategory).toBe("Electronics");
    expect(productSlice.setSelectedGlobalCategory).toHaveBeenCalledWith(
      "Electronics"
    );
    expect(productSlice.filterProductsByString).toHaveBeenCalled();
  });

  it("should search products", () => {
    const { result } = renderHook(() => useGlobalSearch(), { wrapper });
    act(() => {
      result.current.onSearchingProduct("phone");
    });
    expect(productSlice.filterProductsByString).toHaveBeenCalledWith("phone");
  });

  it("should select products and navigate if needed", () => {
    const { result } = renderHook(() => useGlobalSearch(), { wrapper });
    act(() => {
      result.current.onSelectingProducts([{ title: "iPhone" }]);
    });
    expect(result.current.selectedProductItem).toEqual([{ title: "iPhone" }]);
    expect(productSlice.updateSearchText).toHaveBeenCalledWith("iPhone");
    expect(productSlice.applyFilterWithProductInfo).toHaveBeenCalled();
  });

  it("should handle changing search items with empty array", () => {
    const { result } = renderHook(() => useGlobalSearch(), { wrapper });
    act(() => {
      result.current.onChangingSearchItems([], {});
    });
    expect(productSlice.updateProductFilterFlag).toHaveBeenCalled();
    expect(productSlice.filterProductsByString).toHaveBeenCalledWith("");
  });

  it("should handle Enter key submission", () => {
    const { result } = renderHook(() => useGlobalSearch(), { wrapper });
    const e = { key: "Enter", preventDefault: vi.fn() };
    act(() => {
      result.current.handleSubmit(e);
    });
    expect(productSlice.updateProductFilterFlag).toHaveBeenCalledWith(true);
    expect(e.preventDefault).toHaveBeenCalled();
  });
});
