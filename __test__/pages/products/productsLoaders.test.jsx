import { describe, test, vi, expect } from "vitest";
import fetchAllProdcuts from "@pages/products/productsLoaders";

vi.mock("@services/products", () => ({
  __esModule: true,
  getAllProducts: vi.fn(),
}));

import { getAllProducts } from "@services/products";

describe("Products Loader", () => {
  test("fetchAllProducts with Promise object", () => {
    let mockPromise = new Promise(() => {});
    getAllProducts.mockReturnValue(mockPromise);

    const isPromise = fetchAllProdcuts();
    expect(getAllProducts).toHaveBeenCalledTimes(1);

    expect(isPromise).toHaveProperty("productsPromise", mockPromise);

    expect(isPromise.productsPromise).toBeInstanceOf(Promise);
  });
});
