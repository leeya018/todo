import { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";
import fs from "fs";
import path from "path";
import { corsMiddleware } from "./validate";

const handler = nc({ attachParams: true });
handler.use(corsMiddleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const reasons = req.body; // Expecting reasons as JSON
  const filePath = path.join(process.cwd(), "data", "reasons.json");

  // Save the reasons to a file
  fs.writeFile(filePath, JSON.stringify(reasons, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to save reasons" });
      return;
    }
    res.status(200).json({ message: "Reasons saved successfully" });
  });
});

export default handler;
