import { sumNumbers } from './app'

describe('Teste Controller', () => {
  test('should sum 2 number and return 5', () => {
    const result = sumNumbers(3, 2)

    expect(result).toBe(5)
  })
})
