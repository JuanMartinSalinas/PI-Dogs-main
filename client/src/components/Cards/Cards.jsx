import React, { Fragment } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions/actionIndex";
import styles from "./Cards.module.css";

export default function Cards() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.allDogs);
    const [actualPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);
    const indexLastDog = actualPage * dogsPerPage;
    const indexFirstDog = indexLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
  };

useEffect(() => {
    dispatch(getDogs());
}, [dispatch]);

// console.log(currentDogs[1].weight_max);

return (
    <Fragment>
     <div className={styles.cards}>
        {
        currentDogs.map((el) => { 
            return  (
                <Card
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    image={el.image}
                    temperament={el.temperament}
                    temperaments={el.temperaments} // Temperaments son los temperamentos de los perros que trae la BD.
                    // weight={el.weight_max}
                />
        )})}
        <Pagination
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            pagination={pagination}
            currentPage={actualPage}
        />
      </div>
    </Fragment>
    );
}
