import axios from "axios";
import queryString from "query-string";

// export const config = {
//   api: {
//     responseLimit: false,
//   },
// };

export default async function handler(req, res) {
  const queryStr = queryString.stringify(req?.query);

  try {
    const response = await axios({
      url: `https://api.maobey.com/m/download?${queryStr}`,
      responseType: "blob",
    });

    res.setHeader("content-type", "application/vnd.android.package-archive");

    res.status(200).send(response?.data);
  } catch (error) {
    const { response } = error;

    res.status(503).json(response?.data);
  }
}
