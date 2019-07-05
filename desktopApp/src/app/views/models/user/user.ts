export class User{
 constructor(
   public Userid: number,
   public station: string,
   public FirstName: string,
   public SurName: string,
   public UserName: string,
   public UserPassword: string,
   public UserRole: string,
   public UserEmail: string,
   public UserPhone: string,
   public Active: string,
   public LoggedOn: string,
   public Reset: string,
   public LastPasswdChange: string,
   public LastLoggedIn: string,
   public CreatedBy: string,
   public CreationDate: string
 ) {
  this.Userid =  Userid;
  this.station =  station;
  this.FirstName = FirstName;
  this.SurName =  SurName
  this.UserName =  UserName;
  this.UserPassword =  UserPassword;
  this.UserRole =  UserRole;
  this.UserEmail =  UserEmail;
  this.UserPhone =  UserPhone;
  this.Active =  Active;
  this.LoggedOn =  LoggedOn;
  this.Reset =  Reset;
  this.LastPasswdChange =  LastPasswdChange;
  this.LastLoggedIn=  LastLoggedIn;
  this.CreatedBy =  CreatedBy;
  this.CreationDate =  CreationDate;
 }
}
 