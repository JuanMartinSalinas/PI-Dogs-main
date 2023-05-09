import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nameDogs } from "../../redux/actions/actionIndex.js";
import styles from "./SearchBar.module.css";
import lupa from "../../assets/lupa.png"

export default function SearchBar() {
const [searchState, setSearchState] = useState("");
const dispatch = useDispatch();

function handleClick(e) {
    e.preventDefault();
    dispatch(nameDogs(searchState));
    setSearchState("");
}

    return (
        <div className={styles.searchBar}>
            <input
                className={styles.input}
                type="text"
                placeholder="  Golden retriever, Akita..."
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
            />
            <button type="submit" onClick={handleClick}>
                <img className={styles.lupa} src={lupa} alt="lupa"/>
            </button>
        </div>
    );
}
