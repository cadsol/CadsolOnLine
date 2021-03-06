/* eslint
  no-multi-spaces: 0
*/

import assert from 'assert'
import float from './support/float.js'
import {
  precess,
  base,
  coord,
  elementequinox,
  julian,
  nutation,
  sexagesimal as sexa
} from '../src/index.js'

describe('#precess', function () {
  describe('mn', function () {
    // test data from p. 132.
    const epochFrom = 2000.0
    const tests = [
      [1700, 3.069, 1.338, 20.07],
      [1800, 3.071, 1.337, 20.06],
      [1900, 3.073, 1.337, 20.05],
      [2000, 3.075, 1.336, 20.04],
      [2100, 3.077, 1.336, 20.03],
      [2200, 3.079, 1.335, 20.03]
    ]

    tests.forEach(function (test) {
      const e = {
        epoch: test[0],
        m: test[1],
        na: test[2],
        nd: test[3]
      }
      const a = precess.mn(epochFrom, e.epoch)
      const m = a[0]
      const na = a[1]
      const nd = a[2]
      it('' + e.epoch, function () {
        assert.ok(Math.abs(m - e.m) < 1e-3, 'm')
        assert.ok(Math.abs(na - e.na) < 1e-3, 'na')
        assert.ok(Math.abs(nd - e.nd) < 1e-2, 'nd')
      })
    })
  })

  describe('methods', function () {
    it('approxAnnualPrecession', function () {
      // Example 21.a, p. 132.
      const eq = new coord.Equatorial(
        new sexa.RA(10, 8, 22.3).rad(),
        new sexa.Angle(false, 11, 58, 2).rad()
      )
      const epochFrom = 2000.0
      const epochTo = 1978.0
      const res = precess.approxAnnualPrecession(eq, epochFrom, epochTo)
      assert.strictEqual(new sexa.HourAngle(res.ra).toString(3), '0ʰ0ᵐ3.207ˢ') // Δα
      assert.strictEqual(new sexa.Angle(res.dec).toString(2), '-0°0′17.71″') // Δδ
    })

    it('approxPosition', function () {
      // Example 21.a, p. 132.
      let eq = new coord.Equatorial(
        new sexa.RA(10, 8, 22.3).rad(),
        new sexa.Angle(false, 11, 58, 2).rad()
      )
      const epochFrom = 2000.0
      const epochTo = 1978.0
      const mα = new sexa.HourAngle(true, 0, 0, 0.0169).rad()
      const mδ = new sexa.Angle(false, 0, 0, 0.006).rad()
      eq = precess.approxPosition(eq, epochFrom, epochTo, mα, mδ)
      assert.strictEqual(new sexa.RA(eq.ra).toString(1), '10ʰ7ᵐ12.1ˢ')
      assert.strictEqual(new sexa.Angle(eq.dec).toString(0), '12°4′32″')
    })

    it('position', function () {
      // Example 21.b, p. 135.
      let eq = new coord.Equatorial(
        new sexa.RA(2, 44, 11.986).rad(),
        new sexa.Angle(false, 49, 13, 42.48).rad()
      )
      const epochFrom = 2000.0
      const jdTo = julian.CalendarGregorianToJD(2028, 11, 13.19)
      const epochTo = base.JDEToJulianYear(jdTo)
      eq = precess.position(eq, epochFrom, epochTo,
        new sexa.HourAngle(false, 0, 0, 0.03425).rad(),
        new sexa.Angle(true, 0, 0, 0.0895).rad()
      )
      assert.strictEqual(new sexa.RA(eq.ra).toString(3), '2ʰ46ᵐ11.331ˢ')
      assert.strictEqual(new sexa.Angle(eq.dec).toString(2), '49°20′54.54″')
    })

    it('properMotion', function () {
      // Test with proper motion of Regulus, with equatorial motions given
      // in Example 21.a, p. 132, and ecliptic motions given in table 21.A,
      // p. 138.
      const ε = nutation.meanObliquity(base.J2000)
      const ecl = precess.properMotion(
        new sexa.HourAngle(true, 0, 0, 0.0169).rad(), // eq motions from p. 132.
        new sexa.Angle(false, 0, 0, 0.006).rad(),
        2000.0,
        new coord.Equatorial( // eq coordinates from p. 132.
          new sexa.RA(10, 8, 22.3).rad(), // RA
          new sexa.Angle(false, 11, 58, 2).rad() // Dec
        ).toEcliptic(ε)
      )
      let d = Math.abs((ecl.lon - new sexa.Angle(true, 0, 0, 0.2348).rad()) / ecl.lon)
      assert.ok(d * 169 < 1, 'lon: 169 = significant digits of given lon')
      d = Math.abs((ecl.lat - new sexa.Angle(true, 0, 0, 0.0813).rad()) / ecl.lat)
      assert.ok(d * 6 < 1, 'lat: 6 = significant digit of given lat')
    })
  })

  describe('position JDE', function () {
    // Exercise, p. 136.
    const eqFrom = new coord.Equatorial(
      new sexa.RA(2, 31, 48.704).rad(),
      new sexa.Angle(false, 89, 15, 50.72).rad()
    )
    const mα = new sexa.HourAngle(false, 0, 0, 0.19877).rad()
    const mδ = new sexa.Angle(true, 0, 0, 0.0152).rad()

    const testcases = [
      [base.BesselianYearToJDE(1900), '1ʰ22ᵐ33.9ˢ', '88°46′26.18″'],
      [base.JulianYearToJDE(2050), '3ʰ48ᵐ16.43ˢ', '89°27′15.38″'],
      [base.JulianYearToJDE(2100), '5ʰ53ᵐ29.17ˢ', '89°32′22.18″']
    ]

    testcases.forEach(function (tc, idx) {
      it('testcase #' + idx, function () {
        const epochTo = base.JDEToJulianYear(tc[0])
        const eqTo = precess.position(eqFrom, 2000.0, epochTo, mα, mδ)
        assert.strictEqual(new sexa.RA(eqTo.ra).toString(2), tc[1])
        assert.strictEqual(new sexa.Angle(eqTo.dec).toString(2), tc[2])
      })
    })
  })

  describe('position Epochs', function () {
    // Exercise, p. 136.
    const eqFrom = new coord.Equatorial(
      new sexa.RA(2, 31, 48.704).rad(),
      new sexa.Angle(false, 89, 15, 50.72).rad()
    )
    const mα = new sexa.HourAngle(false, 0, 0, 0.19877).rad()
    const mδ = new sexa.Angle(false, 0, 0, -0.0152).rad()
    const epochs = [
      base.JDEToJulianYear(base.B1900),
      2050,
      2100
    ]
    const exp = [
      ['1ʰ22ᵐ33.9ˢ', '88°46′26.18″'],
      ['3ʰ48ᵐ16.43ˢ', '89°27′15.38″'],
      ['5ʰ53ᵐ29.17ˢ', '89°32′22.18″']
    ]

    epochs.forEach(function (epochTo, idx) {
      it('testcase #' + idx, function () {
        const eqTo = precess.position(eqFrom, 2000, epochTo, mα, mδ)
        assert.strictEqual(new sexa.RA(eqTo.ra).toString(2), exp[idx][0])
        assert.strictEqual(new sexa.Angle(eqTo.dec).toString(2), exp[idx][1])
      })
    })
  })

  describe('eclipticPosition', function () {
    it('Example', function () {
      // Example 21.c, p. 137.
      const eclFrom = new coord.Ecliptic(
        149.48194 * Math.PI / 180, // lon
        1.76549   * Math.PI / 180  // lat
      )
      const epochFrom = 2000.0
      const epochTo = base.JDEToJulianYear(julian.CalendarJulianToJD(-214, 6, 30))
      const eclTo = precess.eclipticPosition(eclFrom, epochFrom, epochTo)
      assert.strictEqual(eclTo.lon * 180 / Math.PI, 118.70416774861883)
      assert.strictEqual(eclTo.lat * 180 / Math.PI, 1.6153320055611455)
    })

    it('reduceElements', function () {
      // Example 24.a, p. 160.
      let ele = new elementequinox.Elements(
        47.122   * Math.PI / 180, // inc
        45.7481  * Math.PI / 180, // node
        151.4486 * Math.PI / 180  // peri
      )
      const JFrom = base.JDEToJulianYear(base.BesselianYearToJDE(1744))
      const JTo = base.JDEToJulianYear(base.BesselianYearToJDE(1950))
      const p = new precess.EclipticPrecessor(JFrom, JTo)
      ele = p.reduceElements(ele)

      assert.strictEqual(ele.inc * 180 / Math.PI, 47.13795835860312)   // i
      assert.strictEqual(float(ele.node * 180 / Math.PI).toFixed(13), 48.6036896626305) // Ω
      /* 48.603689662630515 in node <6.9.1 */
      /* 48.60368966263054 in node 7.0.1 */
      assert.strictEqual(ele.peri * 180 / Math.PI, 151.47823843361917) // ω
    })
  })

  describe('properMotion3D', function () {
    // Example 21.d, p. 141.
    const eqFrom = new coord.Equatorial(
      new sexa.RA(6, 45, 8.871).rad(),
      new sexa.Angle(true, 16, 42, 57.99).rad()
    )
    const mra = new sexa.HourAngle(false, 0, 0, -0.03847)
    const mdec = new sexa.Angle(false, 0, 0, -1.2053)
    const r = 2.64           // given in correct unit
    const mr = -7.6 / 977792 // magic conversion factor

    const tests = [
      [1000.0, '6ʰ45ᵐ47.16ˢ', '-16°22′56.03″'],
      [0.0, '6ʰ46ᵐ25.09ˢ', '-16°3′.77″'],
      [-1000.0, '6ʰ47ᵐ2.67ˢ',  '-15°43′12.27″'],
      [-2000.0, '6ʰ47ᵐ39.91ˢ', '-15°23′30.57″'],
      [-10000.0, '6ʰ52ᵐ25.72ˢ', '-12°50′6.7″']
    ]

    tests.forEach(function (test) {
      const epoch = test[0]
      it('' + epoch, function () {
        const eqTo = precess.properMotion3D(eqFrom, 2000, epoch, r, mr, mra, mdec)
        assert.strictEqual(new sexa.RA(eqTo.ra).toString(2), test[1])
        assert.strictEqual(new sexa.Angle(eqTo.dec).toString(2), test[2])
      })
    })
  })
})
