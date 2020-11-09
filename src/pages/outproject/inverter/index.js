import ChartInverter from "@parts/ChartInverter";
import * as op_service from "@helpers/api/outproject";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const OutProjectInverter = () => {
  const router = useRouter();

  const [loading, setLoading] = useState({ load: true, data: false });
  const [projectName, setProjectName] = useState();

  useEffect(() => {
    console.log("ROUTER inverter ", router);
    if (router.query.project_name) {
      console.log("Constructor ");
      setProjectName(router.query.project_name);
    }
  }, []);

  //   if (router.query.project_name) {
  //     console.log("ROUTER inverter ", router);
  //     return <ChartInverter getApi={router.query.project_name} />;
  //   } else {
  //     return <div>FAILED</div>;
  //   }
  useEffect(() => {
    if (projectName) {
      setLoading({ load: false, data: true });
    }
  }, [projectName]);

  return (
    <>
      {
        <>
          {!loading.load && loading.data && <ChartInverter InverterProjectName={projectName} />}
          {loading.load && !loading.data && <div>Loading...</div>}
        </>
      }
    </>
  );
};

export default OutProjectInverter;
