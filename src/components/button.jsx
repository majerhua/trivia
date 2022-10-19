import './button.css';

const Button = ({text, handleClick}) => {

  return (
    <button className="button" type="submit" onClick={handleClick}>{text}</button>
  )
}

export default Button;