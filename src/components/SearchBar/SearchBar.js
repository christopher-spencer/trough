import React, { useState } from "react";
import styles from "./SearchBar.module.css";

const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count",
};

const SearchBar = ( {searchYelp} ) => {
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ sortBy, setSortBy ] = useState("");

  const getSelectedSortByClass = (sortByOption) => {
    if (sortBy === sortByOption) {
      return styles.active;
    }
    return "";
  };

  const handleSortByChange = (sortByOption) => {
    setSortBy(sortByOption);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = (event) => {
    // Used to prevent the default action of clicking the button
    event.preventDefault();
    searchYelp(searchTerm, location, sortBy);
  };

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li 
          className={getSelectedSortByClass(sortByOptionValue)} 
          key={sortByOptionValue} 
          onClick={ () => { handleSortByChange(sortByOptionValue) } }
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <div className={styles.SearchBar}>
      <div className={styles.SearchBarSortOptions}>
        <ul>{renderSortByOptions()}</ul>
      </div>
      <form onSubmit={handleSearch}>
        <div className={styles.SearchBarFields}>
          <input placeholder="Search Businesses" onChange={handleSearchTermChange} />
          <input placeholder="Where?" onChange={handleLocationChange} />
        </div>
        <div className={styles.SearchBarSubmit}>
          <button type="submit">Let's Go</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;