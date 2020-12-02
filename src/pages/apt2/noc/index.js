import ChartNoc from "@parts/ChartNoc/apt2";
import { apt1GetLogger } from "@helpers/api/apt1";

const Apt2Noc = () => {
  return <ChartNoc getApi={apt1GetLogger} />;
};

export default Apt2Noc;
