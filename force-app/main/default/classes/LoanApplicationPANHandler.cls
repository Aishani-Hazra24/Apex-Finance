public class LoanApplicationPANHandler {

    public static void verifyPAN(
        List<Loan_Application__c> loans
    ) {

        for (Loan_Application__c loan : loans) {

            if (
                loan.PAN_Number__c != null &&
                Pattern.matches(
                    '[A-Z]{5}[0-9]{4}[A-Z]{1}',
                    loan.PAN_Number__c.toUpperCase()
                )
            ) {

                // Correct PAN
                loan.Verification_Status__c = 'Verified';
                loan.Background_Verification_Outcome__c = 'Completed';
                loan.Application_Status__c = 'Offer Released';

            } else {

                // Wrong PAN
                loan.Verification_Status__c = 'Rejected';
                loan.Background_Verification_Outcome__c = 'Failed';
                loan.Application_Status__c = 'Under Review';
            }
        }
    }
}