import React,{Fragment,useState,useContext,useEffect} from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import {Notecontext} from "../store/ContextProvider"
import './home.css'

function Notebook() {

    const ctx= useContext(Notecontext)
    console.log(ctx)

    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [search,setSearch]=useState('')
    const [editId,seteditId]=useState('')

const [showModal,setModal]=useState(false)


  const addnewNote=()=>{
       setModal(true)
  }

  const handleCloseModal=()=>{
    setModal(false)
  }

  const searchHandler=(event)=>{
    setSearch(event.target.value)
  }

  const deletenotehandler=(id)=>{
    ctx.deleteNote(id)
}

const editnotehandler=(note)=>{
   seteditId(note.id)
   setModal(true)
   setNoteTitle(note.title)
   setNoteDescription(note.description)
}

  const filterednotes = Array.isArray(ctx.notes)? ctx.notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())):[]

  const addNoteInDb=()=>{
    
    if (noteTitle.trim() === "" || noteDescription.trim() === "") {
        alert("Please fill in both title and description.");
        return;
    }
    
    if(editId)
    {
      ctx.editNote(editId,{ title: noteTitle, description: noteDescription })
      seteditId('')
    }
    else{
      ctx.addNote({ title: noteTitle, description: noteDescription });
    }
    
    setModal(false); 
    setNoteTitle(''); 
    setNoteDescription('');
  }

  

  useEffect(()=>{
    ctx.fetchData()
  },[])

    return (
        <Fragment>
          <header>
          <h3>NotePad</h3>
          </header>
        <Container >
            <div  className='leftbar'>
                <Row className='mb-3'>
            <Col xs="auto">
                 <label>Search : </label>
            </Col>
           <Col>
                   <input type="text" value={search} onChange={searchHandler} size='sm' />
            </Col>
            </Row>
          
            <Row className='mb-3'>
            <Col xs="auto" md={3}>
                 Total:
            </Col>
           <Col className='ml-2'> {ctx.total} </Col>
            </Row>
            <Row>
            <Col xs="auto" md={3}>
                 Showing:
            </Col>
           <Col>{filterednotes.length}</Col>
            </Row>
            <Row className='mt-4'>
              <Col>
              <Button variant="primary" className="mt-3" onClick={()=>addnewNote()}>Add New Note</Button>
              </Col>
            </Row>
            </div>
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Add a New Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Row className='mb-3'>
            <Col xs="auto">
                  <Form.Label>Note Title</Form.Label>
            </Col>
           <Col>
                   <Form.Control type="text" size='sm' value={noteTitle} 
                   onChange={(e)=>setNoteTitle(e.target.value)} />
            </Col>
            </Row>
            <Row className='mb-3'>
            <Col xs="auto">
                  <Form.Label>Description</Form.Label>
            </Col>
           <Col>
                   <Form.Control type="text" size='sm' value={noteDescription}
                   onChange={(e)=>setNoteDescription(e.target.value)} />
            </Col>
            </Row>
            </Form>
                </Modal.Body>
                <Modal.Footer>
                 {editId?(
                   <Button variant="secondary" onClick={()=>addNoteInDb()}>Edit Note</Button>
                 ):(
                  <Button variant="secondary" onClick={()=>addNoteInDb()}>Add Note</Button>
                 )}
                
                    <Button variant="secondary" onClick={handleCloseModal}>Close  </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        <div className='rightbar' >
           <div className='rightcont'>
          
            {ctx.total>0 ? (
                filterednotes.map((note)=>(
                    <div  key={note.id}> 
                     
                    <Row>
                      <Col md={4}>
                        <h5>{note.title}</h5> 
                      </Col>
                      <Col md={4}>
                        <Button size="sm" onClick={()=>editnotehandler(note)}>Edit</Button>
                      </Col>
                      <Col md={2}>
                        <Button variant='danger' size="sm" onClick={()=>deletenotehandler(note.id)}>Delete</Button>
                      </Col>
                    </Row>
                    <Row style={{marginBottom:'20px'}}>
                      <Col md={4}>{note.description}</Col>
                    </Row>
                  </div>
                ))
            ):(
              <div  className='empty'>
                 <h1>No Data Yet......</h1>
                </div>

             
            )}
                 </div>
        </div>
        </Fragment>
    );
}

export default Notebook;
