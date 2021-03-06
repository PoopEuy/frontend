import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import AutoComplateMultiple from "./autoComplateMultiple";

// const options = [
//   { label: "foo", value: "foo" },
//   { label: "bar", value: "bar" },
//   { label: "jar", value: "jar" },
//   { label: "nar", value: "nar" },
//   { label: "mar", value: "mar" },
//   { label: "far", value: "far" },
// ];

const Multiple = ({ control, setValue, errors, dataNojs }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState(false);

  const getOptionLabel = (option) => `${option.site}`;
  const handleToggleOption = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setValue("nojsMultiple", selectedOptions);
  };
  const handleClearOptions = () => setSelectedOptions([]);

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedOptions(options);
      setValue("nojsMultiple", options);
    } else {
      handleClearOptions();
    }
  };

  useEffect(() => {
    setOptions(dataNojs);
  }, [dataNojs]);

  return (
    <>
      {options && (
        <Controller
          as={
            <Grid item sm={6} xs={12}>
              <AutoComplateMultiple
                items={options}
                getOptionLabel={getOptionLabel}
                selectedValues={selectedOptions}
                label="Select"
                placeholder="Placeholder for textbox"
                selectAllLabel="Select all"
                onToggleOption={handleToggleOption}
                onClearOptions={handleClearOptions}
                onSelectAll={handleSelectAll}
                errors={errors}
              />
            </Grid>
          }
          defaultValue={[]}
          name="nojsMultiple"
          control={control}
          rules={{
            validate: (value) => value.length != 0,
          }}
        />
      )}
    </>
  );
};

export default Multiple;
