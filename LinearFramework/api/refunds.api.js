class RefundsAPI {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'http://localhost:3000/refunds';
  }

  async refundPayment(data) {
    return this.request.post(this.baseUrl, { data });
  }

  async listRefunds() {
    return this.request.get(this.baseUrl);
  }

  async getRefund(refundId) {
    return this.request.get(`${this.baseUrl}/${refundId}`);
  }
}

module.exports = RefundsAPI; 