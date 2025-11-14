let mainItem = [
  { id: "1", title: "Characters", img: "/leaflogo.png" },
  { id: "2", title: "Clans", img: "/leaflogo.png" },
  { id: "3", title: "Villages", img: "/leaflogo.png" },
  { id: "4", title: "Kekkei-Genkai", img: "/leaflogo.png" },
  { id: "5", title: "Tailed-Beasts", img: "/leaflogo.png" },
  { id: "6", title: "Teams", img: "/leaflogo.png" },
  { id: "7", title: "Akatsuki", img: "/leaflogo.png" },
  { id: "8", title: "Kara", img: "/leaflogo.png" },
];
const mainList = mainItem.map((val) => (
  <div
    key={val.id}
    className="lg:h-52 lg:w-52 rounded-lg w-40 h-40  hover:scale-105 shadow-lg shadow-primary  bg-white text-center lg:p-2 "
  >
    <a href={`/${val?.title?.toLocaleLowerCase()}`} className="">
      <img src={val.img} className="mx-auto lg:h-40  lg:w-40 w-26 h-26 rounded-lg" alt="" />
      <div className="p-2">{val.title}</div>
    </a>
  </div>
));
function Main() {
  return (
    <div className="lg:min-h-screen">
      <img className="md:w-[15vh] lg:block hidden select-none absolute bottom-0 lg:left-20 " src="/naruto.png" alt="" />
      <img className="md:w-[20vh] lg:block hidden select-none absolute bottom-0  lg:right-20 " src="/pain.png" alt="" />
      <img  src="/naruto-title.png" className=" mx-auto lg:w-80 w-40  bg-background " alt="" />
      <div className="flex flex-wrap lg:gap-12 gap-2 justify-center h-fit lg:py-12 ">
        {mainList}
      </div>
    </div>
  );
}

export default Main;
