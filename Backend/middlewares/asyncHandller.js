const asyncHandler=(fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch((error)=>{
        res.status(500).json({message:error.message})
    })
}

export default asyncHandler;














// function asyncHandler(fn) {
//     return function(req, res, next) {
//         Promise.resolve(fn(req, res, next))
//             .catch(function(error) {
//                 res.status(500).json({ message: error.message });
//             });
//     };
// }
