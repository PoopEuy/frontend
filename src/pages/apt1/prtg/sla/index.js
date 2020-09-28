import PrtgSla from "@parts/Prtg/Sla";
import slaPrtg from "@helpers/api/slaPrtg";

const Apt1PrtgSla = () => {
  return <PrtgSla getSla={slaPrtg} />;
};

export default Apt1PrtgSla;
