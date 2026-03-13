export declare class AiService {
    chat(message: string, userId: string | null): Promise<{
        reply: string;
        userId: string | null;
    }>;
}
