import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/DogeMiniLogo.png";
import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
    return (
            <div className={styles.nav}>
                <div className={styles.searchBar}>
                    <div>
                        <Link to="/home">
                            <img
                            className={styles.logo}
                            id="logo"
                            src={Logo}
                            alt="doge logo"
                            />
                        </Link>
                    </div>
                    <div className={styles.search}>
                        <SearchBar />
                    </div>
                </div>
            </div>
    );
}
