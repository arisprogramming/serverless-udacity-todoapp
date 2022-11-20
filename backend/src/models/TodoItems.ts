export interface TodoItem {
  userID: string
  todoID: string
  createdAt: string
  name: string
  dueDate: string
  done: boolean
  attachmentLink?: string
}
