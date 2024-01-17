export class AnimationTime {
  milliseconds: number;
  css: string;
  constructor(time: number) {
    this.milliseconds = time;
    this.css = (time/1000).toString() + "s";
  }
}