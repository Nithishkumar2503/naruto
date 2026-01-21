import { FormLabel } from ".";


interface Props {
  value?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  disable?: boolean;
  onChange?: (val: any) => void;
  onDispatch?: (val: string) => void;
  onInput?: () => void;
  autofocus?: boolean;
  mandatory?: boolean;
  optional?: boolean;
  string?: string;
  id?: string;
  classes?: string;
  maxLength?: number;
}

const inputText = ({
  label,
  autofocus,
  disable,
  mandatory,
  name,
  onChange,
  optional,
  placeholder,
  value,
  id,
  classes,
  onDispatch,
  maxLength,
}: Props) => {
  const onInput: (val: React.ChangeEvent<HTMLTextAreaElement>) => void = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (typeof onDispatch == "function") onDispatch(event?.target?.value);
  };
  return (
    <div>
      <FormLabel label={label} optional={optional} mandatory={mandatory} />
      <textarea
        maxLength={maxLength}
        className={`${classes} min-h-30 max-h-auto w-full bg-gray-100 p-2 text-sm text-gray-700 border border-primary rounded-md 
         focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary
         transition`}
        id={id}
        name={name}
        disabled={disable}
        autoFocus={autofocus}
        onInput={onInput}
        value={value}
        placeholder={placeholder}
        onChange={(val) => {
          if (typeof onChange == "function") onChange(val);
        }}
      />
    </div>
  );
};
export default inputText;
