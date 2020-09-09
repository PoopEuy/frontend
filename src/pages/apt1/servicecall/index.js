import {
  apt1PutServiceOpen,
  apt1GetServiceOpen,
  apt1GetServiceChart,
} from "@helpers/api/apt1";
import TabServiceCall from "@parts/ServiceCalls/TabServiceCall";

const Apt1ServiceCall = () => {
  return (
    <TabServiceCall
      GetServiceOpen={apt1GetServiceOpen}
      GetServiceChart={apt1GetServiceChart}
      PutServiceOpen={apt1PutServiceOpen}
    />
  );
};

export default Apt1ServiceCall;
