public with sharing class LoanApplicationTableController {

    @AuraEnabled(cacheable=true)
    public static List<Loan_Application__c> getLoanApplications() {

        return [
           SELECT Id,
    Name,
    Applicant_Name__c,
    Application_Status__c,
    Background_Verification_Outcome__c,
    Risk_Grade__c,
    Loan_Amount__c
FROM Loan_Application__c
ORDER BY CreatedDate DESC
LIMIT 50
        ];
    }
}