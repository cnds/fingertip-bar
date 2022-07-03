// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServeAdDetail } from "@/request/index";
import queryString from "query-string";

export default async function handler(req, res) {
  const queryStr = queryString.stringify(req?.query);

  try {
    const response = await getServeAdDetail(queryStr);

    res.status(200).json(response.data);
  } catch (error) {
    const { response } = error;

    res.status(response?.status).json(response?.data);
  }
}
