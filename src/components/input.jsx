import './input.css';

const Input = ({label, name, register, errors}) => {
  return (
    <div className="container-input">
      <label>{label}</label>
      <input {...register(name)}/>
      <p className="error">{errors[name]?.message}</p>
    </div>
  );
}

export default Input;