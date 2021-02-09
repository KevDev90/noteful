import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import Note from './Note';

class NoteListMain extends Component {
    static contextType = NotefulContext;
    
    static defaultProps = {
        match: {
            params: {}
        }
    }


    render() {
        const {folderId} = this.props.match.params;
        const {notes=[]} = this.context;
        const getNotes = (notes, folderId) => (
            (!folderId) ? notes : notes.filter(note => note.folderId === folderId)
        )

        const notesForFolder = getNotes(notes, folderId);
        const list = notesForFolder.map((note) =>

            <li 
                key={note.id} 
                className='note-item'>
                <Note 
                  id={note.id}
                  name={note.name}
                  modified={note.modified}/>
            </li>
            )

        return (
            <div className='notes-list-container'>
                <ul className='notes-list'>
                    {list}
                </ul>
                <button className='add-button'>
                <NavLink 
                    to='/addnote' 
                    className='add-note-link'>Add Note</NavLink>
                </button>
            </div>
        )
    }
}

export default NoteListMain;