import { useEffect, useState } from "react";
import { GET } from "../api/server";
import type { apiResult, CharactersItemProps, CharactersProps } from "../type";
import PageHeader from "../components/PageHeader";
import { Loading } from "../components";

const swipeImage = (images: string[]) => {
  return (
    <div className="flex overflow-x-clip bg-white rounded-lg">
      {images?.map((val) => {
        return (
          <img
            key={val}
            src={val}
            className="w-full h-44 object-cover rounded-t-lg"
            alt=""
          />
        );
      })}
    </div>
  );
};
const characterCard = (item: CharactersItemProps) => {
  return (
    <div className="items-center shadow-lg cursor-pointer shadow-primary hover:scale-105 rounded-lg  w-56 bg-white  h-56   mx-auto">
      {swipeImage(item.images)}
      <h1 className="font-semibold mb-auto p-2 text-center my-auto">
        {item?.name}
      </h1>
    </div>
  );
};

const Character = () => {
  const [pageSize, setPageSize] = useState(1);
  let loadMore = `?page=${pageSize}`;
  
  const [characters, setCharacters] =
    useState<apiResult<CharactersProps> | null>(null);
  const [loading, setLoading] = useState(false);
  let apiUrl = `/characters${loadMore}`;

  const getApiRes = async () => {
    setLoading(true);
    loadMore = `?page=${pageSize}`;
    apiUrl = `/characters${loadMore}`;
    try {
      const response: apiResult<CharactersProps> = await GET({
        relativeUrl: apiUrl,
      });
      setCharacters(response);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiRes();
  }, []);

  const handleLoadMore = () => {
    setPageSize((prev) => prev + 1);
    setTimeout(() => {
      getApiRes();
    }, 100);
  };
  return (
    <div className="">
      <PageHeader
        heading="Characters"
        subHeading="In the Naruto series, character articles"
      />

      <div className="flex flex-wrap  gap-4 justify-center overflow-auto h-[83vh] ">
        {characters?.result?.characters?.map((val) => (
          <div key={val?.id}>{characterCard(val)}</div>
        ))}
      </div>
      <div className="flex justify-center  items-center content-center">
        {!loading && (
          <button
            onClick={handleLoadMore}
            className=" py-2 px-4 cursor-pointer  rounded-lg bg-primary text-white font-medium hover:bg-primary active:scale-105 transition"
          >
            Load more
          </button>
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default Character;
