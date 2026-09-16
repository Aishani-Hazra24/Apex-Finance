trigger LoanApplicationTrigger on Loan_Application__c (
    before insert,
    before update
) {
    LoanApplicationTriggerHandler.handle(
        Trigger.new,
        Trigger.oldMap
    );
}