import { useEffect, useRef, useState } from "react";
import { GET } from "../api/server";
import type { apiResult, VillageItemProps, VillageProps } from "../type";
import PageHeader from "../components/PageHeader";
import { createDataStore } from "../shared/datastore";
import { CharecterCard, NoDataNotFound, SearchBox, SEO, CharacterSkeleton } from "../components";

const Villages = () => {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const loadMore = searchName
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
    if (store.total === store.records.length) return;

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
        title="Naruto Villages"
        description="Discover the hidden villages of Naruto and learn about their leaders, shinobi, and importance in the Naruto world."
        keywords="Naruto villages, Hidden Leaf Village, Hidden Sand Village, Naruto world, shinobi villages"
        image="https://naruto-lovat-nine.vercel.app/default-og-image.jpg"
        url="https://naruto-lovat-nine.vercel.app/villages"
        type="website"
        author="Naruto Universe"
        robots="index, follow"
        canonical="https://naruto-lovat-nine.vercel.app/villages"
        siteName="Naruto Universe"
        twitterCard="summary_large_image"
        twitterCreator="@narutouniverse"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Naruto Villages",
          url: "https://naruto-lovat-nine.vercel.app/villages",
          description:
            "Discover the hidden villages of Naruto and learn about their leaders, shinobi, and history.",
        }}
      />
      <PageHeader
        heading="Villages"
        subHeading="In the Naruto series, Villages articles"
      />
      <div className="flex ml-auto w-fit items-center content-center">
        <SearchBox
          placeholder="search Villages..."
          onDispatch={handleSearchBox}
        />
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

export default Villages;
