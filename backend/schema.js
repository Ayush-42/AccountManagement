import mongoose from "mongoose";

const employeeDetails = new mongoose.Schema({
    eid: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    hierarchyExists: {
        type: Boolean,
        required: true,
    }

})

export const employeeInfo = mongoose.model('employeeInfo', employeeDetails)

const claimDetails = new mongoose.Schema({
    cid:{
        type:String,
        required:true,
    },
    eid:{
        type:String,
        required:true,
    },
    actualAmount:{
        type:String,
        required:true,
    },
    claimAmount:{
        type:String,
        required:true,
    },
    assignRole:{
        type:String,
        required:true,
    },
    assignProfile:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    claimType:{
        type:String,
        required:true,
    }
})

export const claimInfo = mongoose.model('claimInfo', claimDetails)

const profileHierarchy = new mongoose.Schema({
    lid:{
        type:String,
        required:true,
    },
    Level1:{
        type:String,
        required:true,
    },
    Level2:{
        type:String,
        required:true,
    },
    Level3:{
        type:String,
        required:true,
    }
})

export const profileLevel = mongoose.model('profileLevel', profileHierarchy)