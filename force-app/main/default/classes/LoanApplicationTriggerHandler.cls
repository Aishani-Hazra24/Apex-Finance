public class LoanApplicationTriggerHandler {

    public static void handle(
        List<Loan_Application__c> newRecords,
        Map<Id, Loan_Application__c> oldMap
    ) {

        for (Loan_Application__c application : newRecords) {

            Boolean shouldCheckPAN = false;

            // For a new record
            if (oldMap == null) {
                shouldCheckPAN = true;
            }
            // For an existing record, only check if PAN changed
            else if (
                application.PAN_Number__c !=
                oldMap.get(application.Id).PAN_Number__c
            ) {
                shouldCheckPAN = true;
            }

            if (shouldCheckPAN) {

                String pan = application.PAN_Number__c;

                // Check if PAN is valid
                if (
                    pan != null &&
                    Pattern.matches(
                        '^[A-Z]{5}[0-9]{4}[A-Z]{1}$',
                        pan
                    )
                ) {

                    // VALID PAN
                    application.Verification_Status__c = 'Verified';
                    application.Background_Verification_Outcome__c = 'Passed';
                    application.Application_Status__c = 'Offer Released';

                } else {

                    // INVALID PAN
                    application.Verification_Status__c = 'Rejected';
                    application.Background_Verification_Outcome__c = 'Failed';
                    application.Application_Status__c = 'Under Review';
                }
            }
        }
    }
}