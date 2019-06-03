const {spawn} = require('child_process')
const chalk = require('chalk')

let errors = false

const build = spawn('yarn', ['build'])

build.stdout.on('data', function (data) {
   process.stdout.write(data.toString())
})

build.stderr.on('data', function (data) {
   process.stdout.write(data.toString())
})

build.on('exit', function (code) {
   const test = spawn('npm', ['test'])

   test.stdout.on('data', function (data) {
       process.stdout.write(data.toString())
   })

   test.stderr.on('data', function (data) {
       errors = true
       console.log('stderr: ' + data.toString())
   })

   test.on('exit', function (code) {
       if (errors) {
           console.log(chalk.red('Tests have failed. Please verify tests are passing before pushing'));
           process.exit(1);
       }
   })
})



