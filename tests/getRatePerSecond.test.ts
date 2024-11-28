import getRatePerSecond, { Rate } from '@@';

jest.mock('countries-list', () => ({
  getCountryData: (country: string) => ({
    currency: country === 'US' ? ['USD'] : ['PLN']
  })
}));

jest.mock('dutyhours', () => jest.fn(({ country }: { country: string }) => (country === 'US' ? 160 : 168)));

describe('getRatePerSecond', () => {
  it('should calculate rate per second for monthly rate', () => {
    const rate: Rate = { monthly: 4000 };
    const result = getRatePerSecond({ ...rate, country: 'US' });

    expect(result).toEqual({
      currency: 'USD',
      ratePerSecond: 4000 / 160 / 60 / 60
    });
  });

  it('should calculate rate per second for daily rate', () => {
    const rate: Rate = { daily: 200 };
    const result = getRatePerSecond({ ...rate, country: 'PL' });

    expect(result).toEqual({
      currency: 'PLN',
      ratePerSecond: 200 / 8 / 60 / 60
    });
  });

  it('should calculate rate per second for hourly rate', () => {
    const rate: Rate = { hourly: 50 };
    const result = getRatePerSecond({ ...rate, country: 'US' });

    expect(result).toEqual({
      currency: 'USD',
      ratePerSecond: 50 / 60 / 60
    });
  });

  it('should throw an error when multiple rates are provided', () => {
    const rate = { monthly: 4000, hourly: 50 };

    expect(() => getRatePerSecond({ ...rate, country: 'US' })).toThrow(
      'Exactly one rate type (monthly, daily, hourly) must be provided.'
    );
  });

  it('should throw an error for invalid rate type', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rate = { invalidRate: 123 } as any;

    expect(() => getRatePerSecond({ ...rate, country: 'US' })).toThrow('Invalid rate type provided.');
  });

  it('should use default currency if not specified', () => {
    const rate: Rate = { hourly: 50 };
    const result = getRatePerSecond({ ...rate, country: 'PL' });

    expect(result.currency).toBe('PLN');
  });

  it('should allow custom currency override', () => {
    const rate: Rate = { daily: 200 };
    const result = getRatePerSecond({ ...rate, country: 'US', currency: 'EUR' });

    expect(result.currency).toBe('EUR');
  });
});
