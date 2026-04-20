'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/layout/Navbar';
import Footer from '@/layout/Footer';
import AnimateView, { StaggerContainer, StaggerItem } from '@/animations/AnimateView';
import MagneticButton from '@/animations/MagneticButton';
import { products, getBestsellers, getTrendingProducts, getNewProducts } from '@/data/products';
import categories from '@/data/categories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import {
  FiStar,
  FiHeart,
  FiShoppingBag,
  FiArrowRight,
  FiPlay,
  FiInstagram,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiPlus,
  FiMinus,
} from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';

// Lazy load context hooks to prevent SSR issues
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('luxury-theme') as 'light' | 'dark' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('luxury-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme, setTheme: setTheme as any };
};

const useCart = () => {
  const [items, setItems] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('luxury-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('luxury-cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const addToCart = (product: any) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart: () => setItems([]) };
};

export default function Home() {
  const { theme } = useTheme();
  const { addToCart, items: cartItems, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState<number | null>(null);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    setAddedProduct(product.id);
    setTimeout(() => setAddedProduct(null), 2000);
  };

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <CategoriesSection />

      {/* Trending Products Carousel */}
      <TrendingSection onAddToCart={handleAddToCart} addedProduct={addedProduct} />

      {/* Beauty Editorial */}
      <EditorialSection />

      {/* Best Sellers Grid */}
      <BestSellersSection onAddToCart={handleAddToCart} addedProduct={addedProduct} />

      {/* Beauty Tips */}
      <BeautyTipsSection />

      {/* Parallax Product Showcase */}
      <ParallaxShowcase />

      {/* Instagram Gallery */}
      <InstagramSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={totalPrice}
      />
    </main>
  );
}

// Pre-generated particle positions (deterministic to avoid hydration mismatch)
const particlePositions = [
  { left: 12.5, top: 25.3, duration: 6.2, delay: 0.5 },
  { left: 45.8, top: 67.1, duration: 7.4, delay: 1.2 },
  { left: 78.2, top: 34.7, duration: 5.8, delay: 2.1 },
  { left: 23.6, top: 89.4, duration: 8.1, delay: 0.8 },
  { left: 56.9, top: 12.2, duration: 6.7, delay: 1.5 },
  { left: 89.1, top: 56.8, duration: 7.9, delay: 2.3 },
  { left: 34.4, top: 71.9, duration: 5.3, delay: 0.3 },
  { left: 67.3, top: 43.5, duration: 8.6, delay: 1.8 },
  { left: 15.7, top: 82.1, duration: 6.5, delay: 2.7 },
  { left: 92.4, top: 19.6, duration: 7.2, delay: 0.9 },
  { left: 41.2, top: 58.3, duration: 5.9, delay: 1.1 },
  { left: 73.8, top: 91.2, duration: 8.3, delay: 2.5 },
  { left: 28.5, top: 36.7, duration: 6.1, delay: 0.4 },
  { left: 61.9, top: 74.8, duration: 7.6, delay: 1.6 },
  { left: 84.6, top: 28.4, duration: 5.5, delay: 2.0 },
  { left: 19.3, top: 65.2, duration: 8.8, delay: 0.7 },
  { left: 52.7, top: 47.9, duration: 6.9, delay: 1.3 },
  { left: 95.1, top: 83.5, duration: 7.1, delay: 2.2 },
  { left: 37.8, top: 21.6, duration: 5.7, delay: 0.6 },
  { left: 70.2, top: 54.1, duration: 8.2, delay: 1.9 },
  { left: 11.4, top: 78.7, duration: 6.4, delay: 2.4 },
  { left: 48.6, top: 15.8, duration: 7.5, delay: 0.2 },
  { left: 81.9, top: 62.4, duration: 5.6, delay: 1.4 },
  { left: 25.1, top: 95.3, duration: 8.4, delay: 2.6 },
  { left: 64.5, top: 39.2, duration: 6.3, delay: 1.0 },
];

// Hero Section with Scroll Zoom Effect
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Zoom */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <Image
          src="/download/hero-cosmetics.jpg"
          alt="Luxury Cosmetics"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: i % 3 === 0 ? 'rgba(232, 160, 168, 0.6)' : 'rgba(255, 255, 255, 0.4)',
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-8, 8, -8],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-white/70"
        >
          Luxury Beauty Collection
        </motion.p>

        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-center mb-6"
        >
          {'LUXE BEAUTY'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl font-light text-white/80 mb-12 text-center max-w-2xl"
        >
          Where Skincare Meets Artistry
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[var(--rose-gold)] text-white font-medium rounded-full hover:bg-[var(--rose-dark)] transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Shop Now <FiArrowRight />
            </motion.button>
          </MagneticButton>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-transparent border-2 border-white/50 text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <FiPlay /> Watch Film
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Categories Section
function CategoriesSection() {
  const categoryImages: Record<string, string> = {
    lipsticks: '/download/lipstick-collection.jpg',
    foundations: '/download/skincare-products.jpg',
    skincare: '/download/skincare-products.jpg',
    eyeshadow: '/download/eyeshadow-palette.jpg',
    perfumes: '/download/perfume-collection.jpg',
    'makeup-tools': '/download/makeup-tools.jpg',
    serums: '/download/skincare-products.jpg',
    'lip-care': '/download/lipstick-collection.jpg',
    blush: '/download/eyeshadow-palette.jpg',
  };

  return (
    <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <AnimateView>
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sm tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4"
            >
              Explore Our Collection
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of luxury beauty products, from everyday essentials to exclusive treats.
            </p>
          </div>
        </AnimateView>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <StaggerItem key={category.id}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer card-glow"
              >
                <Image
                  src={categoryImages[category.slug] || '/download/skincare-products.jpg'}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <p className="text-sm text-white/70">{category.count} products</p>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-[var(--rose-gold)]/20 transition-opacity"
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Trending Products Carousel
function TrendingSection({ onAddToCart, addedProduct }: { onAddToCart: (product: typeof products[0]) => void; addedProduct: number | null }) {
  const trendingProducts = getTrendingProducts();
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateView>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4">Trending Now</p>
              <h2 className="text-4xl md:text-5xl font-light">Hot This Season</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => swiper?.slidePrev()}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <FiChevronLeft />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => swiper?.slideNext()}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <FiChevronRight />
              </motion.button>
            </div>
          </div>
        </AnimateView>

        <Swiper
          onSwiper={setSwiper}
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4.2 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.swiper-pagination-trending' }}
          className="!overflow-visible"
        >
          {trendingProducts.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <ProductCard product={product} onAddToCart={onAddToCart} isAdded={addedProduct === product.id} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-pagination-trending mt-8 flex justify-center gap-2" />
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({ product, onAddToCart, isAdded }: { product: typeof products[0]; onAddToCart: (product: typeof products[0]) => void; isAdded: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <motion.div
        animate={{ y: isHovered ? -8 : 0 }}
        className="relative bg-card rounded-2xl overflow-hidden border border-border h-full flex flex-col card-glow"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.bestseller && (
              <span className="px-3 py-1 bg-[var(--rose-gold)] text-white text-xs font-medium rounded-full">
                Bestseller
              </span>
            )}
            {product.new && (
              <span className="px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-full">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-destructive text-white text-xs font-medium rounded-full">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isLiked ? 'bg-[var(--rose-gold)] text-white' : 'bg-white/90 text-foreground'
            }`}
          >
            <FiHeart className={isLiked ? 'fill-current' : ''} />
          </motion.button>

          {/* Quick Add Button */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAddToCart(product)}
                  className={`w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-colors ${
                    isAdded
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-foreground hover:bg-[var(--rose-gold)] hover:text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      Added! <FiShoppingBag />
                    </>
                  ) : (
                    <>
                      Quick Add <FiShoppingBag />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
          <h3 className="font-medium text-lg mb-2 line-clamp-2 flex-1">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[var(--rose-gold)] fill-current' : 'text-muted'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          {/* Shades */}
          {product.shades && (
            <p className="text-xs text-muted-foreground mt-2">{product.shades.length} shades available</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Editorial Section with Scroll Text Lines
function EditorialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const lines = [
    'Where skincare meets artistry.',
    'Beauty designed for confidence.',
    'Luxury crafted for modern elegance.',
    'Your radiance, reimagined.',
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-background">
      {/* Background Image */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <Image
          src="/download/beauty-editorial.jpg"
          alt="Editorial"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--rose-gold)] rounded-full blur-3xl opacity-10"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-[var(--champagne)] rounded-full blur-3xl opacity-10"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ opacity }} className="text-center">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-8 leading-tight"
            >
              <span className="gradient-text">{line}</span>
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <MagneticButton>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-[var(--rose-gold)] text-[var(--rose-gold)] rounded-full font-medium hover:bg-[var(--rose-gold)] hover:text-white transition-colors"
            >
              Discover Our Story
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

// Best Sellers Grid
function BestSellersSection({ onAddToCart, addedProduct }: { onAddToCart: (product: typeof products[0]) => void; addedProduct: number | null }) {
  const bestsellers = getBestsellers();

  return (
    <section id="bestsellers" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateView>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4">Customer Favorites</p>
            <h2 className="text-4xl md:text-5xl font-light mb-6">Best Sellers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The products everyone is talking about. Loved by thousands, these are our most coveted beauty essentials.
            </p>
          </div>
        </AnimateView>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bestsellers.slice(0, 8).map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} isAdded={addedProduct === product.id} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateView delay={0.4}>
          <div className="text-center mt-12">
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[var(--rose-gold)] text-white rounded-full font-medium hover:bg-[var(--rose-dark)] transition-colors"
              >
                View All Products
              </motion.button>
            </MagneticButton>
          </div>
        </AnimateView>
      </div>
    </section>
  );
}

// Beauty Tips Section
function BeautyTipsSection() {
  const tips = [
    {
      title: 'Skincare Routine',
      description: 'Build the perfect skincare routine with our expert tips and product recommendations.',
      icon: '✨',
      gradient: 'from-pink-500/20 to-rose-500/20',
    },
    {
      title: 'Makeup Tutorial',
      description: 'Learn professional techniques from our beauty experts for flawless application.',
      icon: '💄',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Color Matching',
      description: 'Find your perfect shade with our comprehensive foundation matching guide.',
      icon: '🎨',
      gradient: 'from-orange-500/20 to-amber-500/20',
    },
    {
      title: 'Product Layering',
      description: 'Master the art of layering skincare products for maximum effectiveness.',
      icon: '💧',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateView>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4">Beauty Education</p>
            <h2 className="text-4xl md:text-5xl font-light mb-6">Beauty Tips & Guides</h2>
          </div>
        </AnimateView>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -8, rotateY: 5 }}
                className="group relative h-full p-8 rounded-2xl border border-border bg-card overflow-hidden cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tip.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute -inset-px rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--rose-gold), var(--champagne))',
                    opacity: 0.1,
                  }}
                />

                <div className="relative z-10">
                  <div className="text-5xl mb-6">{tip.icon}</div>
                  <h3 className="text-xl font-medium mb-3">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tip.description}</p>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-[var(--rose-gold)] text-sm font-medium"
                  >
                    Learn More <FiArrowRight />
                  </motion.div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Parallax Showcase
function ParallaxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const showcaseProducts = [
    { image: '/download/lipstick-collection.jpg', title: 'Lip Collection', subtitle: 'Bold & Beautiful', y: y1 },
    { image: '/download/skincare-products.jpg', title: 'Skincare', subtitle: 'Radiant Glow', y: y2 },
    { image: '/download/perfume-collection.jpg', title: 'Fragrance', subtitle: 'Captivating Scent', y: y3 },
  ];

  return (
    <section ref={containerRef} className="py-32 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateView>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4">Featured Collections</p>
            <h2 className="text-4xl md:text-5xl font-light">Curated For You</h2>
          </div>
        </AnimateView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseProducts.map((product, i) => (
            <motion.div
              key={i}
              style={{ y: product.y }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-sm tracking-widest uppercase text-white/60 mb-2"
                >
                  {product.subtitle}
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl font-light mb-4"
                >
                  {product.title}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all"
                >
                  Shop Now <FiArrowRight />
                </motion.div>
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-[var(--rose-gold)]/20 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Instagram Gallery
function InstagramSection() {
  const instagramImages = [
    '/download/lipstick-collection.jpg',
    '/download/skincare-products.jpg',
    '/download/perfume-collection.jpg',
    '/download/eyeshadow-palette.jpg',
    '/download/makeup-tools.jpg',
    '/download/beauty-editorial.jpg',
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateView>
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4">@LuxeBeauty</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4">Follow Our Journey</h2>
            <p className="text-muted-foreground">Join our community of beauty lovers</p>
          </div>
        </AnimateView>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramImages.map((image, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`Instagram ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="text-white flex items-center gap-4"
                  >
                    <FiInstagram className="w-6 h-6" />
                    <span className="text-sm font-medium">12.5K</span>
                  </motion.div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateView delay={0.3}>
          <div className="text-center mt-10">
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-border rounded-full font-medium flex items-center gap-2 mx-auto hover:border-[var(--rose-gold)] transition-colors"
              >
                <FiInstagram /> Follow @LuxeBeauty
              </motion.button>
            </MagneticButton>
          </div>
        </AnimateView>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Beauty Blogger',
      avatar: '/download/beauty-editorial.jpg',
      content: 'The quality of LUXE BEAUTY products is unmatched. Every item I\'ve tried has exceeded my expectations. The Velvet Rose Lipstick is my absolute favorite!',
      rating: 5,
    },
    {
      name: 'Emily Chen',
      role: 'Makeup Artist',
      avatar: '/download/beauty-editorial.jpg',
      content: 'As a professional makeup artist, I\'m very particular about the products I use. LUXE BEAUTY has become my go-to for both personal and professional use.',
      rating: 5,
    },
    {
      name: 'Alexandra Rose',
      role: 'Skincare Enthusiast',
      avatar: '/download/beauty-editorial.jpg',
      content: 'The skincare line transformed my routine completely. The Radiance Facial Oil is pure luxury in a bottle. My skin has never looked better!',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateView>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-light mb-6">What Our Customers Say</h2>
          </div>
        </AnimateView>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -8 }}
                className="relative h-full p-8 rounded-2xl bg-background border border-border"
              >
                {/* Quote Mark */}
                <div className="absolute top-6 right-6 text-6xl text-[var(--rose-gold)]/20 font-serif">
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <FiStar key={j} className="w-5 h-5 text-[var(--rose-gold)] fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-8 leading-relaxed">{testimonial.content}</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    className="relative w-12 h-12 rounded-full overflow-hidden"
                  >
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </motion.div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Newsletter Section
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--rose-gold)] rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--champagne)] rounded-full blur-3xl opacity-10" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateView>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4">Newsletter</p>
            <h2 className="text-4xl md:text-5xl font-light mb-6">Stay in the Glow</h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive offers, beauty tips, and early access to new product launches.
            </p>

            <div className="relative max-w-md mx-auto">
              <motion.div
                animate={{
                  boxShadow: isSubscribed
                    ? '0 0 30px rgba(183, 110, 121, 0.5)'
                    : '0 0 20px rgba(183, 110, 121, 0.2)',
                }}
                className="relative rounded-full overflow-hidden"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-8 py-5 pr-36 bg-card border border-border rounded-full focus:outline-none focus:border-[var(--rose-gold)] transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsSubscribed(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-[var(--rose-gold)] text-white rounded-full font-medium hover:bg-[var(--rose-dark)] transition-colors"
                >
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                </motion.button>
              </motion.div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </motion.div>
        </AnimateView>
      </div>
    </section>
  );
}

// Cart Sidebar
function CartSidebar({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
  totalPrice,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ id: number; name: string; price: number; image: string; quantity: number }>;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  totalPrice: number;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-light">Your Cart ({items.length})</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center"
                >
                  <FiX />
                </motion.button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <FiShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">${item.price}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full border border-border flex items-center justify-center"
                            >
                              <FiMinus className="w-3 h-3" />
                            </motion.button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full border border-border flex items-center justify-center"
                            >
                              <FiPlus className="w-3 h-3" />
                            </motion.button>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onRemove(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <FiX />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border">
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <MagneticButton>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-[var(--rose-gold)] text-white rounded-full font-medium hover:bg-[var(--rose-dark)] transition-colors"
                    >
                      Checkout
                    </motion.button>
                  </MagneticButton>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
