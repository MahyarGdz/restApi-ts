import { CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class Base {
  @Index({ unique: true })
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @CreateDateColumn({ nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;
}
