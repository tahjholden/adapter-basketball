/**
 * Basketball-specific mapping and transformation utilities
 */

export interface BasketballStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointersMade: number;
  threePointersAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  minutesPlayed: number;
}

export interface BasketballGameData {
  gameId: string;
  playerStats: Record<string, BasketballStats>;
  teamStats: {
    home: BasketballStats;
    away: BasketballStats;
  };
  gameInfo: {
    quarter: number;
    timeRemaining: string;
    homeScore: number;
    awayScore: number;
  };
}

/**
 * Basketball-specific data mappings for HOS integration
 */
export const basketballMapping = {
  /**
   * Transform raw basketball data to HOS format
   */
  toHOSFormat: (data: BasketballGameData) => {
    return {
      id: data.gameId,
      type: 'basketball_game',
      timestamp: new Date().toISOString(),
      payload: {
        players: data.playerStats,
        teams: data.teamStats,
        game: data.gameInfo,
      },
      metadata: {
        sport: 'basketball',
        dataType: 'game_stats',
      },
    };
  },

  /**
   * Transform HOS data back to basketball format
   */
  fromHOSFormat: (hosData: any): BasketballGameData => {
    return {
      gameId: hosData.id,
      playerStats: hosData.payload.players,
      teamStats: hosData.payload.teams,
      gameInfo: hosData.payload.game,
    };
  },

  /**
   * Calculate advanced basketball statistics
   */
  calculateAdvancedStats: (stats: BasketballStats) => {
    const fieldGoalPercentage = stats.fieldGoalsAttempted > 0 
      ? (stats.fieldGoalsMade / stats.fieldGoalsAttempted) * 100 
      : 0;
    
    const threePointPercentage = stats.threePointersAttempted > 0
      ? (stats.threePointersMade / stats.threePointersAttempted) * 100
      : 0;
    
    const freeThrowPercentage = stats.freeThrowsAttempted > 0
      ? (stats.freeThrowsMade / stats.freeThrowsAttempted) * 100
      : 0;

    const efficiency = stats.points + stats.rebounds + stats.assists + 
                      stats.steals + stats.blocks - 
                      (stats.fieldGoalsAttempted - stats.fieldGoalsMade) -
                      (stats.freeThrowsAttempted - stats.freeThrowsMade) - 
                      stats.turnovers;

    return {
      ...stats,
      fieldGoalPercentage,
      threePointPercentage,
      freeThrowPercentage,
      efficiency,
      pointsPerMinute: stats.minutesPlayed > 0 ? stats.points / stats.minutesPlayed : 0,
    };
  },

  /**
   * Generate basketball-specific HOS memory keys
   */
  generateMemoryKeys: (gameId: string, playerId?: string) => {
    const baseKey = `basketball:game:${gameId}`;
    if (playerId) {
      return `${baseKey}:player:${playerId}`;
    }
    return baseKey;
  },
};
