import React,{createContext,useState} from "react"

export const Notecontext=createContext()

 const ContextProvider=(props)=>{

    const [notes,setNote]=useState([])
    const [total,setTotalNote]=useState(0)

    const fetchData=async ()=>{
        try {
            const response = await fetch(
              'https://notebook-2c64c-default-rtdb.firebaseio.com/notes.json'
            );
        
            if (!response.ok) {
              throw new Error('Failed to fetch notes');
            }
        
            const data = await response.json();
         
            const notesArray = data ? Object.entries(data).map(([id, note]) => ({ id, ...note })) : [];
        
            setNote(notesArray);
            setTotalNote(notesArray.length)
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
    }


    const addNote = async (note) => {
        try {
            const response = await fetch('https://notebook-2c64c-default-rtdb.firebaseio.com/notes.json', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(note) 
            });

            if (!response.ok) {
                throw new Error('Failed to add new tour');
            }
            setTimeout(()=>{
                alert("DATA HAS BEEN ADDED SUCCESSFULLY")
            },1000)
            fetchData()
    
        } catch (error)
         {
            console.error(error);
        }
}

const deleteNote=async(id)=>{
   try
   {
      const response= await fetch(`https://notebook-2c64c-default-rtdb.firebaseio.com/notes/${id}.json`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
      })

      if (!response.ok) {
        
        throw new Error('FAILED TO DELETE DATA');
    }
    if(response.ok)
    {
        setTimeout(()=>{
            alert("DATA HAS BEEN DELETED SUCCESSFULLY")
        },1000)
       fetchData()
      
    }
   }catch(error)
   {
      alert(error)
   }
}

const editNote=async(id,note)=>{

    try{
        const response=await fetch(`https://notebook-2c64c-default-rtdb.firebaseio.com/notes/${id}.json`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(note) 

        })
        if (!response.ok) {
            throw new Error('Failed to edit note, try again one more time');
        }
        setTimeout(()=>{
            alert("DATA HAS BEEN UPDATED SUCCESSFULLY")
        },1000)
        fetchData()

    }catch(error)
    {
           alert(error)
    }
}
return(
    <Notecontext.Provider value={{ total,addNote,fetchData,notes,deleteNote,editNote }}> 
        {props.children}
    </Notecontext.Provider>
)

}

export default ContextProvider