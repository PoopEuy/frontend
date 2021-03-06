import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Button,
  InputLabel,
  DialogActions,
  FormHelperText,
  FormControl,
  Box,
  Grid,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import FormSelectVendor from "@components/FormSelectVendor";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // marginBottom: theme.spacing(2),
    },
  },
}));

const defaultValues = {
  nojs: "",
  site: "",
  provinsi: "",
  lc: "",
  ip: "",
  latitude: "",
  longitude: "",
  id_lvd_vsat: "",
  id_ping: "",
  id_batt_volt: "",
  id_vsat_curr: "",
  id_bts_curr: "",
  darat: "",
  laut: "",
  udara: "",
};

const CostumeField = ({ name, required, control, errors }) => {
  return (
    <Grid item sm={6} xs={12}>
      <Controller
        as={TextField}
        name={name}
        id={name}
        control={control}
        variant="filled"
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

const CostumeSelect = ({ name, values, control, errors, required }) => {
  return (
    <Grid item sm={6} xs={12}>
      <FormControl variant="filled" fullWidth>
        <InputLabel>
          {required ? `${name.toUpperCase()} *` : name.toUpperCase()}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          rules={
            required && {
              required: "This is required",
            }
          }
          as={
            <Select error={errors[name] ? true : false}>
              {values.map((value, i) => {
                return (
                  <MenuItem key={i} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          }
        />
        {errors[name] && (
          <FormHelperText>{errors[name]["message"]}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

const FormNojs = ({ value, submit, loading }) => {
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm({
    defaultValues: value ? value : defaultValues,
    criteriaMode: "all",
  });

  const lc = ["TELKOM", "IFORTE", "PSN", "IPT"];
  const mitra = ["Valtel", "Ecom", "Abbasy", "Fastech", "Lindu"];

  const textField1 = [
    { name: "nojs", required: true },
    { name: "site", required: true },
    { name: "provinsi", required: false },
  ];

  const textField2 = [
    { name: "ip", required: true },
    { name: "latitude", required: false },
    { name: "longitude", required: false },
    { name: "id_lvd_vsat", required: false },
    { name: "id_ping", required: false },
    { name: "id_batt_volt", required: false },
    { name: "id_vsat_curr", required: false },
    { name: "id_bts_curr", required: false },
    { name: "darat", required: false },
    { name: "laut", required: false },
    { name: "udara", required: false },
  ];
  const textSelect = [{ name: "lc", data: lc, required: true }];

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container justify="flex-start" spacing={1}>
        {textField1.map((field) => {
          return (
            <CostumeField
              key={field.name}
              name={field.name}
              control={control}
              errors={errors}
              required={field.required}
            />
          );
        })}
        {textSelect.map((field) => {
          return (
            <CostumeSelect
              key={field.name}
              name={field.name}
              values={field.data}
              control={control}
              errors={errors}
              required={field.required}
            />
          );
        })}
        <FormSelectVendor
          control={control}
          errors={errors}
          name="mitra"
          required={false}
        />

        <FormSelectVendor
          control={control}
          errors={errors}
          name="gs"
          required={false}
        />
        {textField2.map((field) => {
          return (
            <CostumeField
              key={field.name}
              name={field.name}
              control={control}
              errors={errors}
              required={field.required}
            />
          );
        })}
      </Grid>

      <DialogActions>
        <Button type="submit" fullWidth variant="contained" color="secondary">
          Save changes
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormNojs;
