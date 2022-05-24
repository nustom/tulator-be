import { Message } from "src/models/entities/Messages"

export interface ICreateMessageBody {
  parentId?: number,
  author: string,
  content: string
}

export type MessageResponse = {
  id: number,
  parent: Message,
  content: string,
  createdAt: Date,
  topics: Message[]
}
