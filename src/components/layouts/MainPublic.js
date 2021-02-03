import React from "react";
import { connect } from "react-redux";
import classes from './mainpublic.module.css'

function MainPublic({children}) {
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
