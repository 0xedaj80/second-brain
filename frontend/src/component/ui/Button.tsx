

export interface ButtonProps {
   variant:"primary" | "secondary" | "danger" | "nice";
   size:"sm" | "md" | "lg" ;
   text:string;
   startIcon?:any;
   endIcon?:any;
   onClick:()=>void;
} 

const VariantStyles = {
    "primary":"bg-purple-600 rounded-lg text-white hover:bg-blue-600",
    "secondary":"bg-purple-300 rounded-lg text-purple-600 hover:bg-blue-300",
    "danger":"bg-red-300 text-black rounded-lg w-[150px] hover:bg-red-400  transition-colors font-serif ",

    "nice":"bg-purple-300   border-black text-black  rounded-full w-[150px] hover:bg-green-200  transition-colors font-serif ",
}

const defaultstyles = " flex   font-normal justify-center"


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