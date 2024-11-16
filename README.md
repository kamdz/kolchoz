# 🐴 kolchoz

A fun, lightweight CLI tool to calculate your earnings in real time! Enter your rate (monthly, daily, or hourly), and let the tool show you how much you've earned every second — perfect for tracking productivity or just having a laugh.

## 🚀 Features

- **Real-time earning tracker** – watch your earnings grow by the second.
- **Multiple rate types** – supports monthly, daily, or hourly rates.
- **Custom currency support** – defaults to your country's currency but allows customization.
- **Compact mode** – minimalist output for discreet and distraction-free tracking.

## 🛠️ Installation

```bash
npm install -g kolchoz
```

## 📖 Usage

### CLI Example

Track your earnings with a simple command:

```bash
kolchoz PL -m 15000
# or without installation
npx kolchoz PL -m 15000
```

Output:

```
0.03 PLN | 1s
0.05 PLN | 2s
0.08 PLN | 3s
...
```

### Options

- **`<country>`**: Your country code (e.g., `US`, `PL`) to determine the working hours for the current month and the currency.
- **`-m, --monthly <rate>`**: Your monthly rate (e.g., salary).
- **`-d, --daily <rate>`**: Your daily rate.
- **`-h, --hourly <rate>`**: Your hourly rate.
- **`-c, --currency <currency>`**: (Optional) Specify a custom currency instead of the default for your country.
- **`-s, --compact`**: Show a minimal, compact output format.

### Examples

#### Monthly Rate

```bash
kolchoz PL -m 4000
```

This calculates your earnings per second based on a $4,000 monthly salary in Poland.

#### Daily Rate

```bash
kolchoz PL -d 200
```

This calculates your earnings per second with a daily rate of 200 PLN.

#### Compact Output

```bash
kolchoz PL -h 20 -s
```

Output:

```
0.01 | 0:01
0.01 | 0:02
0.02 | 0:03
...
```

## 🔧 API

If you want to use the functionality programmatically, you can import the core function:

### `getRatePerSecond(options: Options & Rate): { currency: string; ratePerSecond: number }`

Calculates the earnings per second based on the provided rate and country.

- `options`:
  - `country`: (string) A valid [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  - `currency`: (optional) Override the default currency for the specified country.
  - Rate one of:
    - `hourly`: (number)
    - `daily`: (number)
    - `monthly`: (number)

#### Example

```javascript
import getRatePerSecond from 'kolchoz';

const { ratePerSecond, currency } = getRatePerSecond({
  country: 'US',
  monthly: 5000
});

console.log(`Earning ${ratePerSecond.toFixed(6)} ${currency} per second!`);
```

## 🌟 Why "kolchoz"?

The name is inspired by the word "kolkhoz" referring to a Soviet collective farm. It’s a tongue-in-cheek reference to the grind of daily work, making it a perfect fit for a tool that tracks your "earnings under the clock."
