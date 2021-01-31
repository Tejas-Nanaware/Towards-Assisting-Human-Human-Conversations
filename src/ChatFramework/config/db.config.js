module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "$abcd123",
    DATABASE: "AssistiveChat",
    DIALECT: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    },
    logging: true
};