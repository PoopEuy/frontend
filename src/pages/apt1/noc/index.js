import ChartNoc from "@parts/ChartNoc";
import { apt1GetLogger } from "@helpers/api/apt1";

const Apt1Noc = () => {
  return <ChartNoc getApi={apt1GetLogger} />;
};

export default Apt1Noc;
