import React from 'react'
import classes from './style.module.css'
import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <div className={classes["home"]}>
            <h2 className={classes["slogan"]}>Web Code Editor for Browsers</h2>
            <p className={classes["sub-slogan"]}> Supports Html, Css, Javascript Es6+ Pug, Markdown, Sass, Less, TypeScript, CoffeScript and more</p>
            <div className={classes["buttons"]}>
            <Link to="/login" className={`${classes["button"]} ${classes["try-it"]}`}>{"Log In <Code Editor/>"}</Link>
            <p>{"<OR/>"}</p>
            <Link to="/signup" className={`${classes["button"]} ${classes["sign-up"]}`}>{"Sign Up <Code Editor/>"}</Link>
            </div>
        </div>
    )
}
