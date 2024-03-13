import { claimInfo, employeeInfo, profileLevel } from "../schema.js";

export const createUser = async (req,res)=>{
        try{
            const currentCount = await employeeInfo.countDocuments();
            const profile= req.body.profile;
            const countRole = await employeeInfo.countDocuments({ profile });
            const newEntry = new employeeInfo({
                eid: currentCount + 1,
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                region: req.body.region,
                profile: req.body.profile,
                role: `${profile}${countRole + 1}`,
                hierarchyExists: false,
                password: req.body.password,
              });
              await newEntry.save();
            res.status(201).json(newEntry);
        } catch (error) {
          res.status(400).json({ error: 'Error in postEmployeeInfo' });
        }
}

export const createClaim = async (req,res)=>{
        try{
            const currentCount = await claimInfo.countDocuments();

            const newEntry = new claimInfo({
                cid: currentCount + 1,
                eid: req.body.eid,
                actualAmount: req.body.actualAmount,
                claimAmount: req.body.claimAmount,
                status: req.body.status,
                assignProfile: req.body.assignProfile,
                assignRole: req.body.assignRole,
                claimType: req.body.claimType
              });
              await newEntry.save();
            res.status(200).json(newEntry);
        } catch (error) {
          res.status(400).json({ error: 'Error in postClaimInfo' });
        }
}

export const createLevel = async(req,res)=>{
    try{
        // const isTrue = ['true'];
        // const fetchTrue = await employeeInfo.countDocuments({ hierarchyExists: { $in: isTrue } }); 
        // console.log(fetchTrue,'----------------------true');
        // if(fetchTrue?.hierarchyExists==='false'){
            let flag = 0; 
        for(let i=1; i<4; i++){
            const filter = {role: req.body[`L${i}`] }
            const update = { $set: { hierarchyExists: true } }; 
            // const response= await employeeInfo.findOne(filter);
            const response = await employeeInfo.findOne(filter);
            console.log(filter, update, response, '---------filter update response')
            if(!response?.hierarchyExists || response?.hierarchyExists===false){
                await employeeInfo.findOneAndUpdate(filter, update, { new: true });
            }else{
                flag=809;
                break;
            }
            
        }

        if(flag===809){
            console.log('----------------error')
            return res.status(408).json({error:'Hierarchy already exists'});
        }
        const currentCount = await profileLevel.countDocuments();

        const newEntry = new profileLevel({
            lid:currentCount + 1,
            Level1:req.body.L1,
            Level2:req.body.L2,
            Level3:req.body.L3
        });
        await newEntry.save();
        return res.status(200).json(newEntry);
    // }
        // else{
        //     console.log("The hierarchy is already exists");
        // }
    }catch(error){
        console.log(error, '-------error')
        res.status(400).json({error:'Error in Hierarchy'});
    }
}

export const checkEmployeeCredential = async(req,res)=>{
    try{
        const verifyUser= await employeeInfo.findOne({eid:req.body?.eid});
        console.log(verifyUser,'----------------details of db users')
        if(verifyUser.password===req.body.password){
            return res.status(200).json({message:'Employee verified', data:verifyUser})
        }
        else{
            return res.status(400).json({message: "User unauthorised!!"})
        }
    }catch(Error){
        res.status(500).json({Error: 'Error retrieving employee details'})
    }
}

export const fetchEmployeesData = async(req,res)=>{
    try{
        //const targetProfiles = ['Sales', 'Admin'];
        //const fetchEmployee = await employeeInfo.find({ profile: { $in: targetProfiles } });
        const fetchEmployee = await employeeInfo.find({});
        console.log(fetchEmployee,'-----------------fetchEmployee')
        if(fetchEmployee.length > 0){
            return res.status(200).json({message: 'User Data Fetched!!', userInfo: fetchEmployee});
        }else{
          return res.status(404).json({message: "User Not Finded!!"})
        }

    }catch(error){
        res.status(500).json({error: 'Error retrieving employee details'})
    }
}
export const fetchClaimData = async(req,res)=>{
    try{
        const fetchClaim = await claimInfo.find({});
        console.log(fetchClaim,'-----------------fetchClaim')
        if(fetchClaim.length > 0){
            return res.status(200).json({message: 'Claim Data Fetched!!', claimInfo: fetchClaim});
        }else{
          return res.status(404).json({message: "Claim Not Finded!!"})
        }

    }catch(error){
        res.status(500).json({error: 'Error retrieving claim details'})
    }
}

export const updateClaimInfo = async(req, res) => {
    console.log(req.body, '---------body')
    try {
        const id = req.body?._id;
        const payload = { $set: {
          claimType:req.body?.claimType,
          actualAmount:req.body?.actualAmount,
          claimAmount:req.body?.claimAmount,
          status:req.body?.status
        }}
        const newPost = await claimInfo.findByIdAndUpdate({_id:id}, payload, {new : true});
        if(newPost){
          console.log(newPost,'-------------------check id')
          return res.status(200).json({newPost:newPost,message:'update data'});
        }else{
          return res.status(404).json({ message: 'Error in getting updated' });
        }
      } catch (error) {
          return res.status(500).json({ message: 'Error in updateUserInfo' });
      }
  };