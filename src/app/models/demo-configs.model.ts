export interface DemoConfigs {
  position: DemoPosition;
  isVisible: boolean;
  btnColor?: string;
  steps: DemoStep[];
  title: string;
  description: string;
}

export interface DemoPosition {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
}

export interface DemoStep {
    id: number;
    title?: string;
    description?: string;
    isActive: boolean;
}