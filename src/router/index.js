import { createWebHistory, createRouter } from 'vue-router';

import HomeView from '@/views/Home/HomeView.vue';
import ProductDetail from '@/views/product-details/ProductDetail.vue';
import Men from '@/views/for-men/Men.vue';
import CheckOut from '@/views/check-out/CheckOut.vue';
import Search from '@/views/search/Search.vue';
import ProductsGrid from '@/views/products-grid/ProductsGrid.vue';
import CategoryPage from '@/views/category-page/CategoryPage.vue';
import Girl from '@/views/for-girl/Girl.vue';
import Boy from '@/views/for-boy/Boy.vue';
import BabyGirl from '@/views/for-baby-girl/BabyGirl.vue';
import Order from '@/components/order/Order.vue';
const routes = [
    { path: '/', name: 'home', component: HomeView, meta: { layout: 'LayoutDefault' } },
    { path: '/men', name: 'men', component: Men, meta: { layout: 'LayoutDefault' } },
    {
        path: '/men/:category', // Dynamic route
        name: 'category',
        component: CategoryPage,
        meta: { layout: 'LayoutDefault' },
    },
    { path: '/girl', name: 'girl', component: Girl, meta: { layout: 'LayoutDefault' } },
    {
        path: '/girl/:category', // Dynamic route
        name: 'category',
        component: CategoryPage,
        meta: { layout: 'LayoutDefault' },
    },
    { path: '/boy', name: 'boy', component: Boy, meta: { layout: 'LayoutDefault' } },
    {
        path: '/boy/:category', // Dynamic route
        name: 'category',
        component: CategoryPage,
        meta: { layout: 'LayoutDefault' },
    },
    { path: '/baby-girl', name: 'baby-girl', component: BabyGirl, meta: { layout: 'LayoutDefault' } },
    {
        path: '/baby-girl/:category', // Dynamic route
        name: 'category',
        component: CategoryPage,
        meta: { layout: 'LayoutDefault' },
    },
    { path: '/checkout', name: 'checkOut', component: CheckOut, meta: { layout: 'LayoutDefault' } },
    { path: '/order', name: 'order', component: Order, meta: { layout: 'LayoutDefault' } },
    { path: '/search', name: 'search', component: Search, meta: { layout: 'SearchLayout' } },
    { path: '/product/:id', component: ProductDetail, meta: { layout: 'LayoutDefault' } },
    { path: '/category/:slug', component: ProductsGrid, meta: { layout: 'LayoutDefault' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
