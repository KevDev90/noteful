import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { format } from 'date-fns';
import NotefulContext from '../NotefulContext';

class NotesList extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = NotefulContext;

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
                <NavLink 
                    to={`../notepage/${note.id}`} 
                    className='note-name-link'><h2>{note.name}</h2></NavLink>
                <p>{format(new Date(note.modified), 'MM/d/yyyy')}</p>
                <button>delete</button>
            </li>
            )

            const folderSelectedName = this.context.folders.filter(folder => 
                folder.id === this.props.match.params.folderId)

            console.log(folderSelectedName[0].name);


        return (
            <div>
                <main className='notes-list-container'>
                    <h3 className='folder-sidebar'>{folderSelectedName[0].name}</h3>
                    <ul className='notes-list'>
                        {list}
                        <NavLink 
                            to='/addnote' 
                            className='notes-list-addnote-button'>Add Note</NavLink>
                    </ul>
                </main>
            </div>
        )
    }
}

export default withRouter(NotesList);