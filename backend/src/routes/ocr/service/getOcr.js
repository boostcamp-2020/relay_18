
let ocr =require('../../../modules/imgtToJson')
module.exports=async function(req,res){
        // console.log(req.body.img)
        const imgInfo =await  ocr(req.body.img);
        let data ={ "name" : imgInfo[0].title.inferText,
                "address" : imgInfo[0].fields[0].inferText

        }
        res.json(data)
   
}