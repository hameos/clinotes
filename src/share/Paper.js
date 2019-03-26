import React from 'react'

export default class Paper extends React.Component {
  state = {
    value:'',
    disabled:true,
    txtstyle:'paper-textarea-disable'
  }

  onChangeHandler = (e) => {
    this.setState({value:e.currentTarget.value})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.setState({value:this.props.value})
    }

    if (this.props.disabled !== prevProps.disabled) {
      this.setState({disabled:this.props.disabled})
    }
  }

  render() {
    console.log('Paper render')
    const borderStylename = !this.state.disabled ? 'paper paper-enable' : 'paper'
    return (
      <div className='paper-parent'>
        <section className={borderStylename}>
          <textarea  disabled={this.state.disabled}
            type="text"
            className="form-control"
            value={this.state.value}
            placeholder="Type your note here" onChange={this.onChangeHandler} />
        </section>
      </div>
    )
  }
}