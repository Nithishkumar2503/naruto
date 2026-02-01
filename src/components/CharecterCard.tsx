import swipeImage from "./SwipeImage";

export interface CharacterProps {
  name?: string;
  images?: string[];
  id?: string | number;
  item?: number[];
}
function characterCard({ id, name, images = [] }: CharacterProps) {
  return (
    <a href={`/characters/${id}`} className="block group">
      <div
        className={`relative overflow-hidden rounded-2xl  bg-secondary shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl  lg:w-56 w-80 h-56 mx-auto ${
          images.length === 0 ? "flex items-center justify-center" : ""
        }`}
      >
        {images?.length > 0 && (
          <div className="h-[75%] w-full overflow-hidden">
            <div className="group-hover:scale-105 transition-transform duration-500">
              {swipeImage(images)}
            </div>
          </div>
        )}

        <h1
          className={`text-center font-semibold tracking-wide  rounded-xl px-3 py-2 text-white ${
            images.length === 0 ? " mx-3" : "backdrop-blur-sm m-2  bg-primary"
          }`}
        >
          {name}
        </h1>
      </div>
    </a>
  );
}

export default characterCard;
