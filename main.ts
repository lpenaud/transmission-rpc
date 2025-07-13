import { TransmissionClient } from "./src/client.ts";

interface MainOptions {
  url: URL;
  auth: string;
}

function readArgs(args: string[]): MainOptions {
  let url = args.shift() ?? Deno.env.get("TR_URL");
  let auth = args.shift() ?? Deno.env.get("TR_AUTH");
  if (url === undefined || auth === undefined) {
    console.warn("url:", url, "auth", auth);
    throw new Error("Missing args");
  }
  return {
    url: new URL(url),
    auth,
  }
}

async function main(args: string[]): Promise<number> {
  const { auth, url } = readArgs(args);
  const client = new TransmissionClient({
    url: new URL(`${url.protocol}//${url.host}`),
    auth,
  });
  await client.init();
  const res = await client.request({
    method: "session-stats",
    arguments: undefined,
  });
  console.log([
    Date.now(),
    res.arguments["cumulative-stats"].downloadedBytes,
    res.arguments["cumulative-stats"].filesAdded,
    res.arguments["cumulative-stats"].secondsActive,
    res.arguments["cumulative-stats"].sessionCount,
    res.arguments["cumulative-stats"].uploadedBytes,
    res.arguments.activeTorrentCount,
    res.arguments.downloadSpeed,
    res.arguments.pausedTorrentCount,
    res.arguments.torrentCount,
    res.arguments.uploadSpeed,
  ].join(";"));
  return 0;
}

import.meta.main ? await main(Deno.args.slice()) : undefined;
