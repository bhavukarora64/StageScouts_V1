// @ts-ignore
async function getAllStadium(req, res){
    try{
        req.db.query('SELECT * from Stadium', (err:any, stadiumsList:any) => {
            if(err){
                return res.status(500).json({
                    "error": "Something Went Wrong, Please try again after refreshing the page!"
                })
                
            }
    
            return res.status(200).json(stadiumsList);
        })
    }catch(e){
        return res.status(500).json({
            "error": "Something Went Wrong, Please try again after refreshing the page!"
        })
        
    }
}
// @ts-ignore
async function getStadium(req, res){
    try{
        const stadiumId = req.query.stadiumId

        if(!stadiumId){
                return res.status(400).json({
                    "error": "Mandatory value missing, please check !"
                })
        }

        req.db.query('SELECT * from Stadium WHERE stadiumId = ?', [stadiumId], (err:any, stadiumDetails:any) => {
            if(err){
                return res.status(500).json({
                    "error":  "Something Went Wrong, Please try again after refreshing the page!"
                })
            }

        res.json(stadiumDetails);
    })
    }catch(e){
        return res.status(500).json({
            "error":  "Something Went Wrong, Please try again after refreshing the page!"
        })
    }
    
}

export {
    getStadium,
    getAllStadium
};