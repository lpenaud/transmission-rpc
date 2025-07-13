import type { PropertyValues } from "../helpers.d.ts";
import type {
  TransmissionSessionStats,
  TransmissionTorrent,
} from "./transmission.d.ts";

export interface TransmissionResponse<
  K extends keyof TransmissionResponseArgumentsMap,
> {
  arguments: TransmissionResponseArgumentsMap[K];
  result: "success";
}

export interface TransmissionResponseArgumentsMap {
  "torrent-get": TorrentGetResponseArguments;
  "session-get": unknown;
  "session-stats": SessionStatsResponseArguments;
}

interface TorrentGetResponseArguments {
  torrents: [string[], ...PropertyValues<TransmissionTorrent>];
}

interface SessionStatsResponseArguments {
  activeTorrentCount: number;
  downloadSpeed: number;
  pausedTorrentCount: number;
  torrentCount: number;
  uploadSpeed: number;
  "cumulative-stats": TransmissionSessionStats;
  "current-stats": TransmissionSessionStats;
}
