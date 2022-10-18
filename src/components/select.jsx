import React, { useState } from 'react';

const Select = ({label, name, register, errors}) => {

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const options = [
    {
      label: "DNI",
      value: 1,
    },
    {
      label: "Pasaporte",
      value: 2,
    }
  ];  

  return (
    <div>
      <label>{label}</label>
      <select {...register(name)} errors={errors}>
        <option value="">--Seleccionar--</option>
        {options.map((option, index) => (
          <option key={index + 1}  value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;