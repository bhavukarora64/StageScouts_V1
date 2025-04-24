import { ReactElement } from "react";

interface ButtonProps{
    title: string;
    buttonSize: "sm" | "md" | "md-long" | "lg" | "xl";
    buttonType: "primary" | "secondary" | "logout";
    backIcon?: ReactElement;
    frontIcon?: ReactElement;
    onClick?: () => void;
    customStyle?: string;
}

const buttonType = {
    "primary" : "transition-all transform duration-200 bg-[#0f92c9] text-white rounded-lg cursor-pointer text-lg text-center",
    "secondary" : "transition-all transformduration-200 bg-white text-black border-2 border-black rounded-lg cursor-pointer text-lg text-center",
    "logout" : "transition-all transformduration-200 bg-red-700 text-white rounded-lg cursor-pointer text-lg text-center"
}

const buttonSize = {
    "sm": "px-2 py-1 hover:scale-110",
    "md": "px-4 py-2 hover:scale-110",
    "md-long": "px-20 py-5 hover:scale-110",
    "lg": "px-6 py-3 hover:scale-110",
    "xl": "px-8 py-4 hover:scale-110"
}


function Button(props: ButtonProps){
    return (
        <button onClick={props.onClick} className={ (buttonType[props.buttonType]) + " " +  (buttonSize[props.buttonSize]) + " " + "flex items-center justify-center gap-1"  + " " + (props.customStyle) }>
            {props.frontIcon}
                {props.title}
            {props.backIcon}
        </button>
        
    )
}

export default Button;