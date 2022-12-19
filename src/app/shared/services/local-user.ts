export interface LocalUser { // just values in fireauth user
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
   //isAdmin: boolean; in DB but not in user
   lastLoggedIn: string;
   createTime: string;
}
