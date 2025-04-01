// @ts-ignore
async function getAllEvents(req, res){
    try{
        const pageNumber = req.query.pageNumber || 0
        
        const eventList:any = [];
        const data  = await fetch('https://app.ticketmaster.com/discovery/v2/events?page='+pageNumber+'&size=20&apikey=OMYm5vOhtr5SgFoQG9dBksCy9f7qMp7A', {
            method: 'GET'
        })

        const response = await data.json();

        response._embedded.events.map((element: any) => {

            const hdImage = element.images.filter((image: any) => {
                if(image.width === 2048){
                    return image.url
                }
            })
            
            eventList.push({
                "eventId": element.id,
                "eventName": element.name,
                "eventURL": element.url,
                "eventVenue": element._embedded.venues[0].name,
                "eventDate": element.dates.start.dateTime,
                "eventImage": hdImage[0].url
            })
        })

        res.json(eventList);
    }catch(e){
        return res.status(500).json({
            "error": "Something Went Wrong, Please try again after refreshing the page!"
        })
        
    }
}
// @ts-ignore
async function getEvent(req, res){
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
    getEvent,
    getAllEvents
};