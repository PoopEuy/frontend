import { connect } from "react-redux"; //redux
import { bindActionCreators } from "redux";
import TableTicket from "@parts/TableTicket"; // components OR parts local
import { getTicket, editTicket, addTicket } from "@redux/ticket/action";
import { useEffect, useState } from "react";
import { apiGetTicket, apiAddTicket, apiEditTicket } from "@helpers/api/apt2";

const Index = ({ dataTicket, getTicket }) => {
  const [state, setState] = useState();
  useEffect(() => {
    apiGetTicket().then((e) => setState(e.data));
  }, []);
  return (
    <TableTicket
      dataTicket={state}
      getTicket={apiGetTicket}
      editTicket={apiEditTicket}
      addTicket={apiAddTicket}
      titleTable="TICKET"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataTicket: state.ticket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // editTicket: bindActionCreators(apiEditTicket, dispatch),
    getTicket: bindActionCreators(getTicket, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
