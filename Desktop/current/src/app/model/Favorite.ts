export class Favorite {
  public uid: string;
  public description: string;
  public createTime: number;
  public updateTime: number;
  public userEmail: string;
  public userDisplayName: string;
  public userUID: string;
  public mineEmail: string;
  public mineDisplayName: string;
  public mineUID: string;

  constructor(obj?: any) {
    this.uid = obj && obj.uid || '';
    this.description = obj && obj.description || '';
    this.createTime = obj && obj.createTime || '';
    this.updateTime = obj && obj.updateTime || '';
    this.userEmail = obj && obj.userEmail || '';
    this.userDisplayName = obj && obj.userDisplayName || '';
    this.userUID = obj && obj.userUID || '';
    this.mineEmail = obj && obj.mineEmail || '';
    this.mineDisplayName = obj && obj.mineDisplayName || '';
    this.mineUID = obj && obj.mineUID || '';
  }
}