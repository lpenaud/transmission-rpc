import type { KeysArray } from "../helpers.d.ts";
import type { TransmissionTorrent, TransmissionTorrentIds } from "./transmission.d.ts";

interface TransmissionRequest<K extends keyof TransmissionRequestArgumentsMap> {
  method: K;
  arguments: TransmissionRequestArgumentsMap[K];
  tag?: number;
}

export interface TransmissionRequestArgumentsMap {
  "session-get": SessionGetArguments;
  "torrent-get": TorrentGetArguments;
  "session-stats": undefined;
}

interface SessionGetArguments {
  fields: ("version" | "session-id")[];
}

interface TorrentGetArguments {
  ids?: TransmissionTorrentIds;
  fields: KeysArray<TransmissionTorrent>;
  // "objects" not supported
  format: "table";
}


