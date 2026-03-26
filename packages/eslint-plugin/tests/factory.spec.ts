import { describe, expect, it } from 'vitest';
import netos from '../src';

describe('netos factory', { timeout: 30_000 }, () => {
  it('should return an empty array when no configs are enabled', async () => {
    const result = await netos({});

    expect(result).toStrictEqual([]);
  });

  it('should load a single config', async () => {
    const result = await netos({ javascript: true });
    const names = result.map(entry => entry.name);

    expect(names).toStrictEqual(['@net-os/javascript', '@net-os/javascript/jsx']);
  });

  it('should load multiple configs in correct order', async () => {
    const result = await netos({ vitest: true, typescript: true });
    const names = result.map(entry => entry.name);

    const typescriptIndex = names.indexOf('@net-os/typescript');
    const vitestIndex = names.indexOf('@net-os/vitest');

    expect(typescriptIndex).toBeLessThan(vitestIndex);
  });

  it('should auto-include typescript when react is enabled', async () => {
    const result = await netos({ react: true });
    const names = result.map(entry => entry.name);

    expect(names).toContain('@net-os/typescript');
    expect(names).toContain('@net-os/react');
  });

  it('should auto-include typescript when vue is enabled', async () => {
    const result = await netos({ vue: true });
    const names = result.map(entry => entry.name);

    expect(names).toContain('@net-os/typescript');
    expect(names).toContain('@net-os/vue');
  });

  it('should auto-include typescript when expo is enabled', async () => {
    const result = await netos({ expo: true });
    const names = result.map(entry => entry.name);

    expect(names).toContain('@net-os/typescript');
    expect(names).toContain('@net-os/expo');
  });

  it('should not duplicate typescript when explicitly enabled alongside react', async () => {
    const result = await netos({ typescript: true, react: true });
    const typescriptEntries = result.filter(entry => entry.name === '@net-os/typescript');

    expect(typescriptEntries).toHaveLength(1);
  });

  it('should return a flat config array', async () => {
    const result = await netos({ typescript: true, react: true });

    expect(Array.isArray(result)).toBe(true);

    for (const entry of result) {
      expect(entry).toBeTypeOf('object');
      expect(Array.isArray(entry)).toBe(false);
    }
  });

  it('should load all eight configs', async () => {
    const result = await netos({
      javascript: true,
      typescript: true,
      react: true,
      expo: true,
      tailwindcss: true,
      tanstack: true,
      vitest: true,
      vue: true,
    });

    expect(result.length).toBeGreaterThan(0);

    const names = result.map(entry => entry.name);

    expect(names).toContain('@net-os/javascript');
    expect(names).toContain('@net-os/typescript');
    expect(names).toContain('@net-os/react');
    expect(names).toContain('@net-os/expo');
    expect(names).toContain('@net-os/tailwindcss');
    expect(names).toContain('@net-os/tanstack');
    expect(names).toContain('@net-os/vitest');
    expect(names).toContain('@net-os/vue');
  });
});
