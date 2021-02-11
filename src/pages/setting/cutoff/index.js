import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Button,
  CardContent,
  DialogActions,
  FormHelperText,
  FormControl,
  Box,
  Paper,
  Grid,
  makeStyles,
  Card,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";

import FormSelectAllSite from "@components/FormSelectAllSIte";
import { apiGetCutoff, apiAddCutoff } from "@helpers/api/apt2";

const useStyles = makeStyles(() => ({
  root: {
    width: "50%",
    overflowX: "auto",
    marginTop: 20,
  },
  table: {
    minWidth: 40,
    minHeight: 40,
  },
  tableFont: {
    fontSize: 30,
  },
}));

const CostumeField = ({ name, required, control, errors }) => {
  return (
    <Grid item sm={11} xs={12}>
      <Controller
        as={TextField}
        name={name}
        id={name}
        control={control}
        variant="outlined"
        fullWidth
        label={required ? `${name.toUpperCase()} *` : name.toUpperCase()}
        error={errors[name] ? true : false}
        helperText={errors[name] ? errors[name]["message"] : ""}
        rules={
          required && {
            required: "This is required",
          }
        }
      />
    </Grid>
  );
};

const defaultValues = {
  vsat_off: "",
  vsat_on: "",
  bts_off: "",
  bts_on: "",
};

const InfoTable = ({ data }) => {
  const classes = useStyles();
  return (
    <div style={{ width: "50%" }}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableFont}>Site</TableCell>
            <TableCell className={classes.tableFont}>{data.site}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.tableFont}>Ip</TableCell>
            <TableCell className={classes.tableFont}>{data.ip}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.tableFont}>Vsat Off</TableCell>
            <TableCell className={classes.tableFont}>{data.vsat_off}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.tableFont}>Vsat On</TableCell>
            <TableCell className={classes.tableFont}>{data.vsat_on}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.tableFont}>Bts Off</TableCell>
            <TableCell className={classes.tableFont}>{data.bts_off}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.tableFont}>Bts On</TableCell>
            <TableCell className={classes.tableFont}>{data.bts_on}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  );
};

const index = () => {
  const [disable, setDisable] = useState(true);
  const [info, setInfo] = useState(false);
  const { handleSubmit, control, errors, setValue } = useForm({
    defaultValues,
    // criteriaMode: "all",
  });
  const form = [
    { name: "vsat_off", required: true },
    { name: "vsat_on", required: true },
    { name: "bts_off", required: true },
    { name: "bts_on", required: true },
  ];

  const saveData = (data) => {
    const newData = { ...data, site: data.site.site, ip: data.site.ip };
    const obj = Object.keys(info);
    let count = 0;
    obj.forEach((el) => {
      if (info[el] != newData[el]) {
        const value = +newData[el];
        if (Number.isInteger(value)) {
          console.log(Number.isInteger(newData[el]));
          count++;
        }
      }
    });
    if (!info) {
      const obj1 = Object.keys(newData);
      obj1.forEach((el) => {
        const value = +newData[el];
        if (Number.isInteger(value)) {
          console.log(Number.isInteger(newData[el]));
          count++;
        }
      });
    }
    console.log(count);
    if (count != 0) {
      setInfo(newData);
      const add = apiAddCutoff({ ...data, site: data.site.site });
      add.then((e) => console.log(e)).catch((err) => console.log(err));
    }
  };

  const getData = (data) => {
    if (data) {
      setDisable(true);
      const get = apiGetCutoff(data.site);
      get
        .then((e) => {
          if (e.data.length > 0) {
            setValue("vsat_off", e.data[0].vsat_off || "");
            setValue("vsat_on", e.data[0].vsat_on || "");
            setValue("bts_off", e.data[0].bts_off || "");
            setValue("bts_on", e.data[0].bts_on || "");
            setInfo({
              site: data.site,
              ip: data.ip,
              vsat_off: e.data[0].vsat_off,
              vsat_on: e.data[0].vsat_on,
              bts_off: e.data[0].bts_off,
              bts_on: e.data[0].bts_on,
            });
          } else {
            setValue("vsat_off", "");
            setValue("vsat_on", "");
            setValue("bts_off", "");
            setValue("bts_on", "");
            setInfo(false);
          }
          setDisable(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <form onSubmit={handleSubmit((data) => saveData(data))}>
      <Box
        display="flex"
        flexDirection="row"
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <div style={{ width: "50%" }}>
          <Grid container spacing={4} direction="column">
            <FormSelectAllSite
              name="site"
              errors={errors}
              required={true}
              control={control}
              getData={getData}
            />
            {form.map((index) => {
              return (
                <CostumeField
                  key={index.name}
                  name={index.name}
                  required={index.required}
                  errors={errors}
                  control={control}
                />
              );
            })}
            <Grid item sm={11} xs={12}>
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  disabled={disable}
                >
                  Save changes
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </div>

        {info && <InfoTable data={info} />}
      </Box>
    </form>
  );
};

export default index;
