import { useEffect, useRef, useState } from "react";
import { GET } from "../api/server";
import type { apiResult, VillageItemProps, VillageProps,  } from "../type";
import PageHeader from "../components/PageHeader";
import { createDataStore } from "../shared/datastore";
import { NoDataFound, SearchBox } from "../components";

const VillagesCard = (item: VillageItemProps) => {
  return (
      <div className="items-center content-center shadow-lg cursor-default shadow-primary hover:scale-105 rounded-lg  lg:w-56 w-80 bg-white  h-56   mx-auto">
        <h1 className="font-semibold mb- p-2 text-center my-auto text-black">
          {item?.name}
        </h1>
      </div>
  );
};

const Villages = () => {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  let loadMore = searchName
    ? `?page=${page}&name=` + searchName
    : `?page=${page}`;

  const { setStore, store } = createDataStore<VillageItemProps>();

  const [loading, setLoading] = useState(true);

  const getApiRes = async () => {
    setLoading(true);
    try {
      const response: apiResult<VillageProps> = await GET({
        relativeUrl: `/villages${loadMore}`,
      });
      setStore(
        response.result.villages,
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
    if (store.total ===store.records.length) return;

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
        heading="Villages"
        subHeading="In the Naruto series, Villages articles"
      />
      <div className="flex ml-auto w-fit items-center content-center">
        <SearchBox
          placeholder="search Villages..."
          onDispatch={handleSearchBox}
        />
        <h1 className="text-end text-secondary mx-2">
          {store?.records?.length + "/" + store?.total}
        </h1>
      </div>
      <div
        ref={containerRef}
        className="overflow-auto h-[84vh] bg-white rounded-lg py-4"
      >
        <div className="flex flex-wrap  gap-4 justify-center mb-4">
          {store?.records?.map((val) => (
            <div key={val?.id}>{VillagesCard(val)}</div>
          ))}
          {loading && (
            <VillagesSkeleton
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
              actionButton="All Villages"
              imagePath="/naruto-eat.png"
              title="No Villages found!."
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

const VillagesSkeleton = ({
  count = 1,
  view,
}: {
  count?: number;
  view?: ViewEnum;
}) => {
  return (
    <div className={`${view == "flex" ? "flex flex-wrap  gap-4 " : ""} px-18`}>
      {Array.from({ length: count }).map((_) => (
        <div
          key={"crskeleton" + Date.now() + Math.random()}
          className="w-56 bg-white  h-56 mx-auto rounded-lg"
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

export default Villages;
