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
  error: "",
};

const CostumeField = ({ name, required, control, errors }) => {
  return (
    <Box p={1} style={{ minWidth: 250 }}>
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
    </Box>
  );
};

const FormSericeCalls = ({ value, submit }) => {
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm({
    defaultValues: value ? value : defaultValues,
    criteriaMode: "all",
  });

  const textField = [{ name: "error", required: true }];

  return (
    <form className={classes.root} onSubmit={handleSubmit(submit)}>
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={1}
        // bgcolor="red"
        alignContent="between"
      >
        {textField.map((field) => {
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
      </Box>

      <DialogActions>
        <Button type="submit" fullWidth variant="contained" color="secondary">
          Save changes
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormSericeCalls;
