export async function getHome(req, res, next) {
  res.render("index");
}

export async function getFileUpload(req,res,next)
{
    res.render("uploadFiles");
}
