import { apt2ApiCapacity } from "@helpers/api/apt2";
import ApiToTable from "@components/ApiToTable";

const Apt2Capacity = () => (
  <ApiToTable api={apt2ApiCapacity} title="APT2 Capacity" />
);

export default Apt2Capacity;
