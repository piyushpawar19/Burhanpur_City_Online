const mongoose = require("mongoose");
const BussinessModel = require ("../models/Business");
const {
    errorResponse,
    successResponse,
  } = require("../helper/successAndError");

  module.exports.createBussiness = async (req,res)=>{
    try {
         const existOne = await BussinessModel.findOne();
         if(existOne){
            res.status(404).json(404,"Bussiness is alredy exist",existOne);
         }
         const newBussiness = await BussinessModel();
         newBussiness.save();
         res.status(200).json(200,"Bussiness is created successfully",newBussiness);
    } catch (error) {
        req.status(500).json(500,"Invalid Credentials");
    }
  };

  module.exports.getBussiness = async (req,res)=>{
    try {
        const getBussiness = await BussinessModel.find();
        res.status(200),json(successResponse(200,"get bussiness model",getBussiness));
    } catch (error) {
        res.status(500).json(500,"Invalid Credentials");
    }
  };
  module.exports.updateBussiness = async (req,res)=>{
    try {
        const id= req.params.id;
        const query = req.body;
        const updatedBuss = await BussinessModel.findByIdAndUpdate(id,query,{
            new:true,
            runValidatos:true
        });
        res.status(200).json(successResponse(200,"Bussiness is updated",updatedBuss));
    } catch (error) {
        res.status(500).json(errorResponse,"Invlid Credentials");
    }
  };
  module.exports.deletedBuss = async (req,res)=>{
    try {
        const id = req.params.id;
        const deletedBuss = await BussinessModel.findByIdAndDelete(id);
        res.status(200).json(successResponse(200,"Bussiness is deleted successfully",deletedBuss));

    } catch (error) {
        res.status(500).json(errorResponse,"Invlid Credentials");
    }
  }