class GlobalResponse {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  toJson() {
    return JSON.stringify(this);
  }
}

export default GlobalResponse;
