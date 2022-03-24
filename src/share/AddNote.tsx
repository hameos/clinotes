import React from 'react'

const AddNote: React.FC<{ onAdd: Function }> = (props) => {
  const title = 'New title'
  const content = '...'

  const onClickAdd = () => {
    props.onAdd({ title, content })
  }

  console.log('add note')

  return (
    <div className="addnote">
      <div className="addnote-line">Add a note</div>
      <button className="addnote-btn" onClick={onClickAdd}>
        Add note
      </button>
    </div>
  )
}

export default AddNote
