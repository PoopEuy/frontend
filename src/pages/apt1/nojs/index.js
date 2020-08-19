import { connect } from "react-redux"; //redux
import TableNojs from "@parts/TableNojs"; // components OR parts local

const Apt1Nojs = ({ DataApt1Nojs }) => {
  const { dataApt1Nojs } = DataApt1Nojs;
  const href = "/apt1/nojs/edit/[nojs]";
  const as = "/apt1/nojs/edit/";

  return <TableNojs dataNojs={dataApt1Nojs} titleTable="APT1 NOJS" />;
};

export async function getServerSideProps() {
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
  return { props: {} };
}

export default connect((state) => state, null)(Apt1Nojs);
