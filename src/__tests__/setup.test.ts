import { describe, it, expect } from '@jest/globals';

describe('Jest Configuration', () => {
  it('should be properly configured with Next.js', () => {
    // Test que la configuration Jest fonctionne
    expect(process.env.NODE_ENV).toBe('test');
  });

  it('should support TypeScript', () => {
    // Test que TypeScript est bien supporté
    const testValue: string = 'TypeScript works!';
    expect(testValue).toBe('TypeScript works!');
  });

  it('should support module path mapping', async () => {
    // Test que les alias @ fonctionnent
    const { formatDate } = await import('@/utils/formatters');
    expect(typeof formatDate).toBe('function');
  });
});
