import {v4 as uuid4} from 'uuid';
// @ts-ignore
function getImages(req, res){
    try{
        const stadiumId = req.query.stadiumId
        console.log("stadium ID:" + stadiumId);

        if(!stadiumId){
            return res.status(400).json({
                "error": "Mandatory value missing, please check !"
            })
        }
        // @ts-ignore
        req.db.query('SELECT * from UserUploads WHERE stadiumId = ?', [stadiumId], (err, imageList) => {
            if(err){
                return res.status(500).json({
                    "error": "Something Went Wrong, Please try again after refreshing the page!"
                })
                
            }
            res.json(imageList);
        })
    }catch(e){
        return res.status(500).json({
            "error": "Something Went Wrong, Please try again after refreshing the page!"
        })
    }
}
// @ts-ignore
function publishImages(req, res){
    try{
        const {UserId, StadiumName, StadiumStand, StadiumSeats, ImageName} = req.body;

        if(!UserId || !StadiumName || !StadiumStand || !StadiumSeats || !ImageName){
            return res.status(400).json({
                "error": "Mandatory Values Missing, Please check !"
            })
        }

        const ImageId = uuid4(); 
    
        const newImage = {ImageId: ImageId, UserId: UserId, StadiumId: StadiumName, StandName: StadiumStand, SeatNumber: StadiumSeats, ImageName: ImageName};
    // @ts-ignore
        //Adding Image
        req.db.query('INSERT INTO UserUploads SET ?', newImage, (err, result) => {
            if(err){
                return res.status(500).json({
                    "error": "Something Went Wrong, Please try again after refreshing the page!"
                })
            }
        
        res.json(result);
        
        });
    }catch(e){
        return res.status(500).json({
            "error": "Something Went Wrong, Please try again after refreshing the page!"
        })
    }
    
}

export {
    publishImages,
    getImages
};