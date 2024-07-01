export type PreviewSizes = {
  width: number;
  height: number;
  "aspect-ratio": string;
};

export type PreviewSizeOptions = Array<PreviewSizes>;

export type ExpressionOptions = Array<string>;

export type Meme = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  tags: string[]
};
