import React, {Component} from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from './ValidationError';
import ErrorBoundary from './ErrorBoundary';
import PropTypes from 'prop-types';

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            content: '',
            folderId: '',
            modified: '',
        }
    }

    static contextType = NotefulContext;


    updateName(name) {
        this.setState({name: name})
    }
    updateContent(content) {
        this.setState({content: content})
    }
    updateFolder(folderId) {
        this.setState({folderId: folderId})
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    handleClickSubmit = () => {
        const modifiedDate = new Date().toISOString();
        this.setState({modified: modifiedDate})
    }

    validateName() {
        const name = this.state.name.trim();
        if(name.length === 0) {
            return 'Name is required'
        }
    }

    validateContent() {
        const content = this.state.content.trim();
        if(content.length === 0) {
            return 'At least one character is required'
        }
    };

    validateFolder() {
        const folder = this.state.folderId;
        if(folder.length === 0) {
            return 'Must select a folder'
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                console.log(response)
                if (!response.ok)
                    return response.json().then(e => Promise.reject(e))
                return response.json()
            })
            .then((data) => {
                this.context.addNote(data)
                this.props.history.push('/')
            })
            .catch(error => {
                console.error({error})
            })
    }


    render() {
        const options = this.context.folders.map((folder) =>
        <option key={folder.id} value={folder.id}>{folder.name}</option>
    )

        return (
          <ErrorBoundary>
            <form className='note-form' onSubmit={e => this.handleSubmit(e)}>
                <h2>Create New Note</h2>
                <div className='note-form_required'>* required field</div>
                <div className='form-group'>
                    <label htmlFor='name'>Name *</label>
                    <input 
                        type='text'
                        className='note-name'
                        name='name'
                        id='name'
                        onChange={e => this.updateName(e.target.value)}/>
                        {this.state.name &&
                        <ValidationError message={this.validateName()}/>}
                    <label htmlFor='content'>Content *</label>
                    <textarea
                        className='content' 
                        onChange={e => this.updateContent(e.target.value)}/>
                        {this.state.content &&
                        <ValidationError message={this.validateContent()}/>}
                    <label htmlFor='folder'>Folder *</label>
                    <select
                        className='note-folder'
                        name='folder'
                        onChange={e => this.updateFolder(e.target.value, e.target.folderId)}>
                        <option></option>
                            {options}
                        </select>
                        {this.state.folder &&
                        <ValidationError message={this.validateFolder()}/>}
                </div>
                <div className='form-button-group'>
                    <button type='reset' className='form-button'
                        onClick={this.handleClickCancel}>Cancel</button>
                    <button 
                        type='submit'
                        onClick={this.handleClickSubmit} 
                        className='form-button'
                        disabled={this.validateName() || this.validateContent() || this.validateFolder()}>Submit</button>
                </div>
            </form>
          </ErrorBoundary>
        )
    }
}

export default AddNote;

AddNote.propTypes = {
    history: PropTypes.object.isRequired,
}