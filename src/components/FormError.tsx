interface Props {
  error?: string;
}
const formError = ({ error }: Props) => {
  return (
    error&& <h1 className="text-rose-500  text-sm pt-1">{error}</h1>
  );
};

export default formError;
