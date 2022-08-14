export default class UserInfo {
  constructor(name, job, avatar) {
    this._name = name;
    this._info = job;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._info.textContent,
    };
  }

  setUserInfo({name, job}) {
    this._name.textContent = name;
    this._info.textContent = job;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }

}
