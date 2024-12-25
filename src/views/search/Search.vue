<template>
    <div class="search-component">
        <input
            type="text"
            v-model="query"
            @input="onSearch"
            placeholder="Search here..."
            class="border px-4 py-2 w-full rounded"
        />
        <ul v-if="results.length" class="mt-4 border rounded p-2 bg-white">
            <li v-for="(result, index) in results" :key="index" class="py-1 px-2 hover:bg-gray-100">
                {{ result.name }}
            </li>
        </ul>
        <p v-else-if="query && !loading && !results.length" class="mt-4 text-gray-500">No results found.</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            query: '',
            results: [],
            loading: false,
        };
    },
    methods: {
        onSearch() {
            if (this.query.length < 3) {
                this.results = [];
                return;
            }
            this.loading = true;
            axios
                .post('/search', { query: this.query })
                .then((response) => {
                    this.results = response.data.results || [];
                })
                .catch((error) => {
                    console.error('Search error:', error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style scoped>
.search-component {
    max-width: 500px;
    margin: 0 auto;
}
</style>
