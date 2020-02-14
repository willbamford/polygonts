import {
  colorCreate,
  colorEquals,
  colorAdd,
  colorSubtract,
  colorMultiply,
  colorMultiplyScalar,
  colorClamp,
  colorFromHex,
  colorToHex,
  colorRandom,
} from './color'

test('colorCreate', () => {
  expect(colorCreate(0.1, 0.2, 0.3)).toEqual({ r: 0.1, g: 0.2, b: 0.3 })
})

test('colorEquals', () => {
  expect(
    colorEquals({ r: 0.5, g: 0.4, b: 0.3 }, { r: 0.5, g: 0.4, b: 0.3 }),
  ).toBeTruthy()
})

test('colorAdd', () => {
  expect(
    colorAdd({ r: 0.5, g: 0.3, b: 0.3 }, { r: 0.3, g: 0.4, b: 0.3 }),
  ).toEqual({ r: 0.8, g: 0.7, b: 0.6 })
})

test('colorSubtract', () => {
  expect(
    colorSubtract({ r: 0.5, g: 1.0, b: 0.3 }, { r: 0.3, g: 0.4, b: 0.3 }),
  ).toEqual({ r: 0.2, g: 0.6, b: 0.0 })
})

test('colorMultiply', () => {
  expect(
    colorMultiply({ r: 0.5, g: 1.0, b: 0.3 }, { r: 0.3, g: 0.4, b: 0.3 }),
  ).toEqual({ r: 0.15, g: 0.4, b: 0.09 })
})

test('colorMultiplyScalar', () => {
  expect(colorMultiplyScalar({ r: 0.5, g: 0.4, b: 0.3 }, 2)).toEqual({
    r: 1.0,
    g: 0.8,
    b: 0.6,
  })
})

test('colorClamp', () => {
  expect(colorClamp({ r: 2.0, g: -0.1, b: 0.5 })).toEqual({
    r: 1,
    g: 0,
    b: 0.5,
  })
})

test('colorFromHex', () => {
  expect(colorFromHex(0xff9933)).toEqual({
    r: 1,
    g: 0.6,
    b: 0.2,
  })
})

test('colorToHex', () => {
  expect(
    colorToHex({
      r: 1,
      g: 0.6,
      b: 0.2,
    }),
  ).toEqual(0xff9933)
})

test('colorRandom', () => {
  const c = colorRandom()
  expect(typeof c).toBe('object')
})
