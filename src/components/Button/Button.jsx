import css from './Button.module.css';

const Button = ({ text, clickHandle, disabled, isLoading }) => {
  return (
    <button
      type="button"
      onClick={clickHandle}
      className={isLoading ? css.visuallyHidden : css.buttonLoadMore}
      disabled={disabled}
    >
      {disabled ? 'No more images' : text}
    </button>
  );
};

export default Button;
