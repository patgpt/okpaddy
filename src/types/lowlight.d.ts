declare module "lowlight" {
  export const lowlight: {
    registerLanguage: (name: string, language: unknown) => void;
  };
}
