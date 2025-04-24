import {v4 as uuid4} from 'uuid';
// @ts-ignore
function getImages(req, res){
    try{
        const {venueId, venueName} = req.query

        if(!venueId && !venueName){
            return res.status(400).json({
                "error": "Mandatory value missing, please check !"
            })
        }
        if(venueId){
            // @ts-ignore
            req.db.query('SELECT * from seatviews WHERE venueId = ?', [venueId], (err, imageList) => {
                if(err){
                    return res.status(500).json({
                        "error": "Something Went Wrong, Please try again after refreshing the page!"
                    })
                    
                }
                res.json(imageList);
            })
        }else{
            // @ts-ignore
            req.db.query('SELECT * from seatviews WHERE venueName = ?', [venueName], (err, imageList) => {
                if(err){
                    return res.status(500).json({
                        "error": "Something Went Wrong, Please try again after refreshing the page!"
                    })
                    
                }
                res.json(imageList);
            })
        }

    }catch(e){
        return res.status(500).json({
            "error": "Something Went Wrong, Please try again after refreshing the page!"
        })
    }
}

// @ts-ignore
function publishImages(req, res){
    try{

        const {seatImageURL, rowSeats,venueId, venueName , comment, reviewerName, reviewDate, rating} = req.body;
        if(!seatImageURL || !rowSeats || !comment || !reviewerName || !reviewDate || !rating || !venueId || !venueName){
            return res.status(400).json({
                "error": "Mandatory Values Missing, Please check !"
            })
        }

        const seatId = uuid4(); 
    
        const newImage = {seatId: seatId, seatImageURL: seatImageURL, rowSeats: rowSeats, comment: comment, reviewerName: reviewerName, reviewDate: reviewDate, rating: rating, venueId: venueId, venueName: venueName};
    // @ts-ignore
        //Adding Image
        req.db.query('INSERT INTO seatviews SET ?', newImage, (err, result) => {
            if(err){
                return res.status(500).json({
                    "error": "Something Went Wrong, Please try again after refreshing the page! : " + err
                })
            }
            if(result.affectedRows == 0){
                return res.status(500).json({
                    "error": "Something Went Wrong, Please try again after refreshing the page!"
                })
            }else{
                return res.status(200).json({
                    "message": "Image Published Successfully!"
                })
            }
        
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