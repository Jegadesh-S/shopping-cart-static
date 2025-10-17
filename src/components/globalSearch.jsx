import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
import useGlobalSearch from "@customHooks/useGlobalSearch";
import { DEFAULT_GLOBAL_SEARCH_CATEGORY } from "@utils/constants";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

function GloablSearchBox() {
  const {
    allCategories,
    onChangingCategories,
    globalSearchCategory,
    onSearchingProduct,
    onChangingSearchItems,
    onSelectingProducts,
    handleSubmit,
    filteredProducts,
    searchBoxRef,
    selectedProductItem,
  } = useGlobalSearch();

  return (
    <form onSubmit={onChangingSearchItems}>
      <InputGroup variant="outline-secondary">
        <DropdownButton
          data-testid="global-search-ddl"
          variant="outline-secondary"
          className="text-capitalize"
          title={globalSearchCategory}
          id="globalSearchCategoryDropdown"
        >
          {allCategories.map((category, index) => (
            <Dropdown.Item
              key={index}
              className="text-capitalize"
              data-testid={`global-search-item-${index}`}
              onClick={onChangingCategories}
            >
              {category}
              {category == DEFAULT_GLOBAL_SEARCH_CATEGORY ? (
                <Dropdown.Divider />
              ) : (
                <></>
              )}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <AsyncTypeahead
          data-testid="product-quick-search"
          inputProps={{ "data-testid": "product-quick-search" }}
          id="product-quick-search"
          className="global-search-box"
          placeholder="Search Products"
          selected={selectedProductItem}
          ref={searchBoxRef}
          labelKey="title"
          minLength={3}
          onSearch={onSearchingProduct}
          options={filteredProducts}
          onChange={onSelectingProducts}
          onInputChange={onChangingSearchItems}
          onKeyDown={handleSubmit}
        ></AsyncTypeahead>
      </InputGroup>
    </form>
  );
}

export default GloablSearchBox;
