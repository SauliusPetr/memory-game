import { useEffect, useState } from "react";

let requestUrl =
  "https://api.giphy.com/v2/emoji?api_key=pTXZkgFhGtyiZPK0VA9YwyCamSwxEC7m&limit=40&offset=0";

export const useGifData = () => {
  const [imageURLs, setImageURLs] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(requestUrl, { method: "GET" })
      .then((repsonse) => {
        if (repsonse.status >= 400) {
          throw new Error();
        }
        return repsonse.json();
      })
      .then((response) => {
        return setImageURLs(formatGifData(response));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { imageURLs, error, loading };
};

function formatGifData(jsonData) {
  let imageArray = jsonData.data.map((obj) => {
    return { title: obj.title, id: obj.id, url: obj.images.downsized.url };
  });
  return imageArray;
}
