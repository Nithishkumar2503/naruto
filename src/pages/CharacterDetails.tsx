import { useEffect, useMemo, useState } from "react";
import { GET } from "../api/server";
import type {
  CharactersDebutProps,
  CharactersFamilyProps,
  CharactersItemProps,
  CharactersPersonalProps,
} from "../type";
import PageHeader from "../components/PageHeader";
import { createDataStore } from "../shared/datastore";
import { FormLabel, SEO } from "../components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PersonalProps {
  name?: string;
  images?: string[];
  personal?: CharactersPersonalProps;
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-sm shadow-lg">
      <div className="border-b border-white/10 px-5 py-4">
        <FormLabel label={title} uppercase />
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function InfoRow({
  label,
  value,
  bordered = true,
}: {
  label: string;
  value: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <div
      className={`grid gap-2 py-4 lg:grid-cols-[180px_1fr] ${
        bordered ? "border-b border-white/10" : ""
      }`}
    >
      <div className="text-sm font-semibold capitalize tracking-wide text-orange-400">
        {label}
      </div>
      <div className="text-sm leading-7 text-zinc-300 break-words">{value}</div>
    </div>
  );
}

function ChipList({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, index) => (
        <span
          key={index}
          className="rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function PersonalCharacter({
  name,
  images = [],
  personal,
  debut,
  family,
  tools,
}: PersonalProps & {
  debut: CharactersDebutProps;
  family: CharactersFamilyProps;
  tools: string[];
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeImage = useMemo(() => {
    if (!images?.length) return "";
    return images[activeImageIndex] || images[0];
  }, [images, activeImageIndex]);

  const nextImage = () => {
    if (!images?.length) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!images?.length) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const personalEntries = Object.entries(personal ?? {});

  return (
    <div className="mx-auto grid min-h-[60vh] w-full gap-6 lg:grid-cols-[420px_1fr] lg:px-10">
      <div className="space-y-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl lg:sticky lg:top-4">
          <div className="relative">
            {activeImage ? (
              <img
                src={activeImage}
                alt={name || "Character image"}
                className="h-[420px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[420px] items-center justify-center bg-zinc-800 text-zinc-500">
                No image available
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/70"
                >
                  <MdKeyboardArrowLeft className="text-2xl" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/70"
                >
                  <MdKeyboardArrowRight className="text-2xl" />
                </button>
              </>
            )}
          </div>

          <div className="space-y-4 p-5">
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-white">{name}</h1>
              <p className="mt-1 text-sm text-zinc-400">
                Explore profile, family, debut, tools, jutsu, and voice actors.
              </p>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`shrink-0 overflow-hidden rounded-xl border transition ${
                      activeImageIndex === index
                        ? "border-orange-400"
                        : "border-white/10"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${name} ${index + 1}`}
                      className="h-16 w-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <SectionCard title="First Appearance">
          {debut ? (
            <div className="space-y-3">
              {Object.entries(debut).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="capitalize text-orange-300">{key}</span>
                  <span className="text-right text-zinc-300">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500">No debut data available.</p>
          )}
        </SectionCard>

        <SectionCard title="Family">
          {family ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(family).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-2xl border border-orange-400/15 bg-gradient-to-br from-orange-500/10 to-transparent p-4"
                >
                  <p className="text-xs uppercase tracking-widest text-orange-300">
                    {key}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500">No family data available.</p>
          )}
        </SectionCard>

        <SectionCard title="Tools">
          <ChipList items={tools} />
        </SectionCard>
      </div>

      <div className="space-y-6">
        <SectionCard title="Personal">
          {personalEntries.length > 0 ? (
            <div>
              {personalEntries.map(([key, value], i) => {
                const bordered = i !== personalEntries.length - 1;

                let renderedValue: React.ReactNode = null;

                if (typeof value === "string") {
                  renderedValue = value;
                } else if (Array.isArray(value)) {
                  renderedValue = (
                    <div className="flex flex-wrap gap-2">
                      {value.map((item, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-zinc-300 border border-white/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  );
                } else if (value && typeof value === "object") {
                  renderedValue = (
                    <div className="space-y-2">
                      {Object.entries(value as Record<string, React.ReactNode>).map(
                        ([nestedKey, nestedVal]) => (
                          <div
                            key={nestedKey}
                            className="grid gap-2 rounded-xl bg-white/5 px-4 py-3 lg:grid-cols-[140px_1fr]"
                          >
                            <span className="text-sm font-medium text-orange-200">
                              {nestedKey}
                            </span>
                            <span className="text-sm text-zinc-300 break-words">
                              {nestedVal}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  );
                }

                return (
                  <InfoRow
                    key={key}
                    label={key}
                    value={renderedValue}
                    bordered={bordered}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-zinc-500">No personal details available.</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function NatureTypeChar({ natureType }: { natureType: string[] }) {
  if (!natureType || natureType.length === 0) return null;

  return (
    <SectionCard title="Nature Type">
      <ChipList items={natureType} />
    </SectionCard>
  );
}

function VoiceActorChar({
  voiceActor,
}: {
  voiceActor: { english: string[]; japanese: string[] };
}) {
  if (!voiceActor) return null;

  return (
    <SectionCard title="Voice Actors">
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(voiceActor).map(([key, value]) => (
          <div
            key={key}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <h3 className="mb-3 capitalize text-lg font-semibold text-orange-300">
              {key}
            </h3>
            <div className="space-y-2">
              {Array.isArray(value) &&
                value.map((item, index) => (
                  <p key={index} className="text-sm text-zinc-300">
                    • {item}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function JutsusChar({ jutsus }: { jutsus: string[] }) {
  if (!jutsus || jutsus.length === 0) return null;

  return (
    <SectionCard title="Jutsus">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {jutsus.map((jutsu, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 px-4 py-4 text-sm text-zinc-200 transition hover:-translate-y-1 hover:border-orange-400/40 hover:shadow-lg"
          >
            {jutsu}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

const CharacterDetails = () => {
  const [loading, setLoading] = useState(true);
  const characterName = location?.pathname?.split("/")?.[2];
  const { getOne, setStoreOne } = createDataStore<CharactersItemProps>();

  const getApiRes = async () => {
    setLoading(true);
    try {
      const response = await GET({
        relativeUrl: `/characters/` + characterName,
      });
      setStoreOne(response?.result as CharactersItemProps);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiRes();
  }, []);

  return (
    <div>
      <PageHeader
        heading="Character Details"
        subHeading="Explore the story, abilities, family, and legacy of your favorite Naruto character."
      />

      <div className="rounded-2xl bg-zinc-950 px-4 py-6 lg:px-6">
        {getOne && (
          <div className="space-y-6">
            <SEO
              title={`${getOne.name}`}
              description={`Learn about ${getOne.name}, including background, abilities, clan, nature type, and role in the Naruto universe.`}
              keywords={`${getOne.name}, Naruto ${getOne.name}, ${getOne.name} powers, ${getOne.name} clan, Naruto character`}
              image={
                getOne.images?.[0] ||
                "https://naruto-lovat-nine.vercel.app/default-og-image.jpg"
              }
              url={`https://naruto-lovat-nine.vercel.app/characters/${getOne.id}`}
              type="article"
              author="Naruto Universe"
              robots="index, follow"
              canonical={`https://naruto-lovat-nine.vercel.app/characters/${getOne.id}`}
              siteName="Naruto Universe"
              twitterCard="summary_large_image"
              twitterCreator="@narutouniverse"
              structuredData={{
                "@context": "https://schema.org",
                "@type": "Article",
                headline: getOne.name,
                description: `Learn about ${getOne.name}, including background, abilities, clan, nature type, and role in the Naruto universe.`,
                image:
                  getOne.images?.[0] ||
                  "https://naruto-lovat-nine.vercel.app/default-og-image.jpg",
                author: {
                  "@type": "Organization",
                  name: "Naruto Universe",
                },
                publisher: {
                  "@type": "Organization",
                  name: "Naruto Universe",
                },
                mainEntityOfPage: `https://naruto-lovat-nine.vercel.app/characters/${getOne.id}`,
              }}
            />

            <PersonalCharacter
              name={getOne?.name}
              images={getOne?.images}
              personal={getOne?.personal}
              debut={getOne?.debut}
              family={getOne?.family}
              tools={getOne?.tools}
            />

            <JutsusChar jutsus={getOne?.jutsu} />
            <NatureTypeChar natureType={getOne?.natureType} />
            <VoiceActorChar voiceActor={getOne?.voiceActors} />
          </div>
        )}

        {loading && (
          <div className="grid gap-6 lg:grid-cols-[420px_1fr] animate-pulse">
            <div className="rounded-3xl bg-zinc-900 h-[520px]" />
            <div className="rounded-3xl bg-zinc-900 h-[520px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetails;