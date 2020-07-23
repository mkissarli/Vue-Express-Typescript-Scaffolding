export function isAuth(req: any, res: any, next: any) {
  if(req.isAuthenticated()){
    return next();
  }
  else{
    return res.json({
      message: "This route requires you to be authenticated.",
      status: 401
    })
  }
}