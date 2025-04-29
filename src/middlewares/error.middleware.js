export default (err,_req,res,_next)=>{
    console.error(err);
    res.status(500).json({message:'Error interno'});
  };
  