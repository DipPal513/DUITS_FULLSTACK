// src/utils/uploadImage.js
export const uploadImage = async (file) => {
  // 1. Check file size/type (Optional)
  if (file.size > 5000000) { // 5MB limit
    alert("File is too big!");
    return null;
  }

  // 2. Simulate a Backend Upload (Replace this with your API call)
  return new Promise((resolve) => {
    console.log("Uploading...", file.name);
    setTimeout(() => {
      // Return a fake URL for now. 
      // In production: return res.data.secure_url
      resolve(URL.createObjectURL(file)); 
    }, 1000);
  });
};