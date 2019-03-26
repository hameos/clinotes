import React from 'react'

export default class AddNote extends React.Component {
  state = {
    title:'',
    content:''
  }

  constructor(props) {
    super(props)


  }

  onChangeTitle = (e) => {
    this.setState({title:e.target.value})
    console.log('onChangeTitle', this.state.title)
  }

  onChangeContent = (e) => {
    this.setState({content:e.target.value})
    console.log(e, this.state.content)
  }

  onClickAdd = (e) => {
    console.log('onClickAdd')

    const data = {...this.state}
    this.props.onAdd(data)
    this.setState({title:'', content:''})
  }

  render() {
    return (
    <div className='addnote'>
      <div className='addnote-line'>Add a note</div>
      <div className='addnote-title'>
        <label>title:</label>
        <input
          type='text'
          onChange={this.onChangeTitle}
          placeholder='title...'
          value={this.state.title}/>
      </div>
      <div className='addnote-content'>
        <label>content:</label>
        <input
          type='text'
          onChange={this.onChangeContent}
          placeholder='content...'
          value={this.state.content}/>
      </div>
      <button className='addnote-btn' onClick={this.onClickAdd}>Add note</button>
    </div>)
  }
}


// <textarea placeholder='content...'
//onChange={this.onChangeContent}>{this.state.content}</textarea>
//