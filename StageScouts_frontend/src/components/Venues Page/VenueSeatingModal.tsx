import { useSearchParams } from "react-router-dom";
import Bin from "../../assets/Bin";
import Button from "../Common Components/Button";
import { useRef, useState } from "react";

// @ts-expect-error:Define a interface here as per the props
function VenueSeatingModal(props){
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [row, setRow] = useState('')
    const [seat, setSeat] = useState('')
    const [comment, setComment] = useState('')
    const [reviewerName, setReviewerName] = useState('')
    const [rating, setRating] = useState(5)
    const [tempURL, setTempURL] = useState('')
    const [searchParams] = useSearchParams()
    const venueId = searchParams.get('venueId')
    const venueName = searchParams.get('venueName')

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

        if(tempURL != ''){
            setTempURL('')
        }
    };
// @ts-expect-error:Define a interface here as per the props
    const handleOnChange = (event) => {
        // @ts-expect-error: Add a condition here ternary
        console.log(fileInputRef.current.files)
        const file = event.target.files[0];
        if (!file) return;
        console.log("Processed the Image, and added to the ref.");
    
        const url = URL.createObjectURL(file);
        setTempURL(url);
    };
    

    const onClose = () =>{
        props.setVisible(false)
    }

    async function publishImage() {
        // @ts-expect-error:Define a interface here as per the props
        if (!fileInputRef.current.files || !fileInputRef.current.files[0]) {
            alert("No file uploaded.");
            return;
        }

        if (!fileInputRef.current || !fileInputRef.current.files[0]) {
            alert("No file uploaded.");
            return;
        }
    
        const file = fileInputRef.current.files[0];
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', "unsigned_Images");
        formData.append('cloud_name', "deljwxfuf");
    
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/deljwxfuf/image/upload`, {
                method: "POST",
                body: formData
            });
    
            const img = await res.json();
            if (!img || !img.url) {
                alert('Something went wrong, please refresh and try again!');
                return;
            }
            const data = await fetch('http://localhost:3001/api/image/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "seatImageURL": img.url,
                    "venueId": venueId,
                    "venueName": venueName,
                    "rowSeats": row + ", " + seat,
                    "comment": comment.toString(),
                    "reviewerName": reviewerName,
                    "reviewDate": new Date().toISOString().split('T')[0],
                    "rating": rating,
            })

        })

            const response = await data.json();
            console.log(response);

            props.setVisible(false)
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Upload failed, please try again.: " + error);
        }
    }
    

    return (
        props.visible && 
        <div className="fixed inset-0 z-60 bg-black/50 flex justify-center items-center">
            <div className="z-100 bg-white rounded-lg p-6 w-[35%]">
                <h1 className="font-bold">Upload Your Seat View</h1>
                <p className="text-gray-500 mb-10 text-sm">Share your experience to help other fans choose the best seats.</p>
                <div className="mt-5 flex flex-col gap-10">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="col-span-1 text-right text-lg">Name</label>
                        <input 
                            type="text"
                            value={reviewerName} 
                            placeholder="Enter your name" 
                            className="border border-gray-300 rounded-md col-span-4 px-3 py-1"
                            onChange={(e) => setReviewerName(e.target.value)}
                        />
                        <label className="col-span-1 text-right text-lg">Venue</label>
                        <input
                            disabled
                            // @ts-expect-error:Define a interface here as per the props
                            id={venueId}
                            type="text" 
                            // @ts-expect-error:Define a interface here as per the props
                            value={venueName}
                            // @ts-expect-error:Define a interface here as per the props
                            placeholder={venueName} 
                            className="border border-gray-300 rounded-md col-span-4 px-3 py-1 bg-gray-200 hover:cursor-no-drop"
                        />
                        <label className="col-span-1 text-right text-lg">Row & Seat</label>
                        <div className="col-span-4 gap-1 flex">
                            <input 
                                type="text" 
                                value={row}
                                onChange={(e) => setRow(e.target.value)}
                                placeholder="Row" 
                                className="border border-gray-300 rounded-md px-3 py-1 w-1/2"
                            />
                            <input 
                                type="text" 
                                value={seat}
                                onChange={(e) => setSeat(e.target.value)}
                                placeholder="Seat" 
                                className="border border-gray-300 rounded-md px-3 py-1 w-1/2"
                            />
                        </div>


                        <label className="col-span-1 text-right text-lg">Rating</label>
                        <select 
                        // @ts-expect-error:Define a interface here as per the props
                            type="text" 
                            value={rating}
                            // @ts-expect-error:Define a interface here as per the props
                            onChange={(e) => setRating(e.target.value)}
                            placeholder="Rating between 1 to 5" 
                            className="border border-gray-300 rounded-md col-span-4 px-3 py-1"
                        >
                            <option value="1">1 - Terrible </option>
                            <option value="2">2 - Bad</option>
                            <option value="3">3 - Average</option>
                            <option value="4">4 - Good</option>
                            <option value="5">5 - Great</option>
                        </select>

                        {/* Comments Section */}
                        <label className="col-span-1 text-right text-lg">Comment</label>
                        <textarea 
                            maxLength={150}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your Comment" 
                            className="border border-gray-300 rounded-md col-span-4 px-3 py-1 resize-none"
                        />

                        {/* Photo */}
                        <label className="col-span-1 text-right text-lg">Photo</label>
                        <div 
                            className="relative col-span-4 border-2 w-full h-50 border-dotted border-gray-300 flex flex-col justify-center items-center hover:bg-gray-100 hover:cursor-pointer transition-all duration-300 rounded-lg"
                            onClick={handleClick}
                        >
                        {tempURL != '' 
                        ? 
                            (<><img src={tempURL} alt="Uploaded preview"  className="w-full h-full object-cover rounded-l">
                            </img>
                             <button className="absolute w-full h-full items-center justify-center flex opacity-0 hover:opacity-100 hover:bg-white/40">
                                <Bin imageProp="xl"/>
                             </button>
                             </>)
                        :
                            (<>
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <label className="text-gray-500 font-light text-sm">
                                Click to upload or drag and drop
                            </label>
                            <label className="text-gray-500 font-light text-xs">
                                SVG, PNG, JPG or GIF (MAX. 5Mb)
                            </label>
                            </>)
                        }
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleOnChange}
                        />
                        </div>
                        <div className="col-span-5 flex justify-end gap-3">
                            <Button onClick={onClose} buttonType="secondary" buttonSize="sm" title="Close" />
                            <Button onClick={publishImage} buttonType="primary" buttonSize="sm" title="Submit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueSeatingModal;
