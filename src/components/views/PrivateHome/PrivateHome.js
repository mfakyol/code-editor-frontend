import React from 'react'
import CodeEditor from '../CodeEditor/CodeEditor'
import classes from './style.module.css'

export default function PrivateHome() {
    return (
        <div className={classes["full-size"]}> 
            <CodeEditor/>
        </div>
    )
}
