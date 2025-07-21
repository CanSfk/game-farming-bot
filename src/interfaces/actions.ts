interface Common {}

export interface IKeywordFnParams {
  id: string;
  key: string | number;
  timeOfAgain: number;
}
export interface IKeyword extends Common {
  type: 'keyword';
  params: IKeywordFnParams;
}

export interface IMouseFnParams {
  id: string;
  x: number;
  y: number;
  timeOfAgain: number;
}
export interface IMouse extends Common {
  type: 'mouse';
  params: IMouseFnParams;
}

export interface IDelayFnParams {
  time: number;
}
export interface IDelay extends Common {
  type: 'delay';
  params: IDelayFnParams;
}
