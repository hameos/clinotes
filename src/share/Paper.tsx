import React, { useEffect } from 'react'

interface Props {
  onChange: Function
  disabled: boolean
  value: string
}

const Paper: React.FC<Props> = (props) => {
  const [disabled, setDisabled] = React.useState(true)

  const onChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    props.onChange({ content: e.currentTarget.value })
  }

  useEffect(() => {
    setDisabled(props.disabled)
  }, [props.disabled])

  const borderStylename = !disabled
    ? 'paper paper-enable'
    : 'paper'
  return (
    <div className='paper-parent'>
      <section className={borderStylename}>
        <textarea
          disabled={disabled}
          value={props.value}
          placeholder='Select a note'
          onChange={onChangeHandler}
        />
      </section>
    </div>
  )
}

export default Paper