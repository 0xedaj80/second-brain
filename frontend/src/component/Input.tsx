
export function Input({reference, placeholder,
   value,onChange,
}:{
   placeholder:string; 
    reference:any
    value?:any;
    onChange?:any;
   }){
     return (
        <div className="">
            <input
             value={value} 
             onChange={onChange}
             type="text" placeholder={placeholder} className="px-4 py-2 border rounded m-2 " ref={reference}  />
        </div>
     )
}