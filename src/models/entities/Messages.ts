import { BeforeInsert, Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Base } from '../Base';
import {
  Validate,
  validate as classValidate,
  ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments
} from 'class-validator';

const REX_OPERATOR_AND_NUMBER = /^[\+|\-|\*|\/]\d+$/;
const REX_NUMBER_ONLY = /^\d+$/;
@ValidatorConstraint({ name: 'MessageText', async: false })
export class MessageText implements ValidatorConstraintInterface {
  validate(content: string, args: ValidationArguments) {
    const { object } = args;
    // @ts-ignore
    if (object?.parent) {
      return REX_OPERATOR_AND_NUMBER.test(content);
    }
    return REX_NUMBER_ONLY.test(content);
  }

  defaultMessage() {
    return 'Content invalid!';
  }
}

@Entity()
@Tree("closure-table")
export class Message extends Base {
  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  @Validate(MessageText)
  content: string;

  @TreeParent()
  parent: Message;

  @TreeChildren()
  children: Message[];

  @BeforeInsert()
  async validate() {
    const errors = await classValidate(this);
    console.log('Validation: ', errors);
    return { errors };
  }
}
