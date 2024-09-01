"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const room_entity_1 = require("./entities/room.entity");
const player_entity_1 = require("./entities/player.entity");
const ball_entity_1 = require("./entities/ball.entity");
const match_history_service_1 = require("../match-history/match-history.service");
const auth_service_1 = require("../auth/auth.service");
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 700;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 200;
class invited {
}
let GameService = class GameService {
    constructor(matchHistoryService, authService) {
        this.matchHistoryService = matchHistoryService;
        this.authService = authService;
        this.rooms = [];
        this.invitedList = [];
    }
    async addInvited(client) {
        const cookies = client.handshake.headers.cookie;
        if (!cookies) {
            return;
        }
        const userId = await this.authService.getUserId(cookies);
        if (!userId) {
            return;
        }
        this.invitedList.push({ id: userId, socketId: client.id });
    }
    async removeInvited(client) {
        const cookies = client.handshake.headers.cookie;
        if (!cookies) {
            return;
        }
        const userId = await this.authService.getUserId(cookies);
        if (!userId) {
            return;
        }
        this.invitedList = this.invitedList.filter((inv) => inv.socketId !== client.id);
    }
    inviteSent(client, data, server) {
        const invited = this.invitedList.filter((inv) => inv.id === data.reciever.id);
        let room;
        if (invited) {
            room = new room_entity_1.Room(new ball_entity_1.Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 14, 10, 10, 10), 0);
            room.players.push(new player_entity_1.Player(client.id, 1, 0, 20, CANVAS_HEIGHT / 2 - 100 / 2, data.sender.id, data.sender.nickname, data.sender.avatar));
            this.rooms.push(room);
            client.join(room.id);
            invited.forEach((invited) => {
                server.to(invited.socketId).emit('inviteReceived', room);
            });
            setTimeout(() => {
                if (room.players.length === 1) {
                    this.rooms = this.rooms.filter((r) => r.id !== room.id);
                    client.leave(room.id);
                    invited.forEach((invited) => {
                        server.to(invited.socketId).emit('inviteExpired', room);
                    });
                    client.emit('inviteExpired');
                }
            }, 10000);
        }
    }
    inviteAccepted(client, data, server) {
        const room = this.rooms.find((room) => room.players.some((player) => player.playerName === data.sender.nickname));
        if (!room || room.players.length === 2) {
            client.emit('ingame');
            return;
        }
        if (room) {
            client.join(room.id);
            room.players.push(new player_entity_1.Player(client.id, 2, 0, CANVAS_WIDTH - 20 - PADDLE_WIDTH, CANVAS_HEIGHT / 2 - 100 / 2, data.reciever.id, data.reciever.nickname, data.reciever.avatar));
            server.to(room.id).emit('startingGame', room.id);
            setTimeout(() => {
                server.to(room.id).emit('startedGame', room);
                startGame(room, this.rooms, server, this.matchHistoryService, this.authService);
            }, 3000);
        }
    }
    getPlayerNo(client, server) {
        const room = this.rooms.find((room) => room.players.some((player) => player.socketId === client.id));
        if (room) {
            const player = room.players.find((player) => player.socketId === client.id);
            client.emit('playerNo', player.playerNo);
        }
    }
    joinGame(client, data, server) {
        let room;
        room = this.rooms.find((room) => room.players.some((player) => player.playerName === data.nickname));
        if (room) {
            client.emit('ingame');
            return;
        }
        if (this.rooms.length > 0 &&
            this.rooms[this.rooms.length - 1].players.length === 1) {
            room = this.rooms[this.rooms.length - 1];
        }
        if (room) {
            client.join(room.id);
            room.players.push(new player_entity_1.Player(client.id, 2, 0, CANVAS_WIDTH - 20 - PADDLE_WIDTH, CANVAS_HEIGHT / 2 - 100 / 2, data.id, data.nickname, data.avatar));
            server.to(room.id).emit('startingGame', room.id);
            setTimeout(() => {
                server.to(room.id).emit('startedGame', room);
                startGame(room, this.rooms, server, this.matchHistoryService, this.authService);
            }, 3000);
        }
        else {
            room = new room_entity_1.Room(new ball_entity_1.Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 14, 10, 10, 10), 0);
            room.players.push(new player_entity_1.Player(client.id, 1, 0, 20, CANVAS_HEIGHT / 2 - 100 / 2, data.id, data.nickname, data.avatar));
            this.rooms.push(room);
            client.join(room.id);
        }
    }
    movePaddle(client, data, server) {
        const room = this.rooms.find((room) => room.id === data.roomID);
        if (room) {
            room.players[data.playerNo - 1].y = data.y;
            server.to(room.id).emit('updateGame', room);
        }
    }
    leaveGame(client, server) {
        const room = this.rooms.find((room) => room.players.some((player) => player.socketId === client.id));
        if (room) {
            if (room.players.length === 1) {
                this.rooms = this.rooms.filter((r) => r.id !== room.id);
            }
            else if (room.players.length === 2) {
                this.authService.addOnlineFromGame(room.players[0].playerId);
                this.authService.addOnlineFromGame(room.players[1].playerId);
                if (room.players[0].socketId === client.id) {
                    room.winner = 2;
                    room.players[1].score = 5;
                    room.players[0].score = 0;
                    server.to(room.id).emit('updateGame', room);
                    this.rooms = this.rooms.filter((r) => r.id !== room.id);
                }
                else if (room.players[1].socketId === client.id) {
                    room.winner = 1;
                    room.players[0].score = 5;
                    room.players[1].score = 0;
                    server.to(room.id).emit('updateGame', room);
                    this.rooms = this.rooms.filter((r) => r.id !== room.id);
                }
            }
        }
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [match_history_service_1.MatchHistoryService,
        auth_service_1.AuthService])
], GameService);
function collision(b, p) {
    const p_top = p.y;
    const p_bottom = p.y + PADDLE_HEIGHT;
    const p_left = p.x;
    const p_right = p.x + PADDLE_WIDTH;
    const b_top = b.y - b.radius;
    const b_bottom = b.y + b.radius;
    const b_left = b.x - b.radius;
    const b_right = b.x + b.radius;
    return (b_right > p_left && b_top < p_bottom && b_left < p_right && b_bottom > p_top);
}
function resetBall(room) {
    room.ball.x = CANVAS_WIDTH / 2;
    room.ball.y = CANVAS_HEIGHT / 2;
    room.ball.speed = 10;
    room.ball.velocityX = room.ball.velocityX > 0 ? -10 : 10;
    room.ball.velocityY = 10;
}
function startGame(room, rooms, server, mts, auths) {
    const interval = setInterval(() => {
        if (room.ball.x - room.ball.radius < 0) {
            room.players[1].score += 1;
            resetBall(room);
        }
        else if (room.ball.x + room.ball.radius > CANVAS_WIDTH) {
            room.players[0].score += 1;
            resetBall(room);
        }
        room.ball.x += room.ball.velocityX;
        room.ball.y += room.ball.velocityY;
        if (room.ball.y + room.ball.radius > CANVAS_HEIGHT ||
            room.ball.y - room.ball.radius < 0) {
            room.ball.velocityY = -room.ball.velocityY;
        }
        const player = room.ball.x < CANVAS_WIDTH / 2 ? room.players[0] : room.players[1];
        if (collision(room.ball, player)) {
            let collidePoint = room.ball.y - (player.y + PADDLE_HEIGHT / 2);
            collidePoint = collidePoint / (PADDLE_HEIGHT / 2);
            const angleRad = (Math.PI / 4) * collidePoint;
            const direction = room.ball.x < CANVAS_WIDTH / 2 ? 1 : -1;
            room.ball.velocityX = direction * room.ball.speed * Math.cos(angleRad);
            room.ball.velocityY = room.ball.speed * Math.sin(angleRad);
            room.ball.speed += 0.5;
        }
        if (room.players[0].score === 5) {
            room.winner = 1;
            rooms = rooms.filter((r) => r.id !== room.id);
            server.to(room.id).emit('endGame', room);
            clearInterval(interval);
            mts.createMatchHistory(room);
            auths.addWin(room.players[0].playerId);
            auths.addLoss(room.players[1].playerId);
        }
        if (room.players[1].score === 5) {
            room.winner = 2;
            rooms = rooms.filter((r) => r.id !== room.id);
            server.to(room.id).emit('endGame', room);
            clearInterval(interval);
            mts.createMatchHistory(room);
            auths.addWin(room.players[1].playerId);
            auths.addLoss(room.players[0].playerId);
        }
        server.to(room.id).emit('updateGame', room);
    }, 1000 / 60);
}
//# sourceMappingURL=game.service.js.map