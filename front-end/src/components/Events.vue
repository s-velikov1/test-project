<template>
    <CreateEvent @update-events="getEventsByUserId" :userId="this.$route.params.id" />
    <h1>Events</h1>
    <table>
        <thead>
            <tr>
                <td @click="doSort('title')">Title</td>
                <td @click="doSort('description')">Description</td>
                <td @click="doSort('startDate')">Start date</td>
                <td @click="doSort('endDate')">End date</td>
                <td>Remove</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="event in sortedArray">
                <td>{{ event.title }}</td>
                <td>{{ event.description }}</td>
                <td>{{ formatDate(event.startDate) }}</td>
                <td>{{ formatDate(event.endDate) }}</td>
                <td><div class="remove" @click="removeEvent(event._id)">remove</div></td>
            </tr>
        </tbody>
    </table>
    <Pagination @inc-page="incPage" @dec-page="decPage" :show-pagination="events.length > 0" :pagination="pagination" />
</template>

<script>
import axios from 'axios';
import Pagination from './Pagination.vue';
import CreateEvent from './CreateEvent.vue';

export default {
    data() {
        return {
            events: [],
            sort: {
                field: '',
                desc: true
            },
            pagination: {
                page: 1,
                limit: 5,
                lastPageNumber: 0
            },
        }
    },
    props: {
        userId: String
    },
    components: {
        Pagination,
        CreateEvent
    },
    methods: {
        async getEventsByUserId() {
            try {
                const id = this.userId;
                const res = await axios(`http://127.0.0.1:8000/api/events/${id}?page=${this.pagination.page}&limit=${this.pagination.limit}`);
                this.events = res.data.data.events || [];
                this.pagination.lastPageNumber = Math.ceil(res.data.numEvents / this.pagination.limit);
            } catch (err) {
                console.log('can not get all events', err);
            }
        },
        formatDate(date) {
            if (!date) {
                return;
            }
            return (new Date(date)).toString().split('GMT')[0];
        },
        doSort(field) {
            if (field == this.sort.field) {
                this.sort.desc = !this.sort.desc
            } else {
                this.sort.field = field;
                this.sort.desc = true;
            }
        },
        async incPage() {
            if (this.pagination.page < this.pagination.lastPageNumber) {
                this.pagination.page++;
                await this.getEventsByUserId(this.userId);
            }
        },
        async decPage() {
            if (this.pagination.page > 1) {
                this.pagination.page--;
                await this.getEventsByUserId(this.userId);
            }
        },
        async removeEvent(id) {
            try {
                if (!id) {
                    return;
                }

                const res = await axios.delete(`http://127.0.0.1:8000/api/events/${id}`);
                await this.getEventsByUserId(this.userId);
            } catch (err) {
                
            }
        }
    },
    mounted() {
        this.getEventsByUserId(this.userId);
    },
    computed: {
        sortedArray() {
            return this.events.sort((a, b) => {
                if (!this.sort.field) {
                    return this.events;
                }
                if (this.sort.desc) {
                    return a[this.sort.field] > b[this.sort.field] ? -1 : 1
                } else {
                    return a[this.sort.field] > b[this.sort.field] ? 1 : -1
                }
            });
        }
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    margin: 0 auto;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}

table th,
table td {
    padding: 12px 15px;
}

table tbody tr {
    border-bottom: 1px solid #dddddd;
}

table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}

.remove {
    text-transform: uppercase;
    cursor: pointer;
    color: red;
}
</style>