import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createAIService } from '@/services/ai/ai-service';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

    if (!user && isSupabaseConfigured) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user?.id || 'dev-user-id';

    const { text, type } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (isSupabaseConfigured) {
      const { count } = await supabase
        .from('ai_generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());

      if (count && count >= 50) {
        return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
      }
    }

    const ai = createAIService();
    let result: string;

    switch (type) {
      case 'bullet':
        result = await ai.improveBulletPoint(text);
        break;
      case 'summary':
        result = await ai.generateSummary({ jobTitle: '', experience: text, skills: [], industry: 'general' });
        break;
      default:
        result = await ai.improveBulletPoint(text);
    }

    if (isSupabaseConfigured) {
      await supabase.from('ai_generations').insert({
        user_id: userId,
        generation_type: type || 'improve',
        input_text: text.substring(0, 1000),
        output_text: result.substring(0, 1000),
        model: 'gpt-4o',
      });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI improve error:', error);
    return NextResponse.json({ error: 'Failed to improve content' }, { status: 500 });
  }
}
