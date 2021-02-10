import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CodeEditor from '../CodeEditor/CodeEditor'
import classes from './style.module.css'
import config from '../../../../config'


export default function CodePage() {
    const [code, setCode] = useState(null)
    const {codeId} = useParams()
    useEffect(() => {
        async function getUserData() {
          await Axios.get(`${config.apiDomain}/code`, {
            params: {codeId, token: JSON.parse(localStorage.getItem("token")) },
          })
            .then((res) => res.data)
            .then(({ status, code, message }) => {
              if (status) {
                  setCode(code)
              }
            });
        }
        getUserData();
      }, [codeId]);



    return (
        <div className={classes["full-size"]}> 

           {code ?  <CodeEditor key={code._id} {...code}/> : "loading code."}
        </div>
    )
}
