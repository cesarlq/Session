export interface initialStateUsersI {
    LogIn:{
        status: "idle" | "loading" | "succeeded" | "failed",
        error: undefined | string,
        response: any
    },
    CookieLoggin:{
        status: "idle" | "loading" | "succeeded" | "failed",
        error: undefined | string,
        response: any
    }
    LogOut:{
        status: "idle" | "loading" | "succeeded" | "failed",
        error: undefined | string,
        response: any
    },
    Register:{
        status: "idle" | "loading" | "succeeded" | "failed",
        error: undefined | string,
        response: any
    }
}
export interface UserI {
    user: string;
    password: string,
    name: string,
    address: Address 
  }

  export interface Address {
      street: string,
      city: string,
      state: string,
      zip: number,
      suburb: string
  }
