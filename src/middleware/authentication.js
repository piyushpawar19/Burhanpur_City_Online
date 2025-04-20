const jwt = require("jsonwebtoken");
const dotenv = require ("dotenv");
dotenv.config();
const { errorResponse } = require ("../helper/successAndError");
const JWT_SECRET = process.env.JWT_SECRET;
const authenticat = async (req,res,next)=>{

    try {
        let token = req.header("Authorization");
       
        token = token && token.replace("Bearer ","");
           
        if(!token){
            return res.status(404).json(errorResponse(404,"Token is needed"));
        }
        // const {token} = req.body;
        const verifyToken =  jwt.verify(token,JWT_SECRET);
        const userId = req.userId;
        console.log(verifyToken);
        next();

    } catch (error) {
        console.log(error)
        res.status(500).json(errorResponse(500,"Server Error"));
    }
}


module.exports = authenticat;

// module.exports.verifyToken = async (req,res,next) =>{
//     try {
//         const { token }= req.body;
//         const secretKey="1234567";

//         if(!token){
//             return res.status(404).json({message :"You are not get correct Token"});
//         }

//         const tokenVerify = jwt.verify(token,secretKey, async (err, decoded)=>{
//             if(err){
//                 return res.status(401).json({message:"Invalid Token"});
//             }
//             console.log(decoded);
//             const studentsData = await studentModel.find();
//             return res.status(200).json({message:"Token is Valid",studentsData});
//         });
//     } 
    
//     catch (error) {

//          res.status(500).json({message:"Students not found",details:error.message});
//     }
//     next();
// }