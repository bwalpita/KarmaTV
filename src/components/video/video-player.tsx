"use client";

import { useEffect } from "react";

export function VideoPlayer({
  videoId,
  title,
  autoplay = false,
}: {
  videoId: string;
  title: string;
  autoplay?: boolean;
}) {
  useEffect(() => {
    import("@justinribeiro/lite-youtube");
  }, []);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-brand-plum">
      <lite-youtube
        videoid={videoId}
        playlabel={title}
        params={autoplay ? "autoplay=1&rel=0&modestbranding=1" : "rel=0&modestbranding=1"}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
