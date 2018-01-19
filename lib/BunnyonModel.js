const validate = require('./validate')
const {join} = require('path')
const fs = require('fs')
const {promisify} = require('util')
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const existsFile = (path) => new Promise((resolve) => {
  fs.access(path, (err) => resolve(!err))
})
const appendFile = async (file, data) => writeFile(file, data, {flag: 'a'})
const lastLine = promisify(require('last-line'))
const mkdirp = promisify(require('mkdirp'))

class BunnyonModel {
  constructor (key, setting = {}) {
    const s = this
    const {
      baseDir = '',
      devideByDate = true
    } = setting
    Object.assign(s, {
      baseDir,
      devideByDate
    })
    s.modelDir = join(baseDir, key)
  }

  async create (entity) {
    const ok = validate(entity)
    if (!ok) {
      throw new Error(`Invalidate entity ${JSON.stringify(entity)}`)
    }
    const s = this
    await mkdirp(s.modelDir)
    await appendFile(s._storagePath, JSON.stringify(entity) + '\n')
  }

  async findLatest () {
    const s = this
    const {_storagePath: path} = s
    try {
      const exists = await existsFile(path)
      if (!exists) {
        return null
      }
      const line = await lastLine(path)
      return JSON.parse(line)
    } catch (e) {
      return null
    }
  }

  async findAll () {
    const s = this
    const entities = (await readFile(s._storagePath))
      .toString()
      .split('\n')
      .filter(Boolean)
      .map(JSON.parse)
    return entities
  }

  get _storagePath () {
    const s = this
    const {modelDir, devideByDate} = s
    let filename
    if (devideByDate) {
      const now = new Date()
      filename = `${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}`
    } else {
      filename = 'data'
    }
    const modelPath = join(modelDir, filename)
    return modelPath
  }
}

module.exports = BunnyonModel
