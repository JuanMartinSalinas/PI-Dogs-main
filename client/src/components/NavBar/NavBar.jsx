import React, { Fragment } from "react";
import Logo from "../../assets/DogeMiniLogo.png";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
    return (
        <Fragment>
            <div className={styles.nav}>
                <div className={styles.searchBar}>
                    <div className={styles.logoAndTitle}>
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
        </Fragment>
    );
}
