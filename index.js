const { program } = require("commander")
const globby = require("globby")
const fs = require("fs")
const util = require("util")

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)

const parse = csv => {
    let items = csv.split("\n")
    let label = items.splice(0, 1)[0].split(",").map(x => x.trim())
    return {label, data: items.map(item => item.split(",").map(x => x.trim()))}
}

module.exports = async () => {
    program
        .version("0.2.0")

        .parse(process.argv)

        const files = await globby("**/*.csv")
        const data = await Promise.all(files.map(file => read(file, "utf-8")))
        data.forEach((datum, i) => {
            write(files[i].replace(/(.*)\.csv/, "$1.js"), 
                `module.exports=${JSON.stringify(parse(datum))}`
            )
        } )
}