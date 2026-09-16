import { LightningElement } from 'lwc';
import registerUser from '@salesforce/apex/LoanRegistrationController.registerUser';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LoanRegistration extends LightningElement {

    firstName = '';
    lastName = '';
    username = '';
    email = '';
    password = '';
    confirmPassword = '';

    handleChange(event) {
        const field = event.target.dataset.field;
        this[field] = event.target.value;
    }

    async handleRegister() {

        if (this.password !== this.confirmPassword) {
            this.showMessage(
                'Error',
                'Passwords do not match.',
                'error'
            );
            return;
        }

        if (this.username.includes('@')) {
            this.showMessage(
                'Error',
                'Username must not contain an email address.',
                'error'
            );
            return;
        }

        try {

            await registerUser({
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                email: this.email,
                password: this.password
            });

            this.showMessage(
                'Success',
                'Registration successful!',
                'success'
            );

        } catch (error) {

            this.showMessage(
                'Error',
                error.body?.message || 'Registration failed.',
                'error'
            );
        }
    }

    showMessage(title, message, variant) {

        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}