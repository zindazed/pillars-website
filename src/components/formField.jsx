import React from 'react'
import TextField from '@mui/material/TextField'

export default function CustomFormField(props) {
  if (props.isTextAreat === 'false') {
    return (
      <div>
        <TextField
          className="field"
          color="info"
          margin="dense"
          id={props.name}
          label={props.label}
          type={props.type}
          fullWidth
          variant="standard"
          defaultValue={props.value}
          required={props.required === true ? true : false}
          // error={props.required === true ? props.value.trim() === '' : false}
          // helperText={
          //   props.required === true
          //     ? props.value.trim() === ''
          //       ? 'this field is required'
          //       : ''
          //     : ''
          // }
          onChange={props.handleChange}
          inputProps={{ maxLength: 50 }}
          placeholder={props.placeholder}
        />
      </div>
    )
  } else {
    return (
      <div>
        <TextField
          className="field"
          color="info"
          margin="dense"
          id={props.name}
          label={props.label}
          fullWidth
          variant="standard"
          multiline
          rows={3}
          value={props.value}
          required={props.required === true ? true : false}
          onChange={props.handleChange}
          inputProps={{ maxLength: 500 }}
        />
      </div>
    )
  }
}
