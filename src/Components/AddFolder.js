import React, {Component} from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from './ValidationError';
import PropTypes from 'prop-types';
import ErrorBoundary from './ErrorBoundary';

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '', 
          touched: false
        }
    }

    static contextType = NotefulContext;


    updateFolder(folder) {
        this.setState({name: folder, touched: true})
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    validateFolder() {
        const folder = this.state.name.trim();
        if (folder.length === 0) {
            return 'Folder is required'
        } 
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Folder:', this.state.name)
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
                this.context.addFolder(data)
                this.props.history.push('/')
            })
            .catch(error => {
                console.error({error})
            })
    }

    render() {
        return (
          <ErrorBoundary>
            <form className='folder-form' onSubmit={event => this.handleSubmit(event)}>
                <h2>Create New Folder</h2>
                <div className='folder-form_required'>* required field</div>
                <div className='form-group'>
                    <label htmlFor='folder'>Folder *</label>
                    <input 
                        type='text' 
                        className='new-folder-name' 
                        name='folder' 
                        id='folder'
                        onChange={e => this.updateFolder(e.target.value)} />
                        {this.state.name.touched && 
                        <ValidationError message={this.validateFolder()}/>}
                </div>
                <div className='form-button-group'>
                <button 
                        type='reset' 
                        className='form-button'
                        onClick={this.handleClickCancel}>Cancel</button>
                    <button type='submit' className='form-button' disabled={this.validateFolder()}>Add Folder</button>
                </div>
            </form>
          </ErrorBoundary>
        )
    }
}

export default AddFolder;

AddFolder.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
}