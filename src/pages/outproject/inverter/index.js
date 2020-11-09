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
    let project_name;
    if (router.asPath.match("/outproject/inverter") && !router.query.project_name) {
      router.push(`/outproject`);
    } else if (!router.query.project_name && !router.asPath.match("project_name=")) {
      handleChange("", 1);
    } else {
      if (router.query.project_name) {
        project_name = router.query.project_name;
      } else if (router.asPath.match("project_name=")) {
        project_name = router.asPath.split("project_name=")[1];
        if (project_name.match("page=")) {
          project_name = project_name.split("&")[0];
        }
      }
    }
    setProjectName(project_name);
  }, []);

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
