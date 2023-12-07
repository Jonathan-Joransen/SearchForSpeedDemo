import React from 'react'
import CurrencyInput from 'react-currency-input-field';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';

export let CsvTextField = (props) => {
  return (
    <CurrencyInput
      prefix={props?.prefix}
      suffix={props?.suffix}
      ref={props?.reference}
      className={props.className}
      id={props?.inputId}
      maxLength={props?.maxLength}
      name={props?.inputName}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      allowDecimals={false}
      allowNegativeValue={false}
      onValueChange={props.onChange}
      disableGroupSeparators={props?.disableSeparator}
    />
  );
}

export let AutoFillDropdown = (props) => {
  return (
    <Autocomplete
      ref={props?.reference}
      value={props?.val}
      freeSolo
      id="combo-box-demo"
      options={[...props.options]}
      getOptionLabel={label => label}
      onChange={props.onChange}
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField
      sx={{
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              border: props.border,
              borderRadius: "25px",
              boxShadow: "0 0.25em 1em rgb(0 0 0 / 10%)"
            }
          }
        }}
        {...params}
        placeholder={props.placeholder} />}
    />)
}