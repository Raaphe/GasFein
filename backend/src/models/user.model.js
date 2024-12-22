const { Entity, PrimaryGeneratedColumn, Column, OneToMany } = require('typeorm');
const { Car } = require('./car.model');
const { Station } = require('./station.model');

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: 'varchar', length: 100 })
    first_name;

    @Column({ type: 'varchar', length: 100 })
    last_name;

    @Column({ type: 'varchar', length: 200, unique: true })
    email;

    @Column({ type: 'varchar', length: 255 })
    password_hash;

    @Column({ type: 'varchar', length: 255 })
    profile_image;

    @OneToMany(() => Car, car => car.user, { cascade: true })
    cars;

    @OneToMany(() => Station, station => station.user, { cascade: true })
    stations;
}

module.exports = { User };