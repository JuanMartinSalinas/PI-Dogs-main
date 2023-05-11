import { React, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DogeLogo from "../../assets/DogeSymbol.png"
import Tolva from "../../assets/tolva.png";
import { Link } from "react-router-dom";
import styles from "./Sorts.module.css";

import { getDogs, getTemperamentsList, namingOrder, weightOrder,
         filterByTemperament, filterCreated, filterByMaxWeight,
         filterByMinWeight } from "../../redux/actions/actionIndex";


export default function Sorts() {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments).sort(
        function (a, b) {
            if (a < b) return -1;
            else return 1;
        }
    );
    const everyDog = useSelector((state) => state.allDogs);

    const maxWeights = everyDog
        .map((el) => el.weight_max)
        .sort(function (a, b) {
            return a - b;
        });
    const fullMaxWeights = [...new Set(maxWeights)];
  
    const minWeights = everyDog
        .map((el) => el.weight_min)
        .sort(function (a, b) {
            return a - b;
        });
    const fullMinWeights = [...new Set(minWeights)]; // Si yo quito los Sets, los pesos se repiten


useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperamentsList());
}, [dispatch]);


//**********// Handler functions (inicio) \\**********\\


    function handlerClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleClickOrder(e) {
        e.preventDefault();
        dispatch(namingOrder(e.target.value));
    }

    function handlerClickOrderWeight(e) {
        e.preventDefault();
        dispatch(weightOrder(e.target.value));
    }

    function handlerMaxWeight(e) {
        e.preventDefault();
        dispatch(filterByMaxWeight(e.target.value));
    }

    function handlerMinWeight(e) {
        e.preventDefault();
        dispatch(filterByMinWeight(e.target.value));
    }

    function handlerFilterCreated(e) {
        dispatch(filterCreated(e.target.value));
    }

    function handlerFilteredByTemp(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value));
    }

    // function handlerFilterByFav(e) {
    //     e.preventDefault();
    //     dispatch(filterByFav(e.target.value));
    // }
    

//**********// Handler functions (final) \\**********\\

return (
    <Fragment>
        <div className={styles.side}>
            <div className={styles.sortsHeader}>
                <h4 className={styles.header}> Filtros, ordenamiento y creación:</h4>

                <div onClick={(e) => {handlerClick(e)}}>
                    <img className={styles.hopper} src={Tolva} alt="tolva"/>
                </div>
            </div>

{/******************\\ Orden alfabético //******************/}

        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Orden alfabético</h5>
            <select onChange={(e) => {handleClickOrder(e)}}>
                <option defaultValue value="all" hidden>Orden</option>
                <option value="a">De la A a la Z</option>
                <option value="d">De la Z a la A</option>
            </select>
        </div>

{/******************\\ Orden por peso //******************/}

        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Ordenar por peso</h5>
            <select onChange={(e) => {handlerClickOrderWeight(e)}}>
                <option defaultValue value="all" hidden>
                    Orden
                </option>
                <option value="asc">Más pesados</option>
                <option value="desc">Más ligeros</option>
            </select>
        </div>

{/******************\\ Filtro por peso mínimo //******************/}

        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Filtrar por peso mínimo</h5>
            <select onChange={(e) => handlerMinWeight(e)}>
                <option value="all">Sin filtros</option>
                {fullMinWeights.map((minWeight) => {
                    return (
                        <option value={minWeight} key={minWeight}>
                            {minWeight} Kg
                        </option>
                    )
                })
            };
            </select>
        </div>

{/******************\\ Filtro por peso máximo //******************/}

        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Filtrar por peso máximo</h5>
            <select onChange={(e) => handlerMaxWeight(e)}>
                <option value="all">Sin filtros</option>
                {fullMaxWeights.map((maxWeight) => {
                    return (
                        <option value={maxWeight} key={maxWeight}>
                            {maxWeight} kg
                        </option>
                    )
                })
            };
            </select>
        </div>

{/******************\\ Filtro por origen //******************/}

        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Filtrar por origen</h5>
            <select onChange={(e) => {handlerFilterCreated(e)}}>
                <option defaultValue value="all">Sin filtros</option>
                <option value="created">Creados</option>
                <option value="API">API</option>
            </select>
        </div>

{/******************\\ Filtro por temperamento //******************/}

        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Filtrar por temperamento</h5>
            <select onChange={(e) => handlerFilteredByTemp(e)}>
                <option value="all">Sin filtros</option>
                {temperaments.map((tempName) => {
                    return (
                        <option value={tempName} key={tempName}>
                            {tempName}
                        </option>
                    );
                })}
            </select>
        </div>

{/******************\\ Filtro por favoritos //******************/}

        {/* <div className={styles.filters}>
            <h5 className={styles.filterHeader}>
                <select onChange={(e) => handlerFilterByFav(e)}>
                    <option value ="all">Todos</option>
                    <option value="fav">Favoritos</option>
                </select>  
            </h5>
        </div> */}

{/******************\\ Hacia el formulario  //******************/}

        <div className={styles.filters}>
            <div className={styles.add}>
                <Link to="/newDog/" className={styles.doge}>
                    <img src={DogeLogo} alt="Crear perro"/>
                </Link>
            </div>
        </div>
      </div>
    </Fragment>
  );
}
