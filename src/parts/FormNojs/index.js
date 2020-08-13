import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import asyncValidate from "./asyncValidate";
import { connect } from "react-redux";
import { Button, DialogActions } from "@material-ui/core";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["nojs", "site", "provinsi", "lc", "mitra", "ip"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    fullWidth={true}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl fullWidth={true} error={touched && error}>
    <InputLabel htmlFor="formselect">{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: "form",
        id: "formselect",
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

const useStyles = makeStyles({
  spasi: {
    marginBottom: 12,
  },
});

function MaterialUiForm(props) {
  const classes = useStyles();
  const { handleSubmit, pristine, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="nojs" component={renderTextField} label="NOJS" />
      <Field name="site" component={renderTextField} label="SITE" />
      <Field name="provinsi" component={renderTextField} label="PROVINSI" />

      <Field
        classes={classes}
        name="lc"
        label="LC"
        component={renderSelectField}
      >
        <option value="" />
        <option value={"TELKOM"}>TELKOM</option>
        <option value={"IFORTE"}>IFORTE</option>
        <option value={"PSN"}>PSN</option>
        <option value={"IPT"}>IPT</option>
      </Field>

      <Field
        classes={classes}
        name="mitra"
        component={renderSelectField}
        label="MITRA"
      >
        <option value="" />
        <option value={"Valtel"}>Valtel</option>
        <option value={"Ecom"}>Ecom</option>
        <option value={"Abbasy"}>Abbasy</option>
        <option value={"Fastech"}>Fastech</option>
        <option value={"Lindu"}>Lindu</option>
      </Field>

      <Field name="ip" component={renderTextField} label="IP" />
      <Field name="latitude" component={renderTextField} label="LATITUDE" />
      <Field name="longitude" component={renderTextField} label="longitude" />
      <Field name="id_lvdvsat" component={renderTextField} label="id_lvdvsat" />
      <Field name="id_ping" component={renderTextField} label="id_ping" />
      <Field name="id_batvolt" component={renderTextField} label="id_batvolt" />
      <Field
        name="id_vsatcurr"
        component={renderTextField}
        label="id_vsatcurr"
      />

      <Field name="id_btscurr" component={renderTextField} label="id_btscurr" />

      <DialogActions>
        <Button
          type="submit"
          disabled={pristine || submitting}
          variant="contained"
          // onClick={handleClose}
          color="primary"
        >
          Save changes
        </Button>
      </DialogActions>
    </form>
  );
}

const mapStateToProps = ({ DataApt1Nojs }) => {
  const data = DataApt1Nojs.dataApt1NojsDetail;
  return {
    initialValues: {
      nojs: data.nojs,
      site: data.site,
      provinsi: data.provinsi,
      lc: data.lc,
      mitra: data.mitra,
      ip: data.ip,
      langitude: data.langitude,
      id_lvdvsat: data.id_lvdvsat,
      id_ping: data.id_ping,
      id_batvolt: data.id_batvolt,
      id_vsatcurr: data.id_vsatcurr,
      id_btscurr: data.id_btscurr,
    },
  };
};

MaterialUiForm = reduxForm({
  form: "MaterialUiForm",
  validate,
  asyncValidate,
  enableReinitialize: true,
})(MaterialUiForm);

export default connect(mapStateToProps, null)(MaterialUiForm);
