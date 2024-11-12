import React,{createContext,useEffect,useState} from "react"

export const Notecontext=createContext()

export const ContextProvider=(props)=>{

    const fetchData=async ()=>{
    }


    const addNote = async (note) => {
        try {
            const response = await fetch('https://notebook-2c64c-default-rtdb.firebaseio.com/notes', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(note) 
            });
    
            if (!response.ok) {
                throw new Error('Failed to add new tour');
            }
            console.log(response)
    
        } catch (error)
         {
            console.error(error);
        }
}
return(
    <ContextProvider.Provider value={{ addNote }}> 
        {props.children}
    </ContextProvider.Provider>
)

}

export default ContextProvider