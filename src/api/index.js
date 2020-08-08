import Axios from "axios";

const apiRoot = "https://api.unsplash.com";
const clientId = "&client_id=y--ARfTZ_mCTewwsLXKEwKB9WpK120r26zdh9npRUJo";

export const getSearchResults = (searchText, page) => {
  let pageParam = page ? `&page=${page}` : "";
  return Axios.get(
    `${apiRoot}/search/photos?query=${searchText}${pageParam}${clientId}`
  );
};
