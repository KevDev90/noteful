import React, {Component} from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from './ValidationError';

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {value: '', touched: false},
            content: {value: ''},
            folder: {value: ''},
            modified: {value: ''}

        }
    }

    static contextType = NotefulContext;


    updateName(name) {
        this.setState({name: {value: name, touched: true}})
    }
    updateContent(content) {
        this.setState({content: {value: content}})
    }
    updateFolder(folder) {
        this.setState({folder: {value: folder}})
    }

    validateName() {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return 'Name is required'
        }
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     const modifiedDate = new Date().toISOString();
    //     this.setState({modified: {value: modifiedDate}})
    //     console.log(this.state);

    //     fetch(`http://localhost:9090/folders`, {
    //         method: 'POST',
    //         body: JSON.stringify(this.state),
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //     })
    //         .then(response => {
    //             console.log(response)
    //             if (!response.ok)
    //                 return response.json().then(e => Promise.reject(e))
    //             return response.json()
    //         })
    //         .then((data) => {
    //             this.context.addNote(data)
    //             this.props.history.push('/')
    //         })
    //         .catch(error => {
    //             console.error({error})
    //         })
    // }


    render() {
        const options = this.context.folders.map((folder) =>
        <option key={folder.id} value={folder.name}>{folder.name}</option>
    )

        return (
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
                        {this.state.name.touched &&
                        <ValidationError message={this.validateName()}/>}
                    <label htmlFor='content'>Content</label>
                    <textarea 
                        onChange={e => this.updateContent(e.target.value)}/>
                    <label htmlFor='folder'>Folder</label>
                    <select
                        className='note-folder'
                        name='folder'
                        onChange={e => this.updateFolder(e.target.value)}>
                        <option></option>
                            {options}
                        </select>
                </div>
                <div className='form-button-group'>
                    <button type='reset' className='form-button'>Cancel</button>
                    <button 
                        type='submit' 
                        className='form-button'
                        disabled={this.validateName()}>Submit</button>
                </div>
            </form>
        )
    }
}

export default AddNote;