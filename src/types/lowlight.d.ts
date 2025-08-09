declare module "lowlight/lib/core" {
  export const lowlight: {
    registerLanguage: (name: string, language: unknown) => void;
  };
}
