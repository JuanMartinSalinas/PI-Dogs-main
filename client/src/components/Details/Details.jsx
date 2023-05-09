import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDetails, getDetails } from "../../redux/actions/actionIndex.js";

import styles from "./Details.module.css";
import perro from "../../assets/dog.png";
import corazon from "../../assets/corazon.png";
import peso from "../../assets/weight.png";
import regla from "../../assets/Regla.png";

export default function Details(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(props.match.params.id));
        return () => dispatch(deleteDetails());
    }, [dispatch, props.match.params.id]);

    const myDog = useSelector((state) => state.details);

    return (
        <Fragment>
            <div key={myDog.id} className={styles.bodix}>
            <div className={styles.mainContainer}>
                <h2 className={styles.mainTitle}>{myDog.name}</h2>
                <img src={myDog.image} alt={myDog.name} className={styles.image} />
                <div className={styles.detailsContainer}>
                {myDog.breed_group ? (
                    <div className={styles.breed_group}>
                    <div className={styles.imageSection}>
                        <img
                        src={perro}
                        alt="imagen"
                        className={styles.detailsSVG}
                        />
                    </div>
                    <div className={styles.infoSection}>
                        <h3>Raza: </h3>
                        <p>{myDog.breed_group}</p>
                    </div>
                    </div>
                ) : (
                    ""
                )}
                <div className={styles.life_span}>
                    <div className={styles.imageSection}>
                    <img
                        src={corazon}
                        alt="imagen"
                        className={styles.detailsSVG}
                    />
                    </div>
                    <div className={styles.infoSection}>
                    <h3>Esperanza de vida: </h3>
                    <p>{myDog.life_span}</p>
                    </div>
                </div>
                <div className={styles.weights}>
                    <div className={styles.imageSection}>
                    <img
                        src={peso}
                        alt="imagen"
                        className={styles.detailsSVG}
                    />
                    </div>
                    <div className={styles.infoSection}>
                    <h3>Peso: </h3>
                    <p>Min: {myDog.weight_min}</p>
                    <p>Max: {myDog.weight_max}</p>
                    </div>
                </div>
                <div className={styles.heights}>
                    <div className={styles.imageSection}>
                    <img
                        src={regla}
                        alt="imagen"
                        className={styles.detailsSVG}
                    />
                    </div>
                    <div className={styles.infoSection}>
                    <h3>Altura: </h3>
                    <p>Min: {myDog.height_min}</p>
                    <p>Max: {myDog.height_max}</p>
                    </div>
                </div>
                <br />
                <div className={styles.temperament}>
                    <div className={styles.infoSection}>
                    {
                        <div>
                            <h3>Temperamento: </h3>
                            <p>
                                {myDog.createdInDB ? myDog.temperaments.map((elem) => elem.name).join(", ") : myDog.temperament}
                            </p>
                        </div>
                    }
                    </div>
                </div>
                </div>
                <Link to="/home">
                <button className={styles.button}>Back</button>
                </Link>
            </div>
            </div>
        </Fragment>
  );
}
