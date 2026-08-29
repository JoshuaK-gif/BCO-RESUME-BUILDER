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

    const body = await request.json();
    const { type, text, resumeData, jobDescription } = body;

    // Rate limiting check (50 requests per hour)
    if (isSupabaseConfigured) {
      const { count } = await supabase
        .from('ai_generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());

      if (count && count >= 50) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    const ai = createAIService();
    let result: any;

    switch (type) {
      case 'improve-bullet':
        if (!text) {
          return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }
        result = await ai.improveBulletPoint(text);
        break;

      case 'improve-experience':
        if (!text) {
          return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }
        result = await ai.improveExperience(text);
        break;

      case 'generate-summary':
        if (!resumeData) {
          return NextResponse.json({ error: 'Resume data is required' }, { status: 400 });
        }
        result = await ai.generateSummary(resumeData);
        break;

      case 'analyze-ats':
        if (!resumeData) {
          return NextResponse.json({ error: 'Resume data is required' }, { status: 400 });
        }
        result = await ai.analyzeATS(resumeData, jobDescription);
        break;

      case 'match-job':
        if (!resumeData || !jobDescription) {
          return NextResponse.json({ error: 'Resume data and job description are required' }, { status: 400 });
        }
        result = await ai.matchJob(resumeData, jobDescription);
        break;

      case 'suggest-skills':
        if (!text) {
          return NextResponse.json({ error: 'Experience text is required' }, { status: 400 });
        }
        result = await ai.suggestSkills(text, resumeData?.industry);
        break;

      case 'generate-cover-letter':
        if (!resumeData) {
          return NextResponse.json({ error: 'Cover letter data is required' }, { status: 400 });
        }
        result = await ai.generateCoverLetter(resumeData);
        break;

      case 'optimize-linkedin':
        if (!resumeData) {
          return NextResponse.json({ error: 'LinkedIn data is required' }, { status: 400 });
        }
        result = await ai.optimizeLinkedIn(resumeData);
        break;

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    // Log the generation
    if (isSupabaseConfigured) {
      await supabase.from('ai_generations').insert({
        user_id: userId,
        generation_type: type,
        input_text: JSON.stringify({ text, resumeData, jobDescription }).substring(0, 1000),
        output_text: JSON.stringify(result).substring(0, 1000),
        model: 'gpt-4o',
      });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
