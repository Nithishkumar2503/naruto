interface Props {
  name?: string;
  classes?: string;
  disable?: boolean;
  onClick?:(() => void | undefined) | undefined
  
}
const submitButton = ({ name = "Submit", classes, disable,onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      aria-disabled={disable}
      className={classes + ` bg-primary text-center cursor-pointer hover:scale-105 shadow p-2 px-4 text-white rounded-lg`}
    >
      {name}
    </div>
  );
};

export default submitButton;
