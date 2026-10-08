class UserInfo {
  constructor(selector) {
    this._selector = selector;
    this._element = document.querySelector(selector);
    this._userInfoName = this._element.querySelector(".user-info__name");
    this._userInfoDescription = this._element.querySelector(
      ".user-info__description",
    );
  }

  setUserInfo(name, description) {
    this._userInfoName.textContent = name;
    this._userInfoDescription.textContent = description;
  }

  getUserInfo() {
    const name = this._userInfoName.textContent;
    const description = this._userInfoDescription.textContent;
    return { name, description };
  }
}

export default UserInfo;
