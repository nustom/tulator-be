import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", select: false })
  updatedAt!: Date;
}
