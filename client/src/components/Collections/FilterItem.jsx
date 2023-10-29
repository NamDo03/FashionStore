import React from "react";
import { MdClose } from "react-icons/md";

const FilterItem = ({
  results,
  total,
  subCategory,
  onRemoveFilter,
  selectedPriceFilter,
  removeSelectedPriceFilter,
}) => {
  const handleRemoveClick = (filterName) => {
    onRemoveFilter(filterName);
  };
  return (
    <div className="flex flex-col gap-8">
      <span>
        Showing <strong>{results} </strong> results from total{" "}
        <strong>{total}</strong> for{" "}
        <strong className="capitalize">
          "{subCategory || selectedPriceFilter}"
        </strong>
      </span>
      <div className="flex flex-row gap-4 items-center">
        <span>Applied Filters:</span>
        {subCategory && (
          <span className="flex justify-between items-center gap-3 capitalize py-2 px-5 border rounded-lg">
            {subCategory}
            <span
              className=" cursor-pointer"
              onClick={() => handleRemoveClick(subCategory)}
            >
              <MdClose />
            </span>
          </span>
        )}
        {selectedPriceFilter && (
          <span className="flex justify-between items-center gap-3 capitalize py-2 px-5 border rounded-lg">
            {selectedPriceFilter}
            <span
              className=" cursor-pointer"
              onClick={() => removeSelectedPriceFilter(selectedPriceFilter)}
            >
              <MdClose />
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterItem;
