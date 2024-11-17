export interface IUserInfo {
  firstName  :string ;
  lastName :string ;
  username :string ;
  email :string ;
  country :string ;
  city :string ;
  address :string ;
  zipCode :string ;
  imagePath:string;
}
export interface ApiresponseUserInfo{

  data:IUserInfo;
  msg:string;
  isSuccess:boolean;
}
