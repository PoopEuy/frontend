import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

const NojsSelect = ({ control, dataApt1Nojs, errors }) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(dataApt1Nojs);
  }, [dataApt1Nojs]);

  return (
    <>
      {state && (
        <Controller
          render={({ onChange, ...props }) => (
            <Grid item sm={6} xs={12}>
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
                    label="NOJS"
                    variant="outlined"
                    error={errors.nojs ? true : false}
                    helperText={errors.nojs && errors.nojs.message}
                  />
                )}
                onChange={(e, data) => onChange(data)}
                {...props}
              />
            </Grid>
          )}
          onChange={([, data]) => data}
          defaultValue={null}
          name="nojs"
          control={control}
          rules={{
            required: "This is required",
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt1Nojs: state.DataApt1Nojs.dataApt1Nojs,
  };
};

export default connect(mapStateToProps, null)(NojsSelect);
