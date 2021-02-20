export class Bless {
  public uid: string;
  public description: string;
  public type: boolean;
  public createTime: number;
  public updateTime: number;
  public userEmail: string;
  public userDisplayName: string;
  public userUID: string;

  public x: number;
  public y: number;
  public z: number;

  constructor(obj?: any) {
    this.uid = obj && obj.uid || '';
    this.description = obj && obj.description || '';
    this.type = obj && obj.type || '';
    this.createTime = obj && obj.createTime || '';
    this.updateTime = obj && obj.updateTime || '';
    this.userEmail = obj && obj.userEmail || '';
    this.userDisplayName = obj && obj.userDisplayName || '';
    this.userUID = obj && obj.userUID || '';
    this.x = obj && obj.userDisplayName || '';
    this.y = obj && obj.userUID || '';
  }
}