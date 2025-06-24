import path from "path";
import fs from "fs";

export const moveImage = (
  userId: string,
  file: Express.Multer.File,
  currentPath?: string,
  concatPath?: string
) => {
  if (currentPath) {
    console.log(currentPath);
    try {
      fs.unlinkSync(path.join("/app", currentPath));
    } catch (error) {
      console.log(error);
    }
  }

  const finalPath = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    userId.toString(),
    concatPath ? concatPath : ""
  );
  fs.mkdirSync(finalPath, { recursive: true });
  const ext = path.extname(file.originalname);
  const finalName = `${path.basename(
    file.originalname,
    ext
  )}-${Date.now()}${ext}`;
  const destPath = path.join(finalPath, finalName);

  fs.renameSync(file.path, destPath);

  return concatPath ? `/uploads/${userId.toString()}/${concatPath}/${finalName}` : `/uploads/${userId.toString()}/${finalName}`;
};
