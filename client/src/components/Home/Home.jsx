import React from "react";
import { Fragment } from "react";
import Sorts from "../Filters&Ordering/Sorts";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";

export default function Home() {

    document.title = 'The Doge - Dogs API'

    return (
        <Fragment>
            <div className={styles.box}>
                <NavBar />
                <Sorts />
                <Cards />
            </div>
        </Fragment>
    );
}
