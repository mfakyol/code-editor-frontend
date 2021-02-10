import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import { connect } from "react-redux";
import classes from './style.module.css'

function MainPublic(props) {

let history = useHistory();
const token = JSON.parse(localStorage.getItem('token'));
if(token) history.push('/code')

  const [children] = useState(props.children)
  return <div className={classes["bg"]}><div className={classes["bg-shadow"]}>{children}</div></div>;
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    //onExamplefunction: () => dispatch(examplefunction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPublic);
