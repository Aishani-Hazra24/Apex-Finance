import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import CREDIT_SCORE from '@salesforce/schema/Loan_Application__c.Credit_Score__c';
import RISK_GRADE from '@salesforce/schema/Loan_Application__c.Risk_Grade__c';

const FIELDS = [
    CREDIT_SCORE,
    RISK_GRADE
];

export default class ApplicantRiskCard extends LightningElement {
    @api recordId;

    creditScore;
    riskGrade;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: FIELDS
    })
    wiredLoanApplication({ error, data }) {
        if (data) {
            this.creditScore =
                data.fields.Credit_Score__c.value;

            this.riskGrade =
                data.fields.Risk_Grade__c.value;
        } else if (error) {
            console.error(error);
        }
    }

    get riskClass() {
        if (this.riskGrade === 'Low Risk') {
            return 'risk low';
        }

        if (this.riskGrade === 'Medium Risk') {
            return 'risk medium';
        }

        return 'risk high';
    }
}