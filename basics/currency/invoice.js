
angular.module('invoiceApp', [])
    .controller('InvoiceController', function InvoiceController() {
        this.quantity = 1;
        this.cost = 1;
        this.selectedCurrency = 'EUR';
        this.currencies = ['USD', 'EUR', 'CNY'];
        this.usdToForeignRates = {
            USD: 1,
            EUR: 0.74,
            CNY: 6.09
        };

        this.total = function total(outputCurrency) {
            return this.convertCurrency(this.quantity * this.cost, this.selectedCurrency, outputCurrency);
        };

        this.convertCurrency = function convertCurrency(amount, selectedCurrency, outputCurrency) {
            return amount * this.usdToForeignRates[outputCurrency] / this.usdToForeignRates[selectedCurrency];
        };

        this.pay = function pay() {
            window.alert('Thank you!');
        };
    });