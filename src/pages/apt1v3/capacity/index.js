import { apt1v3ApiCapacity } from "@helpers/api/apt1v3";
import ApiToTable from "@components/ApiToTable";

const Apt1V3Capacity = () => (
  <ApiToTable api={apt1v3ApiCapacity} title="APT1 Capacity" />
);

export default Apt1V3Capacity;
