import React, { useEffect } from 'react'
import * as notesConfig from '../config'

interface Props {
  label: string
  title: string
  onOk: Function
  onCancel: Function
  onEdit: Function
  onRemove: Function
  value: string
  id: string
  isEditable: boolean
  selected: boolean
  editing: boolean
}

const Title: React.FC<Props> = (props) => {
  const [isEditable, setIsEditable] = React.useState(false)
  const [editing, setEditing] = React.useState(false)
  const [title, setTitle] = React.useState(props.value)
  const [tmpValue, setTmpValue] = React.useState('')

  const ip = notesConfig.IP
  const port = notesConfig.PORT

  const editClickHandler = () => {
    setIsEditable(false)
    setEditing(true)
    setTmpValue(title)
    props.onEdit()
  }

  const okClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()

    const label = props.label
    const value = tmpValue

    setIsEditable(true)
    setEditing(false)
    setTitle(value)
    setTmpValue('')

    props.onOk && props.onOk({ [label]: value })
  }

  const cancelClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()

    setIsEditable(true)
    setEditing(false)
    setTmpValue('')

    props.onCancel()
  }

  const removeClickHandler = () => {
    props.onRemove(props.id)
  }

  const onChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setTmpValue(e.currentTarget.value)
  }

  useEffect(() => {
    setIsEditable(props.isEditable)
  }, [props.isEditable])

  useEffect(() => {
    if (!props.selected && editing)
      setEditing(false)
  }, [props.selected])

  return (
    <div className='title'>
      {!editing ? (
        <div className='title-value'>{title}</div>
      ) : (
          ''
        )}
      {editing ? (
        <div className='title-input'>
          <textarea
            placeholder='enter a title'
            value={tmpValue}
            onChange={onChangeHandler}
          />
          <img
            src={`http://${ip}:${port}/assets/ok.png`}
            onClick={okClickHandler}
          />
          <img
            src={`http://${ip}:${port}/assets/cancel.png`}
            onClick={cancelClickHandler}
          />
        </div>
      ) : (
          ''
        )}
      {isEditable ? (
        <div className='title-edit'>
          <span onClick={editClickHandler}>edit</span>
          <img
            src={`http://${ip}:${port}/assets/trash.png`}
            onClick={removeClickHandler}
          />
        </div>
      ) : (
          ''
        )}
    </div>
  )
}

export default Title