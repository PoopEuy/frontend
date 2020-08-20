import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

//material ui core
import { makeStyles } from "@material-ui/core/styles";

//redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//components OR parts local
import { getApt1Nojs } from "@redux/apt1/nojs/action";
import DrawerHeader from "@parts/DrawerHeader";
import Apt1 from "@components/ListPages/apt1";

const useStyle = makeStyles({
  content: {
    marginTop: 74,
  },
});

const listPages = () => {
  return (
    <>
      <Apt1 />
    </>
  );
};

const Layout = ({ children, getApt1Nojs }) => {
  useEffect(() => {
    getApt1Nojs();
  }, []);

  const page = listPages();
  console.log("Layout");

  return (
    <>
      <DrawerHeader listPage={page} mainPage={children} />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getApt1Nojs: bindActionCreators(getApt1Nojs, dispatch),
  };
};

Layout.propTypes = {
  mainPage: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default connect(null, mapDispatchToProps)(Layout);
