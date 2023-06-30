import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Notes from "./Notes";
import {dkeeper} from "../../../declarations/dkeeper";

function App() {
    const [notes, setNotes] = useState([]);

    function addNote(note) {
        setNotes(prevValue => {
            dkeeper.createNote(note.title, note.content);
            return [note, ...prevValue];
        });
    };

    useEffect(() => {
        console.log("useEffect is triggered.");
        fetchData();
    }, []);

    async function fetchData(){
        const notesArray = await dkeeper.readNotes();
        setNotes(notesArray);
    }

    function deleteNote(id){
        dkeeper.removeNote(id);
        setNotes(prevValue => {
            return prevValue.filter((item, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((item, index) => {
                return (<Notes
                    key={index}
                    id={index}
                    title={item.title}
                    content={item.content}
                    onDelete={deleteNote} />
                );
            })
            }
            <Footer />
        </div>
    )
}

export default App;