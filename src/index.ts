import { getCountryData, TCountryCode } from 'countries-list';
import calculateWorkingHours from 'dutyhours';

export type Rate = { monthly: number } | { daily: number } | { hourly: number };

export interface Options {
  country: TCountryCode;
  currency?: string;
}

function getRatePerSecond(options: Options & Rate) {
  const { country, currency = getCountryData(country).currency[0], ...rate } = options;

  // Validate that exactly one rate type is provided
  if (Object.keys(rate).length !== 1) {
    throw new Error('Exactly one rate type (monthly, daily, hourly) must be provided.');
  }

  const rateKey = Object.keys(rate)[0];
  const rateValue = rate[rateKey as keyof Rate];

  // Calculate rate per second based on the rate type
  let ratePerSecond: number;

  if (rateKey === 'monthly') {
    ratePerSecond = rateValue / calculateWorkingHours({ country }) / 60 / 60;
  } else if (rateKey === 'daily') {
    ratePerSecond = rateValue / 8 / 60 / 60;
  } else if (rateKey === 'hourly') {
    ratePerSecond = rateValue / 60 / 60;
  } else {
    throw new Error('Invalid rate type provided.');
  }

  return {
    currency,
    ratePerSecond
  };
}

export default getRatePerSecond;
