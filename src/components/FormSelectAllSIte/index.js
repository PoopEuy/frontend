import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

const index = ({
  control,
  errors,
  name,
  required,
  dataApt1,
  dataApt1v3,
  dataApt2,
  getData,
}) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (dataApt1 && dataApt1v3 && dataApt2) {
      const a = [...dataApt1, ...dataApt1v3, ...dataApt2];
      setState(a);
    }
  }, [dataApt1, dataApt1v3, dataApt2]);

  return (
    <>
      {state && (
        <Controller
          render={({ onChange, ...props }) => (
            <Grid item sm={11} xs={12}>
              <Autocomplete
                options={state}
                getOptionLabel={(option) => `${option.nojs} - ${option.site}`}
                getOptionSelected={(option) =>
                  `${option.nojs} - ${option.site}`
                }
                renderOption={(option) => (
                  <span>
                    {option.nojs} - {option.site}
                  </span>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={name.toUpperCase()}
                    variant="outlined"
                    error={required && (errors[name] ? true : false)}
                    helperText={
                      required && errors[name] && errors[name]["message"]
                    }
                  />
                )}
                onChange={(e, data) => {
                  getData(data);
                  onChange(data);
                }}
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
    dataApt1: state.DataApt1Nojs.dataApt1Nojs,
    dataApt1v3: state.DataApt1v3.dataApt1v3Nojs,
    dataApt2: state.DataApt2Nojs.dataApt2Nojs,
  };
};

export default connect(mapStateToProps, null)(index);
