import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();

    res.setHeader(
      "Content-Type",
      response.headers.get("Content-Type") || "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      `inline; filename="resume${path.extname(url)}"`
    );
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ error: "Failed to fetch resume" });
  }
}
