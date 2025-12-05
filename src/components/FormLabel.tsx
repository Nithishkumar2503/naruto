interface Props {
  label?: string;
  optional?: boolean;
  mandatory?: boolean;
  uppercase?:boolean
}

const formLabel = ({ label, optional, mandatory,uppercase=false }: Props) => {
  return (
    <h1 className={`p-2 text-gray-500 font-serif  ${uppercase? "uppercase":""}`}>
      {label||''} 
      <span className=" ml-1 lowercase text-sm  text-gray-400">{optional? "optional":""}</span>
      <span className=" ml-1 lowercase text-sm  text-gray-400">{mandatory? "required":""}</span>
    </h1>
  );
};

export default formLabel;
