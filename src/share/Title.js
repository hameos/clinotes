import React, { Component } from 'react'

export default class Title extends Component {
  state = {
    isEditable:false,
    editing:false,
    title:'',
    tmpValue:''
  }

  constructor(props) {
    super(props)

    this.state.title = this.props.value
  }

  editClickHandler = (e) => {
    this.setState({isEditable:false, editing:true, tmpValue:this.state.title})
    this.props.onEdit()
  }

  okClickHandler = (e) => {
    e.stopPropagation()

    const label = this.props.label
    const value = this.state.tmpValue
    this.setState({isEditable:true, editing:false, title:value, tmpValue:''})

    this.props.onOk && this.props.onOk({[label]:value})
  }

  cancelClickHandler = (e) => {
    e.stopPropagation()

    this.setState({isEditable:true, editing:false, tmpValue:''})
    this.props.onCancel()
  }

  removeClickHandler = (e) => {
    this.props.onRemove(this.props.id)
  }

  onChangeHandler = (e) => {
    this.setState({tmpValue: e.currentTarget.value})
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
          !this.state.editing ? <div className='title-value'>{this.state.title}</div> : ''
        }
        {
          this.state.editing ?
          <div className='title-input'>
            <textarea placeholder='enter a title' value={this.state.tmpValue} onChange={this.onChangeHandler}/>
            <img src={`http://${ip}:${port}/assets/ok.png`} onClick={this.okClickHandler} />
            <img src={`http://${ip}:${port}/assets/cancel.png`} onClick={this.cancelClickHandler}/>
          </div> : ''
        }
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
