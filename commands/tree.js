function treeFn(directoryPath){
    //let destPath ;
    if(directoryPath == undefined)
    {
        
        treeHelper(process.cwd(),"");
        return;
    }
    else{
        let doesExist = fs.existsSync(directoryPath);
        if(doesExist){
        treeHelper(directoryPath,"");

        }
        else{
            console.log("Kindly enter a correct path")
        }
    }

}



function treeHelper(directoryPath,indent){
    // path aya to file hai ya folder hai wo check krngee
    //file hai to contentn print kro
    // agar folder hau to uske andr jao or check kro ki aur kuch bhi hai kya
    let isFile = fs.lstatSync(directoryPath).isFile();
    if(isFile == true){
        let fileName = path.basename(directoryPath);
        console.log(indent+" --- "+fileName);
    }else{
        let dirName = path.basename(directoryPath);
        console.log(indent + "--->" + dirName);
        let childrens = fs.readdirSync(directoryPath);
        for(let i=0;i<childrens.length;i++){
            let childPath = path.join(directoryPath,childrens[i])
            treeHelper(childPath,indent+"\t");
        }
    }
}

module.exports={
    treeKey: treeFn
}