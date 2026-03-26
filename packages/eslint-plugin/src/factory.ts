import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

export type ConfigName = 'javascript' | 'typescript' | 'react' | 'expo' | 'tailwindcss' | 'tanstack' | 'vitest' | 'vue';

export type NetosOptions = Partial<Record<ConfigName, boolean>>;

const configLoaders: Record<ConfigName, () => Promise<FlatConfig.ConfigArray>> = {
  javascript: async () => loadModule('./configs/javascript'),
  typescript: async () => loadModule('./configs/typescript'),
  react: async () => loadModule('./configs/react'),
  expo: async () => loadModule('./configs/expo'),
  tailwindcss: async () => loadModule('./configs/tailwindcss'),
  tanstack: async () => loadModule('./configs/tanstack'),
  vitest: async () => loadModule('./configs/vitest'),
  vue: async () => loadModule('./configs/vue'),
};

const configDependencies: Partial<Record<ConfigName, ConfigName[]>> = {
  react: ['typescript'],
  vue: ['typescript'],
  expo: ['typescript', 'react'],
};

const CONFIG_ORDER: ConfigName[] = [
  'javascript',
  'typescript',
  'tailwindcss',
  'tanstack',
  'vitest',
  'react',
  'expo',
  'vue',
];

async function loadModule(path: string): Promise<FlatConfig.ConfigArray> {
  const module: { default: FlatConfig.ConfigArray } = await import(path);

  return module.default;
}

function isConfigName(name: string): name is ConfigName {
  return name in configLoaders;
}

function resolveConfigs(options: NetosOptions): ConfigName[] {
  const enabled = new Set<ConfigName>();

  for (const [name, value] of Object.entries(options)) {
    if (value && isConfigName(name)) {
      enabled.add(name);

      const deps = configDependencies[name];

      if (deps) {
        for (const dep of deps) {
          enabled.add(dep);
        }
      }
    }
  }

  return CONFIG_ORDER.filter(name => enabled.has(name));
}

async function loadConfig(name: ConfigName): Promise<FlatConfig.ConfigArray> {
  try {
    return await configLoaders[name]();
  } catch (error) {
    const isModuleNotFound = error instanceof Error && 'code' in error && Object
      .getOwnPropertyDescriptor(error, 'code')?.value === 'ERR_MODULE_NOT_FOUND';

    if (isModuleNotFound) {
      throw new Error(
        `[@net-os/eslint-plugin] Failed to load the "${name}" config. Make sure its required peer dependencies are installed.`,
        { cause: error },
      );
    }

    throw error;
  }
}

export default async function netos(options: NetosOptions): Promise<FlatConfig.ConfigArray> {
  const configNames = resolveConfigs(options);
  const results = await Promise.all(configNames.map(loadConfig));

  return results.flat();
}
