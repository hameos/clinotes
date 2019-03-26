import React from "react"
import Title from "./Title"
import Paper from "./Paper"

export default class ListNote extends React.Component {
  state = {
    paperValue: '',
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

  }

  onCancelTitle = () => {
    this.setState({txtDisabled:true})
  }

  onRemoveTitle = (id) => {
    this.props.onRemove(id)
  }


  getItems() {
    return (
      <ul>
        { this.props.list &&
          this.props.list.length &&
          this.props.list.map(elem => (
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
      </ul>
    )
  }

  onClickItem = (e) => {
    const _id = e.currentTarget.id
    const elem = this.props.list.find(({id}) => id ===_id)
    if (elem)
      this.setState({paperValue:elem.content, currentID:elem.id})
  }

  render() {
    console.log('currentid', this.state.currentID)

    return (
      <section className="listnote">
        <aside className="listnote-left">{this.getItems()}</aside>
        <aside className="listnote-right">
          <Paper value={this.state.paperValue} disabled={this.state.txtDisabled}/>
        </aside>
      </section>
    )
  }
}
