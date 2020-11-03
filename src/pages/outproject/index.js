import ChartOP from "@parts/ChartOP";
import * as op_service from "@helpers/api/outproject";

const OutProject = () => {
  return <ChartOP getApi={op_service.opGetProjectName} />;
};

export default OutProject;
