import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import NotefulContext from "../NotefulContext";
import PropTypes from 'prop-types';

class NotePageNav extends Component {
    
    static contextType = NotefulContext;

    render() {
        const noteId = this.props.match.params.noteId;
        const {notes=[]} = this.context;
        const {folders=[]} = this.context;
        const getNote = (notes, noteId) =>
            notes.find(note => note.id === noteId)

        const noteForPage = getNote(notes, noteId);

         const currentFolder = folders.find(folder => 
             folder.id === noteForPage.folderId);

        return (
            <nav className='note-nav'>
                <button 
                    onClick={() => this.props.history.goBack()}
                    className='note-page-back-link'>
                        back
                </button>
                <h2 className='note-folder-name'>{currentFolder ? currentFolder.name : null}</h2>
            </nav>
        )
    }
}
export default withRouter(NotePageNav);

NotePageNav.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            noteId: PropTypes.string
        })
    }).isRequired,
    history: PropTypes.shape({
        goBack: PropTypes.func
    }).isRequired
}