import React, { useEffect } from 'react'
import Paper from './Paper'
import Title from './Title'

interface Props {
  onUpdate: Function
  onRemove: Function
  isAlreadyAdded: boolean
  list: Array<{
    id: string,
    title: string,
    content: string
  }>
}

const ListNote: React.FC<Props> = (props) => {
  const [content, setContent] = React.useState('')
  const [txtDisabled, setTxtDisabled] = React.useState(true)
  const [currentID, setCurrentID] = React.useState('')
  const listNoteElem = React.useRef<HTMLDivElement>(null);

  const onEditTitle = () => {
    setTxtDisabled(false)
  }

  const onOkTitle = (value: { title: string }) => {
    setTxtDisabled(true)
    props.onUpdate({
      id: currentID,
      title: value.title,
      content: content,
    })
  }

  const onCancelTitle = () => {
    setTxtDisabled(true)
  }

  const onRemoveTitle = (id: string) => {
    setContent('')
    props.onRemove(id)
  }

  const selectElement = (_id: string, comp?: HTMLElement | null) => {
    const elem = props.list.find(({ id }: { id: string }) => id === _id)
    if (elem) {
      if (!comp) {
        comp = document.getElementById(elem.id)
      }

      setContent(elem.content)
      setCurrentID(elem.id)
      setTxtDisabled(true)
      comp && (comp.style.backgroundColor = 'rgb(205, 205, 233)')
    }
  }

  const deselectElement = (_id: string, comp?: HTMLElement | null) => {
    const elem = props.list.find(({ id }: { id: string }) => id === _id)
    if (elem) {
      if (!comp) {
        comp = document.getElementById(elem.id)
      }
      comp && (comp.style.backgroundColor = '')
    }
  }

  const onClickItem = (e: React.MouseEvent<HTMLElement>) => {
    const _id = e.currentTarget.id
    const isDiff = _id !== currentID

    if (isDiff) {
      deselectElement(currentID)
      selectElement(_id, e.currentTarget)
    }
  }

  const onPaperChange = ({ content }: { content: string }) => {
    setContent(content)
  }

  const getItems = () => {
    if (props.list.length) {
      return (
        <ul>
          {props.list.map(elem => (
            <li key={elem.id} id={elem.id} onClick={onClickItem}>
              <Title
                label='title'
                title='AAA'
                onOk={onOkTitle}
                onCancel={onCancelTitle}
                onEdit={onEditTitle}
                onRemove={onRemoveTitle}
                value={elem.title}
                id={elem.id}
                isEditable={currentID === elem.id}
                selected={currentID === elem.id}
                editing={false}
              />
            </li>
          ))}
        </ul>
      )
    } else {
      return (
        <div>
          <span>List of notes is empty</span>
        </div>
      )
    }
  }

  const scrollToBottom = () => {
    if (listNoteElem.current)
      listNoteElem.current.scrollTop = listNoteElem.current.scrollHeight
  }

  useEffect(() => {
    if (props.list.length > 0) {
      scrollToBottom()
      const lastElem = props.list[props.list.length - 1]
      deselectElement(currentID)
      selectElement(lastElem.id)
    }
  }, [props.isAlreadyAdded])

  return (
    <section className='listnote'>
      <aside className='listnote-left' ref={listNoteElem}>{getItems()}</aside>
      <aside className='listnote-right'>
        <Paper
          value={content}
          disabled={txtDisabled}
          onChange={onPaperChange}
        />
      </aside>
    </section>
  )
}

export default ListNote