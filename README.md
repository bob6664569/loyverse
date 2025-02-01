# Loyverse API Client

An unofficial Node.js client for the Loyverse API. Modern, lightweight and zero-dependency.

⚠️ This is not an official Loyverse product. Use at your own risk.

## Features

- Zero dependencies
- Full TypeScript support
- Automatic retry on rate limits
- Async iterator pagination
- Bulk operations helper
- ESM & CommonJS support

## Installation

```bash
npm install loyverse
```

## Quick Start

```javascript
import Loyverse from 'loyverse';

const client = new Loyverse('your-api-token');

// List all items with automatic pagination
for await (const item of client.items.listAll()) {
  console.log(item);
}

// Bulk create customers with concurrent operations
const customers = [
  { name: 'John', email: 'john@example.com' },
  { name: 'Jane', email: 'jane@example.com' }
];

const { results, errors } = await client.bulkOperation(
  customers,
  customer => client.customers.create(customer),
  3 // Concurrency
);
```

## Advanced Usage

### Retry Configuration

```javascript
const client = new Loyverse('token', {
  retryConfig: {
    maxRetries: 5,
    initialDelay: 1000,
    maxDelay: 30000
  }
});
```

### Pagination Helper

```javascript
// Automatic pagination handling
for await (const category of client.categories.listAll()) {
  console.log(category);
}

// Manual pagination
const { items, cursor } = await client.categories.list({ limit: 50 });
```

### Error Handling

```javascript
try {
  await client.items.get('invalid-id');
} catch (error) {
  if (error.name === 'LoyverseError') {
    console.log(error.status);  // HTTP status
    console.log(error.errors);  // Detailed error info
  }
}
```

## Available Resources

- Categories
- Customers
- Inventory
- Items
- Receipts
- Merchants
- Variants
- Stores
- Employees
- Payment Types

Each resource provides standard CRUD operations where applicable.

## Contributing

PRs welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

MIT