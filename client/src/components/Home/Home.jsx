import React from "react";
import { Fragment } from "react";
import SideBar from "../SideBar/SideBar";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import styles from './Home.module.css'

export default function Home() {
    return (
        <Fragment>
            <div className={styles.mainContainer}>
                <NavBar />
                <SideBar />
                <Cards />
            </div>
        </Fragment>
    );
}
