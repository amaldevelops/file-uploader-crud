import { PrismaClient } from "@prisma/client";

const prismaClientInstance = new PrismaClient();

export { prismaClientInstance };

export async function readFileList() {
  try {
  } catch (err) {
    throw err;
  }

  const currentFileList = await prismaClientInstance.FileDetails.findMany();
  return currentFileList;
}

export async function addFileInfoToDb(uploadedFileDetailsObject) {
  try {
    await prismaClientInstance.FileDetails.create({
      data: {
        Original_file_name: uploadedFileDetailsObject.originalname,
        hashed_file_name: uploadedFileDetailsObject.filename,
        file_url: uploadedFileDetailsObject.path,
        file_size: uploadedFileDetailsObject.size.toString(),
        folder_name: uploadedFileDetailsObject.destination,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function deleteFileInfoDb(deleteFileName) {
  try {
    await prismaClientInstance.FileDetails.delete({
      where: {
        hashed_file_name: deleteFileName,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function renameFileInfoDb(fileNameToChange, newDetailsObject) {
  try {
    await prismaClientInstance.FileDetails.update({
      where: {
        hashed_file_name: fileNameToChange,
      },
      data: {
        folder_name: newDetailsObject.folder_name,
        file_url: newDetailsObject.file_url,
        folder_name: newDetailsObject.folder_name,
      },
    });
  } catch (err) {
    throw err;
  }
}
