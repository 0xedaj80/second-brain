
export function Input({reference, placeholder}:{
   placeholder:string; 
    reference:any}){
     return (
        <div className="">
            <input type="text" placeholder={placeholder} className="px-4 py-2 border rounded m-2 " ref={reference} />
        </div>
     )
}