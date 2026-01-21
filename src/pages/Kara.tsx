import { useEffect, useRef, useState } from "react";
import { GET } from "../api/server";
import type { apiResult, CharactersItemProps, CharactersProps } from "../type";
import PageHeader from "../components/PageHeader";
import { createDataStore } from "../shared/datastore";
import { CharecterCard, NoDataFound, SearchBox } from "../components";

const kara = () => {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  let loadMore = searchName
    ? `?page=${page}&name=` + searchName
    : `?page=${page}`;

  const { setStore, store } = createDataStore<CharactersItemProps>();

  const [loading, setLoading] = useState(true);

  const getApiRes = async () => {
    setLoading(true);
    try {
      const response: apiResult<CharactersProps> = await GET({
        relativeUrl: `/kara${loadMore}`,
      });
      setStore(
        response.result.kara,
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

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (store.total == store.records.length) return;
    const div = containerRef.current;
    if (!div) return;

    const onScroll = () => {
      if (div.scrollTop + div.clientHeight >= div.scrollHeight - 10 && !loading)
        handleLoadMore();
    };
    div.addEventListener("scroll", onScroll);
    return () => div.removeEventListener("scroll", onScroll);
  }, [handleLoadMore]);
  // Fetch data
  useEffect(() => {
    getApiRes();
  }, [page, searchName]);

  function handleSearchBox(val: string) {
    store.records = [];
    if (val) {
      setPage(1);
      setSearchName(val);
    } else {
      setPage(1);
      setSearchName("");
    }
  }
  return (
    <div className=" h-screen ">
      <PageHeader
        heading="Kara"
        subHeading="In the Naruto series, Kara articles"
      />
      <div className="flex ml-auto w-fit items-center content-center">
        <SearchBox placeholder="search..." onDispatch={handleSearchBox} />
        <h1 className="text-end text-secondary mx-2">
          {store?.records?.length + "/" + store?.total}
        </h1>
      </div>
      <div
        ref={containerRef}
        className="overflow-auto lg:h-[84vh]  h-[81vh] bg-whiteo rounded-lg py-4"
      >
        <div className="flex flex-wrap  gap-4 justify-center mb-4">
          {store?.records?.map((val) => (
            <div key={val?.id}>
              {CharecterCard({
                name: val.name,
                id: val.id,
                images: val.images,
              })}
            </div>
          ))}
          {loading && (
            <KaraSkeleton
              count={store?.records?.length == 0 ? 20 : 5}
              view={"flex"}
            />
          )}
          {!loading && store?.records?.length <= 0 && (
            <NoDataFound
              onDispatch={() => {
                setPage(1);
                setSearchName("");
              }}
              actionButton="All Kara"
              imagePath="/naruto-eat.png"
              title="No data found!."
            />
          )}
        </div>
      </div>
    </div>
  );
};

const viewEnum = {
  flex: "flex",
  grid: "grid",
} as const;
type ViewEnum = (typeof viewEnum)[keyof typeof viewEnum];

const KaraSkeleton = ({
  count = 1,
  view,
}: {
  count?: number;
  view?: ViewEnum;
}) => {
  return (
    <div className={`${view == "flex" ? "lg:flex lg:flex-wrap  gap-4 " : ""} lg:px-18`}>
      {Array.from({ length: count }).map((_) => (
        <div
          key={"crskeleton" + Date.now() + Math.random()}
          className="lg:w-56  w-[97vw] lg:px-0 px-6 bg-whiteo  h-56 mx-auto rounded-lg"
        >
          <div className="h-40 w-full animate-pulse bg-gray-200 rounded-lg"></div>
          <div className="w-full flex justify-center mt-4  ">
            <h1 className="py-3 w-40 animate-pulse bg-gray-200 bottom-0 rounded-lg"></h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default kara;
