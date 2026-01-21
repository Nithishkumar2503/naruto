import swipeImage from "./SwipeImage";

export interface CharacterProps {
  name?: string;
  images?: string[];
  id?: string|number;
  item?: number[];
}
function characterCard({ id, name, images = [] }: CharacterProps) {
  return (
    
    <a href={"/characters/" + id}>
      <div className={`items-center ${images.length==0? "content-center":"" }   shadow-lg  bg-white cursor-pointer  hover:scale-105 rounded-lg  lg:w-56 w-80 bg-whiteo  h-56   mx-auto`}>
        {images?.length > 0 && swipeImage(images)}
        <h1 className="font-semibold  mb- p-2 text-center my-auto text-black">
          {name}
        </h1>
      </div>
    </a>
  );
}

export default characterCard;
 