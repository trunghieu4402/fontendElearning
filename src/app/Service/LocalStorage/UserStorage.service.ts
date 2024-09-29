import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const TOKEN="tokent";
const USER="USER"
@Injectable({
  providedIn: 'root'
})

export class UserStorageService {
  private token:string | undefined;
  private jwt_decode:any;
constructor() { }
saveToken(token:any):void
{
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
}
saveUser(user:any):void
{
  if (typeof window !== 'undefined') {
    //  user={username:user.UserId,role:user.scope}
    // console.log(user);
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }
}
 getToken()
{
  if (typeof window !== 'undefined') {
    return  window.localStorage.getItem(TOKEN);
  }
  return null;
}
 getUser(): any
{
  if (typeof window !== 'undefined') {
    let user =localStorage.getItem('USER');
    if (user !== null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
  return null;
}
setTokent(t:string)
{
  this.token=t;
  this.saveToken(this.token);
  this.saveUser(this.decodeToken(this.token));
}
decodeToken(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}
 getUserRole():any
{
  let user = this.getUser();
  if(user!==null)
  {
    return user.scope;
  }
  return null;
}
  isAdminLogin():boolean
{
  if(this.getToken()===null)
  {
    return false;
  }
  else
  {
    
    const role:String =this.getUserRole();
    return role==='ADMIN';
  }
}
  isStudentLogin():boolean
{
  if(this.getToken()===null)
  {
    return false;
  }
  else
  {
    const role:String =this.getUserRole();
    return role==='STUDENT';
  }
}
 isTeacherLogin():boolean
{
  if(this.getToken()===null)
  {
    return false;
  }
  else
  {
    const role:String =this.getUserRole();
    return role==='TEACHER';
  }
}
static Signout():void
{
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }
}
public createAuthorizationHeader():HttpHeaders
 {
  return new HttpHeaders().set(
    'Authorization','Bearer '+this.getToken()
  )
 }
}

