export function redirect(
  {
    set,
    headers,
  }: {
    headers: Record<string, string | null>;
    set: {
      headers: Record<string, string> & {
        "Set-Cookie"?: string | string[];
      };
      status?: number | string;
      redirect?: string;
    };
  },
  href: string
) {
  if (headers["hx-request"] == "true") {
    set.headers["HX-Location"] = href;
  } else {
    set.redirect = href;
  }
}
export async function createImageULR(
  pathToMainBlogPicture: string,
  imageType: string
): Promise<string> {
  const file = Bun.file(pathToMainBlogPicture);

  const bufferedArray = await file.arrayBuffer();

  const bytes = new Uint8Array(bufferedArray);

  const binaryString = String.fromCharCode.apply(null, bytes);

  const base64String = btoa(binaryString);

  return `data:${imageType};base64,${base64String}`;
}
