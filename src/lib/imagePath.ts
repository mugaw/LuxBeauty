const BASE_PATH = '/LuxBeauty';

export function imagePath(src: string): string {
  if (src.startsWith('http')) return src;
  return `${BASE_PATH}${src}`;
}
