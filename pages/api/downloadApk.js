import fetch from "node-fetch";

// export const config = {
//   api: {
//     responseLimit: false,
//   },
// };

export default async function handler(req, res) {
  const queryObj = req?.query;

  try {
    fetch(queryObj?.url)
      .then((x) => x.arrayBuffer())
      .then((x) => {
        res.status(200).send(Buffer.from(x));
      });
  } catch (error) {
    const { response } = error;

    res.status(503).json(response?.data);
  }
}
