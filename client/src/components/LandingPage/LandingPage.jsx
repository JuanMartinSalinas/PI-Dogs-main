import React, { Fragment } from "react";
import MainLogo from '../../assets/MainLogo.png';
import GithubLogo from '../../assets/GithubLogo.png';
import LinkedinLogo from '../../assets/LinkedinLogo.png';
import SoyHenry from '../../assets/HenryLogo.png';
import { Link } from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css';

export default function LandingPage(){
    return (
        <Fragment>
            <div className={styles.all}>
                <img src={MainLogo} alt="PI Dogs - Juan Martín Salinas" className={styles.logo}/>
                <Link to='/home'>
                    <button className={styles.button}>Let's get started</button>
                </Link>
                <footer className={styles.footBox}>
                    <a href="https://github.com/JuanMartinSalinas"><img src={GithubLogo} alt="Github" className={styles.img}></img></a>
                    <a href="https://www.linkedin.com/in/juan-mart%C3%ADn-salinas-112216236/"><img src={LinkedinLogo} alt="Linkedin" className={styles.img}/></a>
                    <a href="https://www.soyhenry.com/"><img src={SoyHenry} alt="SoyHenry" className={styles.img}/></a>
                </footer>
            </div>
        </Fragment>
    )
}