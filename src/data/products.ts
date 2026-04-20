// Products data - 100+ products across all categories
export interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  ingredients?: string;
  shades?: string[];
  bestseller?: boolean;
  new?: boolean;
}

const images = {
  hero: '/download/hero-cosmetics.jpg',
  lipstick: '/download/lipstick-collection.jpg',
  skincare: '/download/skincare-products.jpg',
  perfume: '/download/perfume-collection.jpg',
  tools: '/download/makeup-tools.jpg',
  editorial: '/download/beauty-editorial.jpg',
  eyeshadow: '/download/eyeshadow-palette.jpg',
};

// Helper to generate product images based on category
const getProductImage = (category: string, index: number): string => {
  const categoryImageMap: Record<string, string[]> = {
    lipsticks: [images.lipstick, images.hero, images.editorial],
    foundations: [images.skincare, images.hero, images.editorial],
    skincare: [images.skincare, images.hero, images.editorial],
    eyeshadow: [images.eyeshadow, images.hero, images.editorial],
    perfumes: [images.perfume, images.hero, images.editorial],
    'makeup-tools': [images.tools, images.hero, images.editorial],
    serums: [images.skincare, images.hero, images.editorial],
    'lip-care': [images.lipstick, images.hero, images.editorial],
    blush: [images.eyeshadow, images.hero, images.editorial],
    'face-masks': [images.skincare, images.hero, images.editorial],
  };

  const categoryImgs = categoryImageMap[category] || categoryImageMap['skincare'];
  return categoryImgs[index % categoryImgs.length];
};

// Lipsticks - 15 products
const lipsticks: Product[] = [
  { id: 1, name: 'Velvet Rose Matte Lipstick', category: 'Lipsticks', categorySlug: 'lipsticks', price: 32, originalPrice: 38, rating: 4.9, reviews: 2847, image: getProductImage('lipsticks', 0), description: 'A luxurious matte lipstick with a velvety soft finish that glides on smoothly and stays put for up to 12 hours.', ingredients: 'Vitamin E, Jojoba Oil, Shea Butter', shades: ['Rose Petal', 'Berry Kiss', 'Coral Crush', 'Nude Dream', 'Red Carpet'], bestseller: true },
  { id: 2, name: 'Silk Satin Lip Color', category: 'Lipsticks', categorySlug: 'lipsticks', price: 28, rating: 4.8, reviews: 1923, image: getProductImage('lipsticks', 1), description: 'Hydrating satin lipstick with a creamy texture and high-shine finish.', shades: ['Pink Champagne', 'Mauve Magic', 'Berry Bliss'] },
  { id: 3, name: 'Luxe Liquid Lip Stain', category: 'Lipsticks', categorySlug: 'lipsticks', price: 35, rating: 4.7, reviews: 1456, image: getProductImage('lipsticks', 2), description: 'Long-wearing liquid lip stain with a weightless feel and intense color payoff.', shades: ['Crimson', 'Plum', 'Nude', 'Coral'], new: true },
  { id: 4, name: 'Crystal Clear Lip Gloss', category: 'Lipsticks', categorySlug: 'lipsticks', price: 24, rating: 4.6, reviews: 987, image: getProductImage('lipsticks', 0), description: 'High-shine lip gloss with a non-sticky formula and subtle shimmer.' },
  { id: 5, name: 'Signature Red Collection', category: 'Lipsticks', categorySlug: 'lipsticks', price: 42, originalPrice: 52, rating: 5.0, reviews: 3201, image: getProductImage('lipsticks', 1), description: 'Our iconic red lipstick collection featuring 5 universally flattering red shades.', bestseller: true },
  { id: 6, name: 'Moisture Rich Lipstick', category: 'Lipsticks', categorySlug: 'lipsticks', price: 26, rating: 4.7, reviews: 1654, image: getProductImage('lipsticks', 2), description: 'Hydrating lipstick infused with hyaluronic acid and argan oil.' },
  { id: 7, name: 'Matte Lip Crayon', category: 'Lipsticks', categorySlug: 'lipsticks', price: 22, rating: 4.5, reviews: 876, image: getProductImage('lipsticks', 0), description: 'Convenient twist-up lip crayon with a smooth matte finish.', shades: ['Nude', 'Pink', 'Berry', 'Red'] },
  { id: 8, name: 'Sheer Tinted Balm', category: 'Lipsticks', categorySlug: 'lipsticks', price: 18, rating: 4.4, reviews: 543, image: getProductImage('lipsticks', 1), description: 'Lightweight tinted lip balm with SPF 15 protection.' },
  { id: 9, name: 'Metallic Lip Cream', category: 'Lipsticks', categorySlug: 'lipsticks', price: 28, rating: 4.6, reviews: 789, image: getProductImage('lipsticks', 2), description: 'Bold metallic lip cream with a foiled finish.', shades: ['Rose Gold', 'Bronze', 'Copper'] },
  { id: 10, name: 'Lip Duo Set', category: 'Lipsticks', categorySlug: 'lipsticks', price: 48, rating: 4.8, reviews: 1234, image: getProductImage('lipsticks', 0), description: 'Perfect lip duo featuring a matte lipstick and matching gloss.' },
  { id: 11, name: 'Long Wear Lip Liner', category: 'Lipsticks', categorySlug: 'lipsticks', price: 20, rating: 4.7, reviews: 1456, image: getProductImage('lipsticks', 1), description: 'Precision lip liner that stays put for 8 hours.', shades: ['Nude', 'Pink', 'Red', 'Berry'] },
  { id: 12, name: 'Glow Lip Oil', category: 'Lipsticks', categorySlug: 'lipsticks', price: 25, rating: 4.8, reviews: 2345, image: getProductImage('lipsticks', 2), description: 'Nourishing lip oil with a non-sticky, high-shine finish.', new: true },
  { id: 13, name: 'Smudge-Proof Transfer Lip', category: 'Lipsticks', categorySlug: 'lipsticks', price: 34, rating: 4.9, reviews: 1876, image: getProductImage('lipsticks', 0), description: 'Transfer-proof lipstick that lasts through eating and drinking.' },
  { id: 14, name: 'Vitamin C Lip Brightener', category: 'Lipsticks', categorySlug: 'lipsticks', price: 22, rating: 4.5, reviews: 654, image: getProductImage('lipsticks', 1), description: 'Brightening lip treatment with vitamin C and niacinamide.' },
  { id: 15, name: 'Limited Edition Lip Set', category: 'Lipsticks', categorySlug: 'lipsticks', price: 65, rating: 4.9, reviews: 892, image: getProductImage('lipsticks', 2), description: 'Exclusive limited edition featuring 3 bestselling shades.' },
];

// Foundations - 15 products
const foundations: Product[] = [
  { id: 16, name: 'Silk Skin Foundation', category: 'Foundations', categorySlug: 'foundations', price: 48, rating: 4.9, reviews: 3456, image: getProductImage('foundations', 0), description: 'Weightless, medium-coverage foundation with a natural skin finish.', shades: ['Porcelain', 'Ivory', 'Sand', 'Beige', 'Honey', 'Chestnut'], bestseller: true },
  { id: 17, name: 'Luminous Glow Foundation', category: 'Foundations', categorySlug: 'foundations', price: 52, rating: 4.8, reviews: 2187, image: getProductImage('foundations', 1), description: 'Radiant finish foundation with light-reflecting particles.' },
  { id: 18, name: 'Matte Perfection Foundation', category: 'Foundations', categorySlug: 'foundations', price: 45, rating: 4.7, reviews: 1987, image: getProductImage('foundations', 2), description: 'Full coverage matte foundation that controls shine all day.' },
  { id: 19, name: 'Hydra Boost Foundation', category: 'Foundations', categorySlug: 'foundations', price: 55, originalPrice: 65, rating: 4.8, reviews: 1654, image: getProductImage('foundations', 0), description: 'Hydrating foundation with hyaluronic acid for dry skin.', new: true },
  { id: 20, name: 'Mineral Powder Foundation', category: 'Foundations', categorySlug: 'foundations', price: 38, rating: 4.6, reviews: 1234, image: getProductImage('foundations', 1), description: 'Clean mineral powder foundation with buildable coverage.' },
  { id: 21, name: 'HD Studio Foundation', category: 'Foundations', categorySlug: 'foundations', price: 58, rating: 4.9, reviews: 2876, image: getProductImage('foundations', 2), description: 'Professional HD foundation for flawless photos and videos.', bestseller: true },
  { id: 22, name: 'Tinted Moisturizer SPF 30', category: 'Foundations', categorySlug: 'foundations', price: 42, rating: 4.7, reviews: 1876, image: getProductImage('foundations', 0), description: 'Lightweight tinted moisturizer with broad spectrum SPF 30.' },
  { id: 23, name: 'Cream Compact Foundation', category: 'Foundations', categorySlug: 'foundations', price: 48, rating: 4.5, reviews: 987, image: getProductImage('foundations', 1), description: 'Portable cream foundation compact with mirror.' },
  { id: 24, name: 'Serum Foundation', category: 'Foundations', categorySlug: 'foundations', price: 62, rating: 4.8, reviews: 2109, image: getProductImage('foundations', 2), description: 'Skincare-infused foundation with peptides and antioxidants.' },
  { id: 25, name: 'Stick Foundation', category: 'Foundations', categorySlug: 'foundations', price: 44, rating: 4.6, reviews: 1432, image: getProductImage('foundations', 0), description: 'Convenient stick foundation for on-the-go touch-ups.' },
  { id: 26, name: 'Water Foundation', category: 'Foundations', categorySlug: 'foundations', price: 50, rating: 4.7, reviews: 1654, image: getProductImage('foundations', 1), description: 'Ultra-lightweight water-based foundation for a barely-there feel.' },
  { id: 27, name: 'Color Correcting Foundation', category: 'Foundations', categorySlug: 'foundations', price: 54, rating: 4.5, reviews: 876, image: getProductImage('foundations', 2), description: 'Foundation with built-in color correction for even skin tone.' },
  { id: 28, name: 'Airbrush Foundation', category: 'Foundations', categorySlug: 'foundations', price: 65, rating: 4.9, reviews: 2345, image: getProductImage('foundations', 0), description: 'Professional airbrush foundation for flawless finish.' },
  { id: 29, name: 'BB Cream', category: 'Foundations', categorySlug: 'foundations', price: 36, rating: 4.6, reviews: 1765, image: getProductImage('foundations', 1), description: 'Multi-tasking BB cream with skincare benefits and SPF.' },
  { id: 30, name: 'CC Cream', category: 'Foundations', categorySlug: 'foundations', price: 40, rating: 4.7, reviews: 1543, image: getProductImage('foundations', 2), description: 'Color-correcting cream that brightens and evens skin tone.' },
];

// Skincare - 15 products
const skincare: Product[] = [
  { id: 31, name: 'Radiance Facial Oil', category: 'Skincare', categorySlug: 'skincare', price: 68, rating: 4.9, reviews: 2876, image: getProductImage('skincare', 0), description: 'Luxurious facial oil blend for glowing, radiant skin.', ingredients: 'Rosehip Oil, Vitamin E, Squalane', bestseller: true },
  { id: 32, name: 'Hydra Boost Cream', category: 'Skincare', categorySlug: 'skincare', price: 75, originalPrice: 85, rating: 4.8, reviews: 2345, image: getProductImage('skincare', 1), description: 'Intensive moisturizing cream with hyaluronic acid.' },
  { id: 33, name: 'Gentle Cleansing Milk', category: 'Skincare', categorySlug: 'skincare', price: 42, rating: 4.7, reviews: 1876, image: getProductImage('skincare', 2), description: 'Creamy cleanser that removes makeup and impurities gently.' },
  { id: 34, name: 'Exfoliating Glow Toner', category: 'Skincare', categorySlug: 'skincare', price: 48, rating: 4.6, reviews: 1543, image: getProductImage('skincare', 0), description: 'AHAs and BHAs toner for smooth, glowing skin.' },
  { id: 35, name: 'Vitamin C Brightening Serum', category: 'Skincare', categorySlug: 'skincare', price: 82, rating: 4.9, reviews: 3210, image: getProductImage('skincare', 1), description: 'Powerful brightening serum with 20% Vitamin C.', bestseller: true },
  { id: 36, name: 'Overnight Repair Mask', category: 'Skincare', categorySlug: 'skincare', price: 58, rating: 4.8, reviews: 1987, image: getProductImage('skincare', 2), description: 'Intensive overnight mask for repaired, renewed skin.', new: true },
  { id: 37, name: 'Eye Contour Cream', category: 'Skincare', categorySlug: 'skincare', price: 65, rating: 4.7, reviews: 1654, image: getProductImage('skincare', 0), description: 'Targeted eye cream for dark circles and fine lines.' },
  { id: 38, name: 'SPF 50 Sunscreen', category: 'Skincare', categorySlug: 'skincare', price: 38, rating: 4.5, reviews: 1234, image: getProductImage('skincare', 1), description: 'Lightweight, invisible sunscreen with broad spectrum protection.' },
  { id: 39, name: 'Clay Pore Mask', category: 'Skincare', categorySlug: 'skincare', price: 45, rating: 4.6, reviews: 1432, image: getProductImage('skincare', 2), description: 'Deep cleansing clay mask for refined pores.' },
  { id: 40, name: 'Retinol Night Cream', category: 'Skincare', categorySlug: 'skincare', price: 78, rating: 4.8, reviews: 2109, image: getProductImage('skincare', 0), description: 'Anti-aging night cream with encapsulated retinol.' },
  { id: 41, name: 'Hydrating Mist', category: 'Skincare', categorySlug: 'skincare', price: 32, rating: 4.4, reviews: 987, image: getProductImage('skincare', 1), description: 'Refreshing facial mist with rose water and aloe.' },
  { id: 42, name: 'Neck & Décolletage Cream', category: 'Skincare', categorySlug: 'skincare', price: 72, rating: 4.6, reviews: 654, image: getProductImage('skincare', 2), description: 'Specialized cream for neck and décolletage area.' },
  { id: 43, name: 'Microdermabrasion Scrub', category: 'Skincare', categorySlug: 'skincare', price: 52, rating: 4.5, reviews: 876, image: getProductImage('skincare', 0), description: 'Professional-grade exfoliating scrub for smooth skin.' },
  { id: 44, name: 'Collagen Boosting Cream', category: 'Skincare', categorySlug: 'skincare', price: 88, rating: 4.7, reviews: 1543, image: getProductImage('skincare', 1), description: 'Firming cream with marine collagen peptides.' },
  { id: 45, name: 'Soothing Cica Cream', category: 'Skincare', categorySlug: 'skincare', price: 56, rating: 4.8, reviews: 1876, image: getProductImage('skincare', 2), description: 'Calming cream with centella asiatica for sensitive skin.' },
];

// Eyeshadow - 15 products
const eyeshadow: Product[] = [
  { id: 46, name: 'Signature Eyeshadow Palette', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 58, rating: 4.9, reviews: 3456, image: getProductImage('eyeshadow', 0), description: '16 versatile shades from matte to shimmer for endless looks.', shades: ['Rose Gold Collection', 'Sunset Glow', 'Midnight Star'], bestseller: true },
  { id: 47, name: 'Velvet Matte Eyeshadow', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 18, rating: 4.7, reviews: 1987, image: getProductImage('eyeshadow', 1), description: 'Single matte eyeshadow with buttery smooth texture.', shades: ['Nude', 'Taupe', 'Mauve', 'Brown', 'Black'] },
  { id: 48, name: 'Shimmer Eye Dust', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 24, rating: 4.8, reviews: 1654, image: getProductImage('eyeshadow', 2), description: 'High-impact loose pigment for intense shimmer.', shades: ['Gold', 'Rose', 'Champagne', 'Bronze'] },
  { id: 49, name: 'Nudes Palette', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 48, originalPrice: 58, rating: 4.9, reviews: 2876, image: getProductImage('eyeshadow', 0), description: '12 perfect nude shades for everyday elegance.' },
  { id: 50, name: 'Smoky Eye Kit', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 52, rating: 4.6, reviews: 1234, image: getProductImage('eyeshadow', 1), description: 'Complete smoky eye kit with primer and 6 shades.' },
  { id: 51, name: 'Cream Eyeshadow Stick', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 22, rating: 4.7, reviews: 1543, image: getProductImage('eyeshadow', 2), description: 'Long-wearing cream eyeshadow in a convenient stick.', shades: ['Champagne', 'Bronze', 'Plum', 'Navy'], new: true },
  { id: 52, name: 'Sunset Palette', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 55, rating: 4.8, reviews: 2109, image: getProductImage('eyeshadow', 0), description: 'Warm-toned palette with sunset-inspired hues.', bestseller: true },
  { id: 53, name: 'Metallic Eyeshadow', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 20, rating: 4.5, reviews: 876, image: getProductImage('eyeshadow', 1), description: 'High-shine metallic eyeshadow with foiled finish.' },
  { id: 54, name: 'Eye Primer', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 28, rating: 4.8, reviews: 2345, image: getProductImage('eyeshadow', 2), description: 'Long-lasting eyeshadow primer for vibrant color.' },
  { id: 55, name: 'Duochrome Eyeshadow', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 22, rating: 4.6, reviews: 654, image: getProductImage('eyeshadow', 0), description: 'Color-shifting eyeshadow with dual-tone finish.', shades: ['Purple/Gold', 'Blue/Green', 'Pink/Teal'] },
  { id: 56, name: 'Matte Brights Palette', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 52, rating: 4.7, reviews: 1432, image: getProductImage('eyeshadow', 1), description: 'Bold matte palette with 12 vibrant shades.' },
  { id: 57, name: 'Glitter Eyeshadow', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 24, rating: 4.4, reviews: 987, image: getProductImage('eyeshadow', 2), description: 'Sparkling glitter eyeshadow for party looks.', shades: ['Silver', 'Gold', 'Pink', 'Purple'] },
  { id: 58, name: 'Pressed Pigment', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 26, rating: 4.8, reviews: 1765, image: getProductImage('eyeshadow', 0), description: 'High-pigment pressed eyeshadow for bold color.' },
  { id: 59, name: 'Waterproof Eyeshadow', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 28, rating: 4.7, reviews: 1234, image: getProductImage('eyeshadow', 1), description: 'Water-resistant cream eyeshadow that stays put.' },
  { id: 60, name: 'Earth Tones Palette', category: 'Eyeshadow', categorySlug: 'eyeshadow', price: 58, rating: 4.9, reviews: 2543, image: getProductImage('eyeshadow', 2), description: '18 earthy neutrals for natural, effortless looks.' },
];

// Perfumes - 15 products
const perfumes: Product[] = [
  { id: 61, name: 'Rose Essence EDP', category: 'Perfumes', categorySlug: 'perfumes', price: 125, rating: 4.9, reviews: 2876, image: getProductImage('perfumes', 0), description: 'Luxurious rose fragrance with Bulgarian rose and oud.', ingredients: 'Bulgarian Rose, Oud, Amber, Musk', bestseller: true },
  { id: 62, name: 'Velvet Night', category: 'Perfumes', categorySlug: 'perfumes', price: 145, rating: 4.8, reviews: 1987, image: getProductImage('perfumes', 1), description: 'Deep, sensual fragrance with dark florals and warm woods.' },
  { id: 63, name: 'Fresh Morning', category: 'Perfumes', categorySlug: 'perfumes', price: 98, rating: 4.7, reviews: 1654, image: getProductImage('perfumes', 2), description: 'Light, refreshing scent with citrus and white flowers.', new: true },
  { id: 64, name: 'Gardenia Dream', category: 'Perfumes', categorySlug: 'perfumes', price: 135, originalPrice: 155, rating: 4.8, reviews: 1432, image: getProductImage('perfumes', 0), description: 'Elegant gardenia fragrance with jasmine and sandalwood.' },
  { id: 65, name: 'Amber Sunset', category: 'Perfumes', categorySlug: 'perfumes', price: 155, rating: 4.9, reviews: 2109, image: getProductImage('perfumes', 1), description: 'Warm amber fragrance with vanilla and exotic spices.', bestseller: true },
  { id: 66, name: 'Jasmine Noir', category: 'Perfumes', categorySlug: 'perfumes', price: 138, rating: 4.6, reviews: 1234, image: getProductImage('perfumes', 2), description: 'Sophisticated jasmine with dark berry notes.' },
  { id: 67, name: 'Citrus Bloom', category: 'Perfumes', categorySlug: 'perfumes', price: 88, rating: 4.5, reviews: 987, image: getProductImage('perfumes', 0), description: 'Bright citrus fragrance with bergamot and neroli.' },
  { id: 68, name: 'Mystic Oud', category: 'Perfumes', categorySlug: 'perfumes', price: 185, rating: 4.9, reviews: 2543, image: getProductImage('perfumes', 1), description: 'Rich oud fragrance with saffron and rose.' },
  { id: 69, name: 'Pink Peony', category: 'Perfumes', categorySlug: 'perfumes', price: 95, rating: 4.7, reviews: 1765, image: getProductImage('perfumes', 2), description: 'Delicate peony fragrance with fresh green notes.' },
  { id: 70, name: 'Vanilla Silk', category: 'Perfumes', categorySlug: 'perfumes', price: 115, rating: 4.8, reviews: 1876, image: getProductImage('perfumes', 0), description: 'Warm vanilla fragrance with coconut and almond.' },
  { id: 71, name: 'Ocean Breeze', category: 'Perfumes', categorySlug: 'perfumes', price: 92, rating: 4.4, reviews: 876, image: getProductImage('perfumes', 1), description: 'Fresh aquatic fragrance with sea salt and white musk.' },
  { id: 72, name: 'Fleur de Lis', category: 'Perfumes', categorySlug: 'perfumes', price: 142, rating: 4.7, reviews: 1543, image: getProductImage('perfumes', 2), description: 'Elegant floral bouquet with iris and violet.' },
  { id: 73, name: 'Sandalwood Dreams', category: 'Perfumes', categorySlug: 'perfumes', price: 128, rating: 4.6, reviews: 1234, image: getProductImage('perfumes', 0), description: 'Creamy sandalwood with warm spices.' },
  { id: 74, name: 'Fruit Fantasy', category: 'Perfumes', categorySlug: 'perfumes', price: 85, rating: 4.5, reviews: 654, image: getProductImage('perfumes', 1), description: 'Playful fruity fragrance with berries and peach.' },
  { id: 75, name: 'Midnight Jasmine', category: 'Perfumes', categorySlug: 'perfumes', price: 148, rating: 4.8, reviews: 1987, image: getProductImage('perfumes', 2), description: 'Intoxicating jasmine with night-blooming flowers.' },
];

// Makeup Tools - 10 products
const makeupTools: Product[] = [
  { id: 76, name: 'Pro Brush Set', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 88, rating: 4.9, reviews: 2345, image: getProductImage('makeup-tools', 0), description: 'Professional 12-piece brush set with synthetic bristles.', bestseller: true },
  { id: 77, name: 'Beauty Blender Set', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 35, rating: 4.8, reviews: 1987, image: getProductImage('makeup-tools', 1), description: '3-piece beauty sponge set for flawless application.' },
  { id: 78, name: 'Fan Brush', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 22, rating: 4.6, reviews: 876, image: getProductImage('makeup-tools', 2), description: 'Delicate fan brush for highlighter and removing fallout.' },
  { id: 79, name: 'Kabuki Brush', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 28, rating: 4.7, reviews: 1234, image: getProductImage('makeup-tools', 0), description: 'Dense kabuki brush for powder and bronzer.' },
  { id: 80, name: 'Eye Brush Set', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 55, rating: 4.8, reviews: 1543, image: getProductImage('makeup-tools', 1), description: '6-piece eye brush set for every eye look.' },
  { id: 81, name: 'Makeup Brush Cleaner', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 32, rating: 4.5, reviews: 654, image: getProductImage('makeup-tools', 2), description: 'Electric brush cleaner and dryer for deep cleaning.' },
  { id: 82, name: 'Lash Curler', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 24, rating: 4.7, reviews: 1876, image: getProductImage('makeup-tools', 0), description: 'Ergonomic lash curler for the perfect curl.' },
  { id: 83, name: 'Tweezer Set', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 28, rating: 4.6, reviews: 987, image: getProductImage('makeup-tools', 1), description: 'Professional tweezer set in 3 shapes.' },
  { id: 84, name: 'Makeup Sponge Duo', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 18, rating: 4.4, reviews: 543, image: getProductImage('makeup-tools', 2), description: 'Dual-ended makeup sponge for precise application.' },
  { id: 85, name: 'Travel Brush Set', category: 'Makeup Tools', categorySlug: 'makeup-tools', price: 45, rating: 4.8, reviews: 1432, image: getProductImage('makeup-tools', 0), description: 'Compact travel brush set with carrying case.', new: true },
];

// Serums - 10 products
const serums: Product[] = [
  { id: 86, name: 'Hyaluronic Acid Serum', category: 'Serums', categorySlug: 'serums', price: 68, rating: 4.9, reviews: 2876, image: getProductImage('serums', 0), description: 'Intensely hydrating serum with 2% hyaluronic acid.', ingredients: 'Hyaluronic Acid, Vitamin B5', bestseller: true },
  { id: 87, name: 'Retinol Serum', category: 'Serums', categorySlug: 'serums', price: 78, rating: 4.8, reviews: 2109, image: getProductImage('serums', 1), description: 'Anti-aging serum with encapsulated retinol.' },
  { id: 88, name: 'Niacinamide 10%', category: 'Serums', categorySlug: 'serums', price: 45, rating: 4.7, reviews: 1876, image: getProductImage('serums', 2), description: 'Pore-refining serum with 10% niacinamide.' },
  { id: 89, name: 'Peptide Firming Serum', category: 'Serums', categorySlug: 'serums', price: 92, rating: 4.8, reviews: 1543, image: getProductImage('serums', 0), description: 'Firming serum with 6 peptides for youthful skin.', new: true },
  { id: 90, name: 'Azelaic Acid Serum', category: 'Serums', categorySlug: 'serums', price: 52, rating: 4.6, reviews: 1234, image: getProductImage('serums', 1), description: 'Brightening serum for even skin tone.' },
  { id: 91, name: 'Squalane Oil Serum', category: 'Serums', categorySlug: 'serums', price: 38, rating: 4.7, reviews: 1654, image: getProductImage('serums', 2), description: 'Lightweight oil serum for all skin types.' },
  { id: 92, name: 'Ferulic Acid Serum', category: 'Serums', categorySlug: 'serums', price: 85, rating: 4.9, reviews: 1987, image: getProductImage('serums', 0), description: 'Antioxidant serum for environmental protection.', bestseller: true },
  { id: 93, name: 'Tranexamic Acid Serum', category: 'Serums', categorySlug: 'serums', price: 62, rating: 4.5, reviews: 876, image: getProductImage('serums', 1), description: 'Dark spot corrector with tranexamic acid.' },
  { id: 94, name: 'Growth Factor Serum', category: 'Serums', categorySlug: 'serums', price: 125, rating: 4.8, reviews: 1432, image: getProductImage('serums', 2), description: 'Advanced serum with plant growth factors.' },
  { id: 95, name: 'Bakuchiol Serum', category: 'Serums', categorySlug: 'serums', price: 58, rating: 4.6, reviews: 987, image: getProductImage('serums', 0), description: 'Natural retinol alternative for sensitive skin.' },
];

// Lip Care - 8 products
const lipCare: Product[] = [
  { id: 96, name: 'Lip Mask Overnight', category: 'Lip Care', categorySlug: 'lip-care', price: 28, rating: 4.8, reviews: 1876, image: getProductImage('lip-care', 0), description: 'Intensive overnight lip mask for soft, plump lips.', ingredients: 'Hyaluronic Acid, Vitamin E, Shea Butter', bestseller: true },
  { id: 97, name: 'Lip Scrub', category: 'Lip Care', categorySlug: 'lip-care', price: 22, rating: 4.7, reviews: 1432, image: getProductImage('lip-care', 1), description: 'Gentle sugar scrub for smooth, exfoliated lips.', shades: ['Vanilla', 'Strawberry', 'Mint'] },
  { id: 98, name: 'Lip Treatment Oil', category: 'Lip Care', categorySlug: 'lip-care', price: 35, rating: 4.9, reviews: 2109, image: getProductImage('lip-care', 2), description: 'Nourishing lip oil with jojoba and rosehip.' },
  { id: 99, name: 'Lip Balm SPF 30', category: 'Lip Care', categorySlug: 'lip-care', price: 16, rating: 4.6, reviews: 987, image: getProductImage('lip-care', 0), description: 'Protective lip balm with broad spectrum SPF 30.' },
  { id: 100, name: 'Lip Plumper', category: 'Lip Care', categorySlug: 'lip-care', price: 32, rating: 4.5, reviews: 876, image: getProductImage('lip-care', 1), description: 'Lip plumping treatment for fuller-looking lips.', new: true },
  { id: 101, name: 'Lip Sleeping Pack', category: 'Lip Care', categorySlug: 'lip-care', price: 25, rating: 4.7, reviews: 1234, image: getProductImage('lip-care', 2), description: 'Korean-style lip sleeping mask for intensive care.' },
  { id: 102, name: 'Lip Repair Cream', category: 'Lip Care', categorySlug: 'lip-care', price: 24, rating: 4.4, reviews: 654, image: getProductImage('lip-care', 0), description: 'Medicated lip cream for severely dry lips.' },
  { id: 103, name: 'Lip Vitamin Treatment', category: 'Lip Care', categorySlug: 'lip-care', price: 28, rating: 4.6, reviews: 543, image: getProductImage('lip-care', 1), description: 'Multi-vitamin lip treatment for healthy lips.' },
];

// Blush - 10 products
const blush: Product[] = [
  { id: 104, name: 'Blush Palette', category: 'Blush', categorySlug: 'blush', price: 45, rating: 4.9, reviews: 2345, image: getProductImage('blush', 0), description: '6-shade blush palette with matte and shimmer finishes.', shades: ['Rose', 'Peach', 'Coral', 'Berry', 'Plum', 'Bronze'], bestseller: true },
  { id: 105, name: 'Cream Blush Stick', category: 'Blush', categorySlug: 'blush', price: 28, rating: 4.8, reviews: 1876, image: getProductImage('blush', 1), description: 'Dewy cream blush in a convenient stick format.', shades: ['Pink Rose', 'Peachy Keen', 'Berry Kiss'], new: true },
  { id: 106, name: 'Powder Blush', category: 'Blush', categorySlug: 'blush', price: 32, rating: 4.7, reviews: 1654, image: getProductImage('blush', 2), description: 'Silky powder blush with buildable coverage.', shades: ['Rose Petal', 'Soft Peach', 'Warm Berry', 'Mauve'] },
  { id: 107, name: 'Liquid Blush', category: 'Blush', categorySlug: 'blush', price: 30, rating: 4.8, reviews: 1987, image: getProductImage('blush', 0), description: 'High-pigment liquid blush for a natural flush.' },
  { id: 108, name: 'Gel Blush', category: 'Blush', categorySlug: 'blush', price: 26, rating: 4.5, reviews: 876, image: getProductImage('blush', 1), description: 'Water-based gel blush for a dewy finish.' },
  { id: 109, name: 'Shimmer Blush', category: 'Blush', categorySlug: 'blush', price: 35, rating: 4.6, reviews: 1234, image: getProductImage('blush', 2), description: 'Illuminating blush with subtle shimmer particles.' },
  { id: 110, name: 'Tinted Cheek Stain', category: 'Blush', categorySlug: 'blush', price: 28, rating: 4.7, reviews: 1432, image: getProductImage('blush', 0), description: 'Long-wearing cheek stain that lasts all day.' },
  { id: 111, name: 'Bronzing Blush Duo', category: 'Blush', categorySlug: 'blush', price: 42, rating: 4.5, reviews: 654, image: getProductImage('blush', 1), description: 'Two-in-one blush and bronzer for a sun-kissed look.' },
  { id: 112, name: 'Baked Blush', category: 'Blush', categorySlug: 'blush', price: 38, rating: 4.6, reviews: 987, image: getProductImage('blush', 2), description: 'Marbleized baked blush for natural dimension.' },
  { id: 113, name: 'Highlighter Blush Trio', category: 'Blush', categorySlug: 'blush', price: 52, rating: 4.8, reviews: 1543, image: getProductImage('blush', 0), description: 'Three complementary shades for customizing your glow.', bestseller: true },
];

// Combine all products
export const products: Product[] = [
  ...lipsticks,
  ...foundations,
  ...skincare,
  ...eyeshadow,
  ...perfumes,
  ...makeupTools,
  ...serums,
  ...lipCare,
  ...blush,
];

// Get products by category
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

// Get bestsellers
export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

// Get new products
export function getNewProducts(): Product[] {
  return products.filter((p) => p.new);
}

// Get trending products (high rating + many reviews)
export function getTrendingProducts(): Product[] {
  return products
    .filter((p) => p.rating >= 4.7 && p.reviews >= 1500)
    .slice(0, 12);
}

// Get product by ID
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export default products;
