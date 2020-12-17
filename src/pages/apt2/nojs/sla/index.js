import SlaNojs from "@parts/SlaNojs";
import { apt1GetSla } from "@helpers/api/apt1";

const Apt1NojsSla = () => {
  return <SlaNojs getSla={apt1GetSla} />;
};

export default Apt1NojsSla;
