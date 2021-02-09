import { useEffect, useState } from "react";
import jsonToTable from "@helpers/jsonToTable";
import TableComponent from "@components/TableComponent";

const ApiToTable = ({ api, title }) => {
  const [dataTable, setDataTable] = useState({
    data: { columns: [], data: [] },
    error: false,
  });

  useEffect(() => {
    api()
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
          title={title}
          maxTable={700}
        />
      )}
    </>
  );
};

export default ApiToTable;
