<template>
  <div class="food-delivery-container">
    <!-- Neo-Brutalism 顶部栏 -->
    <div class="neo-header">
      <button class="neo-back-btn" @click="goBack">
        <span class="back-icon">←</span>
        <span class="back-text">返回</span>
      </button>
      <div class="header-info">
        <h1 class="neo-title">外卖下单</h1>
        <p class="neo-subtitle">美食配送</p>
      </div>
    </div>

    <!-- 主要内容区域 - 左右布局 -->
    <div class="main-content">
      <!-- 左侧分类列表 -->
      <div class="category-sidebar">
        <!-- 骨架屏 -->
        <div v-if="isLoading" class="sidebar-content">
          <div v-for="i in 5" :key="i" class="category-item-skeleton">
            <n-skeleton height="40" width="40" :sharp="true" class="category-icon-skeleton" />
            <n-skeleton height="12" width="40" :sharp="true" />
          </div>
        </div>

        <!-- 真实内容 -->
        <div v-else class="sidebar-content">
          <div v-for="(category, index) in categories" :key="category.id"
            :class="['category-item', { active: selectedCategory === category.id }]"
            @click="selectCategory(category.id)">
            <div class="category-icon">{{ category.icon }}</div>
            <div class="category-name">{{ category.name }}</div>
          </div>
        </div>
      </div>

      <!-- 右侧商品列表 -->
      <div class="product-area">
        <!-- 骨架屏 -->
        <div v-if="isLoading" class="product-content">
          <div v-for="i in 3" :key="i" class="category-section-skeleton">
            <n-skeleton height="24" width="120" :sharp="true" class="category-title-skeleton" />
            <div class="product-list-skeleton">
              <div v-for="j in 3" :key="j" class="product-item-skeleton neo-shadow">
                <!-- 商品图片占位 -->
                <n-skeleton height="60" width="60" :sharp="true" class="product-image-skeleton" />

                <!-- 商品信息占位 -->
                <div class="product-info-skeleton">
                  <!-- 商品名称占位 -->
                  <n-skeleton height="16" width="120" :sharp="true" class="product-name-skeleton" />
                  <!-- 商品描述占位 -->
                  <n-skeleton height="12" width="100" :sharp="true" class="product-desc-skeleton" />
                  <!-- 商品底部区域 -->
                  <div class="product-footer-skeleton">
                    <!-- 价格占位 -->
                    <n-skeleton height="16" width="40" :sharp="true" class="product-price-skeleton" />
                    <!-- 数量控制器占位 -->
                    <div class="quantity-controls-skeleton">
                      <!-- 减号按钮占位 -->
                      <div class="quantity-btn-wrapper">
                        <n-skeleton height="28" width="28" :sharp="true" class="quantity-btn-skeleton" />
                      </div>
                      <!-- 数量显示占位 -->
                      <div class="quantity-value-wrapper">
                        <n-skeleton height="14" width="20" :sharp="true" class="quantity-value-skeleton" />
                      </div>
                      <!-- 加号按钮占位 -->
                      <div class="quantity-btn-wrapper">
                        <n-skeleton height="28" width="28" :sharp="true" class="quantity-btn-skeleton" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 真实内容 -->
        <div v-else class="product-content" ref="productContent">
          <div v-for="category in categories" :key="category.id" :ref="el => setCategoryRef(category.id, el)"
            class="category-section">
            <h3 class="category-title">{{ category.name }}</h3>
            <div class="product-list">
              <div v-for="product in category.products" :key="product.id" class="product-item neo-shadow">
                <div class="product-image" :style="{ backgroundColor: product.color }">
                  <span class="product-emoji">{{ product.emoji }}</span>
                </div>
                <div class="product-info">
                  <h4 class="product-name">{{ product.name }}</h4>
                  <p class="product-desc">{{ product.description }}</p>
                  <div class="product-footer">
                    <span class="product-price">¥{{ product.price }}</span>
                    <div class="quantity-controls">
                      <button v-if="getCartQuantity(product.id) > 0" @click="decreaseQuantity(product)"
                        class="quantity-btn quantity-btn-minus">
                        <span class="material-symbols-outlined">remove</span>
                      </button>
                      <span v-if="getCartQuantity(product.id) > 0" class="quantity-value">
                        {{ getCartQuantity(product.id) }}
                      </span>
                      <button @click="increaseQuantity(product)" class="quantity-btn quantity-btn-plus">
                        <span class="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结算栏 -->
    <div class="checkout-bar neo-shadow">
      <div class="cart-info" @click="toggleCart">
        <div class="cart-icon-wrapper">
          <span class="material-symbols-outlined">shopping_cart</span>
          <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
        </div>
        <div class="cart-text">
          <span class="cart-total">¥{{ cartTotal }}</span>
          <span class="cart-desc">另需配送费 ¥5</span>
        </div>
      </div>
      <button @click="handleCheckout" class="checkout-btn neo-btn-primary" :disabled="cartItemCount === 0">
        去结算
      </button>
    </div>

    <!-- 购物车弹窗 -->
    <n-modal v-model:show="showCart" preset="card" class="neo-modal cart-modal" style="width: 400px;">
      <template #header>
        <div class="modal-header">
          <span class="material-symbols-outlined">shopping_cart</span>
          <span>购物车</span>
        </div>
      </template>
      <div class="cart-content">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <span class="material-symbols-outlined empty-icon">shopping_cart_off</span>
          <p class="empty-text">购物车是空的</p>
          <button @click="showCart = false" class="neo-btn">去选购</button>
        </div>
        <div v-else class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item neo-shadow">
            <div class="cart-item-info">
              <h4 class="cart-item-name">{{ item.name }}</h4>
              <p class="cart-item-price">¥{{ item.price }}</p>
            </div>
            <div class="cart-item-controls">
              <button @click="decreaseQuantity(item)" class="quantity-btn quantity-btn-minus">
                <span class="material-symbols-outlined">remove</span>
              </button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="quantity-btn quantity-btn-plus">
                <span class="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <template #action v-if="cartItems.length > 0">
        <div class="cart-actions">
          <div class="cart-summary">
            <div class="summary-item">
              <span class="summary-label">商品总价:</span>
              <span class="summary-value">¥{{ cartTotal }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">配送费:</span>
              <span class="summary-value">¥5</span>
            </div>
            <div class="summary-item total">
              <span class="summary-label">合计:</span>
              <span class="summary-value">¥{{ cartTotal + 5 }}</span>
            </div>
          </div>
          <button @click="handleCheckout" class="neo-btn neo-btn-primary checkout-btn-modal">
            确认下单
          </button>
        </div>
      </template>
    </n-modal>

    <!-- 下单成功弹窗 -->
    <n-modal v-model:show="showOrderSuccess" preset="card" class="neo-modal" style="width: 350px;">
      <template #header>
        <div class="modal-header success">
          <span class="material-symbols-outlined">check_circle</span>
          <span>下单成功</span>
        </div>
      </template>
      <div class="order-success-content">
        <p class="success-text">您的订单已提交成功！</p>
        <p class="success-desc">预计 30 分钟内送达</p>
        <div class="order-info">
          <div class="info-item">
            <span class="info-label">订单号:</span>
            <span class="info-value">{{ orderNumber }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">配送地址:</span>
            <span class="info-value">北京市朝阳区xxx</span>
          </div>
          <div class="info-item">
            <span class="info-label">支付方式:</span>
            <span class="info-value">在线支付</span>
          </div>
        </div>
      </div>
      <template #action>
        <button @click="showOrderSuccess = false" class="neo-btn">
          确定
        </button>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NModal, NSkeleton, useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()

// 分类数据
const categories = ref([
  {
    id: 1,
    name: '热销推荐',
    icon: '🔥',
    products: [
      { id: 101, name: '招牌牛肉面', description: '精选牛肉配秘制汤底', price: 28, emoji: '🍜', color: '#FFD700' },
      { id: 102, name: '香辣鸡腿堡', description: '鲜嫩多汁的鸡腿肉', price: 22, emoji: '🍔', color: '#FF6B6B' },
      { id: 103, name: '台湾卤肉饭', description: '传统台式风味', price: 25, emoji: '🍚', color: '#FFA07A' }
    ]
  },
  {
    id: 2,
    name: '主食套餐',
    icon: '🍱',
    products: [
      { id: 201, name: '宫保鸡丁套餐', description: '含米饭+汤+小菜', price: 35, emoji: '🥡', color: '#FF8C00' },
      { id: 202, name: '鱼香肉丝套餐', description: '经典川菜配米饭', price: 32, emoji: '🍛', color: '#DC143C' },
      { id: 203, name: '回锅肉套餐', description: '正宗川菜风味', price: 38, emoji: '🥘', color: '#CD5C5C' }
    ]
  },
  {
    id: 3,
    name: '小吃小菜',
    icon: '🥗',
    products: [
      { id: 301, name: '麻婆豆腐', description: '麻辣鲜香', price: 18, emoji: '🍲', color: '#8B0000' },
      { id: 302, name: '凉拌黄瓜', description: '清爽解腻', price: 12, emoji: '🥒', color: '#9ACD32' },
      { id: 303, name: '糖醋排骨', description: '酸甜可口', price: 28, emoji: '🍖', color: '#A52A2A' }
    ]
  },
  {
    id: 4,
    name: '汤羹饮品',
    icon: '🍵',
    products: [
      { id: 401, name: '番茄鸡蛋汤', description: '家常美味', price: 12, emoji: '🍅', color: '#FF6347' },
      { id: 402, name: '酸梅汤', description: '解腻消暑', price: 8, emoji: '🥤', color: '#E75480' },
      { id: 403, name: '珍珠奶茶', description: '台式经典', price: 15, emoji: '🧋', color: '#FFB6C1' }
    ]
  },
  {
    id: 5,
    name: '甜点 dessert',
    icon: '🍰',
    products: [
      { id: 501, name: '提拉米苏', description: '意式经典', price: 25, emoji: '🧁', color: '#D2691E' },
      { id: 502, name: '芒果布丁', description: '鲜奶制作', price: 15, emoji: '🍮', color: '#FFB347' },
      { id: 503, name: '草莓蛋糕', description: '新鲜草莓', price: 22, emoji: '🍰', color: '#FF69B4' }
    ]
  }
])

// 加载状态
const isLoading = ref(true)

// 购物车数据
const cart = ref([])

// 选中的分类
const selectedCategory = ref(1)

// 分类元素引用
const categoryRefs = ref({})
const productContent = ref(null)

// 显示购物车
const showCart = ref(false)

// 显示下单成功
const showOrderSuccess = ref(false)

// 订单号
const orderNumber = ref('')

// 设置分类元素引用
const setCategoryRef = (id, el) => {
  if (el) {
    categoryRefs.value[id] = el
  }
}

// 获取购物车商品数量
const getCartQuantity = (productId) => {
  const item = cart.value.find(c => c.id === productId)
  return item ? item.quantity : 0
}

// 增加商品数量
const increaseQuantity = (product) => {
  const existingItem = cart.value.find(c => c.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({
      ...product,
      quantity: 1
    })
  }
  message.success(`已添加 ${product.name}`)
}

// 减少商品数量
const decreaseQuantity = (product) => {
  const existingItem = cart.value.find(c => c.id === product.id)
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity--
    } else {
      cart.value = cart.value.filter(c => c.id !== product.id)
    }
  }
}

// 选择分类
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  const targetElement = categoryRefs.value[categoryId]
  if (targetElement && productContent.value) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 切换购物车显示
const toggleCart = () => {
  if (cart.value.length === 0) {
    message.info('购物车是空的')
    return
  }
  showCart.value = !showCart.value
}

// 购物车商品列表
const cartItems = computed(() => {
  return cart.value.filter(item => item.quantity > 0)
})

// 购物车商品总数
const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

// 购物车总价
const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// 生成订单号
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `ORD${timestamp}${random}`
}

// 处理结算
const handleCheckout = () => {
  if (cartItemCount.value === 0) {
    message.warning('请先选择商品')
    return
  }

  showCart.value = false
  orderNumber.value = generateOrderNumber()
  showOrderSuccess.value = true

  // 清空购物车
  cart.value = []
}

// 返回首页
const goBack = () => {
  router.push('/')
}

// 组件挂载
onMounted(() => {
  // 模拟网络延迟，显示骨架屏
  setTimeout(() => {
    isLoading.value = false
    message.success('数据加载完成！')
  }, 2500) // 2.5秒延迟模拟网络请求
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700;800&family=Manrope:wght@400;600;700;800&display=swap');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24;
  font-family: 'Material Symbols Outlined';
}

.food-delivery-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #000000;
}

/* Neo-Brutalism 基础样式 */
.neo-shadow {
  box-shadow: 3px 3px 0px 0px #000000;
}

.neo-btn {
  background-color: #ffffff;
  border: 2px solid #000000;
  padding: 8px 16px;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 2px 2px 0px 0px #000000;
}

.neo-btn:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px 0px #000000;
}

.neo-btn:active:not(:disabled) {
  transform: translate(0, 0);
  box-shadow: 1px 1px 0px 0px #000000;
}

.neo-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.neo-btn-primary {
  background-color: #4ECDC4;
}

/* 顶部栏 */
.neo-header {
  background-color: #FF5F1F;
  border: 3px solid #000000;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  z-index: 50;
}

.neo-back-btn {
  background-color: #ffffff;
  border: 2px solid #000000;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 2px 2px 0px 0px #000000;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.neo-back-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.back-icon {
  font-size: 16px;
  font-weight: 800;
}

.header-info {
  flex: 1;
}

.neo-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 24px;
  color: #000000;
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.025em;
}

.neo-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  color: #000000;
  font-weight: 600;
  margin: 4px 0 0 0;
  opacity: 0.8;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 左侧分类栏 */
.category-sidebar {
  width: 100px;
  background-color: #f5f5f5;
  border-right: 2px solid #000000;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar-content {
  padding: 8px 0;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.category-item:hover {
  background-color: #e8e8e8;
}

.category-item.active {
  background-color: #ffffff;
  border-left-color: #FF5F1F;
  font-weight: 700;
}

.category-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.category-name {
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  color: #000000;
}

/* 骨架屏样式 */
.category-item-skeleton {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  gap: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.category-icon-skeleton :deep(.n-skeleton) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.category-item-skeleton :deep(.n-skeleton:last-child) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

/* 重置所有骨架屏n-skeleton的margin，确保布局正确 */
.product-item-skeleton :deep(.n-skeleton) {
  margin: 0 !important;
}

/* 右侧商品区域 */
.product-area {
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
}

.product-content {
  padding: 16px 16px 100px 16px;
}

/* 分类区块 */
.category-section {
  margin-bottom: 24px;
}

.category-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  padding-bottom: 8px;
  border-bottom: 2px solid #000000;
}

/* 商品列表 */
.product-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 骨架屏商品样式 */
.category-section-skeleton {
  margin-bottom: 32px;
}

.category-title-skeleton :deep(.n-skeleton) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.product-list-skeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-item-skeleton {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #ffffff;
  border: 2px solid #e0e0e0;
}

/* 骨架屏动画效果 */
.product-item-skeleton :deep(.n-skeleton),
.category-item-skeleton :deep(.n-skeleton),
.category-section-skeleton :deep(.n-skeleton) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.product-image-skeleton {
  flex-shrink: 0;
  border: 2px solid #e0e0e0;
}

.product-image-skeleton :deep(.n-skeleton) {
  margin: 0;
}

.product-info-skeleton {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name-skeleton {
  margin-bottom: 4px;
}

.product-name-skeleton :deep(.n-skeleton) {
  margin: 0;
}

.product-desc-skeleton {
  margin-bottom: 8px;
}

.product-desc-skeleton :deep(.n-skeleton) {
  margin: 0;
}

.product-footer-skeleton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price-skeleton {
  flex-shrink: 0;
}

.product-price-skeleton :deep(.n-skeleton) {
  margin: 0;
}

.quantity-controls-skeleton {
  display: flex;
  align-items: center;
  gap: 4px;
}

.quantity-btn-wrapper {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
}

.quantity-value-wrapper {
  flex-shrink: 0;
  width: 20px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn-skeleton {
  width: 100%;
  height: 100%;
  border: 2px solid #e0e0e0;
}

.quantity-btn-skeleton :deep(.n-skeleton) {
  margin: 0;
}

.quantity-value-skeleton {
  flex-shrink: 0;
}

.quantity-value-skeleton :deep(.n-skeleton) {
  margin: 0;
}

.product-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #ffffff;
  border: 2px solid #000000;
  transition: all 0.2s;
}

.product-item:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px 0px #000000;
}

.product-image {
  width: 60px;
  height: 60px;
  border: 2px solid #000000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.product-emoji {
  font-size: 32px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #000000;
}

.product-desc {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  color: #666;
  margin: 0 0 8px 0;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #FF5F1F;
}

/* 数量控制器 */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  border: 2px solid #000000;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.quantity-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0px 0px #000000;
}

.quantity-btn:active {
  transform: translate(0, 0);
  box-shadow: none;
}

.quantity-btn .material-symbols-outlined {
  font-size: 16px;
}

.quantity-btn-minus {
  background-color: #e8e8e8;
}

.quantity-btn-plus {
  background-color: #4ECDC4;
}

.quantity-value {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
}

/* 底部结算栏 */
.checkout-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 3px solid #000000;
  border-bottom: 0;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}

.cart-info {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex: 1;
}

.cart-icon-wrapper {
  position: relative;
  width: 44px;
  height: 44px;
  background-color: #4ECDC4;
  border: 2px solid #000000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-icon-wrapper .material-symbols-outlined {
  font-size: 24px;
  color: #000000;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #FF3131;
  color: #ffffff;
  border: 2px solid #000000;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  font-family: 'Manrope', sans-serif;
}

.cart-text {
  display: flex;
  flex-direction: column;
}

.cart-total {
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #FF5F1F;
}

.cart-desc {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  color: #666;
  font-weight: 600;
}

.checkout-btn {
  background-color: #FFD600;
  border: 2px solid #000000;
  padding: 12px 32px;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 2px 2px 0px 0px #000000;
  text-transform: uppercase;
}

.checkout-btn:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px 0px #000000;
  background-color: #FFD700;
}

.checkout-btn:active:not(:disabled) {
  transform: translate(0, 0);
  box-shadow: 1px 1px 0px 0px #000000;
}

/* 购物车弹窗 */
.neo-modal {
  border: 3px solid #000000;
  box-shadow: 6px 6px 0px 0px #000000;
}

.cart-modal :deep(.n-card__content) {
  padding: 20px;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
}

.modal-header.success {
  color: #39FF14;
}

/* 购物车内容 */
.cart-content {
  max-height: 400px;
  overflow-y: auto;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  color: #ccc;
  margin-bottom: 16px;
}

.empty-text {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #ffffff;
  border: 2px solid #000000;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.cart-item-price {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  color: #FF5F1F;
  font-weight: 700;
  margin: 0;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 购物车操作 */
.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: #f5f5f5;
  border: 2px solid #000000;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-item.total {
  border-top: 2px solid #000000;
  padding-top: 8px;
  font-weight: 800;
}

.summary-label {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
}

.summary-value {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #000000;
}

.checkout-btn-modal {
  width: 100%;
  padding: 12px;
  justify-content: center;
}

/* 下单成功 */
.order-success-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.success-text {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #39FF14;
  text-align: center;
  margin: 0;
}

.success-desc {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  color: #666;
  text-align: center;
  margin: 0;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: #f5f5f5;
  border: 2px solid #000000;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #666;
}

.info-value {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #000000;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .neo-header {
    padding: 12px 16px;
  }

  .neo-title {
    font-size: 20px;
  }

  .neo-subtitle {
    font-size: 11px;
  }

  .category-sidebar {
    width: 80px;
  }

  .category-item {
    padding: 12px 6px;
  }

  .category-item-skeleton {
    padding: 12px 6px;
  }

  .category-icon {
    font-size: 20px;
  }

  .category-name {
    font-size: 10px;
  }

  .product-content {
    padding: 12px 12px 50px 12px;
  }

  .product-image {
    width: 50px;
    height: 50px;
  }

  .product-image-skeleton :deep(.n-skeleton) {
    height: 50px !important;
    width: 50px !important;
  }

  .product-emoji {
    font-size: 24px;
  }

  .product-name {
    font-size: 13px;
  }

  .product-desc {
    font-size: 10px;
  }

  .product-price {
    font-size: 14px;
  }

  .checkout-bar {
    padding: 10px 16px;
  }

  .cart-total {
    font-size: 16px;
  }

  .cart-desc {
    font-size: 10px;
  }

  .checkout-btn {
    padding: 10px 24px;
    font-size: 13px;
  }
}
</style>