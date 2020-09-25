import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Checkbox } from "@material-ui/core";

const AutoComplateMultiple = ({
  items,
  selectedValues,
  selectAllLabel,
  noOptionsText,
  limitTags,
  onToggleOption,
  onClearOptions,
  onSelectAll,
  getOptionLabel,
  errors,
}) => {
  const allSelected = items.length === selectedValues.length;
  const handleToggleSelectAll = () => {
    onSelectAll && onSelectAll(!allSelected);
  };

  const handleChange = (event, selectedOptions, reason) => {
    if (reason === "select-option" || reason === "remove-option") {
      if (selectedOptions.find((option) => option.site === "select-all")) {
        handleToggleSelectAll();
      } else {
        onToggleOption && onToggleOption(selectedOptions);
      }
    } else if (reason === "clear") {
      onClearOptions && onClearOptions();
    }
  };

  const optionRenderer = (option, { selected }) => {
    const selectAllProps =
      option.site === "select-all" ? { checked: allSelected } : {};
    return (
      <>
        <Checkbox
          color="primary"
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={selected}
          {...selectAllProps}
        />
        {getOptionLabel(option)}
      </>
    );
  };
  const inputRenderer = (params) => (
    <TextField
      {...params}
      label="NOJS"
      variant="outlined"
      error={errors.nojsMultiple ? true : false}
      helperText={errors.nojsMultiple && "This is required"}
    />
  );
  const getOptionSelected = (option, anotherOption) =>
    option.site === anotherOption.site;
  const filter = createFilterOptions();

  return (
    <Autocomplete
      multiple
      size="medium"
      limitTags={limitTags}
      options={items}
      value={selectedValues}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      noOptionsText={noOptionsText}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return [{ site: selectAllLabel, site: "select-all" }, ...filtered];
      }}
      onChange={handleChange}
      renderOption={optionRenderer}
      renderInput={inputRenderer}
    />
  );
};

AutoComplateMultiple.defaultProps = {
  limitTags: 2,
  items: [],
  selectedValues: [],
  getOptionLabel: (value) => value,
};

export default AutoComplateMultiple;
