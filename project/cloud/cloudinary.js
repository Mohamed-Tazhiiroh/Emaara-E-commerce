import { v2 } from "cloudinary";

const cloudinary = v2;

cloudinary.config({ 
    cloud_name: 'sample', 
    api_key: '874837483274837', 
    api_secret: 'a676b67565c6767a6767d6767f676fe1',
    secure: true
  });


  export default cloudinary;