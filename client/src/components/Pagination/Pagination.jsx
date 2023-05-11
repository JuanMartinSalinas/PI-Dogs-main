import styles from "./Pagination.module.css";

export default function Pagination({dogs, dogsPerPage, pagination, actualPage}) {
    const pages = []

    for (let i = 1; i <= Math.ceil(dogs/dogsPerPage); i++) {
        pages.push(i)
    }

    return(
        <nav>
            <ul className={styles.buttons}>
                { pages && pages.map(number => (
                        <li key={number}>
                            <div className={actualPage === number ? 
                                styles.buttonActive : 
                                styles.button
                                } onClick={()=> pagination(number)}>{number}</div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};
