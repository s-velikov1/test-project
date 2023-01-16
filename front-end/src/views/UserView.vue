<template>
    <div class="user">
        <h1>This is an user page</h1>
        <div>Name: {{ user.userName }}</div>
        <div>Email: {{ user.email }}</div>
        <div>Phone number: {{ user.phoneNumber }}</div>
        <div>Events count: {{ user.eventsCount }}</div>
    </div>
    <!-- <CreateEvent :userId="this.$route.params.id" /> -->
    <Events :userId="this.$route.params.id" />
</template>

<script>
import axios from 'axios';
import CreateEvent from '@/components/CreateEvent.vue';
import Events from '@/components/Events.vue';

export default {
    data() {
        return {
            user: this.getUser(this.$route.params.id)
        }
    },
    components: {
        CreateEvent,
        Events
    },
    methods: {
        async getUser(id) {
            try {
                const res = await axios('http://127.0.0.1:8000/api/users/' + id);
                this.user = res.data.data.user;
                // console.log(res.data.data.user);
            } catch (err) {

            }
        },
        updateEvents(event) {
            console.log('update event');
            console.log(event);
        }
    },
    mounted() {
        this.getUser(this.$route.params.id)
    }
}
</script>