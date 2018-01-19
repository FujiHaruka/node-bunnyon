const assert = require('assert')
const Bunnyon = require('../lib/Bunnyon')

describe('Bunnyon', function () {
  it('works', async () => {
    const bunnyon = new Bunnyon({baseDir: 'tmp'})
    assert.ok(bunnyon)

    const Beacon = bunnyon.getModel('beacon' + Date.now())
    await Beacon.create({hoge: 100})
    const beacon = await Beacon.findLatest()
    assert.equal(beacon.hoge, 100)

    const Ceacon = bunnyon.getModel('ceacon' + Date.now(), {devideByDate: false})
    await Ceacon.create({hoge: 200})
    const ceacon = await Ceacon.findLatest()
    assert.equal(ceacon.hoge, 200)
  })
})

/* global describe, it */
