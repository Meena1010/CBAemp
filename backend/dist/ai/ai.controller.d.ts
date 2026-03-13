import { AiService } from './ai.service';
export declare class AiController {
    private readonly ai;
    constructor(ai: AiService);
    chat(body: {
        message: string;
        userId?: string | null;
    }): Promise<{
        reply: string;
        userId: string | null;
    } | {
        reply: string;
    }>;
}
