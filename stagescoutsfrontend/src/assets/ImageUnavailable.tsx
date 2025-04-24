
export default function ImageUnavailable(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
        <rect width="200" height="100" rx="10" fill="#ffffff"/>
        <path d="M50 70 C50 40, 150 40, 150 70" stroke="#e0e0e0" strokeWidth="3" fill="none"/>
        <rect x="50" y="70" width="100" height="5" fill="#e0e0e0"/>
        <text x="100" y="90" fontFamily="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#999999">Image Not Found</text>
      </svg>
    )
}