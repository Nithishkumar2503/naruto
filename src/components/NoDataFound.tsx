interface Props {
  imagePath?: string;
  title?: string;
  description?: string;
  actionButton?: string;
  onDispatch?: () => void;
}
const noDataFound = ({
  description,
  imagePath,
  title,
  actionButton,
  onDispatch,
}: Props) => {
  return (
    <div className="h-[75vh]  content-center items-center ">
      <div className="w-[40vw] h-[40vh]  my-auto  p-2 items-center content-center ">
        <img
          className="w-ful object-coverl h-80 mx-auto py-2"
          src={imagePath}
          alt="No image"
        />
        <h1 className="text-center py-2">{title}</h1>
        <h2 className="text-center py-2">{description}</h2>
      </div>
      {actionButton && (
        <div className="w-full flex justify-center">
          <button
            onClick={() => {
              if (typeof onDispatch === "function") onDispatch();
            }}
            className="px-4 py-2  rounded-lg mx-auto  shadow-lg cursor-pointer shadow-red-600 bg-primary text-white hover:scale-105"
          >
            {actionButton || "Submit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default noDataFound;
