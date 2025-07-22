# Playwright API Automation Framework

## Overview
This framework provides a robust structure for API automation using [Playwright](https://playwright.dev/) and a local mock server powered by [json-server](https://github.com/typicode/json-server). It follows a Page Object Model (POM) pattern adapted for APIs, making tests modular, maintainable, and scalable.

---

## Features
- **API Object Model (POM):** Encapsulates API endpoints in reusable classes.
- **Mock Server:** Uses `json-server` for local, fast, and customizable API simulation.
- **Comprehensive Test Coverage:** Includes positive and negative test cases for payments and refunds.
- **HTML Reporting:** Generates interactive test reports for easy review.

---

## Project Structure
```
apiAutomation/
│
├── api/                # API object classes (PaymentsAPI, RefundsAPI)
│   ├── payments.api.js
│   └── refunds.api.js
│
├── tests/              # Test cases using Playwright
│   └── api.test.js
│
├── db.json             # Mock data for json-server
├── package.json        # Project dependencies and scripts
├── README.md           # This documentation
└── ...
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Mock API Server
```bash
npm run mock-api
```
- The mock server will be available at [http://localhost:3000](http://localhost:3000)
- Endpoints:
  - `http://localhost:3000/payments`
  - `http://localhost:3000/refunds`

### 3. Run the Test Suite
```bash
npx playwright test tests/api.test.js
```

### 4. Generate and View HTML Report
```bash
npx playwright test tests/api.test.js --reporter=list,html
npx playwright show-report
```

---

## API Object Model (POM) Pattern
- **api/payments.api.js:** Encapsulates all payment-related API calls.
- **api/refunds.api.js:** Encapsulates all refund-related API calls.
- Easily extendable for new endpoints/resources.

---

## Customization
- **Add new endpoints:**
  - Create a new API class in `api/` (e.g., `orders.api.js`).
  - Add methods for each endpoint.
  - Write corresponding tests in `tests/`.
- **Change mock data:**
  - Edit `db.json` to add, remove, or modify payments and refunds.
- **Integrate with real APIs:**
  - Update the base URLs in API classes.
  - Add authentication as needed.

---

## Example Test Case
```js
const PaymentsAPI = require('../api/payments.api');
const RefundsAPI = require('../api/refunds.api');

test('Create, get, and refund a payment', async ({ request }) => {
  const paymentsAPI = new PaymentsAPI(request);
  const refundsAPI = new RefundsAPI(request);

  // Create payment
  const createRes = await paymentsAPI.createPayment({
    amount: 1000,
    currency: 'USD',
    source: 'card_visa',
    description: 'Test payment',
  });
  expect(createRes.status()).toBe(201);
  const payment = await createRes.json();

  // Get payment
  const getRes = await paymentsAPI.getPayment(payment.id);
  expect(getRes.status()).toBe(200);

  // Refund payment
  const refundRes = await refundsAPI.refundPayment({
    payment_id: payment.id,
    amount: 1000,
  });
  expect(refundRes.status()).toBe(201);
});
```

---

## Best Practices
- Keep API classes focused and reusable.
- Use mock server for fast, isolated test runs.
- Add negative and edge case tests for robustness.
- Use Playwright's HTML report for debugging and sharing results.

---

## Troubleshooting
- **Port in use:** Change the port in the `mock-api` script in `package.json` if 3000 is busy.
- **Test failures:** Check the mock data in `db.json` and ensure the server is running.
- **Report not opening:** Use `npx playwright show-report` to re-open the last HTML report.

---

## License
MIT 