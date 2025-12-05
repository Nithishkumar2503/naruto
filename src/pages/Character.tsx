import { useEffect, useRef, useState } from "react";
import { GET } from "../api/server";
import type { apiResult, CharactersItemProps, CharactersProps } from "../type";
import PageHeader from "../components/PageHeader";
import { Loading } from "../components";
import { createDataStore } from "../shared/datastore";

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

  const { setStore ,store} = createDataStore<CharactersProps>();
  const [characters, setCharacters] =
    useState<apiResult<CharactersProps> | null>(null);
  const [loading, setLoading] = useState(false);
  let apiUrl = `/characters${loadMore}`;

  const getApiRes = async () => {
    setLoading(true);
    try {
      const response: apiResult<CharactersProps> = await GET({
        relativeUrl: apiUrl,
      });
      setCharacters(response);
      setStore(
        response.result.characters,
        response.result.pageSize,
        response.result.total,
        response.result.currentPage
      );
     
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
    getApiRes();
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const div = containerRef.current;
    if (!div) return;

    const onScroll = () => {
      if (div.scrollTop + div.clientHeight >= div.scrollHeight - 10 && !loading)
        handleLoadMore();
    };
    div.addEventListener("scroll", onScroll);
    return () => div.removeEventListener("scroll", onScroll);
  }, [handleLoadMore]);
  return (
    <div className=" h-screen">
      <PageHeader
        heading="Characters"
        subHeading="In the Naruto series, character articles"
      />

      <div ref={containerRef} className="overflow-auto h-[90vh] py-4">
        <div className="flex flex-wrap  gap-4 justify-center mb-4">
          {store.records?.map((val) => (
            <div key={val?.id}>{characterCard(val)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const viewEnum = {
  flex: "flex",
  grid: "grid",
} as const;

const CharacterSkeleton = ({
  count = 1,
  view,
}: {
  count?: number;
  view?: viewEnum;
}) => {
  return (
    <div
      className={`${
        view == "flex" ? "flex flex-wrap  gap-4 justify-center " : ""
      } px-18`}
    >
      {Array.from({ length: count }).map(() => (
        <div className="w-56 bg-white  h-56 mx-auto rounded-lg">
          <div className="h-40 w-full animate-pulse bg-gray-200 rounded-lg"></div>
          <div className="w-full flex justify-center mt-4  ">
            <h1 className="py-3 w-40 animate-pulse bg-gray-200 bottom-0 rounded-lg"></h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Character;
