#!/usr/bin/env node
import getRatePerSecond from '@@';
import { Option, program } from 'commander';
import logUpdate from 'log-update';
import prettyMilliseconds from 'pretty-ms';

import packageJson from '../package.json';

program
  .version(packageJson.version)
  .description(packageJson.description)
  .argument('<country>', 'Country code (e.g., "US", "PL")')
  .option('-c, --currency <currency>', 'Custom currency to display')
  .option('-s, --compact', 'Compact output format')
  .addOption(new Option('-m, --monthly <rate>', 'Monthly rate').conflicts(['daily', 'hourly']).argParser(Number))
  .addOption(new Option('-d, --daily <rate>', 'Daily rate').conflicts(['monthly', 'hourly']).argParser(Number))
  .addOption(new Option('-h, --hourly <rate>', 'Hourly rate').conflicts(['monthly', 'daily']).argParser(Number))
  .action((country, { compact, ...options }) => {
    const { ratePerSecond, currency } = getRatePerSecond({ country, ...options });
    let sum = 0,
      timer = 0;

    setInterval(() => {
      sum += ratePerSecond;
      timer += 1000;
      logUpdate(
        `${sum.toFixed(2)}${compact ? '' : ` ${currency}`} | ${prettyMilliseconds(timer, { colonNotation: !!compact })}`
      );
    }, 1000);
  });

program.parse(process.argv);
