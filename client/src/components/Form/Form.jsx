import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postingDog, getTemperamentsList } from "../../redux/actions/actionIndex.js";
import styles from "./Form.module.css";
import validations from './validations';

export default function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperament = useSelector((state) => state.temperaments).sort(
        function (a, b) {
        if (a < b) return -1;
        else return 1;
        }
    );;
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        image:"",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperament: [],
    });

    function handleChange(e) {
        setInput({
        ...input,
        [e.target.name]: e.target.value,
    });
    setErrors(
        validations({
            ...input,
            [e.target.name]: e.target.value,
        })
    );
}

function handleSelect(e) {
    setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
    });
}

function handleDelete(el) {
    setInput({
        ...input,
        temperament: input.temperament.filter((temp) => temp !== el),
    });
}

function handleSubmit(e) {
    e.preventDefault();
    if (
        !errors.name &&
        !errors.image &&
        !errors.weight_min &&
        !errors.height_min &&
        !errors.weight_max &&
        !errors.height_max
    ) {
    alert("Tu perro ha sido creado :)");
    dispatch(postingDog(input));
    setInput({
        name: "",
        image:"",
        height_min: "",
        weight_min: "",
        height_max: "",
        weight_max: "",
        life_span: "",
        temperament: [],
    });
    } else {
        return alert("Algo ha salido mal. Por favor, inténtalo de nuevo.");
    }
    history.push("/home");
}

useEffect(() => {
    dispatch(getTemperamentsList());
}, [dispatch]);

return (
    <Fragment>
        <div className={styles.mainContainerCreation}>
            <div>
                <h2>Crea tu perrito!</h2>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.Section}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={input.name}
                            name="name"
                            placeholder=" El nombre de tu perro!"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div>
                            <p className={styles.error}>{errors.name}</p>
                        </div>
                    </div>
                    <div className={styles.Section}>
                        <label>URL de imagen:</label>
                        <input
                            type="url"
                            value={input.image}
                            name="image"
                            placeholder=" Ingresa una URL"
                            onChange={(e) => handleChange(e)}
                        />
                        <div>
                            <p className={styles.error}>{errors.image}</p>
                        </div>
                    </div>
                    <div className={styles.Section}>
                        <h4>Altura</h4>
                        <label>Mínima</label>
                        <input
                            type="number"
                            value={input.height_min}
                            name="height_min"
                            placeholder="Ingresa un valor (Ej: 15)"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div>
                            <p className={styles.error}>{errors.height_min}</p>
                        </div>
                            <label>Máxima</label>
                        <input
                            type="number"
                            value={input.height_max}
                            name="height_max"
                            placeholder="Ingresa un valor (Ej: 15)"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div>
                            <p className={styles.error}>{errors.height_max}</p>
                        </div>
                    </div>
                    <div className={styles.Section}>
                        <h4>Peso</h4>
                        <label>Mínimo</label>
                        <input
                            type="number"
                            value={input.weight_min}
                            name="weight_min"
                            placeholder="Ingresa un valor (Ej: 15)"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div>
                            <p className={styles.error}>{errors.weight_min}</p>
                        </div>
                        <label>Máximo</label>
                        <input
                            type="number"
                            value={input.weight_max}
                            name="weight_max"
                            placeholder="Ingresa un valor (Ej: 15)"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div>
                            <p className={styles.error}>{errors.weight_max}</p>
                        </div>
                    </div>
                    <div className={styles.Section}>
                        <label>Esperanza de vida</label>
                        <input
                            type="text"
                            value={input.life_span}
                            name="life_span"
                            placeholder="Ingresa un valor (Ej: 8 - 12 años)"
                            onChange={(e) => handleChange(e)}
                        />
                        </div>
                        <div className={styles.Section}>
                        <label>Temperamentos</label>
                        <select onChange={(e) => handleSelect(e)} className={styles.styled_select}>
                            {temperament.map((temp) => {
                            return (
                                <option key={temp} name={temp}>
                                {temp}
                                </option>
                            );
                            })}
                        </select>
                        <div className={styles.sidebar_box}>
                            {input.temperament.map((el) => (
                            <div key={el} className={styles.selectedItems}>
                                <p>{el}</p>
                                <button onClick={() => handleDelete(el)}>x</button>
                            </div>
                            ))}
                        </div>
                        </div>
                        <div className={styles.buttonSection}>
                        <Link to="/home">
                            <button className={styles.cancelButton}>Cancel</button>
                        </Link>
                        <button className={styles.button} type="submit">
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
    );
};
