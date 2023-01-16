<template>
    <h1>Users list</h1>
    <CreateUser text="Create User" />
    <table>
        <thead>
            <tr>
                <td @click="doSort('userName')">User name</td>
                <td @click="doSort('email')">Email</td>
                <td @click="doSort('phoneNumber')">Phone number</td>
                <td @click="doSort('eventsCount')">Events Count</td>
                <td @click="doSort('nextEventDate')">Next Event Date</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in sortedArray">
                <td><a :href="getUserLink(user._id)">{{ user.userName }}</a></td>
                <td>{{ user.email }}</td>
                <td>{{ user.phoneNumber }}</td>
                <td>{{ user.eventsCount || '0' }}</td>
                <td>{{ user.nextEventDate || 'no events' }}</td>
            </tr>
        </tbody>
    </table>
    <Pagination @inc-page="incPage" @dec-page="decPage" :show-pagination="users.length > 0" :pagination="pagination" />
</template>

<script>
import axios from 'axios';
import CreateUser from './CreateUser.vue';
import Pagination from './Pagination.vue';

export default {
    props: {
        settings: Object,
    },
    components: {
        CreateUser,
        Pagination
    },
    data() {
        return {
            users: [],
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
    methods: {
        async getAllUsers() {
            try {
                const res = await axios(`${this.settings.url}/api/users?page=${this.pagination.page}&limit=${this.pagination.limit}`);
                this.users = res.data.data.users;
                this.pagination.lastPageNumber = Math.ceil(res.data.numUsers / this.pagination.limit);
            } catch (err) {
                console.log('can not get all users', err);
            }
        },
        getUserLink(id) {
            return '/user/' + id;
        },
        doSort(field) {
            console.log(this.sort);
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
                await this.getAllUsers();
                console.log('inc');
            }
        },
        async decPage() {
            if (this.pagination.page > 1) {
                this.pagination.page--;
                await this.getAllUsers();
                console.log('dec');
            }
        }
    },
    computed: {
        sortedArray() {
            return this.users.sort((a, b) => {
                if (!this.sort.field) {
                    return this.users;
                }
                // if (typeof a[this.sort.field] === 'object' || typeof b[this.sort.field] === 'object') {
                //     return 1;
                // }
                if (this.sort.desc) {
                    return a[this.sort.field] > b[this.sort.field] ? -1 : 1
                } else {
                    return a[this.sort.field] > b[this.sort.field] ? 1 : -1
                }
            });
        }
    },
    mounted() {
        this.getAllUsers();
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
</style>