interface imageSize{
    imageProp:"sm" | "md" | "lg" | "xl"
}

const imageStyle = {
    "sm": "w-3 h-4",
    "md": "w-5 h-5",
    "lg": "w-6 h-6",
    "xl": "w-20 h-20",
};

export default function Search(props: imageSize){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={imageStyle[props.imageProp]}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

      )
}