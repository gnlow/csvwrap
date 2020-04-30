const { program } = require("commander")

module.exports = () => {
    program
        .version('0.0.1')
        .action(x=>console.log("Hello"))
        .parse(process.argv)
}
