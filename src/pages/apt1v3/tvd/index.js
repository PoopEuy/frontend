// import React from "react";
// import { Paper } from "@material-ui/core";

// const index = () => {
//   return <Paper elevation={4}>TVD Test</Paper>;
// };

// export default index;

import SlaNojs from "@parts/TVDNojs/tvd";
import { apt1v3GetLoggerSlaTVD } from "@helpers/api/apt1v3";
import { connect } from "react-redux";

const Apt2NojsSla = ({ dataApt1v3Nojs }) => {
  return <SlaNojs getSla={apt1v3GetLoggerSlaTVD} dataNojs={dataApt1v3Nojs} />;
};

const mapStateToProps = (state) => {
  return {
    dataApt1v3Nojs: state.DataApt1v3.dataApt1v3Nojs,
  };
};

export default connect(mapStateToProps, null)(Apt2NojsSla);
