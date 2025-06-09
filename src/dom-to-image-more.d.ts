// dom-to-image-more.d.ts
declare module "dom-to-image-more" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { Options as DomToImageOptions, toBlob as toBlobFn } from "dom-to-image-more";
  // 최소한 아래 시그니처만 선언해 주면 일반적인 toBlob 사용은 타입체크 없이 되도록 할 수 있습니다.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function toBlob(node: Node, options?: any): Promise<Blob>;
  export default { toBlob } as { toBlob: typeof toBlobFn };
}
