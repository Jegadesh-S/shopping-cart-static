import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_GLOBAL_SEARCH_CATEGORY } from "@utils/constants";
import {
  filterProductsByString,
  resetFilter,
  updateProductFilterFlag,
  applyFilterWithProductInfo,
  setSelectedGlobalCategory,
  updateSearchText,
} from "@app/productSlice";
import { useLocation, useNavigate } from "react-router-dom";

function useGlobalSearch() {
  const {
    filteredProducts,
    productCategories,
    selectedGlobalCategory,
    searchText,
  } = useSelector((store) => store.products);

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const [globalSearchCategory, setGlobalSearchCategory] = useState(
    DEFAULT_GLOBAL_SEARCH_CATEGORY
  );

  const [selectedProductItem, setSelectedProduct] = useState([]);

  const searchBoxRef = useRef(null);

  const onChangingCategories = (event) => {
    const { text } = event.target;
    setGlobalSearchCategory(text);
    dispatch(setSelectedGlobalCategory(text));
    dispatch(filterProductsByString(searchText));
  };

  const onSearchingProduct = (e) => {
    dispatch(filterProductsByString(e));
  };

  const onSelectingProducts = (e) => {
    setSelectedProduct(e);
    if (!e.length) {
      dispatch(resetFilter());
      return;
    }
    dispatch(updateSearchText(e[0].title));
    dispatch(applyFilterWithProductInfo(e));
    validateNavigation();
  };

  const onChangingSearchItems = (e, d) => {
    if (e.length == 0) {
      dispatch(
        updateProductFilterFlag(
          selectedGlobalCategory == DEFAULT_GLOBAL_SEARCH_CATEGORY
            ? false
            : true
        )
      );
      dispatch(filterProductsByString(""));
      validateNavigation();
    }
  };

  const validateNavigation = () => {
    if (location.pathname != "/products") {
      navigate(`/products`, {
        replace: true,
      });
    }
  };

  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      dispatch(updateProductFilterFlag(true));
      searchBoxRef.current?.hideMenu();
      validateNavigation();
      e.preventDefault();
    }
  };

  return {
    allCategories: productCategories,
    onChangingCategories,
    globalSearchCategory,
    onSearchingProduct,
    onChangingSearchItems,
    onSelectingProducts,
    handleSubmit,
    filteredProducts,
    searchBoxRef,
    selectedProductItem,
  };
}

export default useGlobalSearch;
