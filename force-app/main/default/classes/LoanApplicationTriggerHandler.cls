public class LoanApplicationTriggerHandler {

    public static void handle(
        List<Loan_Application__c> newRecords,
        Map<Id, Loan_Application__c> oldMap
    ) {

        List<Loan_Application__c> loansToVerify = new List<Loan_Application__c>();

        for (Loan_Application__c application : newRecords) {

            // New record
            if (oldMap == null) {
                loansToVerify.add(application);
            }

            // Existing record - verify only when PAN changes
            else if (
                application.PAN_Number__c !=
                oldMap.get(application.Id).PAN_Number__c
            ) {
                loansToVerify.add(application);
            }
        }

        // Call the separate PAN Handler
        if (!loansToVerify.isEmpty()) {
            LoanApplicationPANHandler.verifyPAN(loansToVerify);
        }
    }
}
