/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdatetodoRequest {
  name: string
  dueDate: string
  done: boolean
}