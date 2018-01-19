const BunnyonModel = require('./BunnyonModel')

class Bunnyon {
  constructor ({baseDir}) {
    const s = this
    s.baseDir = baseDir
  }

  getModel (key, setting = {}) {
    const {
      devideByDate = true
    } = setting
    const {baseDir} = this
    return new BunnyonModel(key, {baseDir, devideByDate})
  }
}

module.exports = Bunnyon
