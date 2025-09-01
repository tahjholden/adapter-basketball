import { createConfig } from '@tahjholden/hos-core/config';
import { initializeMemory } from '@tahjholden/hos-memory';
import { setupMCP } from '@tahjholden/hos-mcp';
import { setupRCP } from '@tahjholden/hos-rcp';
import { z } from 'zod';
import { basketballMapping } from './mapping';

// Basketball-specific configuration schema
export const basketballConfigSchema = z.object({
  player: z.object({
    name: z.string(),
    position: z.enum(['PG', 'SG', 'SF', 'PF', 'C']),
    height: z.number(),
    weight: z.number(),
    jerseyNumber: z.number().min(0).max(99),
  }),
  team: z.object({
    name: z.string(),
    conference: z.enum(['Eastern', 'Western']),
    division: z.string(),
  }),
  game: z.object({
    homeTeam: z.string(),
    awayTeam: z.string(),
    date: z.string(),
    venue: z.string(),
  }),
});

export type BasketballConfig = z.infer<typeof basketballConfigSchema>;

/**
 * Initialize basketball adapter with HOS infrastructure
 */
export async function initializeBasketballAdapter(config: BasketballConfig) {
  // Validate configuration
  const validatedConfig = basketballConfigSchema.parse(config);
  
  // Initialize HOS components
  const hosConfig = createConfig({
    environment: 'basketball',
    features: {
      memory: true,
      mcp: true,
      rcp: true,
    },
    basketball: validatedConfig,
  });
  
  const memory = await initializeMemory(hosConfig);
  const mcp = await setupMCP(hosConfig);
  const rcp = await setupRCP(hosConfig);
  
  return {
    config: hosConfig,
    memory,
    mcp,
    rcp,
    mapping: basketballMapping,
  };
}

/**
 * Create a basketball player profile
 */
export function createPlayerProfile(playerData: BasketballConfig['player']) {
  return basketballConfigSchema.shape.player.parse(playerData);
}

/**
 * Create a basketball team profile
 */
export function createTeamProfile(teamData: BasketballConfig['team']) {
  return basketballConfigSchema.shape.team.parse(teamData);
}

/**
 * Create a basketball game profile
 */
export function createGameProfile(gameData: BasketballConfig['game']) {
  return basketballConfigSchema.shape.game.parse(gameData);
}

export * from './mapping';
