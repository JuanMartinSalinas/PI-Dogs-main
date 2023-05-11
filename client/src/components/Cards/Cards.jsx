import React, { Fragment } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDogs } from "../../redux/actions/actionIndex";
import styles from "./Cards.module.css";

export default function Cards() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.allDogs);
    const [actualPage, setActualPage] = useState(1);
    const [dogsPerPage] = useState(8);
    const indexLastDog = actualPage * dogsPerPage;
    const indexFirstDog = indexLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);

    const pagination = (pageNumber) => {
        setActualPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]);

    // console.log(currentDogs[1]);

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
                                temperaments={el.temperaments}
                                weight_max={el.weight_max}
                                weight_min={el.weight_min}
                            />
                        );
                    })
                }
                <div className={styles.paginationNums}>
                    <Pagination
                        dogsPerPage={dogsPerPage}
                        dogs={allDogs.length}
                        pagination={pagination}
                        currentPage={actualPage}
                    />
                </div>
            </div>
        </Fragment>
    );
}
