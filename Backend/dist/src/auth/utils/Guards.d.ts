import { ExecutionContext } from "@nestjs/common";
declare const GoogelAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogelAuthGuard extends GoogelAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
