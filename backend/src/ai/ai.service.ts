import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async chat(message: string, userId: string | null) {
    const trimmed = message.trim();

    let reply: string;

    // Very simple, free, rule-based helper.
    // You can later replace this with a real LLM call if you want.
    if (!trimmed) {
      reply = 'Please type a question so I can help.';
    } else if (/leave/i.test(trimmed)) {
      reply =
        'For leave related questions: you can see your balance on the Dashboard, ' +
        'apply from the Leaves page, and your manager or HR will approve or reject. ' +
        'If you describe your exact doubt about leave, I can guide you step by step.';
    } else if (/performance|review/i.test(trimmed)) {
      reply =
        'Performance reviews are created per year, filled by employees, and then reviewed by managers. ' +
        'Use the Performance Review page to see your current review and status. ' +
        'Tell me what part is confusing (ratings, comments, timelines) and I will explain.';
    } else if (/goal/i.test(trimmed)) {
      reply =
        'Goals track what you plan to achieve this year. You can add and update goals on the Goals page. ' +
        'Each goal has description, deadline, priority, and progress %. Ask about any of these and I will explain.';
    } else if (/employee|profile|directory/i.test(trimmed)) {
      reply =
        'Employee data (name, role, department, manager) is managed in the Employees / Directory sections. ' +
        'You can search by name or ID from the Directory page. Describe what you want to find or change.';
    } else {
      reply =
        'I am a simple built‑in assistant for this HR portal. I can explain how to use pages like Dashboard, Leaves, Goals, ' +
        'Performance, Directory, and where data is stored (MySQL). Please ask a specific question about those and I will help.';
    }

    return { reply, userId };
  }
}


