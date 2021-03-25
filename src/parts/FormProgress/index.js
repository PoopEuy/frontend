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
  group: "",
  title: "",
  note: "",
};

const CostumeField = ({
  name,
  required,
  control,
  errors,
  multiline = false,
}) => {
  return (
    <Grid item sm={12} xs={12}>
      <Controller
        as={TextField}
        name={name}
        id={name}
        control={control}
        variant="outlined"
        fullWidth
        multiline={multiline}
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

const CostumeSelect = ({ name, values, control, errors, required }) => {
  return (
    <Grid item sm={12} xs={12}>
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
            <Select error={errors[name] ? true : false} variant="outlined">
              {values.map((value, i) => {
                return (
                  <MenuItem key={i} value={value.value}>
                    {value.name}
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

const Index = ({ value, submit, loading }) => {
  const group = [
    { name: "Sundaya", value: 1 },
    { name: "OM", value: 2 },
    { name: "Other", value: 3 },
  ];

  const { handleSubmit, control, errors } = useForm({
    defaultValues: value ? value : defaultValues,
    criteriaMode: "all",
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container justify="flex-start" spacing={1}>
        <CostumeSelect
          name="group"
          values={group}
          control={control}
          errors={errors}
          required={true}
        />

        <CostumeField
          name="title"
          control={control}
          errors={errors}
          required={true}
        />
        <CostumeField
          name="note"
          control={control}
          errors={errors}
          required={false}
          multiline={true}
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

export default Index;
