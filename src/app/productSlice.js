import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_GLOBAL_SEARCH_CATEGORY } from "../utils/constants";

const initialState = {
  allProducts: [],
  productCategories: [DEFAULT_GLOBAL_SEARCH_CATEGORY],
  selectedGlobalCategory: DEFAULT_GLOBAL_SEARCH_CATEGORY,
  filteredProducts: [],
  isFiltered: false,
  searchText: "",
};

const option = {
  name: "products",
  initialState,
  reducers: {
    setAllProducts: (state, actions) => {
      state.allProducts = actions.payload;
      state.filteredProducts = [];
      state.isFiltered = false;

      // since the mock products data are less, looping them and get the unique categories.
      if (state.allProducts.length) {
        // assuming state.allProducts always coming in array format.
        state.allProducts.forEach((product) => {
          const { category } = product;
          if (!state.productCategories.includes(category))
            state.productCategories.push(category);
        });
      }
    },

    setSelectedGlobalCategory: (state, actions) => {
      const { payload } = actions;
      state.selectedGlobalCategory = payload;
    },

    resetFilter: (state) => {
      if (!state.isFiltered) state.filteredProducts = [];
    },

    filterProductsByString: (state, actions) => {
      const searchText = actions.payload.trim().toLowerCase();
      state.searchText = searchText;
      //   state.isFiltered = false;
      if (
        searchText.length == 0 &&
        state.selectedGlobalCategory == DEFAULT_GLOBAL_SEARCH_CATEGORY
      ) {
        state.filteredProducts = [];
        state.isFiltered = false;
        return;
      }

      state.filteredProducts = state.allProducts.filter((product) => {
        const titleMatch = product.title.toLowerCase().includes(searchText);
        const descriptionMatch = product.description
          .toLowerCase()
          .includes(searchText);
        const categoryMatch =
          state.selectedGlobalCategory == DEFAULT_GLOBAL_SEARCH_CATEGORY
            ? true
            : product.category == state.selectedGlobalCategory;

        return (titleMatch || descriptionMatch) && categoryMatch;
      });
    },

    applyFilterWithProductInfo: (state, actions) => {
      state.filteredProducts = actions.payload;
      state.isFiltered = true;
    },

    updateProductFilterFlag: (state, actions) => {
      state.isFiltered = actions.payload;
    },

    updateSearchText: (state, actions) => {
      state.searchText = actions.payload;
    },
  },
};

const productSlice = createSlice(option);

export const {
  setAllProducts,
  getProductsByString,
  filterProductsByString,
  resetFilter,
  updateProductFilterFlag,
  applyFilterWithProductInfo,
  setSelectedGlobalCategory,
  updateSearchText,
} = productSlice.actions;

export default productSlice.reducer;
