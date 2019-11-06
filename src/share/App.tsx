import React, { useEffect } from 'react'
import * as notesConfig from '../config'
import { Note, NoteInput } from '../declarations'
import AddNote from './AddNote'
import ListNote from './ListNote'



const { IP: HOST_IP, PORT: HOST_PORT } = notesConfig

const App: React.FC<{}> = () => {
  const [list, setList] = React.useState([])
  const [alreadyAdded, setAlreadyAdded] = React.useState(false)

  const updateList = (isAdded: boolean) => {
    return fetch(`http://${HOST_IP}:${HOST_PORT}/notes`)
      .then(response => response.json())
      .then(value => {
        setList(value.data ? value.data : [])
        setAlreadyAdded(isAdded)
      })
  }

  const onAddHandler = (data: NoteInput) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch(`http://${HOST_IP}:${HOST_PORT}/notes`, options)
      .then(response => response.json())
      .then(() => {
        console.log('onAddHandler 1')
        return updateList(!alreadyAdded)
      })
  }

  const onRemoveNote = (id: string) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    }

    fetch(`http://${HOST_IP}:${HOST_PORT}/notes/${id}`, options)
      .then(response => response.json())
      .then(() => {
        return updateList(alreadyAdded)
      })
  }

  const onUpdateNote = (value: Note) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title: value.title, content: value.content })
    }

    fetch(`http://${HOST_IP}:${HOST_PORT}/notes/${value.id}`, options)
      .then(response => response.json())
      .then(() => {
        return updateList(alreadyAdded)
      })
  }

  useEffect(() => {
    updateList(alreadyAdded)
  }, [])

  return (
    <div className='wrapper'>
      <header className='header'>
        <h3 className='card-header text-center font-weight-bold text-uppercase py-4'>
          Notes App
					</h3>
      </header>

      <div className='main'>
        <AddNote onAdd={onAddHandler} />
        <ListNote
          list={list}
          isAlreadyAdded={alreadyAdded}
          onRemove={onRemoveNote}
          onUpdate={onUpdateNote} />
      </div>

      <footer className='footer'><span>Powered by @Ibra</span></footer>
    </div>
  )
}

export default App
