
export enum ToolCategory {
  FILTER = 'FILTER',
  MANIPULATION = 'MANIPULATION',
  CONVERSION = 'CONVERSION',
  CHART = 'CHART',
  COLOR = 'COLOR'
}

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
}

export interface ImageState {
  original: string | null;
  modified: string | null;
  name: string;
  type: string;
  width: number;
  height: number;
}
