import ChartChint from "@parts/ChartChint";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const OutProjectChint = () => {
  const router = useRouter();

  const [loading, setLoading] = useState({ load: true, data: false });
  const [projectName, setProjectName] = useState();

  useEffect(() => {
    console.log("ROUTER chint ", router);
    let project_name;
    if (!router.query.project_name && !router.asPath.match("project_name=")) {
      router.push(`/outproject`);
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
          {!loading.load && loading.data && <ChartChint ChintProjectName={projectName} />}
          {loading.load && !loading.data && <div>Loading...</div>}
        </>
      }
    </>
  );
};

export default OutProjectChint;
