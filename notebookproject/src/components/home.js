import React,{useState,useContext,useRef} from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import {Notecontext} from "../store/ContextProvider"

function Notebook() {

    const ctx= useContext(Notecontext)

    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');

const [showModal,setModal]=useState(false)


  const addnewNote=()=>{
       setModal(true)
  }

  const handleCloseModal=()=>{
    setModal(false)
  }

  const addNoteInDb=()=>{
    
    if (noteTitle.trim() === "" || noteDescription.trim() === "") {
        alert("Please fill in both title and description.");
        return;
    }
   
    ctx.addNote({ title: noteTitle, description: noteDescription });
    setModal(false); 
    setNoteTitle(''); 
    setNoteDescription('');
  }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center bg-green">
            <Row>
                <Col md={1}>
                    <h1>NoteBook</h1>
                </Col>
            </Row>
            <div>
            <Form>
                <Row className='mb-3'>
            <Col xs="auto">
                  <Form.Label>Search:</Form.Label>
            </Col>
           <Col>
                   <Form.Control type="text" placeholder="Search" size='sm' />
            </Col>
            </Row>
            </Form>
            <Row className='mb-3'>
            <Col xs="auto">
                 Total:
            </Col>
           <Col className='ml-2'>
                  <input style={{width:"40px"}}></input>
            </Col>
            </Row>
            <Row>
            <Col xs="auto">
                 Showing:
            </Col>
           <Col>
                  <input style={{width:"40px"}}></input>
            </Col>
            </Row>
                    
            </div>
            <Button variant="primary" className="mt-3" onClick={addnewNote}>Add New Note</Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Add a New Book</Modal.Title>
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
                <Button variant="secondary" onClick={addNoteInDb()}>Add Note</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Close  </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Notebook;
