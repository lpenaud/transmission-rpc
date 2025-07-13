export type TransmissionTorrentId = number | string | "recently-active" | undefined;

export type TransmissionTorrentIds = TransmissionTorrentId | TransmissionTorrentId[];

export interface TransmissionFile {
  bytesCompleted: number;
  length: number;
  name: string;
  begin_piece: number;
  end_piece: number;
}

export interface TransmissionTorrent {
  id: number;
  name: string;
  files: TransmissionFile[];
  labels: string[];
  downloadDir: string;
}

export interface TransmissionSessionStats {
  uploadedBytes: number;
  downloadedBytes: number;
  filesAdded: number;
  sessionCount: number;
  secondsActive: number;
}
