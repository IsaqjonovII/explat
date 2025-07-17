export function base64ToFile(base64Data: string) {
  const base64File = base64Data.split(",")[1];
  const fileName = `commeta.png`;
  const byteCharacters = atob(base64File);
  const byteArrays = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([byteArrays], { type: "image/png" });

  return new File([blob], fileName, { type: "image/png" });
}
