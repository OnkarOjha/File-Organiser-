function organizeFn(directoryPath){
    //console.log("Organize command implemented for ",directoryPath)
    // 1. input-> directory path given
    let destPath ;
    if(directoryPath == undefined)
    {
        destPath = process.cwd();
        
        return;
    }
    else{
        let doesExist = fs.existsSync(directoryPath);
        if(doesExist){
        // 2. create-> organized_file ->directory
         destPath = path.join(directoryPath ,"organized_files");
        if(fs.existsSync(destPath) == false)
        {
            fs.mkdirSync(destPath);
        }
        

        }
        else{
            console.log("Kindly enter a correct path")
        }
    }
    organizeHelper(directoryPath,destPath);

    
   
    
    


}
function organizeHelper(src , dest){
 // 3. identify categoris of all the files present in the directory-> 

 let childNames = fs.readdirSync(src);
 //console.log(childNames)
 for(let i=1;i<childNames.length;i++){
    let childAddress = path.join(src,childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if(isFile){
        ///console.log(childNames[i])
        let category = getCategory(childNames[i]);
        console.log(childNames[i], "belongs to--> ",category)

        // 4. copy / cut files to that organized directory inside of any of category folder
        sendFiles(childAddress,dest,category);

    }
 }


}

function sendFiles(srcFilePath , dest, category){
 let categoryPath = path.join(dest,category);
 if(fs.existsSync(categoryPath) == false){
    fs.mkdirSync(categoryPath);
 }

 let fileName = path.basename(srcFilePath);
 let destFilePath = path.join(categoryPath,fileName);
 fs.copyFileSync(srcFilePath,destFilePath);
 fs.unlinkSync(srcFilePath);
 console.log(fileName , "copied to" , category);

}

function getCategory(name){
    let ext = path.extname(name);
    // console.log(ext);
    ext =  ext.slice(1);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i=0;i<cTypeArray.length;i++)
        {
            if(ext == cTypeArray[i])
            {
                return type
            }
                
        }
        return "others";
    }
}
module.exports={
    organizeKey : organizeFn
}