import './input.css';

const Input = ({label, name, register, errors}) => {
  return (
    <div className="container-field">
      <p>{label}</p>
      <div>
        <input type="text" {...register(name)}/>
        <p className="error">{errors[name]?.message}</p>
      </div>
    </div>
  );
}

export default Input;