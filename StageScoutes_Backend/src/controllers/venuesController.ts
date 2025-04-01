// @ts-ignore
async function getAllVenues(req, res){
    try{
        const pageNumber = req.query.pageNumber || 0
        const venueList:any = [];
        const data  = await fetch('https://app.ticketmaster.com/discovery/v2/venues?page='+pageNumber+'&size=20&apikey=OMYm5vOhtr5SgFoQG9dBksCy9f7qMp7A', {
            method: 'GET'
        })

        const response = await data.json();

        response._embedded.venues.map((element: any) => {
            var hdImage = ""
            if(!element.images){
                hdImage = "unavailable"
            }else{
                hdImage = element.images[0].url
            }
            
            venueList.push({
                "venueId": element.id,
                "venueLocation": element.city.name + ", " + element.country.name,
                "venueName": element.name,
                "venueURL": element.url,
                "venueImage":  hdImage
            })
        })

        res.status(200).json({
            'venues': venueList,
            'pageNumber': pageNumber,
            'error': null,
            'success': true
        })
    }catch(e){
        return res.status(500).json({
            "error": "Something Went Wrong, Please try again after refreshing the page!"
        })
        
    }
}
// @ts-ignore
async function getVenue(req, res){
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
// @ts-ignore
async function getSearchedVenue(req, res){
    try{
        const keyword = req.query.keyword
        const venueList:any = [];
        const data  = await fetch('https://app.ticketmaster.com/discovery/v2/venues.json?keyword=' + keyword + '&apikey=OMYm5vOhtr5SgFoQG9dBksCy9f7qMp7A', {
            method: 'GET'
        })

        const response = await data.json();

        response._embedded.venues.map((element: any) => {
            var hdImage = ""
            if(!element.images){
                hdImage = "unavailable"
            }else{
                hdImage = element.images[0].url
            }
            
            venueList.push({
                "venueId": element.id,
                "venueLocation": element.city.name + ", " + element.country.name,
                "venueName": element.name,
                "venueURL": element.url,
                "venueImage":  hdImage
            })
        })

        res.status(200).json({
            'venues': venueList,
            'error': null,
            'success': true
        })
    }catch(e){
        return res.status(500).json({
            "error": "Something Went Wrong, Please try again after refreshing the page!"
        })
        
    }
}



export {
    getVenue,
    getSearchedVenue,
    getAllVenues
};