const Sequelize = require ('sequelize');
const { STRING, BOOLEAN, UUID, UUIDV4} = Sequelize;
const connector = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_cars');

const User = connector.define('user', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: {
        type: STRING,
    }
});

const Car = connector.define('car', {
    name: {
        type: STRING,
    }
});

const Sale = connector.define('sale', {
        extendedWarranty: {
        type: BOOLEAN,
        defaultValue: false,
    }
})

Sale.belongsTo(User);
Sale.belongsTo(Car);

const syncAndSeed = async() => {
    await connector.sync({ force: true });
    const [moe, lucy, larry] = await Promise.all(
         ['moe', 'lucy', 'larry'].map( name => User.create({name})));
    const [ford, toyota, audi] = await Promise.all (
        ['Ford', 'Toyota', 'Audi'].map( name => Car.create({ name })));
        Sale.create({ userId: moe.id, carId: ford.id})
        Sale.create({ userId: moe.id, carId: ford.id, extendedWarranty: true});  
};

module.exports = {
    models: {
        User,
        Car,
        Sale,
    },
    connector,
    syncAndSeed,
}