import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import DetailsIcon from "@material-ui/icons/Details"; //material ui icons
import CheckIcon from "@material-ui/icons/Check"; //material ui icons
import CloseIcon from "@material-ui/icons/Close"; //material ui icons
import AddIcon from "@material-ui/icons/Add";

//components OR parts local
import TableComponent from "@components/TableComponent";

import jsonToTable from "@helpers/jsonToTable";
import FormTicket from "@parts/FormTicket";
import OpenDialog from "@components/OpenDialog";
import TooltipComponent from "@components/TooltipComponent";

import Swal from "sweetalert2"; //sweetalert2
import Link from "next/link";
const Index = ({
  getTicket,
  editTicket,
  addTicket,
  dataTicket,
  titleTable,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState(false);
  const [dataTable, setDataTable] = useState({
    data: false,
    error: false,
  });
  const [records, setRecords] = useState(false);

  const handleClick = (title) => {
    setTitleDialog(title);
    setOpenDialog(true);
  };

  const handleClosed = async (id) => {
    const closeTicket = await editTicket(id);
    console.log(closeTicket);
    if (closeTicket.status === "success") {
      Swal.fire("success!", "Ticket Berhasil Di Tutup!", "success");
      await getTicket().then((e) => {
        const res = jsonToTable(e.data);
        setDataTable({
          data: { ...dataTable.data, data: res.data },
          error: false,
        });
      });
    } else {
      Swal.fire("error!", "Progress Belum Selesai", "error");
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

  const submit = async (data) => {
    const site = data.site.site;
    const note = data.note;
    await addTicket({ site, note })
      .then(async (result) => {
        if (result.status == "success") {
          Swal.fire("success!", "Ticket Tersimpan!", "success");
          await getTicket().then((e) => {
            const res = jsonToTable(e.data);
            setDataTable({
              data: { ...dataTable.data, data: res.data },
              error: false,
            });
          });
          setOpenDialog(false);
        } else {
          Swal.fire("error!", "Ticket Belum Selesai!", "error");
          setOpenDialog(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (dataTicket && dataTicket.length > 0) {
      const result = jsonToTable(dataTicket);
      result.columns.push({
        name: "id",
        label: "DETAIL",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value) => {
            return (
              <TooltipComponent title={`ACTION ${value}`} color="inherit">
                <Link href="/ticket/[id]" as={`/ticket/${value}`}>
                  <DetailsIcon />
                </Link>
              </TooltipComponent>
            );
          },
        },
      });

      result.columns.push({
        name: "id",
        label: "CLOSE",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, data) => {
            if (data["rowData"][6] == "CLOSE") {
              return <CloseIcon />;
            }
            return (
              <TooltipComponent
                title={`CLOSE ${value}`}
                onClick={() => handleClosed(value)}
                color="inherit"
              >
                <CheckIcon />
              </TooltipComponent>
            );
          },
        },
      });
      setDataTable({
        data: result,
        error: false,
      });
    } else {
      setDataTable({
        data: { data: [], columns: [] },
        error: false,
      });
    }
  }, [dataTicket]);

  return (
    <>
      <TableComponent
        dataTable={dataTable.data}
        error={dataTable.error}
        title={titleTable}
        customToolbar={customToolbar}
        maxTable={710}
      />
      <OpenDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={titleDialog}
      >
        <FormTicket submit={(data) => submit(data)} value={records} />
      </OpenDialog>
    </>
  );
};

Index.propTypes = {
  titleTable: PropTypes.string.isRequired,
};

export default Index;
