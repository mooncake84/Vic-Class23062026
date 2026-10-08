class top_user {
  constructor(selector) {
    this._selector = selector;
    this._element = document.querySelector(selector);
    this._top_userName = this._element.querySelector(".top_user__name");
    this._Top_userDescription = this._element.querySelector(
      ".top_user__description",
    );
  }
  setTop_UserInfo(name, description) {
    this._top_userName.textContent = name;
    this._Top_userDescription.textContent = description;
  }
}
export default top_user;

/*todo este codigo se debe de adaptar al modal */
