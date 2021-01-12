import { useEffect, useState } from "react";
import { apt2ApiCapacity } from "@helpers/api/apt2";
import jsonToTable from "@helpers/jsonToTable";
import TableComponent from "@components/TableComponent";

const Apt2Noc = () => {
  const [dataTable, setDataTable] = useState({
    data: { columns: [], data: [] },
    error: false,
  });

  useEffect(() => {
    apt2ApiCapacity()
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
          title="CAPACITY"
          maxTable={600}
        />
      )}
    </>
  );
};

export default Apt2Noc;
