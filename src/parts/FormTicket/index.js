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
import FormSelectAllSite from "@components/FormSelectAllSIte";

const defaultValues = {
  site: "",
  note: "",
};

const CostumeField = ({ name, required, control, errors }) => {
  return (
    <Grid item sm={12} xs={12}>
      <Controller
        as={TextField}
        name={name}
        id={name}
        control={control}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
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
  const { handleSubmit, control, errors } = useForm({
    defaultValues: value ? value : defaultValues,
    criteriaMode: "all",
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container justify="flex-start" spacing={1}>
        <FormSelectAllSite
          name="site"
          errors={errors}
          required={true}
          control={control}
        />

        <CostumeField
          name="note"
          control={control}
          errors={errors}
          required={false}
        />
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
