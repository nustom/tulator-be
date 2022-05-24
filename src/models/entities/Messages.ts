import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Base } from '../Base';
import {
  Validate,
  validate as classValidate,
  ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments
} from 'class-validator';

@ValidatorConstraint({ name: 'MessageText', async: false })
export class MessageText implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const { object } = args;
    // @ts-ignore
    if (object.parent_id) {

    }
    return text.length > 1 && text.length < 10;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is too short or too long!';
  }
}

@Entity()
export class Message extends Base {
  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  @Validate(MessageText)
  content: string;

  @OneToOne(() => Message, message => message.children, { nullable: true })
  @JoinColumn(({ name: 'parent_id' }))
  parent: Message;

  @OneToOne(() => Message, message => message.parent)
  children: Message;

  @BeforeInsert()
  async validate() {
    const errors = await classValidate(this);
    console.log('>>>>>>>>>>>>>>>>>.', errors)
  }
}
