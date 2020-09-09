import React, { useState } from "react";
import {
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Paper,
  makeStyles,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import ButtonComponent from "@components/ButtonComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 9,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const CostumeDateTime = ({
  name,
  errors,
  min,
  max,
  onAccept,
  control,
  required,
}) => {
  return (
    <Grid item sm={6} xs={12}>
      <Controller
        name={name}
        control={control}
        rules={
          required && {
            required: "This is required",
          }
        }
        as={
          <DatePicker
            inputVariant="outlined"
            fullWidth
            label={name.toUpperCase()}
            ampm={false}
            onAccept={onAccept}
            minDate={min}
            maxDate={max}
            showTodayButton
            format="yyyy-MM-dd"
            // format="yyyy-MM-dd HH:mm"
            error={errors[name] ? true : false}
            helperText={errors[name] && errors[name]["message"]}
          />
        }
      />
    </Grid>
  );
};

const CostumeRadioButton = ({ name, onClick, control, value }) => {
  return (
    <Grid item sm={6} xs={12}>
      <Controller
        name={name}
        control={control}
        name="radioButton"
        as={
          <FormControl component="fieldset">
            <RadioGroup row aria-label="radioButton" value={value}>
              {name.map((data) => {
                return (
                  <FormControlLabel
                    value={data}
                    key={data}
                    control={<Radio color="primary" onClick={onClick} />}
                    label={data.toUpperCase()}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        }
      />
    </Grid>
  );
};
let defaultValues = {
  start: null,
  end: null,
  radioButton: null,
};

export const FormPickupServiceCall = ({ submit, loading }) => {
  const { handleSubmit, control, errors, setValue } = useForm({
    defaultValues,
    criteriaMode: "all",
  });
  const [minmax, setMinMax] = useState({
    max: null,
    min: null,
    radio: null,
  });

  const radio = ["1week", "2week", "1month"];
  const classes = useStyles();

  function handleClick(event) {
    setMinMax({
      ...minmax,
      radio: event.target.value,
    });
    setValue("start", null);
    setValue("end", null);
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Paper elevation={4}>
        <Grid className={classes.root} container justify="center" spacing={1}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CostumeDateTime
              name="start"
              errors={errors}
              onAccept={(data) => {
                setMinMax({
                  ...minmax,
                  min: data,
                  radio: null,
                });
                setValue("radioButton", null);
              }}
              max={minmax.max}
              control={control}
              required={
                minmax.radio == null
                  ? true
                  : minmax.start == null && minmax.radio == null
                  ? true
                  : minmax.end == null && minmax.radio == null
                  ? true
                  : false
              }
            />
            <CostumeDateTime
              name="end"
              errors={errors}
              onAccept={(data) => {
                setMinMax({
                  ...minmax,
                  max: data,
                  radio: null,
                });
                setValue("radioButton", null);
              }}
              min={minmax.min}
              control={control}
              required={
                minmax.radio == null
                  ? true
                  : minmax.start == null && minmax.radio == null
                  ? true
                  : minmax.end == null && minmax.radio == null
                  ? true
                  : false
              }
            />
          </MuiPickersUtilsProvider>

          <CostumeRadioButton
            name={radio}
            onClick={handleClick}
            control={control}
            value={minmax.radio}
          />
          <Grid item sm={6} xs={12}>
            <ButtonComponent loading={loading} type="submit">
              START
            </ButtonComponent>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};
