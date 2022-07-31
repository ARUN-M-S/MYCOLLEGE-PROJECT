const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dha9zljxi",
  api_key: "586353362729238",
  api_secret: "DA9_mo212oTzxoo-GiI6AFxOBbA",
  secure: true,
});
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"/MycollgeProfile"
    }
})

const upload= multer({storage:storage})

module.exports=upload