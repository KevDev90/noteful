import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class NoteListNav extends Component {
    static contextType = NotefulContext;

    render() {

        const list = this.context.folders.map((folder) => 

            <li 
                key={folder.id} 
                id={folder.id} 
                className='folder'>
                <NavLink 
                    to={`../noteslist/${folder.id}`}
                    className='folder-name'
                    foldername={folder.name}
                    notes={this.context.notes}>{folder.name}</NavLink>
            </li>
        );

        return (
            <div className='folders-container'>
                <ul className='folder-list'>
                    {list}
                </ul>
                <button className='folder-add-button'>
                <NavLink 
                    to='/addfolder' 
                    className='add-folder-link'
                    >Add Folder</NavLink>
                </button>
            </div>
        )
    }
}

export default NoteListNav;