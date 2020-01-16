import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthService {
  private apikey = "AIzaSyCnwuK8zUSoVkRt8LLsFiZ3lOEYBotQm04";
  userSubject = new BehaviorSubject(null);
  token:string;
  constructor(private http: HttpClient) {}

  storeUserInfo(res){
    let {email, localId, idToken, expiresIn} = res;
    this.token = idToken;
    let expiryDate = (new Date().getTime()) + Number(expiresIn) * 1000;
    let userInfo = new User(email, localId, idToken, expiryDate);
    this.userSubject.next(userInfo);
  }

  login(username, password) {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apikey}`;
    let payload = {
      email: username,
      password: password,
      returnSecureToken: true
    };
    return this.http.post(endpoint, payload).pipe( tap( res => this.storeUserInfo(res)) );
    // return this.http.post(endpoint, payload).pipe( tap( res => {
    //   console.log(">>",res['idToken'])
    //   this.newToken = res['idToken'];
    //   }) );
  }

  register(username, password) {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apikey}`;
    let payload = {
      email: username,
      password: password,
      returnSecureToken: true
    };
    return this.http.post(endpoint, payload).pipe( tap( res => this.storeUserInfo(res)) );
  }

  logout(){
    let userInfo = new User(null);
    this.userSubject.next(userInfo);
    return Observable.create( (observer) => {
      observer.next();
      // observer.complete();

    })
  }
}
/*
https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apikey}
https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apikey}

"REGISTER"
	"email": "tushar8133@gmail.com",
	-"kind": "identitytoolkit#SignupNewUserResponse",
	-"expiresIn": "3600",
	-"localId": "joy1e5yF0gXtQn22fe41Km06gQB3",
	--"idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUxNDAyYjNkMDQyYjI5NzY5NDNmMDVmZTJlZDQyOWI3MzY0M2Y2NTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdHVzaGFyODEzMy1tdXNpY2RiIiwiYXVkIjoidHVzaGFyODEzMy1tdXNpY2RiIiwiYXV0aF90aW1lIjoxNTc4OTAwNTM5LCJ1c2VyX2lkIjoiam95MWU1eUYwZ1h0UW4yMmZlNDFLbTA2Z1FCMyIsInN1YiI6ImpveTFlNXlGMGdYdFFuMjJmZTQxS20wNmdRQjMiLCJpYXQiOjE1Nzg5MDA1MzksImV4cCI6MTU3ODkwNDEzOSwiZW1haWwiOiJ0dXNoYXI4MTMzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0dXNoYXI4MTMzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.PurlUxQiOg13DbSii_mD8axoBw_znDd0u_8mTcYE3xBsj2PdCncFgpoqhqGaLUL1OCOsKD41sVGL4-s7UouXdIRlIua1fb0CMAoBZCWhoFuOM3zoDMFRLDhvN29JMigEx1_g7ulBB9wWHX-tnemXpJn4bIc-942OKOXs1t0zeIIzTt1cZy47h-mejy8L0oLK77277ZYCMTmaqXytTHyC4o1gK2PZg36R7bFePZrV4y4aPawy86IOt4Fvugw19hHfNyvywrXb5K0iTD4k0mmzwqrSw4y2-n0G_rqA6F_5imTMKL9JwzFs9ji3iAp9hDtwqLQ3vXYFg_VbvNHKipU1xQ",
	--"refreshToken": "AEu4IL3sufS25f5sTMopIb1Z03AnWuyMCE6hXo3Kv_-M3cxHylK1UUiZj58vpUChXq4e5X7XSapBBBsf_ZsNeSLPTHR_oVuQH9TgALdbTClq3byPoZfA0f7cDs3ZCqBARmIQG5Topi8E8uEnpDiUy0q4_f612Z9SxNaoiWM0ojir-aiEGBKFw0E_SdDYxf7w4gnj1HxjoAe4PsAZ4Xm53KNLxpLzWn-feQ",

	"LOGIN"
	"email": "tushar8133@gmail.com",
	"displayName": "",
	"registered": true,
	-"kind": "identitytoolkit#VerifyPasswordResponse",
	-"expiresIn": "3600",
	-"localId": "joy1e5yF0gXtQn22fe41Km06gQB3",
	--"idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUxNDAyYjNkMDQyYjI5NzY5NDNmMDVmZTJlZDQyOWI3MzY0M2Y2NTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdHVzaGFyODEzMy1tdXNpY2RiIiwiYXVkIjoidHVzaGFyODEzMy1tdXNpY2RiIiwiYXV0aF90aW1lIjoxNTc4OTA3MDY0LCJ1c2VyX2lkIjoiam95MWU1eUYwZ1h0UW4yMmZlNDFLbTA2Z1FCMyIsInN1YiI6ImpveTFlNXlGMGdYdFFuMjJmZTQxS20wNmdRQjMiLCJpYXQiOjE1Nzg5MDcwNjQsImV4cCI6MTU3ODkxMDY2NCwiZW1haWwiOiJ0dXNoYXI4MTMzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0dXNoYXI4MTMzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.LCZl5yHSqusGwGskQQlJN3FkLNuT-isC0pY8twHMSqu7LXQ4SLNDsqyteDhGot4P7mAW6uEjAkNp8sQ6eUICxocnhPh3UywpdVE8CtX5d3pQG_o61iWmwIuxYAyU0YyfFV3LuL6QJiWNENCHhKQm01XEhBi-YJL5W_mT69t7WumEsJd6qY9VCbpjkkW7-Vts6c2kB7N1ISWly7xpzj8RexJQHA923VmDqfEoG6KAqo4SpurZoRX9k42zCNaajlMEphSv1DhP-et-iEgqpKgWdlvZ81CGoEwx1KUFPuUcwTlVALX4cu8j_RhNxDotc3FpN5ugvpUzL0Ks4RrxNNDf8Q",
	--"refreshToken": "AEu4IL1pCSF36qjHcS3zeMDR5TxYo1uMotzs3nifOSYfIbiq-c2B1Ix94ltwDcwrVHA6f-2Hha4rkR6UMDE2JeouFMwA3wJzp0hEG70IAdzcgQ0tnAYoGRrwNQHg0ieLRngCM7Gj9QCzBlRCvxhJNXxFPQOZbJtKf6bNEn6Y0kNNWESLP8MLraE5M95y5q9mMjY5ngZuq8jwLlvO1BdJ2kXR5_MTGzQk7w",
*/