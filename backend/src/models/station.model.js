const { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert } = require('typeorm');
const { generateUniqueStationId } = require('../utils/security.util');

@Entity()
class Station {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    id;

    @Column({ type: 'varchar', length: 255 })
    station_name;

    @Column({ type: 'varchar', length: 255 })
    address;

    @Column({ type: 'double' })
    price;

    @ManyToOne(() => require('./user.model').User, user => user.stations)
    @JoinColumn({ name: 'user_id' })
    user;

    @BeforeInsert()
    generateUniqueId() {
        this.id = generateUniqueStationId(this.station_name, this.address);
    }
}

module.exports = { Station };