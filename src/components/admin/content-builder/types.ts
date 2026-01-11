export type ContentBlockType = "text" | "video" | "code" | "quiz" | "puzzle";

export type ContentAccess = "free" | "premium";

export interface BaseBlock {
  id: string;
  type: ContentBlockType;
  title: string;
  access: ContentAccess;
  collapsed: boolean;
}

export interface TextBlock extends BaseBlock {
  type: "text";
  body: string;
}

export interface VideoBlock extends BaseBlock {
  type: "video";
  provider: "url" | "upload";
  url: string;
}

export interface CodeBlock extends BaseBlock {
  type: "code";
  language: "python" | "javascript" | "typescript";
  starterCode: string;
  points: number;
}

export interface QuizBlock extends BaseBlock {
  type: "quiz";
  question: string;
  options: { id: string; text: string; correct: boolean }[];
}

export interface PuzzleBlock extends BaseBlock {
  type: "puzzle";
  instructions: string;
}

export type ContentBlock = TextBlock | VideoBlock | CodeBlock | QuizBlock | PuzzleBlock;
