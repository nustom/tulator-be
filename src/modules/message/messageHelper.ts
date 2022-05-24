import { Message } from 'src/models/entities/Messages';
import { MessageResponse } from './interfaces';

export const transformGetAllResponse = (messages: Message[]): MessageResponse[] => {
  const result: MessageResponse[] = [];

  console.log('><><><><><><><><', messages)

  for (const message of messages) {



    const newMessage: MessageResponse = {
      ...message,
      topics: message.children
    }

    result.push(newMessage);
  }

  // for (const p of messages) {
  //   const child: Message[] = [];
  //   let a = p.children;

  //   if (a) {

  //     console.log('~~~~~~', a)

  //     do {
  //       child.push(a);
  //       a = a.children;
  //     } while(a && a.children)
  //   }

  //   const messageRe: MessageResponse = {
  //     ...p,
  //     topics: child
  //   }

  //   result.push(messageRe);
  // }

  console.log('><><><><><><><><', result)

  return result;
}
