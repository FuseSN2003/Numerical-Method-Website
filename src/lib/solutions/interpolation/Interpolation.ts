export interface InterpolationForm {
  pointX: string[]
  pointY: string[]
  selectedPoint: boolean[]
  targetX: number
}

export default abstract class Interpolation {
  protected pointX: number[];
  protected pointY: number[];
  protected targetX: number;

  public constructor(pointX: number[], pointY: number[], targetX: number) {
    this.pointX = [...pointX];
    this.pointY = [...pointY];
    this.targetX = targetX;
  }

  public abstract solve(): any; 
}