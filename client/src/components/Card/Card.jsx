import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card( { id, name, image, temperament, temperaments, weight_max, weight_min } ) {

    console.log(temperaments)

    if (!temperaments) {
        return (
            <Fragment>
                <div className={styles.card}>
                <Link to={"/dogs/" + id}>
                    <div className={styles.title}>
                        <h5 className={styles.dogName}>{name}</h5>
                    </div>
                    <div className={styles.info}>
                    <div className={styles.temp}>
                            <h6 className={styles.dogTemp}>Temperamentos: {temperament || "¡Un amigo peludo!"}</h6>
                            <h6 className={styles.weight}>Min: {weight_min}kg, Max: {weight_max}kg</h6>
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
                        <h5 className={styles.dogTemp}>
                            {temperaments.map((temp) => `${temp.name} `).join(', ')}
                        </h5>
                        <h6 className={styles.weight}>Min: {weight_min}kg, Max: {weight_max}kg</h6>
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
