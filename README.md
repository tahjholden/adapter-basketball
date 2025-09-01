# Basketball Adapter for MaxPotential Platform

A specialized adapter that integrates basketball-specific functionality with the HOS (Host Operating System) infrastructure.

## Overview

This adapter provides basketball-specific data models, validation, and transformation utilities built on top of the HOS infrastructure packages:

- `@tahjholden/hos-core` - Core configuration and utilities
- `@tahjholden/hos-mcp` - Model Context Protocol integration
- `@tahjholden/hos-rcp` - Remote Call Protocol integration
- `@tahjholden/hos-memory` - Memory management and persistence

## Installation

```bash
npm install @maxpotential/adapter-basketball
```

## Usage

### Basic Setup

```typescript
import { initializeBasketballAdapter, BasketballConfig } from '@maxpotential/adapter-basketball';

const config: BasketballConfig = {
  player: {
    name: "LeBron James",
    position: "SF",
    height: 6.9,
    weight: 250,
    jerseyNumber: 23
  },
  team: {
    name: "Los Angeles Lakers",
    conference: "Western",
    division: "Pacific"
  },
  game: {
    homeTeam: "Los Angeles Lakers",
    awayTeam: "Boston Celtics",
    date: "2024-01-15",
    venue: "Staples Center"
  }
};

const adapter = await initializeBasketballAdapter(config);
```

### Working with Basketball Data

```typescript
import { createPlayerProfile, basketballMapping } from '@maxpotential/adapter-basketball';

// Create player profile
const player = createPlayerProfile({
  name: "Stephen Curry",
  position: "PG",
  height: 6.3,
  weight: 185,
  jerseyNumber: 30
});

// Transform basketball data for HOS
const gameData = {
  gameId: "game-123",
  playerStats: { /* player stats */ },
  teamStats: { /* team stats */ },
  gameInfo: { /* game info */ }
};

const hosFormat = basketballMapping.toHOSFormat(gameData);
```

## Features

- **Type-safe Configuration**: Zod-based validation for all basketball data
- **HOS Integration**: Built on proven HOS infrastructure
- **Advanced Statistics**: Calculate efficiency ratings and advanced metrics
- **Data Transformation**: Convert between basketball and HOS data formats
- **Memory Management**: Basketball-specific memory key generation

## API Reference

### Types

- `BasketballConfig` - Complete configuration interface
- `BasketballStats` - Player and team statistics
- `BasketballGameData` - Game data structure

### Functions

- `initializeBasketballAdapter()` - Initialize adapter with HOS
- `createPlayerProfile()` - Create validated player profile
- `createTeamProfile()` - Create validated team profile
- `createGameProfile()` - Create validated game profile

### Mappings

- `basketballMapping.toHOSFormat()` - Transform to HOS format
- `basketballMapping.fromHOSFormat()` - Transform from HOS format
- `basketballMapping.calculateAdvancedStats()` - Calculate advanced metrics
- `basketballMapping.generateMemoryKeys()` - Generate memory keys

## Development

```bash
# Build the package
npm run build

# Run tests
npm test

# Development mode with watch
npm run dev
```

## License

MIT
