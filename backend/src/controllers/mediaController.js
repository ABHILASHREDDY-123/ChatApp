const cloudinary = require("../database/cloudinary");
const fs = require("fs");
const path = require("path");

const uploadImageBufferToCloudinary = async (imageBuffer,filename) => {
    try {
        const fullPath =  path.join(__dirname,"..","..","uploads",filename);
        await fs.writeFileSync(fullPath,imageBuffer,{flag:'w'});
        console.log(fullPath);
        const  result= await cloudinary.uploader.upload(fullPath,{
            resource_type: 'image',
            folder:'chat-uploads',
            public_id: filename, 
            overwrite: true 
          }
        );
        await fs.unlinkSync(fullPath);
        return result;
    } catch (error) {
      throw error;
    }
  };


const mediaController = async (arrayBuffer,originalfilename) => {
    const result = await uploadImageBufferToCloudinary(arrayBuffer,originalfilename);
    return result.secure_url;
  };




module.exports = mediaController;