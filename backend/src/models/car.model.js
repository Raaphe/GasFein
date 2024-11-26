const { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } = require('typeorm');
const { User } = require('./user.model');

const FuelType = {
  GASOLINE: 'gasoline',
  DIESEL: 'diesel',
  ELECTRIC: 'electric',
  HYBRID: 'hybrid',
};

@Entity()
class Car {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: 'varchar', length: 100 })
    make;

    @Column({ type: 'varchar', length: 100 })
    model;

    @Column({ type: 'int' })
    year;

    @Column({ type: 'varchar', length: 50 })
    color;

    @Column({ type: 'varchar', length: 50, enum: Object.values(FuelType), default: FuelType.GASOLINE })
    fuel_type;

    @ManyToOne(() => require('./user.model').User, user => user.cars)
    @JoinColumn({ name: 'user_id' })
    user;
}

module.exports = { Car, FuelType };
