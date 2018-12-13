/**
 * @author - Ronak Patel.
 * @description - Create class for calculation.
 */
import { Dashboard, Chart } from './dashboard.model';

export default class DashboardUtility {
    /**
     * Create static method to calculate paid and unpaid quotation data type dashboard and return.
     * @param invoices - get data from dashboard component.
     * @returns dashboard.
     */
    static quotationIdTotal(invoices): Dashboard {
        // Create for store dashboard type data.
        const dashboard: Dashboard = new Dashboard();
        dashboard.paidQuotationsId = [];
        dashboard.UnpaidQuotationsId = [];
        // collect paidQuotationsId and UnpaidQuotationsId and store in array.
        invoices.forEach(invoice => {
            if (invoice.status === 'Paid') {
                dashboard.paidQuotationsId.push(invoice.quotation_id);
            } else {
                dashboard.UnpaidQuotationsId.push(invoice.quotation_id);
            }
        });
        return dashboard;
    }
    /**
     * Create static method to calculate paid and unpaid invoices amount and store dashboard and return.
     * @param quotations -get data from dashboard component.
     * @param quotationId -
     * @returns dashboard.
     */
    static invoiceTotal(quotations, quotationId): Dashboard {
        const dashboard: Dashboard = new Dashboard();
        dashboard.paidQuotationsId = quotationId.paidQuotationsId;
        dashboard.UnpaidQuotationsId = quotationId.UnpaidQuotationsId.length;
        dashboard.totalPaidInvoices = 0;
        dashboard.totalUnpaidInvoices = 0;
        // collect total amount and store in totalPaidInvoices and totalUnpaidInvoices.
        quotations.forEach(quatation => {
            for (let index = 0; index < quotationId.paidQuotationsId.length; index++) {
                if (quatation.id === quotationId.paidQuotationsId[index]) {
                    dashboard.totalPaidInvoices = dashboard.totalPaidInvoices + quatation.grand_total;
                    break;
                }
            }
            for (let index = 0; index < quotationId.UnpaidQuotationsId.length; index++) {
                if (quatation.id === quotationId.UnpaidQuotationsId[index]) {
                    dashboard.totalUnpaidInvoices = dashboard.totalUnpaidInvoices + quatation.grand_total;
                    break;
                }
            }
        });
        return dashboard;
    }
    static invoicesChart(invoice): Chart[] {
        let invoiceData: Chart[] = [];
        let paid = 0;
        let draft = 0;
        let sent = 0;
        invoice.forEach(element => {
            if (element.status === 'Paid') {
                paid = paid + 1;
            } else if (element.status === 'Draft') {
                draft = draft + 1;
            } else {
                sent = sent + 1;
            }
        });
        invoiceData = [{ name: 'Paid', value: paid },
        { name: 'Draft', value: draft },
        { name: 'Sent', value: sent }];

        return invoiceData;
    }
}

