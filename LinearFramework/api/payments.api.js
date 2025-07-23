class PaymentsAPI {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'http://localhost:3000/payments';
  }

  async createPayment(data) {
    return this.request.post(this.baseUrl, { data });
  }

  async getPayment(paymentId) {
    return this.request.get(`${this.baseUrl}/${paymentId}`);
  }

  async listPayments() {
    return this.request.get(this.baseUrl);
  }

  async updatePayment(paymentId, data) {
    return this.request.put(`${this.baseUrl}/${paymentId}`, { data });
  }

  async deletePayment(paymentId) {
    return this.request.delete(`${this.baseUrl}/${paymentId}`);
  }
}

module.exports = PaymentsAPI; 