import { useEffect, useRef, useState } from "react";
import { GET } from "../api/server";
import type { apiResult, ClansItemProps, ClansProps } from "../type";
import PageHeader from "../components/PageHeader";
import { createDataStore } from "../shared/datastore";
import { CharecterCard, NoDataNotFound, SearchBox, SEO, CharacterSkeleton } from "../components";

const Clans = () => {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const loadMore = searchName
    ? `?page=${page}&name=` + searchName
    : `?page=${page}`;

  const { setStore, store } = createDataStore<ClansItemProps>();

  const [loading, setLoading] = useState(true);

  const getApiRes = async () => {
    setLoading(true);
    try {
      const response: apiResult<ClansProps> = await GET({
        relativeUrl: `/clans${loadMore}`,
      });
      setStore(
        response.result.clans,
        response.result.pageSize,
        response.result.total,
        response.result.currentPage,
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
    if (store?.total == store?.records?.length) return;
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
      <SEO
        title="Naruto Clans"
        description="Explore the legendary clans of Naruto, their history, bloodlines, and powerful abilities across the shinobi world."
        keywords="Naruto clans, Uchiha clan, Hyuga clan, Uzumaki clan, Naruto bloodlines, anime clans"
        image="https://naruto-lovat-nine.vercel.app/default-og-image.jpg"
        url="https://naruto-lovat-nine.vercel.app/clans"
        type="website"
        author="Naruto Universe"
        robots="index, follow"
        canonical="https://naruto-lovat-nine.vercel.app/clans"
        siteName="Naruto Universe"
        twitterCard="summary_large_image"
        twitterCreator="@narutouniverse"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Naruto Clans",
          url: "https://naruto-lovat-nine.vercel.app/clans",
          description:
            "Explore the legendary clans of Naruto, their history, bloodlines, and abilities.",
        }}
      />
      <PageHeader
        heading="Clans"
        subHeading="In the Naruto series, Clans articles"
      />
      <div className="flex ml-auto w-fit items-center content-center">
        <SearchBox placeholder="search Clans..." onDispatch={handleSearchBox} />
        <h1 className="text-end text-text-secondary mx-2">
          {store?.records?.length + "/" + store?.total}
        </h1>
      </div>
      <div
        ref={containerRef}
        className="overflow-auto lg:h-[80vh] h-[75vh] rounded-lg py-4"
      >
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          {store?.records?.map((val) => (
            <div key={val?.id}>
              {CharecterCard({
                name: val.name,
                id: val.id,
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
              actionButton="All Clans"
              imagePath="/naruto-eat.png"
              title="No Clans found!."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Clans;
