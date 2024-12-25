<template>
    <div class="pt-40">
        <div class="container mx-auto">
            <div class="flex space-x-6">
                <div class="basis-2/3 space-y-6">
                    <div class="bg-white p-6 space-y-4">
                        <div class="flex space-x-4">
                            <div class="basis-1/2 space-y-2">
                                <h2 class="font-semibold">Họ tên</h2>
                                <input v-model="formData.name" class="w-full h-12 border" />
                            </div>
                            <div class="basis-1/2 space-y-2">
                                <h2 class="font-semibold">Số điện thoại</h2>
                                <input v-model="formData.phone" class="w-full h-12 border" />
                            </div>
                        </div>
                        <div class="flex space-x-4">
                            <div class="basis-1/3 space-y-2">
                                <h2 class="font-semibold">Tỉnh / Thành phố</h2>
                                <input v-model="formData.city" class="w-full h-12 border" />
                            </div>
                            <div class="basis-1/3 space-y-2">
                                <h2 class="font-semibold">Quận / Huyện</h2>
                                <input v-model="formData.district" class="w-full h-12 border" />
                            </div>
                            <div class="basis-1/3 space-y-2">
                                <h2 class="font-semibold">Phường / Xã</h2>
                                <input v-model="formData.ward" class="w-full h-12 border" />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <h2 class="font-semibold">Nhập địa chỉ</h2>
                            <input v-model="formData.address" class="w-full h-12 border" />
                        </div>
                        <div class="space-y-2">
                            <h2 class="font-semibold">Loại địa chỉ</h2>
                            <div class="space-x-4">
                                <button
                                    :class="{ 'bg-gray-200': formData.addressType === 'Văn phòng' }"
                                    class="border font-semibold h-12 p-2"
                                    @click="formData.addressType = 'Văn phòng'"
                                >
                                    Văn phòng
                                </button>
                                <button
                                    :class="{ 'bg-gray-200': formData.addressType === 'Nhà riêng' }"
                                    class="border font-semibold h-12 p-2"
                                    @click="formData.addressType = 'Nhà riêng'"
                                >
                                    Nhà riêng
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 bg-white space-y-4">
                        <div class="flex gap-2">
                            <span class="material-symbols-outlined"> local_shipping </span>
                            <h1 class="font-semibold">Phương thức vận chuyển</h1>
                        </div>
                        <h1>Cập nhật thông tin giao hàng để xem chi phí và thời gian giao hàng.</h1>
                    </div>
                    <div class="p-6 bg-white space-y-4">
                        <h1 class="font-semibold">Phương thức thanh toán</h1>
                        <div
                            class="flex space-x-4 border p-2 items-center"
                            :class="{ 'border-red-500': formData.paymentMethod === 'COD' }"
                            @click="formData.paymentMethod = 'COD'"
                        >
                            <img src="/images/icon_payment/cod.svg" />
                            <h1>Thanh toán khi nhận hàng (COD)</h1>
                        </div>
                        <!-- <div
                            class="flex space-x-4 border p-2 items-center"
                            :class="{ 'border-red-500': formData.paymentMethod === 'VNPAY' }"
                            @click="formData.paymentMethod = 'VNPAY'"
                        >
                            <img src="/images/icon_payment/vnpay.svg" />
                            <h1>Thanh toán bằng VNPAY</h1>
                        </div>
                        <div
                            class="flex space-x-4 border p-2 items-center"
                            :class="{ 'border-red-500': formData.paymentMethod === 'ShopeePay' }"
                            @click="formData.paymentMethod = 'ShopeePay'"
                        >
                            <img src="/images/icon_payment/shopeepay.svg" />
                            <h1>Thanh toán bằng ShopeePay</h1>
                        </div> -->
                    </div>
                    <div class="bg-white p-6 space-y-4">
                        <div class="flex gap-2">
                            <span class="material-symbols-outlined"> shopping_bag </span>
                            <h1 class="font-semibold">Sản phẩm</h1>
                        </div>
                        <div v-for="item in cart" :key="item.product_id" class="flex gap-6">
                            <img :src="item.image_url" class="w-16 h-20" alt="hi" />
                            <div class="grow space-y-2">
                                <div class="flex justify-between">
                                    <h1>{{ item.name }}</h1>
                                    <h1>x{{ item.productInCart }}</h1>
                                    <h1 class="font-bold">{{ item.price }} đ</h1>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <div
                                        class="h-6 w-6 bg-white border border-black flex items-center justify-center rounded-full"
                                    >
                                        <div
                                            :style="{ backgroundColor: item.color }"
                                            class="h-4 w-4 rounded-full"
                                        ></div>
                                    </div>
                                    <h3 class="text-sm">ST.{{ item.product_id }}</h3>
                                    <h3 class="text-sm font-semibold">{{ item.size }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="basis-1/3">
                    <div class="bg-white p-6 flex justify-between">
                        <h1 class="font-semibold">Mã ưu đãi</h1>
                        <div class="flex" @click="showCouponPopup = !showCouponPopup">
                            <h1>Chọn hoặc nhập mã</h1>
                            <span class="material-symbols-outlined"> chevron_right </span>
                        </div>
                    </div>
                    <div class="bg-white p-6 mt-6">
                        <h1 class="font-semibold">Chi tiết đơn hàng</h1>
                        <div class="flex justify-between border-b py-2">
                            <h1>Giá trị đơn hàng</h1>
                            <h1>{{ totalPrice.toLocaleString('vi-VN') }}đ</h1>
                        </div>
                        <div class="flex justify-between pt-6">
                            <h1 class="font-semibold">Tổng tiền thanh toán</h1>
                            <h1 class="font-semibold">{{ totalPrice.toLocaleString('vi-VN') }} đ</h1>
                        </div>

                        <h1>(Đã bao gồm thuế VAT)</h1>
                        <button
                            :disabled="!showCheckOutBtn"
                            :class="{
                                'bg-red-600 text-white cursor-pointer': showCheckOutBtn,
                                'bg-gray-400 text-gray-200 cursor-not-allowed': !showCheckOutBtn,
                            }"
                            class="h-12 rounded-[2px] w-full mt-8 font-bold text-lg"
                            @click="handlePayment"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Popup Mã Giảm Giá -->
        <div v-if="showCouponPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 w-96 rounded-md space-y-4">
                <h2 class="font-bold text-lg">Chọn mã giảm giá</h2>
                <ul>
                    <li
                        v-for="coupon in coupons"
                        :key="coupon.id"
                        class="flex justify-between items-center py-2 border-b"
                    >
                        <span>{{ coupon.code }}</span>
                        <button class="text-blue-500" @click="selectCoupon(coupon)">Chọn</button>
                    </li>
                </ul>
                <button class="mt-4 w-full bg-red-600 text-white py-2 rounded-md" @click="showCouponPopup = false">
                    Đóng
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { postApi } from '@/services/api';
const router = useRouter();
const store = useStore();
const cart = computed(() => store.state.cart);
const totalPrice = computed(() => {
    return cart.value.reduce((sum, item) => sum + parseFloat(item.price), 0);
});
const showCouponPopup = ref(false);
const showCheckOutBtn = ref(false);
const coupons = [
    { id: 1, code: 1234 },
    { id: 2, code: 12345676 },
];
const formData = ref({
    name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    addressType: '',
    paymentMethod: '',
});
const validateForm = () => {
    showCheckOutBtn.value =
        formData.value.name && formData.value.phone && formData.value.address && formData.value.paymentMethod;
};

watch(formData, validateForm, { deep: true });
console.log(cart.value);
const handlePayment = async () => {
    try {
        // const paymentData = {
        //     ...formData.value,
        //     total: totalPrice.value,
        //     cart: cart.value,
        // };
        // const response = await postApi('http://127.0.0.1:8000/payment', paymentData);
        // if (response.status === 200) {
        //     router.push('/order');
        // }
        router.push('/order');
    } catch (error) {
        console.error('Lỗi khi thanh toán:', error);
    }
};
</script>
