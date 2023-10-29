import React, { useEffect, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import Products from "../components/Collections/Products";
import FilterItem from "../components/Collections/FilterItem";
import { filterByPrice, links } from "../MyLinks";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Loader from "../components/Loader";

const Collections = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const subCategory = params.get("subCategory");
  const price = params.get("price");
  const navigate = useNavigate();
  const filteredLinks = links.filter((link) => link.name === category);

  const [isLoading, setIsLoading] = useState(false);

  const [showCatFilter, setShowCatFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [subHeading, setSubHeading] = useState("");

  const [sort, setSort] = useState("newest");
  const [results, setResults] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handlePriceFilterChange = (selectedFilter) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("price", selectedFilter);
    const newUrl = `/collections?${queryParams.toString()}`;
    navigate(newUrl);
  };

  const handleFilters = (slinkName) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("subCategory", slinkName.toLowerCase());
    const newUrl = `/collections?${queryParams.toString()}`;
    navigate(newUrl);
  };

  const handleRemoveFilter = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete("subCategory");
    const newUrl = `/collections?${queryParams.toString()}`;
    navigate(newUrl);
  };

  const removeSelectedPriceFilter = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete("price"); 
    const newUrl = `/collections?${queryParams.toString()}`;
    navigate(newUrl);
  };

  const breadCrumbs = [
    {
      name: "Collections",
    },
  ];
  return (
    <div className="py-36 px-12 flex flex-col gap-10 min-h-[200vh]">
      <Breadcrumbs breadCrumbs={breadCrumbs} />
      <div className="flex">
        <div className="w-[30%] h-full sticky top-28 pr-20 lg:block hidden ">
          <div className="p-5 border rounded-lg">
            <div className="border-b">
              <h2
                onClick={() => {
                  setShowCatFilter(!showCatFilter);
                  setSubHeading("");
                }}
                className={`p-2 w-[86%] hover:bg-primary-second rounded-lg flex justify-between items-center cursor-pointer`}
              >
                By Category
                <span className="text-3xl text-text">
                  {showCatFilter ? <BiChevronDown /> : <BiChevronRight />}
                </span>
              </h2>
              {showCatFilter && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredLinks.map((link, linkIndex) => (
                    <div key={linkIndex} className="flex flex-col pl-4">
                      {link.sublinks.map((slinks, slinksIndex) => (
                        <div key={slinksIndex} className="">
                          <h3
                            className="flex justify-between items-center cursor-pointer p-2 hover:bg-primary-second rounded-lg"
                            onClick={() =>
                              subHeading !== slinks.Head
                                ? setSubHeading(slinks.Head)
                                : setSubHeading("")
                            }
                          >
                            {slinks.Head}
                            <span className="text-3xl lg:mt-1 lg:ml-2 inline text-text">
                              {subHeading === slinks.Head ? (
                                <BiChevronDown />
                              ) : (
                                <BiChevronRight />
                              )}
                            </span>
                          </h3>
                          {subHeading === slinks.Head && (
                            <motion.ul
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="pl-4"
                            >
                              {slinks.sublink.map((slink, slinkIndex) => (
                                <li
                                  key={slinkIndex}
                                  onClick={() => handleFilters(slink.name)}
                                  className="px-3 py-3 flex items-center gap-3 cursor-pointer hover:bg-primary-second relative"
                                >
                                  {slink.name}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="">
              <h2
                onClick={() => {
                  setShowPriceFilter(!showPriceFilter);
                  setSubHeading("");
                }}
                className={`p-2 w-[86%] hover:bg-primary-second rounded-lg flex justify-between items-center cursor-pointer`}
              >
                By Price
                <span className="text-3xl text-text">
                  {showPriceFilter ? <BiChevronDown /> : <BiChevronRight />}
                </span>
              </h2>
              {showPriceFilter && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="pt-4 flex flex-col gap-3"
                >
                  <div className="flex flex-col pl-4 gap-3">
                    {filterByPrice.map((p) => (
                      <label
                        key={p.id}
                        htmlFor={p.id}
                        className="flex cursor-pointer select-none items-center"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id={p.id}
                            value={p.value}
                            className="sr-only"
                            checked={p.id === price}
                            onChange={() => handlePriceFilterChange(p.id)}
                          />
                          <div
                            className={`mr-4 flex h-6 w-6 items-center justify-center rounded border ${
                              p.id === price ? "border-primary bg-gray-2" : ""
                            }`}
                          >
                            <span
                              className={`h-3 w-3 rounded-sm ${
                                p.id === price ? "bg-primary" : ""
                              }`}
                            ></span>
                          </div>
                        </div>
                        {p.value}
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-[70%] w-full">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                {subCategory || price ? (
                  <FilterItem
                    subCategory={subCategory}
                    onRemoveFilter={handleRemoveFilter}
                    results={results}
                    total={total}
                    selectedPriceFilter={price}
                    removeSelectedPriceFilter={removeSelectedPriceFilter}
                  />
                ) : (
                  <div></div>
                )}
                <div className="flex items-center gap-2 text-base text-[#767676] relative self-start">
                  <label className="block">Sort by:</label>
                  <select
                    onChange={(e) => setSort(e.target.value)}
                    className="w-36 md:w-40 border-[1px] border-gray-200 py-2 px-4 cursor-pointer text-base block appearance-none rounded-lg"
                  >
                    <option value="newest">New Arrival</option>
                    <option value="asc">Price(ASC)</option>
                    <option value="desc">Price(DESC)</option>
                  </select>
                  <span className="absolute text-xl right-3 top-2.5 md:right-5">
                    <GoTriangleDown />
                  </span>
                </div>
              </div>

              <div className="">
                <Products
                  category={category}
                  sort={sort}
                  setResults={setResults}
                  setTotal={setTotal}
                  total={total}
                  results={results}
                  subCategory={subCategory}
                  selectedPriceFilter={price}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
