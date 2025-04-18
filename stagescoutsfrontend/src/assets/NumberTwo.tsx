interface imageSize{
    imageProp:"sm" | "md" | "lg" | "xl"
}

const imageStyle = {
    "sm": "w-3 h-4",
    "md": "w-5 h-5",
    "lg": "w-6 h-6",
    "xl": "w-20 h-20",
};

export default function NumberTwo(props: imageSize){
    return (
       <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" className={imageStyle[props.imageProp]} xmlSpace="preserve"><g><path d="M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18 C29.11,6.88,44.47,0,61.44,0L61.44,0z M82.15,86.69H40.73c0.47-4.08,1.92-7.93,4.32-11.53c2.41-3.61,6.91-7.86,13.53-12.77 c4.05-3.01,6.64-5.28,7.78-6.85c1.13-1.56,1.7-3.04,1.7-4.44c0-1.51-0.56-2.81-1.68-3.89c-1.12-1.08-2.53-1.61-4.23-1.61 c-1.76,0-3.2,0.56-4.32,1.67c-1.12,1.12-1.87,3.08-2.25,5.9l-13.81-1.12c0.54-3.9,1.54-6.93,2.98-9.11 c1.45-2.19,3.48-3.85,6.1-5.02c2.64-1.17,6.28-1.75,10.93-1.75c4.86,0,8.63,0.55,11.33,1.67c2.69,1.1,4.82,2.8,6.36,5.09 c1.55,2.3,2.32,4.87,2.32,7.71c0,3.02-0.89,5.91-2.66,8.67c-1.77,2.75-5,5.78-9.68,9.08c-2.78,1.92-4.64,3.27-5.57,4.04 c-0.94,0.77-2.04,1.77-3.31,3.02h21.56V86.69L82.15,86.69z M100.75,22.13C90.69,12.07,76.79,5.85,61.44,5.85 c-15.35,0-29.25,6.22-39.31,16.28C12.07,32.19,5.85,46.09,5.85,61.44c0,15.35,6.22,29.25,16.28,39.31 c10.06,10.06,23.96,16.28,39.31,16.28c15.35,0,29.25-6.22,39.31-16.28c10.06-10.06,16.28-23.96,16.28-39.31 C117.03,46.09,110.81,32.19,100.75,22.13L100.75,22.13z"/></g></svg>
    )
}