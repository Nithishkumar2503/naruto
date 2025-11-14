interface GetParamsProps {
  relativeUrl: string;
}
const baseUrl: string = `https://dattebayo-api.onrender.com`;
export const GET = async ({ relativeUrl }: GetParamsProps) => {
  try {
    const apiUrl = `${baseUrl}${relativeUrl}`;
    return fetch(apiUrl)
      .then(async (res) => {
        const apiResult = await res.json();
        if (res.status === 200) {
          return {
            result: apiResult,
            status: res.status,
            message: "",
          };
        } else {
          return {
            result: apiResult,
            status: res.status,
            message: "",
          };
        }
      })
      .catch((err) => {
        throw Error(err);
      });
  } catch (error) {
    throw error;
  }
};
