<template>
    <button @click="showForm = !showForm">Create Event</button>
    <form v-if="showForm" @submit.prevent="createEvent">
        <label for="title">Title: </label>
        <input v-model="title" type="text" name="title">
        <label for="description">Description: </label>
        <input v-model="description" type="text" name="description">
        <label for="start-date">Start date: </label>
        <input v-model="startDate" type="datetime-local" name="start-date">
        <label for="end-date">End date: </label>
        <input v-model="endDate" type="datetime-local" name="end-date">
        <button type="submit">Create</button>
    </form>
    <div v-if="errors.length">
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            errors: [],
            title: '',
            description: '',
            startDate: null,
            endDate: null,
            showForm: false
        }
    },
    props: {
        userId: String
    },
    emits: ['update-events'],
    methods: {
        async createEvent() {
            try {
                if (this.isFormValid()) {
                    const newEvent = {
                        userId: this.userId,
                        title: this.title,
                        description: this.description,
                        startDate: this.startDate,
                        endDate: this.endDate
                    };
                    const res = await axios.post('http://127.0.0.1:8000/api/events', newEvent);
                    if (res.data.status === 'validation error') {
                        this.errors.push(res.data.message);
                    };
                    if (res.data.status === 'success') {
                        this.$emit('update-events');
                        this.errors = [];

                        this.title = '';
                        this.description = '';
                        this.startDate = null;
                        this.endDate = null;
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
        isFormValid() {
            if (this.title && this.description && this.startDate && this.endDate) {
                return true;
            }

            if (!this.title) {
                this.errors.push('Title is required');
            }

            if (!this.description) {
                this.errors.push('Description is required');
            }

            if (!this.startDate) {
                this.errors.push('Start date is required');
            }

            if (!this.endDate) {
                this.errors.push('End date is required');
            }
        }
    }
}
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-basis: auto;
        align-items: center;
        margin: 2%;
    }
</style>