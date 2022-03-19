const baseURL = "https://api.tvmaze.com";

export async function apiGet(queryString) {
  console.log(baseURL + queryString);
  const response = await fetch(`${baseURL}${queryString}`).then((r) =>
    r.json()
  );
  // throw new Error("oops");
  return response;
}
