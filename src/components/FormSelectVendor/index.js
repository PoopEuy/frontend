import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

const VendorSelect = ({
  control,
  dataVendor,
  errors,
  name,
  required,
  value,
}) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(dataVendor);
  }, [dataVendor]);

  const df = { id: 1, name: "ado", pt: "Valtel" };
  return (
    <>
      {state && (
        <Controller
          render={({ onChange, ...props }) => (
            <Grid item sm={6} xs={12}>
              <Autocomplete
                options={state}
                getOptionLabel={(option) => `${option.name} - ${option.pt}`}
                getOptionSelected={(option) =>
                  `${option.nojs} - ${option.site}`
                }
                renderOption={(option) => (
                  <span>
                    {option.name} - {option.pt}
                  </span>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={name.toUpperCase()}
                    variant="filled"
                    error={required && (errors[name] ? true : false)}
                    helperText={
                      required && errors[name] && errors[name]["message"]
                    }
                  />
                )}
                onChange={(e, data) => onChange(data)}
                {...props}
              />
            </Grid>
          )}
          onChange={([, data]) => data}
          defaultValue={null}
          name={name}
          control={control}
          rules={
            required && {
              required: "This is required",
            }
          }
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dataVendor: state.Setting.vendor,
  };
};

export default connect(mapStateToProps, null)(VendorSelect);
