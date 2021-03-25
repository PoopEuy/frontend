import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  apiGetProgress,
  apiGetTicket,
  apiAddProgress,
  apiPutProgress,
} from "@helpers/api/apt2";
import TableComponent from "@components/TableComponent";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import TooltipComponent from "@components/TooltipComponent";
import AddIcon from "@material-ui/icons/Add";
import OpenDialog from "@components/OpenDialog";
import FormProgress from "@parts/FormProgress";
import jsonToTable from "@helpers/jsonToTable";
import Swal from "sweetalert2"; //sweetalert2
import CheckIcon from "@material-ui/icons/Check"; //material ui icons
import CloseIcon from "@material-ui/icons/Close"; //material ui icons

const groups = [
  { id: 4, title: "TICKET" },
  { id: 1, title: "Sundaya", bgColor: "#efd788" },
  { id: 2, title: "OM" },
  { id: 3, title: "OTHER" },
];

const dataToProgress = (datas, string) => {
  const result = [];
  datas.forEach((data, i) => {
    const start_time = new Date(data[`${string}_open`]).getTime();
    const end_time =
      data[`${string}_closed`] == "-"
        ? new Date().getTime()
        : new Date(data[`${string}_closed`]).getTime();

    result.push({
      id: i + 2,
      group: data.group,
      title: data.title,
      start_time,
      end_time,
    });
  });
  return result;
};

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [openDialog, setOpenDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState(false);
  const [records, setRecords] = useState(false);
  const [dataTable, setDataTable] = useState({
    error: false,
    data: false,
  });
  const [items, setItems] = useState([]);

  const getData = async () => {
    const progress = await apiGetProgress({ ticket_id: id });
    const ticket = await apiGetTicket({ id });
    const tables = jsonToTable(progress.data);
    tables.length != 0 &&
      tables.columns.push({
        name: "id",
        label: "CLOSE",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, data) => {
            if (data["rowData"][7] == "CLOSE") {
              return <CloseIcon />;
            }
            return (
              <TooltipComponent
                title={`ACTION ${value}`}
                onClick={() => handleClosed(value, data)}
                color="inherit"
              >
                <CheckIcon />
              </TooltipComponent>
            );
          },
        },
      });

    const progressData = dataToProgress(progress.data, "progress");
    let progressTiket = dataToProgress(ticket.data, "ticket");
    progressTiket[0]["id"] = 1;
    progressTiket[0]["group"] = 4;
    progressTiket[0]["title"] = "Ticket";
    setDataTable({
      error: false,
      data: tables,
    });
    setItems([...progressData, ...progressTiket]);
  };

  useEffect(() => {
    id && getData();
  }, [id]);

  const handleClick = (title) => {
    setTitleDialog(title);
    setOpenDialog(true);
  };

  const handleClosed = async (value, data) => {
    const putProgress = await apiPutProgress(value);
    if (putProgress.status === "success") {
      Swal.fire(
        "success!",
        `Progress ${data["rowData"][2]} Telah Selesai`,
        "success"
      );
      getData();
    }
  };

  const submit = async (data) => {
    const addProgress = await apiAddProgress({ ticket_id: id, ...data });
    if (addProgress.status == "error") {
      setOpenDialog(false);
      Swal.fire("error!", "Progress Sebelumnya Belum Selesai!", "error");
    } else {
      setOpenDialog(false);
      Swal.fire("success!", "Progress Baru Dibuat!", "success");
      getData();
    }
  };

  const customToolbar = () => {
    return (
      <TooltipComponent
        title="Add Ticket"
        onClick={() => handleClick("ADD TICKET")}
        color="inherit"
      >
        <AddIcon />
      </TooltipComponent>
    );
  };

  return (
    <>
      {items && (
        <div style={{ marginBottom: 40 }}>
          <Timeline
            groups={groups}
            items={items}
            defaultTimeStart={moment().add(-2, "day")}
            defaultTimeEnd={moment().add(2, "day")}
          />
        </div>
      )}
      <TableComponent
        dataTable={dataTable.data}
        error={dataTable.error}
        title={"Progress"}
        customToolbar={customToolbar}
        maxTable={710}
      />
      <OpenDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={titleDialog}
      >
        <FormProgress submit={(data) => submit(data)} value={records} />
      </OpenDialog>
    </>
  );
};

export default Index;
