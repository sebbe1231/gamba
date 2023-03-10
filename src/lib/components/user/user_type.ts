export interface DetailedUser {
    id: number;
    name: string;
    createdAt: string;
    stats: {
        id: number;
        money: number;
        won: number;
        lost: number;
        deposit: number;
        winnings: number;
    };
    userSettings: {
        id: number;
        showWonLost: boolean;
        showWinnings: boolean;
        showDeposit: boolean;
        showWinback: boolean;
        showCreatedAt: boolean;
    }
}