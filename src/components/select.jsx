import React, { useState } from 'react';
import '../css/components/input.css';

const Select = ({label, name, register, errors}) => {

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const options = [
    {
      label: "Documento nacional",
      value: 1,
    },
    {
      label: "Documento de extranjeria",
      value: 2,
    }
  ];  

  return (
    <div className="container-field">
      <p className="mt-1">{label}</p>
      <div>
        <select {...register(name)} errors={errors}>
          <option value="">--Seleccionar--</option>
          {options.map((option, index) => (
            <option key={index + 1}  value={option.value}>{option.label}</option>
          ))}
        </select>
        <p className="error">{errors[name]?.message}</p>
      </div>
    </div>
  );
}

export default Select;