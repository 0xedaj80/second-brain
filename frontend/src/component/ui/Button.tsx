

export interface ButtonProps {
   variant:"primary" | "secondary";
   size:"sm" | "md" | "lg" ;
   text:string;
   startIcon?:any;
   endIcon?:any;
   onClick:()=>void;
} 

const VariantStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
}

const defaultstyles = "rounded-lg flex hover:bg-blue-600 font-normal items-center"


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