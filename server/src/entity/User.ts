import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { unique: true })
  email: string;

  @Column("text", { nullable: true })
  stripeId: string | null;

  @Column("text", { nullable: true })
  ccLast4: string | null;

  @Column("text", { default: "free-trial" })
  type: string;

  @Column("text")
  password: string;
}
