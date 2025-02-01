# Contributing to Loyverse API Client

## Development Setup

```bash
git clone https://github.com/bob6664569/loyverse.git
cd loyverse
npm install
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## Building

```bash
npm run build
```

## Code Style

We use ESLint and Prettier to maintain code quality:

```bash
# Check style
npm run lint

# Fix style issues
npm run format
```

## Pull Request Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure tests pass (`npm test`)
5. Run linting (`npm run lint`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

Example:
```
feat(categories): add bulk delete operation
```

## TypeScript

- Maintain type safety
- Document all public methods
- No `any` types unless absolutely necessary

## Testing Guidelines

- Unit tests for all new features
- Integration tests for API endpoints
- Maintain 80%+ coverage
- Mock HTTP requests using `fetch-mock`

## Documentation

- Update README.md for new features
- JSDoc comments for all public methods
- Update TS types
- Code examples for complex features

## Breaking Changes

- Only in major version bumps
- Document in CHANGELOG.md
- Add migration guides
- Deprecate old features before removal