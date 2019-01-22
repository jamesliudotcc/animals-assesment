import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  species_name: string;

  @Column()
  scientific_name: string;

  @Column()
  image_url: string;

  @Column('text')
  description: string;

  @Column()
  extinct: boolean;

  @Column('timestamp')
  createdAt: Date;

  @Column('timestamp')
  updatedAt: Date;
}
