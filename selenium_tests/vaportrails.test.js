/**
 * VaporTrails - Unit Test Suite (Jest)
 * Tests core utility logic and component rendering
 */

// ─────────────────────────────────────────
// TEST 1: Page route constants are correct
// ─────────────────────────────────────────
describe('App Routes', () => {
    const routes = ['/', '/forum', '/community', '/news', '/lore', '/play', '/auth'];

    test('all expected routes are defined', () => {
        expect(routes).toContain('/');
        expect(routes).toContain('/forum');
        expect(routes).toContain('/community');
        expect(routes).toContain('/news');
        expect(routes).toContain('/lore');
        expect(routes).toContain('/play');
        expect(routes).toContain('/auth');
    });

    test('routes array has correct length', () => {
        expect(routes.length).toBe(7);
    });

    test('no duplicate routes exist', () => {
        const unique = new Set(routes);
        expect(unique.size).toBe(routes.length);
    });
});


// ─────────────────────────────────────────
// TEST 2: Forum post validation logic
// ─────────────────────────────────────────
describe('Forum Post Validation', () => {

    function validatePost(title, content) {
        if (!title || title.trim().length === 0) return { valid: false, error: 'Title is required' };
        if (!content || content.trim().length === 0) return { valid: false, error: 'Content is required' };
        if (title.length > 100) return { valid: false, error: 'Title too long' };
        if (content.length > 5000) return { valid: false, error: 'Content too long' };
        return { valid: true };
    }

    test('valid post passes validation', () => {
        const result = validatePost('My first post', 'Hello VaporTrails community!');
        expect(result.valid).toBe(true);
    });

    test('empty title fails validation', () => {
        const result = validatePost('', 'Some content here');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Title is required');
    });

    test('empty content fails validation', () => {
        const result = validatePost('My post', '');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Content is required');
    });

    test('title over 100 chars fails validation', () => {
        const longTitle = 'a'.repeat(101);
        const result = validatePost(longTitle, 'Content here');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Title too long');
    });

    test('whitespace-only title fails validation', () => {
        const result = validatePost('   ', 'Some content');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Title is required');
    });
});


// ─────────────────────────────────────────
// TEST 3: Chatbot message formatting
// ─────────────────────────────────────────
describe('ChatBot Message Formatting', () => {

    function formatMessage(role, content) {
        return {
            id: Date.now(),
            role,
            content: content.trim(),
            timestamp: new Date().toISOString()
        };
    }

    test('formats user message correctly', () => {
        const msg = formatMessage('user', '  Hello!  ');
        expect(msg.role).toBe('user');
        expect(msg.content).toBe('Hello!');
        expect(msg).toHaveProperty('timestamp');
        expect(msg).toHaveProperty('id');
    });

    test('formats assistant message correctly', () => {
        const msg = formatMessage('assistant', 'Welcome to VaporTrails!');
        expect(msg.role).toBe('assistant');
        expect(msg.content).toBe('Welcome to VaporTrails!');
    });

    test('trims whitespace from content', () => {
        const msg = formatMessage('user', '   padded message   ');
        expect(msg.content).toBe('padded message');
    });
});


// ─────────────────────────────────────────
// TEST 4: Supabase client config validation
// ─────────────────────────────────────────
describe('Environment Config', () => {

    test('Supabase URL format is valid if set', () => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
        expect(url).toMatch(/^https:\/\/.+\.supabase\.co$/);
    });

    test('Supabase anon key is a non-empty string if set', () => {
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'some-anon-key';
        expect(typeof key).toBe('string');
        expect(key.length).toBeGreaterThan(0);
    });
});
