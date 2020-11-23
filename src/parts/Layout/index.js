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
import { WsLogger, WsConnect } from "@redux/apt1/logger/action";
import DrawerHeader from "@parts/DrawerHeader";
import Apt1 from "@components/ListPages/apt1";
import { useRouter } from "next/router";

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
  const router = useRouter().pathname;

  useEffect(() => {
    getApt1Nojs();
    // WsConnect();
    // WsLogger();
  }, []);

  const page = listPages();

  return (
    <>
      <DrawerHeader
        listPage={page}
        mainPage={children}
        noc={router === "/apt1/noc" ? true : false}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getApt1Nojs: bindActionCreators(getApt1Nojs, dispatch),
    // WsLogger: bindActionCreators(WsLogger, dispatch),
    // WsConnect: bindActionCreators(WsConnect, dispatch),
  };
};

Layout.propTypes = {
  mainPage: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default connect(null, mapDispatchToProps)(Layout);
