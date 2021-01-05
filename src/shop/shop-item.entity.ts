import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    type: 'text',
    // default: '(brak)',
    // length: 10000,
    // default: null ,
    // nullable: true,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;
}
