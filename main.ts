import { TransmissionClient } from "./src/client.ts";

async function main(args: string[]): Promise<number> {
  if (args.length !== 2) {
    console.log(
      "Usage:",
      import.meta.filename ?? import.meta.url,
      "URL",
      "AUTH",
    );
    return 1;
  }
  const url = new URL(args.shift() as string);
  const auth = args.shift() as string;
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
