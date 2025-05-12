import React from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import notes from "../notes";

function App() {
    return (
        <div>
            <Header />
            {notes.map(createNote)};
            <Footer />
        </div>
    );
}

function createNote(props) {
    return (
        <Note 
            key={props.key}
            title={props.title}
            content={props.content}
        />
    );
}

export default App;
