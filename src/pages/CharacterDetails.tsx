import { useEffect, useState } from "react";
import { GET } from "../api/server";
import type {
  CharactersDebutProps,
  CharactersFamilyProps,
  CharactersItemProps,
  CharactersPersonalProps,
} from "../type";
import PageHeader from "../components/PageHeader";
import { createDataStore } from "../shared/datastore";
import { FormLabel } from "../components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PersonalProps {
  name?: string;
  images?: string[];
  personal?: CharactersPersonalProps;
  rank?: {
    ninjaRank: { ninjaRank: string; "Part I": string };
    ninjaRegistration: string;
  };
}
const personalCharacter = ({
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
}) => {
  const key = Object?.keys(personal ?? {});
  const value = Object?.values(personal ?? {});
  function handleImage() {
    let index = 0;
    function nextImage() {
      if (index < images.length - 1) {
        index++;
      }
      return images[index];
    }

    function prevImage() {
      if (index > 0) {
        index--;
      }
      return images[index];
    }
    return {
      image: images[index],
      nextImage,
      prevImage,
    };
  }
  const { image, nextImage, prevImage } = handleImage();

  return (
    <div className="w-full lg:flex gap-4 min-h-160 mx-auto bg-whiteo h-auto  p-2  lg:px-18">
      <div className="w-full items-start content-start rounded-lg">
        <div className="flex  gap-2 items-center content-center">
          <MdKeyboardArrowLeft
            onClick={() => prevImage()}
            className="text-4xl  hover:bg-gray-100 cursor-pointer hidden text-gray-500"
          />
          <img
            src={image ?? ""}
            className="object-cover w-full rounded-lg shadow shadow-primary"
            alt=""
          />
          <MdKeyboardArrowRight
            onClick={() => nextImage()}
            className="text-4xl   hover:bg-gray-100 cursor-pointer hidden text-gray-500"
          />
        </div>
        <div className="py-4">
          <h1 className="font-medium text-white  items-center w-fit mx-auto text-2xl">
            {name}
          </h1>
        </div>
        <div className="lg:block hidden">
          {debutChar(debut)}
          {FamilyCard(family)}
          {toolsChar(tools)}
        </div>
      </div>

      <div className="lg:border w-full border-gray-500 rounded-lg ">
        <FormLabel label="Personal" uppercase />
        {key.map((val: string, i: number) => {
          return (
            <div
              key={i}
              className={`${
                key.length == i + 1 ? "" : "border-b  border-gray-500"
              } py-2 lg:px-2 mx-4 lg:flex gap-4 `}
            >
              <ol className="min-w-40 lg:font-normal text-white text-lg  lg:text-lg font-semibold capitalize">
                {val}:
              </ol>
              <div className="text-gray-600 grid text-wrap wrap-break-word">
                {Object?.prototype?.toString?.call(value[i]) ==
                "[object String]" ? (
                  <ol className=" text-wrap wrap-break-word break-all">
                    {value[i]}
                  </ol>
                ) : Object.prototype.toString.call(value[i]) ===
                  "[object Object]" ? (
                  <ol className="text-wrap">
                    {Object.entries(
                      value[i] as Record<string, React.ReactNode>,
                    ).map(([key, val]) => (
                      <div className="flex" key={key}>
                        <ul className="w-40">{key}:</ul>
                        <ul className="text-wrap break-all">{val}</ul>
                      </div>
                    ))}
                  </ol>
                ) : Object?.prototype?.toString?.call(value[i]) ==
                  "[object Array]" ? (
                  <ol className="text-wrap wrap-break-word break-all">
                    {value[i]?.map((val: string, index: number) => {
                      return (
                        <div key={index}>
                          <ul className="">{val}</ul>
                        </div>
                      );
                    })}
                  </ol>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="lg:hidden ">
        {debutChar(debut)}
        {FamilyCard(family)}
        {toolsChar(tools)}
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
  if (!debut) return;
  return (
    <div className="w-full  mx-auto bg-whiteo h-auto items-center  p-2">
      <FormLabel label="first appearance" uppercase />
      {Object?.entries(debut)?.map(([key, value], index: number) => {
        return (
          <div key={index} className="flex gap-2">
            <h1 className="capitalize text-white ">{key} -</h1>
            <h2 className="text-gray-500">{value}</h2>
          </div>
        );
      })}
    </div>
  );
};

const natureTypeChar = (natureType: string[]) => {
  if (!natureType || natureType.length === 0) return;
  return (
    <div className="w-full  mx-auto bg-whiteo h-auto items-center md:px-20 p-2">
      <FormLabel label="nature Type" uppercase />
      <ul className="lg:p-2 py-2  flex gap-6 flex-wrap">
        {natureType?.map((val: string, index: number) => {
          return (
            <li key={index} className="flex gap-2 text-gray-500">
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
  if (!voiceActor) return;
  return (
    <div className="w-full  mx-auto bg-whiteo h-auto items-center md:px-20 p-2">
      <FormLabel label="voice Actor" uppercase />
      <div className="p-2">
        {Object?.entries(voiceActor)?.map(([key, value], index: number) => {
          return (
            <div key={index} className="lg:flex gap-2 mb-2">
              <h2 className="capitalize w-20 text-white font-semibold lg:font-normal">
                {key}
              </h2>
              <div className="pl-4 lg:pl-0 text-gray-500">
                {Array.isArray(value) ? (
                  value.map((val, index) => <h1 key={index}>‣ {val}</h1>)
                ) : (
                  <h1 className="">‣ {value as React.ReactNode}</h1>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const jutsusChar = (jutsus: string[]) => {
  if (!jutsus || jutsus.length == 0) return;
  return (
    <div className="w-full  mx-auto bg-whiteo h-auto items-center md:px-20 p-2">
      <FormLabel label="jutsus" uppercase />
      <div className="p-2 flex flex-wrap gap-4">
        {jutsus?.map((val: string, index: number) => {
          return (
            <div
              key={index}
              className="group relative shrink-0 lg:w-64 w-40
              px-5 py-4
              backdrop-blur
              border border-gray-200 text
              transition-all duration-300
              hover:border-orange-400  rounded-lg bg-gray-500  text-white hover:bg-gray-300 hover:text-gray-500 cursor-default hover:scale-105 hover:shadow"
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
  if (!tools || tools.length == 0) return;

  return (
    <div className="w-full  mx-auto bg-whiteo h-auto items-center p-2">
      <FormLabel label="Tools" uppercase />
      <div className="p-2 flex flex-wrap gap-2">
        {tools?.map((val: string, index: number) => {
          return (
            <div
              key={index}
              className=" rounded-2xl bg-linear-to-r from-orange-200 to-blue-100 cursor-default w-fit border border-gray-200 hover:scale-105 px-10 p-2"
            >
              <h2>{val}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function FamilyCard(family: CharactersFamilyProps) {
  if (!family) return;
  const key = Object?.keys(family);
  const value = Object?.values(family);
  return (
    <div className="w-full  mx-auto bg-whiteo h-auto items-center  p-2">
      {/* Header */}
      <FormLabel label="Family" uppercase />

      {/* Content */}
      <div className="grid gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3">
        {key?.map((val, index: number) => (
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
    <div className="">
      <PageHeader
        heading="Characters details"
        subHeading="In the Naruto series, character articles"
      />
      <div className="overflow-auto lg:h-[84vh]   h-[81vh]  bg-whiteo rounded-lg py-4">
        {getOne && (
          <div>
            {personalCharacter({
              name: getOne?.name,
              images: getOne?.images,
              personal: getOne?.personal,
              debut: getOne?.debut,
              family: getOne.family,
              tools: getOne?.tools,
            })}
            {jutsusChar(getOne?.jutsu)}
            {natureTypeChar(getOne?.natureType)}
            {voiceActorChar(getOne?.voiceActors)}
          </div>
        )}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default characterDetails;
