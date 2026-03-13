import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('api/ai')
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post('chat')
  async chat(
    @Body() body: { message: string; userId?: string | null },
  ) {
    const { message, userId = null } = body;
    const trimmed = (message ?? '').trim();
    if (!trimmed) {
      return { reply: 'Please enter a question.' };
    }
    return this.ai.chat(trimmed, userId);
  }
}

