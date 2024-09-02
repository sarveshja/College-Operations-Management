// src/components/SearchBar/SearchBar.jsx
import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ data, searchFields, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery);
        onSearch(searchQuery, searchFields);
    };

    return (
        <div className={styles.searchBar}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder={`Search by ${searchFields.join(' or ')}`}
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
