import { apt2ApiProgram } from "@helpers/api/apt2";
import ApiToTable from "@components/ApiToTable";

const Apt2Program = () => (
  <ApiToTable api={apt2ApiProgram} title="APT1 STATUS PROGRAM" />
);

export default Apt2Program;
