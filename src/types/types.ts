export type ProblemData = {
  title: string;
  url: string;
};

export interface TestCaseDetails {
  input: string;
  output: string;
  expected: string;
  status: string;
  type: string;
}
export interface CodeSubmissionResultType {
  isCE?: boolean;
  isTLE?: boolean;
  isRE?: boolean;
  isWA?: boolean;
  status?: "ACCEPTED" | "FAILED";
  totalTestCases?: number;
  totalTestCasesPassed?: number;
  firstCE?: TestCaseDetails;
  firstTLE?: TestCaseDetails;
  firstRE?: TestCaseDetails;
  firstWA?: TestCaseDetails;
  input?: string;
  expected?: string;
  output?: string;
  isCustomTestCase?: boolean;
}

export interface AceEditorLanguageType {
  languageName: string;
  value: string;
}

export interface AceEditorThemeType {
  themeName: string;
  value: string;
}

export interface TestCase {
  input: string;
  output: string;
}
export interface CodeStub {
  language: "c_cpp" | "java" | "python";
  startSnippet: string;
  userSnippet: string;
  endSnippet: string;
}
export interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number;
  testCases: TestCase[];
  codeStubs: CodeStub[];
  topic: string;
  actualCode: string;
  __v: number;
}

export interface AllProblemsApiResponse {
  success: boolean;
  message: string;
  error: Record<string, unknown>;
  data: Problem[];
}

export interface ProblemFormData {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number;
  topic: string;
  testCases: TestCase[];
  codeStubs: CodeStub[];
  actualCode: string;
  editorial: string;
}

export interface ProblemApiResponse {
  success: boolean;
  message: string;
  error: Record<string, unknown>;
  data: ProblemFormData;
}