let fs = require('fs');
let path = require('path');

if (process.argv.length != 4) {
    console.log(`Incorrect number of arguments. ${process.argv.length - 2} provided, 2 expected.`)
    console.log('Usage is "node app.js [dir1] [dir2]"')
    console.log('Program will return a list of files in dir1 but not dir2.')
    process.exit(1)
}

function fileList(dir) {
    return fs.readdirSync(dir).reduce(function(list, file) {
      let name = path.join(dir, file)
      let isDir = fs.statSync(name).isDirectory()
      return list.concat(isDir ? fileList(name) : [name])
    }, [])
  }

let dirOne = process.argv[2].replace(/\\/g, '/')
let dirTwo = process.argv[3].replace(/\\/g, '/')

console.log(`Dirone is ${dirOne} and dirtwo is ${dirTwo}`)

if (fs.existsSync(dirOne) && fs.existsSync(dirTwo)) {
    let filesOne = fileList(dirOne).map((file) => file.split(path.sep).slice(-1)[0])
    let filesTwo = fileList(dirTwo).map((file) => file.split(path.sep).slice(-1)[0])

    filesOne = filesOne.map( x => path.parse(x).name)
    filesTwo = filesTwo.map( x => path.parse(x).name)

    onlyOne = filesOne.filter( e => filesTwo.indexOf(e) < 0)

    console.log(onlyOne)
    console.log(`${onlyOne.length} files found.`)
} else {
    console.log('Invalid directory provided.')
}