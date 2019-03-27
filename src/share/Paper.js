import React from 'react'

export default class Paper extends React.Component {
  state = {
    disabled:true,
  }

  onChangeHandler = (e) => {
    this.props.onChange({content:e.currentTarget.value})
  }

  componentDidUpdate(prevProps, prevState) {
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
            value={this.props.value}
            placeholder='Select a note'
            onChange={this.onChangeHandler} />
        </section>
      </div>
    )
  }
}