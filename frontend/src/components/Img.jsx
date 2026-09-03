export default function Img({ 
  src, 
  alt = "", 
  className = "", 
  style = {}, 
  loading = "lazy", 
  fetchPriority = "auto",
  width,
  height
}) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      loading={loading} 
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      decoding="async"
      onError={(e) => {
        // Prevent broken image icon if an extension or format mismatch occurs
        if (!e.target.dataset.triedFallback) {
          e.target.dataset.triedFallback = 'true';
          if (src && src.endsWith('.jpg')) {
            e.target.src = src.replace('.jpg', '.png');
          }
        }
      }}
    />
  );
}
