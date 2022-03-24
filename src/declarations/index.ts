export interface Note {
  id: string
  title: string
  content: string
}

export interface NoteInput extends Pick<Note, Exclude<keyof Note, 'id'>> {}
