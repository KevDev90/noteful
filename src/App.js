import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './Components/NoteListNav';
import NoteListMain from './Components/NoteListMain'
import NotePageMain from './Components/NotePageMain';
import NotePageNav from './Components/NotePageNav';
import NotefulContext from './NotefulContext';
import AddFolder from './Components/AddFolder';
import AddNote from './Components/AddNote';
import ErrorBoundary from './Components/ErrorBoundary';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  }

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
    ])
        .then(([notesResponse, foldersResponse]) => {
          if (!notesResponse.ok) 
            return notesResponse.json().then(error => Promise.reject(error));
          if (!foldersResponse.ok)
            return foldersResponse.json().then(error => Promise.reject(error));
          return (Promise.all([notesResponse.json(), foldersResponse.json()])) ;
        })
        .then(([notes, folders]) => {
          this.setState({notes, folders});

        })
        .catch(error => {
          console.error({error})
        });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder],
    })
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note],
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    }
    return (
      <div className="App">
        <header>
          <Link to='/' className='header-link'><h1>Noteful</h1></Link>
        </header>
        <NotefulContext.Provider value={contextValue} >
          <div className='nav-main'>
          <ErrorBoundary>
            <nav>
              <Route 
                exact
                path='/' 
                component={NoteListNav}
              />
              <Route
                path='/noteslist/:folderId'
                component={NoteListNav}
              />  
              <Route 
                path='/notepage/:noteId'
                component={NotePageNav}
              />
              <Route 
                path='/addfolder'
                component={AddFolder}/>
            </nav>
            </ErrorBoundary>
            <ErrorBoundary>
            <main>
              <Route 
                exact
                path='/' 
                component={NoteListMain}
              />
              <Route
                path='/noteslist/:folderId'
                component={NoteListMain}
              />  
              <Route 
                path='/notepage/:noteId' 
                component={NotePageMain}
              />
              <Route 
                path='/addnote'
                component={AddNote}/>
            </main>
            </ErrorBoundary>
          </div>
        </NotefulContext.Provider>

      </div>
    );
  }
}
export default App;
