<template>
    <div v-if="showPagination">
        <div class="pagination">
            <div @click="$emit('dec-page')" class="btn">&lt</div>
            <div class="counter">{{ pagination.page }}</div>
            <div @click="$emit('inc-page')" class="btn">&gt</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    emits: ['dec-page', 'inc-page'],
    props: {
        pagination: Object,
        showPagination: Boolean
    },
    methods: {

    }
}
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination div {
    margin: 10px;
}

.btn {
    font-size: 32px;
    cursor: pointer;
}

.counter {
    font-size: 26px;
}
</style>