import cl from "classnames";

interface IButton {
  handleClick?: () => void;
  classNames?: string;
  title?: string;
}

export const Button = ({ handleClick, classNames, title }: IButton) => {
  return (
    <button
      className={cl(
        "flex items-center justify-center w-full py-2 text-white bg-darkGreen rounded-xl text-[30px] font-normal",
        classNames
      )}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
