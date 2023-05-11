import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetails, getDetails } from "../../redux/actions/actionIndex.js";

import styles from "./Details.module.css";
import perro from "../../assets/dog.png";
import corazon from "../../assets/corazon.png";
import peso from "../../assets/weight.png";
import regla from "../../assets/Regla.png";

export default function Details(props) {
    const dispatch = useDispatch();
    const myDog = useSelector((state) => state.details);
    // let [favorite, setFavorite] = useState([0]);

    // function onChange(e) {
    //     e.preventDefault(e);
    //     let favs = myDog.favorite;
    //     console.log(favs);
    // }

    useEffect(() => {
        dispatch(getDetails(props.match.params.id));
        return () => dispatch(clearDetails());
    }, [dispatch, props.match.params.id]);

    // useEffect(() => {
    //     dispatch(filterByFav(favorite));
    // }, [favorite]);

    document.title = myDog.name;

    return (
        <Fragment>
            <div className={styles.body} key={myDog.id} >
                <div className={styles.mainBox}>
                    <h2 className={styles.title}>⭐ {myDog.name} ⭐</h2>
                    <h3 className={styles.idDog}>{myDog.id < 99 ? "ID: " + myDog.id : "Un perro de la base de datos :)"}</h3>
                    <img className={styles.image} src={myDog.image} alt={myDog.name}/>
                    <div className={styles.detailsCard}>
                    {myDog.breed_group ? (
                        <div className={styles.breed}>
                        <div className={styles.imageBox}>
                            <img
                            src={perro}
                            alt="imagen"
                            className={styles.detailsImg}
                            />
                        </div>
                        <div className={styles.info}>
                            <h3>Grupo de raza: </h3>
                            <p>{myDog.breed_group}</p>
                        </div>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className={styles.lifeSpan}>
                        <div className={styles.imageBox}>
                        <img
                            className={styles.detailsImg}
                            src={corazon}
                            alt="imagen"
                        />
                        </div>
                        <div className={styles.info}>
                        <h3>Esperanza de vida: </h3>
                        <p>{myDog.life_span}</p>
                        </div>
                    </div>
                    <div className={styles.height}>
                        <div className={styles.imageBox}>
                        <img
                            className={styles.detailsImg}
                            src={regla}
                            alt="imagen"
                        />
                        </div>
                        <div className={styles.info}>
                            <h3>Altura: </h3>
                            <p>Mínima: {myDog.height_min} cm</p>
                            <p>Máxima: {myDog.height_max} cm</p>
                        </div>
                    </div>
                    <div className={styles.weight}>
                        <div className={styles.imageBox}>
                        <img
                            className={styles.detailsImg}
                            src={peso}
                            alt="imagen"
                        />
                        </div>
                        <div className={styles.info}>
                            <h3>Peso: </h3>
                            <p>Mínimo: {myDog.weight_min} kg</p>
                            <p>Máximo: {myDog.weight_max} kg</p>
                        </div>
                    </div>
                    <div className={styles.temperament}>
                        <div className={styles.info}>
                        {
                            <div>
                                <h3>Temperamento/s: </h3>
                                <p>
                                    {myDog.createdInDB ? myDog.temperaments.map((elem) => elem.name).join(", ") : myDog.temperament}
                                </p>
                            </div>
                        }
                        </div>
                    </div>
                    </div>
                    {/* <div>
                        <button className={styles.button} onClick={(e)=> onChange(e)}>Favorito</button>
                    </div> */}
                    <Link to="/home">
                        <button className={styles.button}>Hacia la página principal</button>
                    </Link>
                </div>
            </div>
        </Fragment>
  );
}
