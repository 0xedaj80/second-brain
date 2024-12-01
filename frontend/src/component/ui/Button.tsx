

export interface ButtonProps {
   variant:"primary" | "secondary" | "danger";
   size:"sm" | "md" | "lg" ;
   text:string;
   startIcon?:any;
   endIcon?:any;
   onClick:()=>void;
} 

const VariantStyles = {
    "primary":"bg-purple-600 text-white hover:bg-blue-600",
    "secondary":"bg-purple-300 text-purple-600 hover:bg-blue-300",
    "danger":"bg-red-300 text-text-600 w-[200px] hover:bg-red-400"
}

const defaultstyles = "rounded-lg flex   font-normal justify-center"


const sizeStyles = { 
    sm:"py-1 px-2", 
    md:"py-2 px-4",
    lg:"py-4 px-6",
}


export function Button(props:ButtonProps) {
     return (
        <button onClick={props.onClick} className={`${VariantStyles[props.variant]} ${defaultstyles} ${sizeStyles[props.size]}`} >{props.startIcon ? <div className="pr-2 m-1">{props.startIcon}</div>:null}{props.text}{props.endIcon}</button>
     )
}