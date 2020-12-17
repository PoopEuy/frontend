import ChartNoc from "@parts/ChartNoc/apt2";
import { apt2GetLogger } from "@helpers/api/apt2";

const Apt2Noc = () => {
  return <ChartNoc getApi={apt2GetLogger} />;
};

export default Apt2Noc;
