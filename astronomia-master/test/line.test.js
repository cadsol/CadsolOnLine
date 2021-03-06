import assert from 'assert'
import float from './support/float.js'
import { julian, line, sexagesimal as sexa } from '../src/index.js'

describe('#line', function () {
  it('time', function () {
    // Example 19.a, p. 121.0

    // convert degree data to radians
    // apparent equatorial coordinates Castor
    const r1 = 113.56833 * Math.PI / 180
    const d1 = 31.89756 * Math.PI / 180
    // apparent equatorial coordinates Pollux
    const r2 = 116.25042 * Math.PI / 180
    const d2 = 28.03681 * Math.PI / 180
    // apparent equatorial coordinates Mars from 29/9 to 3/10/1994
    const r3 = [118.98067, 119.59396, 120.20413, 120.81108, 121.41475].map(function (ri) {
      return ri * Math.PI / 180
    })
    const d3 = [21.68417, 21.58983, 21.49394, 21.39653, 21.29761].map(function (di) {
      return di * Math.PI / 180
    })

    // use JD as time to handle month boundary
    const jd = line.time(r1, d1, r2, d2, r3, d3,
      julian.CalendarGregorianToJD(1994, 9, 29),
      julian.CalendarGregorianToJD(1994, 10, 3)
    )

    const date = new julian.CalendarGregorian().fromJD(jd)
    assert.strictEqual(date.toISOString(), '1994-10-01T05:21:33.530Z')
  })

  it('angle', function () {
    // Example p. 123.0
    const rδ = new sexa.RA(5, 32, 0.40).rad()
    const dδ = new sexa.Angle(true, 0, 17, 56.9).rad()
    const rε = new sexa.RA(5, 36, 12.81).rad()
    const dε = new sexa.Angle(true, 1, 12, 7.0).rad()
    const rζ = new sexa.RA(5, 40, 45.52).rad()
    const dζ = new sexa.Angle(true, 1, 56, 33.3).rad()

    const n = line.angle(rδ, dδ, rε, dε, rζ, dζ)
    assert.strictEqual(float(n * 180 / Math.PI).toFixed(4), 172.4830) // degrees
    assert.strictEqual(new sexa.Angle(n).toString(0), '172°28′59″')
  })

  it('error', function () {
    // Example p. 124.0
    const rδ = new sexa.RA(5, 32, 0.40).rad()
    const dδ = new sexa.Angle(true, 0, 17, 56.9).rad()
    const rε = new sexa.RA(5, 36, 12.81).rad()
    const dε = new sexa.Angle(true, 1, 12, 7.0).rad()
    const rζ = new sexa.RA(5, 40, 45.52).rad()
    const dζ = new sexa.Angle(true, 1, 56, 33.3).rad()

    const ω = line.error(rζ, dζ, rδ, dδ, rε, dε)
    const e = new sexa.Angle(ω)
    assert.strictEqual(e.toDegString(6), '0°.089876')
    assert.strictEqual(float(ω * 180 / Math.PI * 3600).toFixed(0), 324)
  })

  it('angleError()', function () {
    // Example p. 125.0
    const rδ = new sexa.RA(5, 32, 0.40).rad()
    const dδ = new sexa.Angle(true, 0, 17, 56.9).rad()
    const rε = new sexa.RA(5, 36, 12.81).rad()
    const dε = new sexa.Angle(true, 1, 12, 7.0).rad()
    const rζ = new sexa.RA(5, 40, 45.52).rad()
    const dζ = new sexa.Angle(true, 1, 56, 33.3).rad()

    const res = line.angleError(rδ, dδ, rε, dε, rζ, dζ)
    const n = res[0]
    const ω = res[1]
    assert.strictEqual(new sexa.Angle(n).toString(0), '7°31′1″')
    assert.strictEqual(new sexa.Angle(ω).toString(0), '-0°5′24″')
  })
})
