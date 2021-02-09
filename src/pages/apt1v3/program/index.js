import { apt1v3ApiProgram } from "@helpers/api/apt1v3";
import ApiToTable from "@components/ApiToTable";

const Apt1V3Program = () => (
  <ApiToTable api={apt1v3ApiProgram} title="APT1 STATUS PROGRAM" />
);

export default Apt1V3Program;
