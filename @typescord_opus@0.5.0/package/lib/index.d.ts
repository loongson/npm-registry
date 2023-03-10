declare module '@typescord/opus' {
  export class Opus {
    public constructor(rate: number, channels: number);
    public encode(buffer: Buffer): Buffer;
    public decode(buffer: Buffer): Buffer;
    public applyEncoderCTL(ctl: number, value: number): void;
    public applyDecoderCTL(ctl: number, value: number): void;
    public setBitrate(bitrate: number): void;
    public getBitrate(): number;
  }
}
