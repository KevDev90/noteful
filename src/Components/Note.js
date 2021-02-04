import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {format} from 'date-fns';
import NotefulContext from '../NotefulContext';

class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => {}
    }
    static contextType = NotefulContext;

    handleClickDelete = (e) => {
        e.preventDefault()
        const noteId = this.props.id;

        fetch(`http://localhost:9090/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(() => {
            this.context.deleteNote(noteId)
            this.props.onDeleteNote(noteId)
          })
          .catch(error => {
            console.error({ error })
          })
    }
    render() {
        const {name, id, modified} = this.props
        return (
            <>
                <NavLink 
                    to={`../notepage/${id}`} 
                    className='note-name-link'><h2>{name}</h2></NavLink>
                <p>{format(new Date(modified), 'MM/d/yyyy')}</p>
                <button 
                    className='delete-note'
                    onClick={this.handleClickDelete}>delete</button>
            </>        
        )
    }
}

export default Note;