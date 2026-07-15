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

    <!-- Tab 导航 -->
    <div class="tab-navigation">
      <n-tabs v-model:value="activeTab" type="segment" size="large" animated class="neo-tabs">
        <!-- 点菜 Tab -->
        <n-tab-pane name="menu" tab="点菜">
          <div class="tab-content menu-content">
            <!-- 主要内容区域 - 左右布局 -->
            <div class="main-content">
              <!-- 左侧分类列表 -->
              <div class="category-sidebar">
                <!-- 骨架屏 -->
                <div v-if="isLoading" class="sidebar-content">
                  <div v-for="i in 5" :key="i" class="category-item-skeleton">
                    <n-skeleton height="24" width="24" :circle="true" class="category-icon-skeleton" />
                    <n-skeleton height="12" width="40" :sharp="false" />
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
                    <h3 class="category-title">
                      <n-skeleton height="20" width="120" :sharp="true" style="display: inline-block; vertical-align: middle;" />
                    </h3>
                    <div class="product-list-skeleton">
                      <div v-for="j in 3" :key="j" class="product-item-skeleton neo-shadow">
                        <!-- 商品图片占位 -->
                        <n-skeleton height="60" width="60" :sharp="false" class="product-image-skeleton" />

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
                              <!-- 仅保留加号按钮占位 -->
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
                              <div v-if="product.specs && product.specs.length > 0" class="spec-btn-wrapper">
                                <button @click="openSpecModal(product)" class="spec-btn neo-btn neo-btn-primary">
                                  选规格
                                </button>
                                <span v-if="getProductCartTotalCount(product.id) > 0" class="spec-badge">
                                  {{ getProductCartTotalCount(product.id) }}
                                </span>
                              </div>
                              <template v-else>
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
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </n-tab-pane>

        <!-- 评价 Tab -->
        <n-tab-pane name="reviews" tab="评价">
          <div class="tab-content reviews-content">
            <div class="reviews-summary">
              <div class="rating-overview neo-shadow">
                <div class="rating-score">
                  <span class="score">4.8</span>
                  <div class="stars">
                    <span class="material-symbols-outlined star">star</span>
                    <span class="material-symbols-outlined star">star</span>
                    <span class="material-symbols-outlined star">star</span>
                    <span class="material-symbols-outlined star">star</span>
                    <span class="material-symbols-outlined star">star_half</span>
                  </div>
                  <span class="total-reviews">1,234 条评价</span>
                </div>
                <div class="rating-bars">
                  <div class="rating-bar">
                    <span class="label">5星</span>
                    <div class="bar">
                      <div class="fill" style="width: 80%"></div>
                    </div>
                    <span class="count">80%</span>
                  </div>
                  <div class="rating-bar">
                    <span class="label">4星</span>
                    <div class="bar">
                      <div class="fill" style="width: 15%"></div>
                    </div>
                    <span class="count">15%</span>
                  </div>
                  <div class="rating-bar">
                    <span class="label">3星</span>
                    <div class="bar">
                      <div class="fill" style="width: 3%"></div>
                    </div>
                    <span class="count">3%</span>
                  </div>
                  <div class="rating-bar">
                    <span class="label">2星</span>
                    <div class="bar">
                      <div class="fill" style="width: 1%"></div>
                    </div>
                    <span class="count">1%</span>
                  </div>
                  <div class="rating-bar">
                    <span class="label">1星</span>
                    <div class="bar">
                      <div class="fill" style="width: 1%"></div>
                    </div>
                    <span class="count">1%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="reviews-list">
              <h3 class="section-title">用户评价</h3>
              <div v-for="review in reviews" :key="review.id" class="review-item neo-shadow">
                <div class="review-header">
                  <div class="user-info">
                    <div class="user-avatar">{{ review.userName.charAt(0) }}</div>
                    <div class="user-details">
                      <span class="user-name">{{ review.userName }}</span>
                      <div class="review-stars">
                        <span v-for="i in review.rating" :key="i"
                          class="material-symbols-outlined star-small">star</span>
                      </div>
                    </div>
                  </div>
                  <span class="review-date">{{ review.date }}</span>
                </div>
                <p class="review-text">{{ review.content }}</p>
                <div v-if="review.images && review.images.length" class="review-images">
                  <div v-for="(img, idx) in review.images" :key="idx" class="review-image">
                    {{ img }}
                  </div>
                </div>
                <div v-if="review.reply" class="review-reply">
                  <span class="reply-label">商家回复：</span>
                  <span class="reply-text">{{ review.reply }}</span>
                </div>
              </div>
            </div>
          </div>
        </n-tab-pane>

        <!-- 商家 Tab -->
        <n-tab-pane name="merchant" tab="商家">
          <div class="tab-content merchant-content">
            <div class="merchant-header neo-shadow">
              <div class="merchant-avatar">🍜</div>
              <div class="merchant-basic">
                <h2 class="merchant-name">美味餐厅</h2>
                <div class="merchant-rating">
                  <span class="material-symbols-outlined">star</span>
                  <span class="score">4.8</span>
                  <span class="sales">月售 2,345 单</span>
                </div>
              </div>
            </div>

            <div class="merchant-info">
              <div class="info-section">
                <h3 class="section-title">商家信息</h3>
                <div class="info-item">
                  <span class="material-symbols-outlined info-icon">schedule</span>
                  <div class="info-content">
                    <span class="info-label">配送时间</span>
                    <span class="info-value">30-45 分钟</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="material-symbols-outlined info-icon">delivery_dining</span>
                  <div class="info-content">
                    <span class="info-label">配送费</span>
                    <span class="info-value">¥5</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="material-symbols-outlined info-icon">restaurant</span>
                  <div class="info-content">
                    <span class="info-label">起送价</span>
                    <span class="info-value">¥20</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="material-symbols-outlined info-icon">location_on</span>
                  <div class="info-content">
                    <span class="info-label">商家地址</span>
                    <span class="info-value">北京市朝阳区美食街123号</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="material-symbols-outlined info-icon">phone</span>
                  <div class="info-content">
                    <span class="info-label">联系电话</span>
                    <span class="info-value">400-123-4567</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="material-symbols-outlined info-icon">schedule</span>
                  <div class="info-content">
                    <span class="info-label">营业时间</span>
                    <span class="info-value">09:00-22:00</span>
                  </div>
                </div>
              </div>

              <div class="features-section">
                <h3 class="section-title">商家服务</h3>
                <div class="features-list">
                  <div class="feature-item">
                    <span class="material-symbols-outlined feature-icon">verified</span>
                    <span class="feature-text">食品安全认证</span>
                  </div>
                  <div class="feature-item">
                    <span class="material-symbols-outlined feature-icon">workspace_premium</span>
                    <span class="feature-text">品质保证</span>
                  </div>
                  <div class="feature-item">
                    <span class="material-symbols-outlined feature-icon">bolt</span>
                    <span class="feature-text">极速配送</span>
                  </div>
                  <div class="feature-item">
                    <span class="material-symbols-outlined feature-icon">support_agent</span>
                    <span class="feature-text">24小时客服</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>

    <!-- 底部结算栏 - 仅在点菜tab显示 -->
    <div v-if="activeTab === 'menu'" class="checkout-bar neo-shadow">
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
          <div v-for="item in cartItems" :key="item.id + '-' + (item.selectedSpec || '')" class="cart-item neo-shadow">
            <div class="cart-item-info">
              <h4 class="cart-item-name">
                {{ item.name }}
                <span v-if="item.selectedSpec" class="cart-item-spec">({{ item.selectedSpec }})</span>
              </h4>
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

    <!-- 规格选择弹窗 -->
    <n-modal v-model:show="showSpecModal" preset="card" class="neo-modal spec-modal" style="width: 360px;">
      <template #header>
        <div class="modal-header">
          <span class="material-symbols-outlined">restaurant_menu</span>
          <span>选择规格</span>
        </div>
      </template>
      <div v-if="currentSpecProduct" class="spec-modal-content">
        <div class="spec-product-info neo-shadow">
          <div class="spec-product-emoji" :style="{ backgroundColor: currentSpecProduct.color }">
            {{ currentSpecProduct.emoji }}
          </div>
          <div class="spec-product-details">
            <h3 class="spec-product-name">{{ currentSpecProduct.name }}</h3>
            <p class="spec-product-desc">{{ currentSpecProduct.description }}</p>
          </div>
        </div>
        
        <div class="spec-section">
          <span class="spec-title">规格类别：</span>
          <div class="spec-options">
            <button v-for="(spec, index) in currentSpecProduct.specs" :key="index"
              :class="['spec-option-btn', { active: selectedSpecIndex === index }]"
              @click="selectSpec(index)">
              {{ spec.name }}
              <span v-if="spec.extraPrice > 0" class="spec-extra-price">+¥{{ spec.extraPrice }}</span>
            </button>
          </div>
        </div>
      </div>
      <template #action v-if="currentSpecProduct">
        <div class="spec-modal-actions">
          <div class="spec-modal-price">
            <span class="price-label">总计:</span>
            <span class="price-value">¥{{ currentSpecProduct.price + currentSpecProduct.specs[selectedSpecIndex].extraPrice }}</span>
          </div>
          <button @click="confirmSpecAddToCart" class="neo-btn neo-btn-primary spec-add-btn">
            加入购物车
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
import { NModal, NSkeleton, NTabs, NTabPane, useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()

// 分类数据
const categories = ref([
  {
    id: 1,
    name: '热销推荐',
    icon: '🔥',
    products: [
      {
        id: 101,
        name: '招牌牛肉面',
        description: '精选牛肉配秘制汤底',
        price: 28,
        emoji: '🍜',
        color: '#FFD700',
        specs: [
          { name: '标准份', extraPrice: 0 },
          { name: '大份', extraPrice: 6 }
        ]
      },
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
      {
        id: 403,
        name: '珍珠奶茶',
        description: '台式经典',
        price: 15,
        emoji: '🧋',
        color: '#FFB6C1',
        specs: [
          { name: '中杯', extraPrice: 0 },
          { name: '大杯', extraPrice: 3 },
          { name: '超大杯', extraPrice: 5 }
        ]
      }
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

// 规格选择弹窗相关变量
const showSpecModal = ref(false)
const currentSpecProduct = ref(null)
const selectedSpecIndex = ref(0)

// 当前激活的Tab
const activeTab = ref('menu')

// 评价数据
const reviews = ref([
  {
    id: 1,
    userName: '张三',
    rating: 5,
    content: '味道非常棒！牛肉面很劲道，汤底很浓郁，配送也很快，下次还会再点！',
    date: '2024-01-15',
    images: ['🍜', '🥢'],
    reply: '感谢您的支持！我们会继续提供优质的美食和服务。'
  },
  {
    id: 2,
    userName: '李四',
    rating: 4,
    content: '整体不错，菜品新鲜，分量足。就是配送时间稍微长了一点，希望改进。',
    date: '2024-01-14',
    images: [],
    reply: '感谢您的反馈！我们会优化配送流程，提高配送效率。'
  },
  {
    id: 3,
    userName: '王五',
    rating: 5,
    content: '太喜欢这家店的宫保鸡丁了！酸甜适中，鸡肉嫩滑，强烈推荐！',
    date: '2024-01-13',
    images: ['🥘', '🍚'],
    reply: '谢谢您的喜欢！宫保鸡丁是我们店的招牌菜，欢迎下次再点！'
  },
  {
    id: 4,
    userName: '赵六',
    rating: 5,
    content: '环境干净卫生，包装精美，菜品温度保持得很好，五星好评！',
    date: '2024-01-12',
    images: [],
    reply: '感谢您的好评！我们会继续保持高品质的服务。'
  },
  {
    id: 5,
    userName: '钱七',
    rating: 4,
    content: '味道不错，价格合理，就是有时候订单处理时间有点长。',
    date: '2024-01-11',
    images: ['🍱'],
    reply: '感谢您的反馈！我们会加强订单处理效率，提升用户体验。'
  }
])

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

// 获取购物车商品数量（无规格商品直接加减用）
const getCartQuantity = (productId) => {
  const item = cart.value.find(c => c.id === productId && !c.selectedSpec)
  return item ? item.quantity : 0
}

// 获取某个商品在购物车中的全部数量总和（跨规格）
const getProductCartTotalCount = (productId) => {
  return cart.value
    .filter(item => item.id === productId)
    .reduce((total, item) => total + item.quantity, 0)
}

// 添加到购物车（支持规格）
const addToCart = (product, spec) => {
  const specName = spec ? spec.name : null
  const finalPrice = spec ? (product.price + spec.extraPrice) : product.price
  const existingItem = cart.value.find(c => c.id === product.id && c.selectedSpec === specName)
  
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({
      id: product.id,
      name: product.name,
      description: product.description,
      emoji: product.emoji,
      color: product.color,
      price: finalPrice,
      basePrice: product.price,
      selectedSpec: specName,
      quantity: 1
    })
  }
  message.success(`已添加 ${product.name}${specName ? ' (' + specName + ')' : ''}`)
}

// 增加商品数量（兼容购物车项直接操作和无规格操作）
const increaseQuantity = (product) => {
  const specName = product.selectedSpec || null
  const existingItem = cart.value.find(c => c.id === product.id && c.selectedSpec === specName)
  if (existingItem) {
    existingItem.quantity++
  } else {
    addToCart(product, null)
  }
}

// 减少商品数量（兼容购物车项直接操作和无规格操作）
const decreaseQuantity = (product) => {
  const specName = product.selectedSpec || null
  const existingItem = cart.value.find(c => c.id === product.id && c.selectedSpec === specName)
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity--
    } else {
      cart.value = cart.value.filter(c => !(c.id === product.id && c.selectedSpec === specName))
    }
  }
}

// 记录每个商品最后一次选择的规格索引，以便重新打开时能够自动恢复选中
const lastSelectedSpecMap = ref({})

// 规格选择弹窗相关方法
const openSpecModal = (product) => {
  currentSpecProduct.value = product
  
  // 1. 优先使用本次会话在弹窗中最后选择的规格索引
  if (lastSelectedSpecMap.value[product.id] !== undefined) {
    selectedSpecIndex.value = lastSelectedSpecMap.value[product.id]
  } else {
    // 2. 其次使用购物车中该商品最新加入的一项规格
    const cartItemsForProduct = cart.value.filter(c => c.id === product.id)
    if (cartItemsForProduct.length > 0) {
      const lastCartItem = cartItemsForProduct[cartItemsForProduct.length - 1]
      const specIndex = product.specs.findIndex(s => s.name === lastCartItem.selectedSpec)
      if (specIndex !== -1) {
        selectedSpecIndex.value = specIndex
        lastSelectedSpecMap.value[product.id] = specIndex
        showSpecModal.value = true
        return
      }
    }
    // 3. 否则默认选中第一个规格
    selectedSpecIndex.value = 0
  }
  
  showSpecModal.value = true
}

const selectSpec = (index) => {
  selectedSpecIndex.value = index
  if (currentSpecProduct.value) {
    lastSelectedSpecMap.value[currentSpecProduct.value.id] = index
  }
}

const confirmSpecAddToCart = () => {
  if (!currentSpecProduct.value) return
  const product = currentSpecProduct.value
  const spec = product.specs[selectedSpecIndex.value]
  addToCart(product, spec)
  showSpecModal.value = false
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
  border-left: 3px solid transparent;
}

.category-icon-skeleton {
  margin-bottom: 4px;
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
  padding: 16px 16px 50px 16px;
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
  margin-bottom: 24px;
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
  border: 2px solid #000000;
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
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 2px solid #000000;
  border-radius: 8px;
}

.product-image-skeleton :deep(.n-skeleton) {
  width: 60px !important;
  height: 60px !important;
  margin: 0;
}

.product-info-skeleton {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name-skeleton {
  width: 120px;
  height: 16px;
  margin-bottom: 4px;
}

.product-name-skeleton :deep(.n-skeleton) {
  width: 120px !important;
  height: 16px !important;
  margin: 0;
}

.product-desc-skeleton {
  width: 100px;
  height: 12px;
  margin-bottom: 8px;
}

.product-desc-skeleton :deep(.n-skeleton) {
  width: 100px !important;
  height: 12px !important;
  margin: 0;
}

.product-footer-skeleton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price-skeleton {
  width: 40px;
  height: 16px;
  flex-shrink: 0;
}

.product-price-skeleton :deep(.n-skeleton) {
  width: 40px !important;
  height: 16px !important;
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
  margin: 0 4px;
}

.quantity-btn-skeleton {
  width: 28px;
  height: 28px;
  border: 2px solid #000000;
}

.quantity-btn-skeleton :deep(.n-skeleton) {
  width: 28px !important;
  height: 28px !important;
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

/* 移动端限制弹窗宽度，保留左右边距 */
.cart-modal {
  width: calc(100vw - 32px) !important;
  max-width: 400px;
  margin: 0 16px;
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

/* Tab 导航样式 */
.tab-navigation {
  background-color: #ffffff;
  border-bottom: 3px solid #000000;
  padding: 0 16px 8px 16px;
  position: sticky;
  top: 72px;
  z-index: 40;
}

.neo-tabs {
  border-bottom: none;
}

.neo-tabs :deep(.n-tabs-nav) {
  background-color: #f5f5f5;
  border: 2px solid #000000;
  border-radius: 0;
  padding: 4px 4px 0 4px;
  margin: 12px 0 0 0;
}

.neo-tabs :deep(.n-tabs-nav-pad) {
  gap: 4px;
}

.neo-tabs :deep(.n-tabs-tab) {
  border: 2px solid #000000;
  background-color: #ffffff;
  color: #000000;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 0;
  transition: all 0.2s;
  box-shadow: 2px 2px 0px #000000;
}

.neo-tabs :deep(.n-tabs-tab:hover) {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px #000000;
}

.neo-tabs :deep(.n-tabs-tab.n-tabs-tab--active) {
  background-color: #FF5F1F;
  color: #ffffff;
  transform: translate(0, 0);
  box-shadow: 1px 1px 0px #000000;
}

.tab-content {
  padding: 12px 16px 16px 16px;
  min-height: calc(100vh - 250px);
  margin-top: 0;
}

/* 点菜内容区域 */
.menu-content {
  padding: 0;
}

.menu-content .main-content {
  height: calc(100vh - 250px);
}

/* 评价内容样式 */
.reviews-content {
  background-color: #ffffff;
}

.reviews-summary {
  margin-bottom: 24px;
}

.rating-overview {
  background-color: #ffffff;
  border: 3px solid #000000;
  padding: 24px;
  display: flex;
  gap: 32px;
}

.rating-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.score {
  font-size: 48px;
  font-weight: 900;
  color: #FF5F1F;
  line-height: 1;
  margin-bottom: 8px;
}

.stars {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
}

.star {
  font-size: 24px;
  color: #FFD700;
}

.total-reviews {
  font-size: 12px;
  color: #666;
  font-weight: 600;
}

.rating-bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-bar .label {
  font-size: 12px;
  font-weight: 600;
  min-width: 30px;
  color: #000000;
}

.rating-bar .bar {
  flex: 1;
  height: 8px;
  background-color: #f5f5f5;
  border: 2px solid #000000;
  position: relative;
}

.rating-bar .fill {
  height: 100%;
  background-color: #FFD700;
  border-right: 2px solid #000000;
}

.rating-bar .count {
  font-size: 12px;
  font-weight: 700;
  min-width: 35px;
  text-align: right;
  color: #000000;
}

.section-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  padding-bottom: 8px;
  border-bottom: 2px solid #000000;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-item {
  background-color: #ffffff;
  border: 2px solid #000000;
  padding: 16px;
  transition: all 0.2s;
}

.review-item:hover {
  transform: translate(-1px, -1px);
  box-shadow: 6px 6px 0px #000000;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #4ECDC4;
  border: 2px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-name {
  font-weight: 700;
  font-size: 14px;
  color: #000000;
}

.review-stars {
  display: flex;
  gap: 2px;
}

.star-small {
  font-size: 14px;
  color: #FFD700;
}

.review-date {
  font-size: 11px;
  color: #999;
  font-weight: 600;
}

.review-text {
  font-size: 13px;
  line-height: 1.6;
  color: #333;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.review-images {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.review-image {
  width: 60px;
  height: 60px;
  background-color: #f5f5f5;
  border: 2px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.review-reply {
  background-color: #f5f5f5;
  border: 2px solid #000000;
  padding: 12px;
  margin-top: 8px;
}

.reply-label {
  font-weight: 700;
  font-size: 12px;
  color: #FF5F1F;
  margin-right: 8px;
}

.reply-text {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

/* 商家内容样式 */
.merchant-content {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.merchant-header {
  background-color: #ffffff;
  border: 3px solid #000000;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.merchant-avatar {
  width: 80px;
  height: 80px;
  background-color: #FFF5E6;
  border: 3px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  flex-shrink: 0;
}

.merchant-basic {
  flex: 1;
}

.merchant-name {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 8px 0;
  color: #000000;
}

.merchant-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.merchant-rating .material-symbols-outlined {
  font-size: 16px;
  color: #FFD700;
}

.merchant-rating .score {
  font-size: 16px;
  font-weight: 800;
  color: #000000;
}

.merchant-rating .sales {
  font-size: 12px;
  color: #666;
  font-weight: 600;
}

.merchant-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-section,
.features-section {
  background-color: #ffffff;
  border: 3px solid #000000;
  padding: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.info-item:last-child {
  border-bottom: none;
}

.info-icon {
  width: 24px;
  height: 24px;
  color: #FF5F1F;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 13px;
  color: #666;
  font-weight: 600;
}

.info-value {
  font-size: 13px;
  color: #000000;
  font-weight: 700;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #f5f5f5;
  border: 2px solid #000000;
}

.feature-icon {
  font-size: 20px;
  color: #4ECDC4;
  flex-shrink: 0;
}

.feature-text {
  font-size: 12px;
  color: #000000;
  font-weight: 700;
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
    padding: 12px 12px 0px 12px;
  }

  .product-image {
    width: 50px;
    height: 50px;
  }

  .product-image-skeleton {
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

  /* Tab 移动端样式 */
  .tab-navigation {
    padding: 0 12px 6px 12px;
    top: 68px;
  }

  .neo-tabs :deep(.n-tabs-tab) {
    font-size: 12px;
    padding: 6px 16px;
  }

  /* 评价移动端样式 */
  .rating-overview {
    flex-direction: column;
    gap: 20px;
    padding: 16px;
  }

  .score {
    font-size: 36px;
  }

  .star {
    font-size: 20px;
  }

  .rating-bar .label {
    min-width: 25px;
    font-size: 11px;
  }

  .rating-bar .count {
    min-width: 30px;
    font-size: 11px;
  }

  .review-item {
    padding: 12px;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  .review-images {
    gap: 6px;
  }

  .review-image {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  /* 商家移动端样式 */
  .merchant-header {
    flex-direction: column;
    text-align: center;
    padding: 16px;
  }

  .merchant-avatar {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .merchant-name {
    font-size: 16px;
  }

  .merchant-rating {
    justify-content: center;
  }

  .info-section,
  .features-section {
    padding: 16px;
  }

  .info-item {
    padding: 10px 0;
  }

  .info-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .features-list {
    grid-template-columns: 1fr;
  }

  .feature-item {
    padding: 10px;
  }
}

/* 规格选择相关样式 */
.spec-btn-wrapper {
  position: relative;
  display: inline-block;
}

.spec-btn {
  padding: 6px 14px;
  font-size: 11px;
}

.spec-badge {
  position: absolute;
  top: -8px;
  right: -8px;
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
  box-shadow: 1px 1px 0px #000000;
}

.cart-item-spec {
  font-size: 11px;
  color: #FF5F1F;
  font-weight: 700;
  margin-left: 4px;
}

.spec-modal :deep(.n-card__content) {
  padding: 20px;
}

.spec-modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.spec-product-info {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #ffffff;
  border: 2px solid #000000;
}

.spec-product-emoji {
  width: 50px;
  height: 50px;
  border: 2px solid #000000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.spec-product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.spec-product-name {
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin: 0 0 4px 0;
  color: #000000;
}

.spec-product-desc {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  color: #666;
  margin: 0;
}

.spec-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.spec-title {
  font-size: 13px;
  font-weight: 800;
  color: #000000;
  font-family: 'Hanken Grotesk', sans-serif;
  text-transform: uppercase;
}

.spec-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.spec-option-btn {
  background-color: #ffffff;
  border: 2px solid #000000;
  padding: 8px 16px;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 2px 2px 0px 0px #000000;
}

.spec-option-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px 0px #000000;
}

.spec-option-btn.active {
  background-color: #4ECDC4;
  transform: translate(0, 0);
  box-shadow: 1px 1px 0px 0px #000000;
}

.spec-extra-price {
  font-size: 10px;
  color: #FF5F1F;
  margin-left: 4px;
}

.spec-option-btn.active .spec-extra-price {
  color: #000000;
}

.spec-modal-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.spec-modal-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-label {
  font-size: 12px;
  font-weight: 600;
  color: #666;
}

.price-value {
  font-size: 20px;
  font-weight: 800;
  color: #FF5F1F;
}

.spec-add-btn {
  padding: 10px 20px;
  font-size: 13px;
}
</style>