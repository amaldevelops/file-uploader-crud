import { PrismaClient } from "@prisma/client";

const prismaClientInstance = new PrismaClient();

export { prismaClientInstance };

export async function CreateFolderDb(newFolderName) {
  try {
    await prismaClientInstance.FileDetails.create({
      data: {
        Original_file_name: "",
        hashed_file_name: newFolderName,
        file_url: newFolderName,
        folder_name: newFolderName,
        file_size: "",
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function RenameFolderDb(folderName)
{
  try{

  }

  catch(err)
  {
    throw err;
  }
}

export async function DeleteFolderDb(folderName)
{
  try{

  }

  catch(err)
  {
    throw err;
  }
}

export async function readFileListDb() {
  try {
    const currentFileList = await prismaClientInstance.FileDetails.findMany();
    return currentFileList;
  } catch (err) {
    throw err;
  }
}

export async function fileInfoDb(fileName) {
  try {
    const fileInfo = await prismaClientInstance.FileDetails.findUnique({
      where: {
        hashed_file_name: fileName,
      },
    });
    return fileInfo;
  } catch (err) {
    throw err;
  }
}

export async function addFileInfoToDb(uploadedFileDetailsObject, folder_name) {
  try {
    await prismaClientInstance.FileDetails.create({
      data: {
        Original_file_name: uploadedFileDetailsObject.originalname,
        hashed_file_name: uploadedFileDetailsObject.filename,
        file_url: uploadedFileDetailsObject.path,
        file_size: uploadedFileDetailsObject.size.toString(),

        folder_name: folder_name,
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

export async function MoveFileToFolderDb(moveToFolderName)
{

  try{

  }

  catch(err)
  {
    throw err;
  }
}

export async function deleteFileInfoDb(deleteFileName) {
  try {
    console.log(deleteFileName);
    await prismaClientInstance.FileDetails.delete({
      
      where: {
        hashed_file_name: deleteFileName,
      },
    });
  } catch (err) {
    throw err;
  }
}



