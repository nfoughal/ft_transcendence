import { PrismaService } from 'src/prisma/prisma.service';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '.prisma/client';
import { UserData } from './utils/auth.types';
import { AuthDto } from './dto/auth.dto';
import { EditProfileDto } from './dto/EditProfileDto';
import { ChatService } from 'src/chat/chat.service';
import { updateDto } from './dto/updateDto';
export declare class AuthService {
    private prisma;
    private chatService;
    private jwtService;
    constructor(prisma: PrismaService, chatService: ChatService, jwtService: JwtService);
    enableTwoFactorAuth(nickname: string): Promise<string>;
    saveSecretKey(nickname: string, secretKey: string): Promise<void>;
    removeSecretKey(userId: number): Promise<void>;
    toggle2FAStatus(userId: number): Promise<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }>;
    verifyTOTPCode(user: User, totpCode: string): Promise<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }>;
    disableTwoFactorAuth(userId: number): Promise<void>;
    set2FaTrue(userId: number): Promise<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }>;
    set2FaFalse(userId: number): Promise<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }>;
    getBlockList(userId: number): Promise<{
        status: string;
        data: string;
    } | {
        status: string;
        data: any[];
    }>;
    getAllFriends(userId: number): Promise<({
        user: {
            id: number;
            nickname: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            hashedRt: string;
            avatar: string;
            password: string;
            updateState: boolean;
            state: import(".prisma/client").$Enums.State;
            faState: boolean;
            twoFactorEnabled: boolean;
            is2FAuthenticated: boolean;
            twoFactorSecret: string;
            wins: number;
            loses: number;
        };
        friend: {
            id: number;
            nickname: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            hashedRt: string;
            avatar: string;
            password: string;
            updateState: boolean;
            state: import(".prisma/client").$Enums.State;
            faState: boolean;
            twoFactorEnabled: boolean;
            is2FAuthenticated: boolean;
            twoFactorSecret: string;
            wins: number;
            loses: number;
        };
    } & {
        id: number;
        userId: number;
        friendId: number;
        status: import(".prisma/client").$Enums.Status;
        block: boolean;
    })[]>;
    getAllFriendsById(friendId: number): Promise<({
        user: {
            id: number;
            nickname: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            hashedRt: string;
            avatar: string;
            password: string;
            updateState: boolean;
            state: import(".prisma/client").$Enums.State;
            faState: boolean;
            twoFactorEnabled: boolean;
            is2FAuthenticated: boolean;
            twoFactorSecret: string;
            wins: number;
            loses: number;
        };
        friend: {
            id: number;
            nickname: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            hashedRt: string;
            avatar: string;
            password: string;
            updateState: boolean;
            state: import(".prisma/client").$Enums.State;
            faState: boolean;
            twoFactorEnabled: boolean;
            is2FAuthenticated: boolean;
            twoFactorSecret: string;
            wins: number;
            loses: number;
        };
    } & {
        id: number;
        userId: number;
        friendId: number;
        status: import(".prisma/client").$Enums.Status;
        block: boolean;
    })[]>;
    getAllFrienfImSendRequest(userId: number, frienId: number): Promise<{
        status: boolean;
    }>;
    getAllFriendsBolckedMe(userId: number, frienId: number): Promise<{
        status: boolean;
    }>;
    getAllAcceptedFriends(userId: number): Promise<({
        user: {
            id: number;
            nickname: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            hashedRt: string;
            avatar: string;
            password: string;
            updateState: boolean;
            state: import(".prisma/client").$Enums.State;
            faState: boolean;
            twoFactorEnabled: boolean;
            is2FAuthenticated: boolean;
            twoFactorSecret: string;
            wins: number;
            loses: number;
        };
        friend: {
            id: number;
            nickname: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            hashedRt: string;
            avatar: string;
            password: string;
            updateState: boolean;
            state: import(".prisma/client").$Enums.State;
            faState: boolean;
            twoFactorEnabled: boolean;
            is2FAuthenticated: boolean;
            twoFactorSecret: string;
            wins: number;
            loses: number;
        };
    } & {
        id: number;
        userId: number;
        friendId: number;
        status: import(".prisma/client").$Enums.Status;
        block: boolean;
    })[]>;
    addFriendRequest(userId: number, friendId: number): Promise<{
        status: string;
        error: string;
    }>;
    cancelFriendRequest(userId: number, friendId: number): Promise<void>;
    acceptFriendRequest(userId: number, friendId: number): Promise<void>;
    blockUser(userId: number, friendId: number): Promise<void>;
    unblockUser(userId: number, friendId: number): Promise<void>;
    signInWithFortyTwo(user: UserData): Promise<Token>;
    search(query: string): Promise<User[]>;
    signInWithGoogle(user: UserData): Promise<Token>;
    singinLocal(dto: AuthDto): Promise<Token>;
    refresh(userId: number, rt: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    getTokens(userId: number, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    singupLocal(dto: AuthDto): Promise<Token>;
    findUser(id: number): Promise<User | null>;
    generateNickname(email: string): string;
    editProfile(userId: number, data: EditProfileDto): Promise<User>;
    editUpdate(userId: number, data: updateDto): Promise<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }>;
    editavatar(email: string, photoPath: string): Promise<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }>;
    findUserByEmail(email: string): Prisma.Prisma__UserClient<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findUserByNickname(nickname: string): Prisma.Prisma__UserClient<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOneFriend(body: any): Promise<{
        status: string;
    }>;
    addNotification(friendId: number, message: string): Promise<void>;
    getNotifications(userId: number): Promise<{
        id: number;
        ownerId: number;
        message: string;
        read: boolean;
        createdAt: Date;
    }[]>;
    getNotificationByread(userId: number): Promise<{
        id: number;
        ownerId: number;
        message: string;
        read: boolean;
        createdAt: Date;
    }[]>;
    addInGame(userId: number): Promise<void>;
    addOutGame(userId: number): Promise<void>;
    addOnlineFromGame(userId: number): Promise<void>;
    addOnline(userId: number): Promise<void>;
    addOffline(userId: number): Promise<void>;
    getUserId(cookies: string): Promise<any>;
    getIdBytoken(token: any): Promise<any>;
    addWin(userId: number): Promise<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }>;
    addLoss(userId: number): Promise<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }>;
    getLeaderboard(): Promise<{
        id: number;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        hashedRt: string;
        avatar: string;
        password: string;
        updateState: boolean;
        state: import(".prisma/client").$Enums.State;
        faState: boolean;
        twoFactorEnabled: boolean;
        is2FAuthenticated: boolean;
        twoFactorSecret: string;
        wins: number;
        loses: number;
    }[]>;
}
