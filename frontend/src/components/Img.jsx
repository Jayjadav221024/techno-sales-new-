export default function Img({ 
  src, 
  alt = "", 
  className = "", 
  style = {}, 
  loading = "lazy", 
  fetchpriority = "auto",
  width,
  height
}) {
  // If the path starts with a slash, we expect it to be in the public directory
  // e.g. /images/hero/abb-motors.jpg
  const isRaster = src && (src.endsWith('.jpg') || src.endsWith('.png') || src.endsWith('.jpeg'));
  
  if (!isRaster) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        style={style} 
        loading={loading} 
        fetchpriority={fetchpriority}
        width={width}
        height={height}
      />
    );
  }

  // Generate WebP counterpart path
  const webpSrc = src.substring(0, src.lastIndexOf('.')) + '.webp';

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        style={style} 
        loading={loading} 
        fetchpriority={fetchpriority}
        width={width}
        height={height}
        decoding="async"
      />
    </picture>
  );
}
