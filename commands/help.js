function helpFn(){
    console.log(`
    List of all the commands:
                node main.js tree "directoryPath"
                node main.js organise "directoryPath"
                node main.js help
    `)

}
module.exports={
    helpKey : helpFn
}