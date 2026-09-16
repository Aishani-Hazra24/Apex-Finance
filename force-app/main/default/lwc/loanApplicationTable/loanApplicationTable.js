import { LightningElement, wire } from 'lwc';
import getLoanApplications from '@salesforce/apex/LoanApplicationTableController.getLoanApplications';

const COLUMNS = [
    {
        label: 'Applicant Name',
        fieldName: 'Applicant_Name__c'
    },
    {
        label: 'Application Status',
        fieldName: 'Application_Status__c'
    },
    {
        label: 'Background Verification',
        fieldName: 'Background_Verification_Outcome__c'
    },
    {
        label: 'Loan Application Number',
        fieldName: 'Name'
    },
    {
        label: 'Applicant Contact',
        fieldName: 'Applicant_Contact__c'
    },
    {
        label: 'Risk Grade',
        fieldName: 'Risk_Grade__c'
    },
    {
        label: 'Loan Amount',
        fieldName: 'Loan_Amount__c',
        type: 'currency'
    }
];

export default class LoanApplicationTable extends LightningElement {

    columns = COLUMNS;
    applications;
    error;

    @wire(getLoanApplications)
    wiredApplications({ data, error }) {
        if (data) {
            this.applications = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.applications = undefined;
            console.error(error);
        }
    }
}