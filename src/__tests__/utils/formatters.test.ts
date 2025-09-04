import { 
  formatDate, 
  formatDuration, 
  formatSeriesDuration, 
  formatCurrency 
} from '@/utils/formatters';

describe('Formatters', () => {
  describe('formatDate', () => {
    it('should format date string to French locale', () => {
      const dateString = '2023-12-25T10:30:00.000Z';
      const result = formatDate(dateString);
      expect(result).toBe('25 décembre 2023');
    });

    it('should handle different date formats', () => {
      const dateString = '2023-01-01';
      const result = formatDate(dateString);
      expect(result).toBe('1 janvier 2023');
    });

    it('should handle edge case with February', () => {
      const dateString = '2023-02-14T00:00:00.000Z';
      const result = formatDate(dateString);
      expect(result).toBe('14 février 2023');
    });
  });

  describe('formatDuration', () => {
    it('should format minutes to hours and minutes', () => {
      expect(formatDuration(120)).toBe('2h00');
    });

    it('should handle minutes with remainder', () => {
      expect(formatDuration(135)).toBe('2h15');
    });

    it('should handle less than an hour', () => {
      expect(formatDuration(45)).toBe('0h45');
    });

    it('should pad single digit minutes', () => {
      expect(formatDuration(61)).toBe('1h01');
    });

    it('should handle zero minutes', () => {
      expect(formatDuration(0)).toBe('0h00');
    });

    it('should handle large durations', () => {
      expect(formatDuration(300)).toBe('5h00');
    });
  });

  describe('formatSeriesDuration', () => {
    it('should format duration with hours and minutes when hours > 0', () => {
      expect(formatSeriesDuration(90)).toBe('1h 30min');
    });

    it('should format duration with only minutes when less than an hour', () => {
      expect(formatSeriesDuration(45)).toBe('45min');
    });

    it('should handle exactly one hour', () => {
      expect(formatSeriesDuration(60)).toBe('1h 0min');
    });

    it('should handle zero minutes', () => {
      expect(formatSeriesDuration(0)).toBe('0min');
    });

    it('should handle large durations', () => {
      expect(formatSeriesDuration(150)).toBe('2h 30min');
    });
  });

  describe('formatCurrency', () => {
    it('should format amount to USD with French formatting', () => {
      const result = formatCurrency(1000000);
      expect(result).toMatch(/1\s*000\s*000\s*\$US/);
    });

    it('should handle small amounts', () => {
      const result = formatCurrency(100);
      expect(result).toMatch(/100\s*\$US/);
    });

    it('should handle zero', () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/0\s*\$US/);
    });

    it('should handle decimal amounts by rounding', () => {
      const result = formatCurrency(1234.56);
      expect(result).toMatch(/1\s*235\s*\$US/);
    });

    it('should handle large amounts with proper spacing', () => {
      const result = formatCurrency(123456789);
      expect(result).toMatch(/123\s*456\s*789\s*\$US/);
    });
  });
});
