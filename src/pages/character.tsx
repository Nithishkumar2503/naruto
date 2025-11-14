import { useEffect, useState } from "react";
import { GET } from "../api/server";
import type { apiResult } from "../type";

const Character = () => {
  const [characters, setCharacters]= useState(null);

  const apiUrl = `/characters`;
  const getApiRes = async () => {
    try {
      const response:apiResult = await GET({ relativeUrl: apiUrl as string });
      setCharacters(response);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getApiRes();
  }, []);

 
  return <div className="items-center content-center w-full h-full mx-auto">{characters?.result?.characters[0].name}</div>;
};

export default Character;
