import { React, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DogeLogo from "../../assets/DogeSymbol.png"
import Tolva from "../../assets/tolva.png";
import { Link } from "react-router-dom";
import {
    getDogs,
    getTemperamentsList,
    filterByTemperament,
    namingOrder,
    filterCreated,
    getAllBreeds,
    getDogsBreed,
    filterByMaxWeight,
    filterByMinWeight,
    weightOrder
} from "../../redux/actions/actionIndex";
import styles from "./SideBar.module.css";


export default function SideBar() {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments).sort(
        function (a, b) {
            if (a < b) return -1;
            else return 1;
        }
    );
    const everyDog = useSelector((state) => state.allDogs);
    const breeds = useSelector((state) => state.breeds);

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

    const fullMinWeights = [...new Set(minWeights)]; // Si yo saco estos Set, los pesos se repiten


useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperamentsList());
    dispatch(getAllBreeds());
}, [dispatch]);


//**********// Handler functions (start) \\**********\\

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
function handlerFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
}
function handlerFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
}
function handlerFilteredByBreed(e) {
    e.preventDefault();
    dispatch(getDogsBreed(e.target.value));
}
function handlerMaxWeight(e) {
    e.preventDefault();
    dispatch(filterByMaxWeight(e.target.value));
}
function handlerMinWeight(e) {
    e.preventDefault();
    dispatch(filterByMinWeight(e.target.value));
}

//**********// Handler functions (end) \\**********\\

return (
    <Fragment>
        <div className={styles.side}>
            <div className={styles.sideBarHeader}>
                <h3 className={styles.header}> Filtros y ordenamiento:</h3>
                <div onClick={(e) => {handlerClick(e)}}>
                    <img className={styles.tolva} src={Tolva} alt="tolva"/>
                </div>
            </div>
        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Orden alfabético</h5>
            <select onChange={(e) => {handleClickOrder(e)}}>
                <option defaultValue value="all" hidden>Order</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>
        </div>
        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Ordenar por peso</h5>
            <select onChange={(e) => {handlerClickOrderWeight(e)}}>
                <option defaultValue value="all" hidden>
                    Order
                </option>
                <option value="asc">Pesados</option>
                <option value="desc">Ligeros</option>
            </select>
        </div>
        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Filtrar por origen</h5>
            <select onChange={(e) => {handlerFilterCreated(e)}}>
                <option defaultValue value="all">
                    Sin filtros
                </option>
                <option value="created">Creados</option>
                <option value="API">API</option>
            </select>
        </div>
        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Filtrar por raza</h5>
            <select onChange={(e) => handlerFilteredByBreed(e)}>
                <option value="all">Sin filtros</option>
                {breeds.map((breed) => {
                    return (
                        <option value={breed} key={breed}>
                            {breed}
                        </option>
                    )
                })
            };
            </select>
        </div>
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
        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Filtrar por altura mínima</h5>
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
        <div className={styles.filters}>
            <h5 className={styles.filterHeader}>Filtrar por altura máxima</h5>
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
        <div className={styles.filters}>
            <div className={styles.addDog}>
                <Link to="/newDog/" className={styles.doge}>
                    <img src={DogeLogo} alt="Crear perro"/>
                </Link>
            </div>
        </div>
      </div>
    </Fragment>
  );
}
