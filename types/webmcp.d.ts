/**
 * Ambient types for the WebMCP browser API.
 *
 * Mirrors the WebIDL in the W3C Web Machine Learning CG draft
 * (https://github.com/webmachinelearning/webmcp, index.bs). No shipping
 * browser has these in lib.dom.d.ts yet, so they are declared here.
 *
 * The spec moved the entry point from `navigator.modelContext` to
 * `document.modelContext` (July 2026); Chrome 150 deprecated the navigator
 * location while its origin trial still serves it. Both are declared so the
 * registration helper can prefer `document` and fall back.
 */

/** MCP-style content block returned from a tool's `execute`. */
export interface ToolTextContent {
  type: "text";
  text: string;
}

export interface ToolResult {
  content: ToolTextContent[];
  /** Signals the call failed; agents surface this rather than treating it as data. */
  isError?: boolean;
}

export interface ToolAnnotations {
  /** Tool only reads state. Lets agents call it without extra confirmation. */
  readOnlyHint?: boolean;
  /** Output may contain content the page author does not vouch for. */
  untrustedContentHint?: boolean;
}

export interface ModelContextTool {
  name: string;
  title?: string;
  description: string;
  /** JSON Schema describing the tool's input object. */
  inputSchema?: object;
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown;
  annotations?: ToolAnnotations;
}

export interface ModelContextRegisterToolOptions {
  /** Unregisters the tool when aborted. */
  signal?: AbortSignal;
  /** Origins in the current document tree this tool is exposed to. */
  exposedTo?: string[];
}

export interface RegisteredTool {
  name: string;
  title?: string;
  description: string;
  /** Serialized JSON Schema string, per spec. */
  inputSchema?: string;
  origin: string;
  annotations?: ToolAnnotations;
}

export interface ModelContextGetToolOptions {
  fromOrigins?: string[];
}

export interface ModelContext extends EventTarget {
  registerTool(
    tool: ModelContextTool,
    options?: ModelContextRegisterToolOptions
  ): Promise<void>;
  getTools(options?: ModelContextGetToolOptions): Promise<RegisteredTool[]>;
  ontoolchange: ((this: ModelContext, ev: Event) => unknown) | null;
}

declare global {
  interface Document {
    /** Current spec location. Absent on browsers without WebMCP. */
    readonly modelContext?: ModelContext;
  }

  interface Navigator {
    /** Deprecated pre-July-2026 location, still served by the Chrome origin trial. */
    readonly modelContext?: ModelContext;
  }
}
