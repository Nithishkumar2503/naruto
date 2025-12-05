import { useEffect, useState } from "react";
import { GET } from "../api/server";
import type { CharactersItemProps, CharactersPersonalProps } from "../type";
import PageHeader from "../components/PageHeader";
import { createDataStore } from "../shared/datastore";
import { FormLabel } from "../components";

interface PersonalProps {
  name?: string;
  images?: string[];
  personal?: CharactersPersonalProps;
  rank?: {
    ninjaRank: { ninjaRank: string; "Part I": string };
    ninjaRegistration: string;
  };
}
const personalCharacter = ({ name, images, personal }: PersonalProps) => {
  const key = Object?.keys(personal);
  const value = Object?.values(personal);
  return (
    <div className="w-full min-h-[40rem] mx-auto bg-white h-auto items-center md:px-20 p-2">
      <div className="flex gap-2">
        {images?.map((val: string) => {
          return (
            <img
              src={val}
              className="object-cover w-full md:mt-4 rounded-lg shadow shadow-primary"
              alt=""
            />
          );
        })}
      </div>
      <div className="py-4">
        <h1 className="font-medium  items-center w-fit mx-auto text-2xl">
          {name}
        </h1>
      </div>
      <FormLabel label="Personal" uppercase />
      <div className="border border-gray-500 rounded-lg ">
        {key.map((val: string, i: number) => {
          return (
            <div
              className={`${
                key.length == i + 1 ? "" : "border-b  border-gray-500"
              } py-2 px-2 mx-4 flex gap-4 `}
            >
              <ol className="min-w-40 capitalize">{val}:</ol>
              <div className="text-gray-600 grid text-wrap wrap-break-word">
                {Object?.prototype?.toString?.call(value[i]) ==
                "[object String]" ? (
                  <ol className=" text-wrap wrap-break-word break-all">
                    {value[i]}
                  </ol>
                ) : Object?.prototype?.toString?.call(value[i]) ==
                  "[object Object]" ? (
                  <ol className="text-wrap">
                    {Object?.keys(value[i])?.map(
                      (val: string, index: string) => {
                        return (
                          <div className=" flex">
                            <ul className="w-40">{val}:</ul>
                            <ul className=" text-wrap wrap-break-word break-all">
                              {Object?.values(value[i])[index]}
                            </ul>
                          </div>
                        );
                      }
                    )}
                  </ol>
                ) : Object?.prototype?.toString?.call(value[i]) ==
                  "[object Array]" ? (
                  <ol className="text-wrap wrap-break-word break-all">
                    {value[i]?.map((val) => {
                      return <ul className="">{val}</ul>;
                    })}
                  </ol>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface Debut {
  anime: string;
  manga: string;
  novel: string;
  movie: string;
  game: string;
  ova: string;
  appearsIn: string;
}

const debutChar = (debut: Debut) => {
  return (
    <div className="w-full  mx-auto bg-white h-auto items-center md:px-20 p-2">
      <FormLabel label="first appearance" uppercase />
      {Object?.entries(debut)?.map(([key, value]) => {
        return (
          <div className="flex gap-2">
            <h1 className="capitalize">{key} -</h1>
            <h2>{value}</h2>
          </div>
        );
      })}
    </div>
  );
};

const natureTypeChar = (natureType: string[]) => {
  return (
    <div className="w-full  mx-auto bg-white h-auto items-center md:px-20 p-2">
      <FormLabel label="nature Type" uppercase />
      <ul className="p-2 flex gap-6 flex-wrap">
        {natureType?.map((val: string) => {
          return (
            <li className="flex gap-2">
              <h1>• {val}</h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

interface voiceActorProps {
  english: string[];
  japanese: string[];
}
const voiceActorChar = (voiceActor: voiceActorProps) => {
  return (
    <div className="w-full  mx-auto bg-white h-auto items-center md:px-20 p-2">
      <FormLabel label="voice Actor" uppercase />
      <div className="p-2">
        {Object.entries(voiceActor)?.map(([key, value]) => {
          return (
            <div className="flex gap-2 mb-2">
              <h2 className="capitalize w-20">{key}</h2>
              <div>
                {Object.prototype.toString.call(value)=='[object Array]'?  
                value?.map((val) => {
                  return <h1>‣ {val}</h1>;
                })
                :
                <h1>‣ {value}</h1>
                }

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const jutsusChar = (jutsus: string[]) => {
  return (
    <div className="w-full  mx-auto bg-white h-auto items-center md:px-20 p-2">
      <FormLabel label="jutsus" uppercase />
      <div className="p-2 flex flex-wrap gap-4">
        {jutsus?.map((val: string) => {
          return (
            <div
              className="group relative flex-shrink-0 w-64
              px-5 py-4
              backdrop-blur
              border border-gray-200 text
              transition-all duration-300
              hover:border-orange-400 rounded-lg bg-gray-500  text-white hover:bg-white hover:text-gray-500 cursor-default hover:scale-105 hover:shadow"
            >
              <h2>{val}</h2>
              <div className="border-b  border-gradient-to-r from-green-500 to-primary" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const toolsChar = (tools: string[]) => {
  return (
    <div className="w-full  mx-auto bg-white h-auto items-center md:px-20 p-2">
      <FormLabel label="Tools" uppercase />
      <div className="p-2 flex flex-wrap gap-2">
        {tools?.map((val: string) => {
          return (
            <div className=" rounded-2xl bg-gradient-to-r from-orange-200 to-blue-100 cursor-default w-fit border border-gray-200 hover:scale-105 px-10 p-2">
              <h2>{val}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function FamilyCard({ family }: CharactersFamilyProps) {
  if(!family) return
  const key = Object?.keys(family);
  const value = Object?.values(family);
  return (
    <div className="w-full  mx-auto bg-white h-auto items-center md:px-20 p-2">
      {/* Header */}
      <FormLabel label="Family" uppercase />

      {/* Content */}
      <div className="grid gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3">
        {key?.map((val, index) => (
          <div
            key={val}
            className="group rounded-xl border border-primary bg-primary cursor-default  p-4 transition-all hover:-translate-y-1 hover:shadow-md "
          >
            <p className="text-xs uppercase tracking-wide  text-red-200">
              {val}
            </p>
            <p className="mt-1 font-medium text-white">{value[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const characterDetails = () => {
  const [loading, setLoading] = useState(false);

  const characterName = location?.pathname?.split("/")?.[2];
  const { setStore, store } = createDataStore();

  const getApiRes = async () => {
    setLoading(true);
    try {
      const response = await GET({
        relativeUrl: `/characters/` + characterName,
      });
      setStore(
        [response?.result],
        response?.result?.pageSize,
        response?.result?.total,
        response?.result?.currentPage
      );
    } catch (error) {
      throw error;
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
        heading="Characters details"
        subHeading="In the Naruto series, character articles"
      />
      <div className="overflow-auto h-[91vh] items-center content-center rounded-lg md:py-4 bg-white">
        {store?.records?.map((char: CharactersItemProps) => {
          return (
            <div>
              {personalCharacter({
                name: char?.name,
                images: char?.images,
                personal: char?.personal,
              })}
              {debutChar(char.debut)}
              {FamilyCard(char)}
              {toolsChar(char?.tools)}
              {jutsusChar(char?.jutsu)}
              {natureTypeChar(char?.natureType)}
              {voiceActorChar(char?.voiceActors)}
            </div>
          );
        })}

        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default characterDetails;
