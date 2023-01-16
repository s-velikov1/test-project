<template>
    <form action="/createUser">
        <button>{{ text }}</button>
    </form>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            text: String
        }
    }
</script>