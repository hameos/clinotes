import React from "react"
import AddNote from "./AddNote"
import ListNote from "./ListNote"

const { ip: HOST_IP, port: HOST_PORT } = $CONFIG

export default class App extends React.Component {
	state = {
		list: []
	}

	constructor(props) {
		super(props)
	}

	onAddHandler = data => {
		const options = {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(data)
		}

		fetch(`http://${HOST_IP}:${HOST_PORT}/notes`, options)
			.then(response => response.json())
			.then(data => {
				console.log(data.message)

				this.updateList()
			})
	}

	updateList = () => {
		fetch(`http://${HOST_IP}:${HOST_PORT}/notes`)
			.then(response => response.json())
			.then(value => {
				this.setState({ list: value.data })
			})
  }

  onRemoveNote = (id) => {
    const options = {
      method:'DELETE',
      headers:{
        'Content-type':'application/json'
      }
    }

    fetch(`http://${HOST_IP}:${HOST_PORT}/notes/${id}`, options)
    .then(response => response.json())
    .then(data => {
      this.updateList()
    })
  }

  onUpdateNote = (value) => {
    const options = {
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify({title:value.title, content:value.content})
    }

    fetch(`http://${HOST_IP}:${HOST_PORT}/notes/${value.id}`, options)
    .then(response => response.json())
    .then(data => {
      this.updateList()
    })
  }

	componentDidMount() {
		this.updateList()
	}

	render() {
		return (
			<div className='wrapper'>
				<header className='header'>
					<h3 className='card-header text-center font-weight-bold text-uppercase py-4'>
						Notes App
					</h3>
				</header>

				<div className='main'>
					<AddNote onAdd={this.onAddHandler} />
          <ListNote
            list={this.state.list}
            onRemove={this.onRemoveNote}
            onUpdate={this.onUpdateNote}/>
				</div>

				<footer className='footer'><span>Powered by @Ibra</span></footer>
			</div>
		)
	}
}
