export interface EditorOptions{
    height: string
    width: string
    defaultLanguage: string
    theme?: string,
}

export interface Program{
    name: string
    code: string
}

export interface KinContextData {
    editorValue: string;
    theme: "vs-dark" | "light";
}

export type KinTheme = "vs-dark" | "light"