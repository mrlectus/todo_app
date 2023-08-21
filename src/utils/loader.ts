import { z } from "zod";
import ky from "ky";
import { defer } from "react-router-dom";

export const Album = z.object({
  albumId: z.number(),
  id: z.number(),
  title: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
});

const loader = () => {
  const response = ky.get(
    "https://jsonplaceholder.typicode.com/photos?_page=1&_limit=9"
  );
  const album = response.json();
  return defer({ album });
};

export const dateFormater = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
  })
    .format(date)
    .toString()
    .replaceAll("/", "-");
};
export default loader;
