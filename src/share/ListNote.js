import React from "react"
import Title from "./Title"
import Paper from "./Paper"

export default class ListNote extends React.Component {
  state = {
    content: '',
    txtDisabled:true,
    currentID: ''
  }

  constructor(props) {
    super(props)

  }

  componentDidMount() {

  }

  onEditTitle = () => {
    this.setState({txtDisabled:false})
  }

  onOkTitle = (value) => {
    this.setState({txtDisabled:true})
    this.props.onUpdate({id:this.state.currentID,
                          title:value.title,
                          content:this.state.content})
  }

  onCancelTitle = () => {
    this.setState({txtDisabled:true})
  }

  onRemoveTitle = (id) => {
    this.setState({content:''})
    this.props.onRemove(id)
  }

  onClickItem = (e) => {
    const _id = e.currentTarget.id
    let isDiff = _id !== this.state.currentID

    if (isDiff) {
      const elem = this.props.list.find(({id}) => id ===_id)
      if (elem) {
        this.setState({content:elem.content, currentID:elem.id, txtDisabled:isDiff})
      }
    }
  }

  onPaperChange = ({content}) => {
    this.setState({content})
  }

  getItems() {
    if (this.props.list && this.props.list.length) {
      return (
        <ul>
          { this.props.list.map(elem => (
            <li key={elem.id} id={elem.id} onClick={this.onClickItem}>
              <Title
                label='title'
                title='AAA'
                onOk={this.onOkTitle}
                onCancel={this.onCancelTitle}
                onEdit={this.onEditTitle}
                onRemove={this.onRemoveTitle}
                value={elem.title}
                id={elem.id}
                isEditable={this.state.currentID === elem.id}
                selected={this.state.currentID === elem.id}
                editing={false}/>
            </li>
          ))}
        </ul>)
    }
    else {
      return (<div><span>List of notes is empty</span></div>)
    }
  }

  render() {
    console.log('currentid', this.state.currentID)

    return (
      <section className="listnote">
        <aside className="listnote-left">{this.getItems()}</aside>
        <aside className="listnote-right">
          <Paper value={this.state.content}
            disabled={this.state.txtDisabled}
            onChange={this.onPaperChange}/>
        </aside>
      </section>
    )
  }
}
