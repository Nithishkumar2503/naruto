import { useEffect, useRef, useState } from "react";
import { GET } from "../api/server";
import type { apiResult, CharactersItemProps, CharactersProps } from "../type";
import PageHeader from "../components/PageHeader";
import { createDataStore } from "../shared/datastore";
import { CharecterCard, NoDataNotFound, SearchBox, CharacterSkeleton } from "../components";

const Kara = () => {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const loadMore = searchName
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
    <div>
      <PageHeader
        heading="Kara"
        subHeading="In the Naruto series, Kara articles"
      />
      <div className="flex ml-auto w-fit items-center content-center">
        <SearchBox placeholder="search..." onDispatch={handleSearchBox} />
        <h1 className="text-end text-text-secondary mx-2">
          {store?.records?.length + "/" + store?.total}
        </h1>
      </div>
      <div
        ref={containerRef}
        className="overflow-auto lg:h-[80vh] h-[75vh] bg-card rounded-lg py-4"
      >
        <div className="flex flex-wrap gap-4 justify-center mb-4">
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
            <CharacterSkeleton
              count={store?.records?.length == 0 ? 20 : 5}
              view={"flex"}
            />
          )}
          {!loading && store?.records?.length <= 0 && (
            <NoDataNotFound
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

export default Kara;
