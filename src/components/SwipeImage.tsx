function swipeImage(images: string[]){
  const firstImage = images[0] || "/no-image.png";
  return (
    <img
      loading="lazy"
      src={firstImage}
      alt="Character"
      className="w-full h-44 object-cover rounded-t-lg"
    />
  );
};

export default swipeImage;
