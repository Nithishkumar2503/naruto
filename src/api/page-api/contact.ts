const baseUrl = "https://jsonplaceholder.typicode.com/posts";
const handleContactForm = async (body: any) => {
  const result = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  console.log("result: ", result);
  return result;
};

export default handleContactForm;
