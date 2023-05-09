import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card( { id, name, image, temperament, temperaments } ) {

    if (!temperaments) { // Temperaments son los temperamentos de los perros que trae la BD. Do not worry
        return (
            <Fragment>
                <div className={styles.card}>
                <Link to={"/dogs/" + id}>
                    <div className={styles.title}>
                        <h5 className={styles.dogName}>{name}</h5>
                    </div>
                    <div className={styles.info}>
                    <div className={styles.temp}>
                            <h5 className={styles.dogTemp}>{temperament}</h5>
                            {/* <h6>{weight_max}</h6>
                            <h6>{weight_min}</h6> */}
                    </div>
                    <div className={styles.imageZone}>
                        <img
                            className={styles.image}
                            src={image}
                            alt={"Perrito"}
                            height="140px"
                        />
                    </div>
                    </div>
                </Link>
                </div>
            </Fragment>
            );
        } else {
            return (
            <Fragment>
                <div className={styles.card}>
                <Link to={"/dogs/" + id}>
                    <div className={styles.title}>
                        <h4 className={styles.dogName}>{name}</h4>
                    </div>
                    <div className={styles.info}>
                    <div className={styles.temp}>
                        {temperaments ? (
                            <h5 className={styles.temp}>
                            {temperaments.map((temp) => `${temp.name} `).join(', ')}
                            </h5>
                        ) : (
                            <br />
                        )}
                    </div>
                    <div className={styles.imageZone}>
                        <img className={styles.image} src={image} alt={`Perro`}/>
                    </div>
                    </div>
                </Link>
                </div>
            </Fragment>
        );
    }
}
