import React, { useState } from 'react';

const Radio = ({label, name, register, errors}) => {

  const [isSuscriptor, setIsSuscriptor] = useState('0');

  const onChangeValue = (event) => {
    setIsSuscriptor(event.target.value);
  }

  return (
    <div className="container-field" onChange={onChangeValue}>
      <p>{label}</p>
      <div className="container-radio">
        <div>
          <input type="radio" id="yes" value="1" checked={isSuscriptor==='1'} {...register(name)}errors={errors}/>
          <label htmlFor="yes">Si</label>
        </div>
        <div>
          <input type="radio" id="no" value="0" checked={isSuscriptor==='0'} {...register(name)} errors={errors}/>
          <label htmlFor="no">No</label>
        </div>
      </div>
    </div>
  )
}

export default Radio;