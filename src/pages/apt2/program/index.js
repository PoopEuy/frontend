import { useEffect, useState } from "react";
import { apt2ApiProgram } from "@helpers/api/apt2";
import jsonToTable from "@helpers/jsonToTable";
import TableComponent from "@components/TableComponent";

const Apt2Noc = () => {
  const [dataTable, setDataTable] = useState({
    data: { columns: [], data: [] },
    error: false,
  });

  useEffect(() => {
    apt2ApiProgram()
      .then((res) => {
        const data = jsonToTable(res.data.data);
        setDataTable({
          data: { columns: data.columns, data: data.data },
          error: false,
        });
      })
      .catch((error) => {
        setDataTable({
          ...dataTable,
          error: true,
        });
      });
  }, []);
  return (
    <>
      {dataTable && (
        <TableComponent
          dataTable={dataTable.data}
          error={dataTable.error}
          title="APT2 STATUS PROGRAM"
          maxTable={700}
        />
      )}
    </>
  );
};

export default Apt2Noc;
