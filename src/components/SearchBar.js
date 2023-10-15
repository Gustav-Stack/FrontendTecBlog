import React from "react";
import { BiSearch, BiArrowBack } from "react-icons/bi";

export default function SearchBar({ searchItem, noItemsFound, getData }) {
  return (
    <div className="div-search">
      <input
        onChange={searchItem}
        className="search"
        type="search"
        placeholder="Search Article"
      />
      <BiSearch className="search-icon" />
      {noItemsFound && (
        <>
          <BiArrowBack
            className="icon"
            size={25}
            onClick={() => {
              getData();
            }}
          />
          <p className="message">No items found.</p>
        </>
      )}
    </div>
  );
}
