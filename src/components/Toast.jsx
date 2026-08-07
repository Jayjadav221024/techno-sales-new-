export default function Toast({ message, visible }) {
  return (
    <div id="toast-notification" className={`toast-notification ${visible ? 'show' : ''}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span id="toast-text">{message}</span>
    </div>
  );
}
