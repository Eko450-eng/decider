// import imageCompression from "browser-image-compression";
//
// export async function compressImage(
//   file: File | null
// ): Promise<ArrayBuffer | null> {
//   if (!file) return null;
//
//   const options = {
//     maxSizeMB: 3,
//     maxWidthOrHeight: 1920,
//   };
//
//   const compressedFile = await imageCompression(file, options);
//
//   return compressedFile.arrayBuffer();
// }
//
// export async function convertToBase64(file: File) {
//   const image = await compressImage(file);
//
//   if (!image) return;
//   const res = btoa(
//     new Uint8Array(image).reduce(function (data, byte) {
//       return data + String.fromCharCode(byte);
//     }, "")
//   );
//
//   return res;
// }
