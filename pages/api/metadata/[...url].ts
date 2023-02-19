import type { NextApiRequest, NextApiResponse } from "next";

const ogs = require("open-graph-scraper");
const getFavicons = require("get-website-favicon");

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const url = query.url as string[];
  const options = { url: url.join("//") };
  //   const data = await ogs(options);
  try {
    const data = await ogs(options);
    const favIcons = await getFavicons(options.url);
    const result = await data.result;
    return res.status(200).json({
      result,
      favicon: favIcons,
    });
  } catch (error) {
    return res.status(500);
  }
}
