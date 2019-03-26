import React, { Component } from 'react'

export default class Title extends Component {
  state = {
    isEditable:false,
    editing:false,
    value:''
  }

  constructor(props) {
    super(props)

    this.inputRef = React.createRef()
    this.state.value = this.props.value
  }

  editClickHandler = (e) => {
    this.setState({isEditable:false, editing:true})
    this.props.onEdit()
  }

  okClickHandler = (e) => {
    const label = this.props.label
    const value = this.inputRef.current.value
    this.setState({isEditable:true, editing:false, value})

    this.props.onOk && this.props.onOk({[label]:value})
  }

  cancelClickHandler = (e) => {
    this.setState({isEditable:true, editing:false})
    this.props.onCancel()
  }

  removeClickHandler = (e) => {
    this.props.onRemove(this.props.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isEditable !== this.props.isEditable) {
      this.setState({isEditable:this.props.isEditable})
    }

    if (prevProps.selected !== this.props.selected) {
      if (!this.props.selected && this.state.editing)
      this.setState({editing:false})
    }
  }

  render() {
    const {ip , port} = $CONFIG

    return (
      <div className='title'>
        {
          !this.state.editing ? <span className='title-value'>{this.state.value}</span> : ''
        }
        {
          this.state.editing ?
          <div className='title-input'>
            <textarea ref={this.inputRef} placeholder='enter a title'/>
            <img src={`http://${ip}:${port}/assets/ok.png`} onClick={this.okClickHandler} />
            <img src={`http://${ip}:${port}/assets/cancel.png`} onClick={this.cancelClickHandler}/>
          </div> : ''
        }
        <br/>
        {
          this.state.isEditable ?
          <div className='title-edit'>
            <span  onClick={this.editClickHandler}>edit</span>
            <img src={`http://${ip}:${port}/assets/trash.png`} onClick={this.removeClickHandler}/>
          </div> : ''
        }
      </div>
    )
  }
}
