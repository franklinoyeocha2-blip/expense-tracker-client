import { makeAutoObservable } from "mobx";
import api from "../../api/api";

class AuthRepository {
  user = undefined;
  constructor() {
    makeAutoObservable(this);
    const user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  async setAuthenticatedUser(token) {
    localStorage.setItem("token", token);
    if (!this.user) {
      const resp = await api.get("/profile").then((res) => {
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          this.user = res.data;
        }
      });
      console.log(resp);
      return { user: resp.data };
    }
    return null;
  }

  async getAuthenticatedProfile() {
    if (this.user) {
      return { user: this.user };
    }
    const token = localStorage.getItem("token");
    if (token) {
      await this.setAuthenticatedUser(token);
    }
  }

  clear() {
    localStorage.clear();
  }
}

export const authRepository = new AuthRepository();
