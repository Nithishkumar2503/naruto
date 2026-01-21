
function swipeImage(images: string[]){
  return (
    <div className="flex overflow-x-clip bg-whiteo rounded-lg">
      <img
        key={images[0]}
        src={images[0] || "/no-image.png"}
        className="w-full h-44 object-cover rounded-t-lg"
        alt=""
      />
    </div>
  );
};

export default swipeImage