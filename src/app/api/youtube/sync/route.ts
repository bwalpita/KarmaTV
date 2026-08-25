import { revalidatePath } from "next/cache";
import { syncYouTubeVideos } from "@/lib/youtube";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncYouTubeVideos();
    revalidatePath("/[locale]", "page");
    revalidatePath("/[locale]/videos", "page");
    return Response.json({ ok: true, ...result });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
