import { KeysArray, Tuple } from "../types/helpers.d.ts";
import { TransmissionRequestArgumentsMap, TransmissionRequest } from "../types/transmission/request.d.ts";
import { TransmissionResponse } from "../types/transmission/response.d.ts";
import { TransmissionTorrent, TransmissionTorrentIds } from "../types/transmission/transmission.d.ts";
import { HttpError } from "./errors.ts";

export interface TransmissionClientOptions {
  url: URL;
  auth: string;
}

export class TransmissionClient {
  #request: Request;

  constructor({ url, auth }: TransmissionClientOptions) {
    this.#request = new Request(new URL("/transmission/rpc", url), {
      method: "POST",
      headers: new Headers({
        "Authorization": "Basic " + btoa(auth),
      }),
    });
  }

  async init() {
    try {
      await this.request({
        method: "session-get",
        arguments: {
          fields: ["version", "session-id"],
        },
      });
    } catch (error) {
      if (error instanceof HttpError) {
        // Expected 409
        if (error.response.status === 409) {
          return;
        }
      }
      throw error;
    }
  }

  async torrentGet<K extends KeysArray<TransmissionTorrent>>(
    fields: K,
    ids?: TransmissionTorrentIds,
  ): Promise<Tuple<TransmissionTorrent, K>[]> {
    const res = await this.request({
      method: "torrent-get",
      arguments: {
        ids,
        fields,
        format: "table",
      },
    });
    return res.arguments.torrents.slice(1) as Tuple<TransmissionTorrent, K>[];
  }

  async request<K extends keyof TransmissionRequestArgumentsMap>(
    body: TransmissionRequest<K>,
  ): Promise<TransmissionResponse<K>> {
    const req = new Request(this.#request, {
      body: JSON.stringify(body),
    });
    const res = await fetch(req);
    const sessionId = res.headers.get("X-Transmission-Session-Id");
    if (sessionId !== null) {
      this.#request.headers.set("X-Transmission-Session-Id", sessionId);
    }
    if (res.ok) {
      return res.json();
    }
    throw new HttpError(req, res);
  }
}
