const baseURL = "https://api.tvmaze.com";

export async function apiGet(queryString) {
  const response = await fetch(`${baseURL}${queryString}`).then((r) =>
    r.json()
  );
  return response;
}
