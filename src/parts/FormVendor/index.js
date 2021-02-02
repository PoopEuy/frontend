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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // marginBottom: theme.spacing(2),
    },
  },
}));

const defaultValues = {
  name: "",
  phone: "",
  pt: "",
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

const FormVendor = ({ value, submit, loading }) => {
  console.log(value);
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm({
    defaultValues: value ? value : defaultValues,
    criteriaMode: "all",
  });

  const textField1 = [
    { name: "name", required: true },
    { name: "phone", required: true },
    { name: "pt", required: true },
  ];

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
      </Grid>

      <DialogActions>
        <Button type="submit" fullWidth variant="contained" color="secondary">
          Save changes
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormVendor;
