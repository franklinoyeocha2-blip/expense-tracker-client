import { makeAutoObservable, runInAction } from "mobx";
import { authRepository } from "./auth";

class AuthManager {
  status = "initial";
  profile = {};
  constructor() {
    makeAutoObservable(this);
  }

  setAuthenticatedProfile(token) {
    authRepository.setAuthenticatedUser(token);
    this.loadAuthenticatedProfile();
  }

  async loadAuthenticatedProfile() {
    runInAction(() => {
      this.status = "loading";
    });
    const { user } = await authRepository.getAuthenticatedProfile();
    if (user) {
      runInAction(() => {
        this.status = "authenticated";
        this.profile = user;
      });
    } else {
      runInAction(() => {
        this.status = "loaded";
        this.setAuthenticatedProfile();
      });
    }
  }

  async init() {
    const payload = await authRepository.getAuthenticatedProfile();
    if (!payload) {
      runInAction(() => {
        this.status = "loaded";
      });
    } else {
      await this.loadAuthenticatedProfile();
    }
  }

  logout() {}
}

export const authManager = new AuthManager();
