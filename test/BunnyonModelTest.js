const assert = require('assert')
const BunnyonModel = require('../lib/BunnyonModel')

describe('BunnyonModel', function () {
  it('works', async () => {
    const name = 'beacon' + Date.now()
    const Beacon = new BunnyonModel(name, {baseDir: 'tmp'})
    assert.ok(Beacon)

    {
      const shouldNull = await Beacon.findLatest()
      assert.equal(shouldNull, null)
    }

    await Beacon.create({
      id: 0,
      data: 'foo'
    })
    await Beacon.create({
      id: 1,
      data: 'goo'
    })
    await Beacon.create({
      id: 2,
      data: 'hoo'
    })

    {
      const latest = await Beacon.findLatest()
      assert.equal(latest.id, 2)

      const beacons = await Beacon.findAll()
      for (let i = 0; i < 3; i++) {
        assert.equal(beacons[i].id, i)
      }
    }

    const SameBeacon = new BunnyonModel(name, {baseDir: 'tmp'})
    {
      const latest = await SameBeacon.findLatest()
      assert.equal(latest.id, 2)

      const beacons = await SameBeacon.findAll()
      for (let i = 0; i < 3; i++) {
        assert.equal(beacons[i].id, i)
      }
    }
  })
})

/* global describe, it */
