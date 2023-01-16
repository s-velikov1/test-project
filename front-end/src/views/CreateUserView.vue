<template>
    <!-- firstName, lastName, email, phoneNumber -->
    <div v-if="errors.length">
        <p>
            <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
        </p>
    </div>

    <div v-if="success">
        <p>User with name {{ fullName }} has been created</p>
    </div>

    <form @submit.prevent="onSubmit" method="post">
        <label for="firstName">First name:</label>
        <input name="firstName" v-model="firstName" type="text">

        <label for="lastName">Last name:</label>
        <input name="lastName" v-model="lastName" type="text">

        <label for="email">Email:</label>
        <input name="email" v-model="email" type="text">

        <label for="phone">Phone:</label>
        <input name="phone" v-model="phone" type="text">

        <button type="submit">Create</button>
    </form>
</template>

<script>
import axios from 'axios';

// http://127.0.0.1:8000/api/users
export default {
    data() {
        return {
            errors: [],
            success: false,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            fullName: ''
        }
    },
    props: {

    },
    methods: {
        async onSubmit() {
            try {
                if (this.isFormValid()) {
                    const res = await axios.post('http://127.0.0.1:8000/api/users', {
                        userName: `${this.firstName} ${this.lastName}`,
                        email: this.email,
                        phoneNumber: this.phone
                    });

                    if (res.data.status === 'success') {
                        this.success = true;
                        this.fullName = this.firstName + ' ' + this.lastName;
                        this.clearForm();
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
        isFormValid() {
            if (this.firstName && this.lastName && this.email && this.phone) {
                return true;
            }

            if (!this.firstName) {
                this.errors.push('First name is required');
            }

            if (!this.lastName) {
                this.errors.push('Last name is required');
            }

            if (!this.email) {
                this.errors.push('Email is required');
            }

            if (!this.phone) {
                this.errors.push('Phone is required');
            }
        },
        clearForm() {
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.phone = '';
        }
    },
    mounted() {

    }
}
</script>