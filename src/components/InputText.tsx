import { FormLabel } from ".";

type TextType = "text" | "tel" | "number";

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
  textType?: TextType;
  maxLength?: number;
  maxlimit?: number;
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
  textType = "text",
  maxLength,
  maxlimit,
}: Props) => {
  const onInput: (val: Event) => void = (event: Event) => {
    if (typeof onDispatch == "function") onDispatch(event?.target?.value);
  };
  return (
    <div>
      <FormLabel label={label} optional={optional} mandatory={mandatory} />
      <input
        maxLength={maxLength}
        max={maxlimit}
        className={`${classes} w-full bg-gray-100 p-2 text-sm text-gray-700 border border-primary rounded-md 
         focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary
         transition`}
        id={id}
        name={name}
        disabled={disable}
        autoFocus={autofocus}
        type={textType}
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
