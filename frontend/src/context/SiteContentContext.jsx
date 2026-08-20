import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getSectionDefaults } from '../data/sections';

const SiteContentContext = createContext({ content: {}, editMode: false, selectedKey: null });

/**
 * True when the site is running inside the admin's Website editor.
 *
 * The flag is read from the URL rather than passed in, because the editor loads
 * the site in an iframe and cannot reach into its React tree.
 */
const readMode = () => {
  if (typeof window === 'undefined') return { preview: false, edit: false };
  const params = new URLSearchParams(window.location.search);
  const inFrame = window.self !== window.top;
  return {
    // Draft content requires an admin session; the request simply fails and
    // falls back to published content for anyone else.
    preview: params.get('preview') === '1',
    // The click-to-edit overlay only ever appears inside the editor's frame.
    edit: params.get('edit') === '1' && inFrame,
  };
};

export function SiteContentProvider({ children }) {
  const [{ preview, edit }] = useState(readMode);
  const [content, setContent] = useState({});
  const [selectedKey, setSelectedKey] = useState(null);

  const load = useCallback(async () => {
    const url = preview ? '/api/v1/site-content/draft' : '/api/v1/public/site-content';
    try {
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json?.data) setContent(json.data);
    } catch (err) {
      // Never fatal: with no overrides the site renders the wording built into
      // the code, which is exactly what it did before this feature existed.
      console.warn('Site content unavailable, using built-in copy:', err.message);
    }
  }, [preview]);

  useEffect(() => {
    load();
  }, [load]);

  // Messages from the editor: it asks for a re-fetch after a draft is saved,
  // and tells the page which section is currently open in the form.
  useEffect(() => {
    if (!edit) return;
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      const { type, key } = event.data || {};
      if (type === 'techno:refresh-content') load();
      if (type === 'techno:select-section') setSelectedKey(key ?? null);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [edit, load]);

  // Tell the editor which sections this page actually rendered, so it can list
  // them even before anyone clicks one.
  useEffect(() => {
    if (!edit) return;
    const announce = () => {
      const keys = Array.from(document.querySelectorAll('[data-section-key]')).map((el) =>
        el.getAttribute('data-section-key'),
      );
      window.parent.postMessage({ type: 'techno:sections', keys }, window.location.origin);
    };
    // After paint, so lazily rendered sections are counted.
    const id = setTimeout(announce, 300);
    return () => clearTimeout(id);
  }, [edit, content]);

  const value = useMemo(
    () => ({ content, editMode: edit, previewMode: preview, selectedKey, reload: load }),
    [content, edit, preview, selectedKey, load],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

/**
 * Values for one section: whatever has been saved, over the wording built into
 * the code. Merged per field, so a section gains new fields in a later release
 * without its saved row blanking them.
 */
export function useSection(key) {
  const { content } = useContext(SiteContentContext);
  return useMemo(() => ({ ...getSectionDefaults(key), ...(content[key] ?? {}) }), [content, key]);
}

/**
 * Company contact details, editable under Website → Site-wide.
 *
 * A shorthand for useSection('global.company') because it is read in seven
 * files; importing COMPANY from data/site directly still works but is frozen at
 * whatever shipped, so anything user-facing should use this.
 */
export function useCompany() {
    return useSection('global.company');
}

/**
 * Spread onto a section's outermost element to make it selectable in the
 * editor. Renders nothing extra on the live site.
 *
 *   <section {...sectionProps('home.hero')}>
 */
export function useSectionProps(key) {
  const { editMode, selectedKey } = useContext(SiteContentContext);
  if (!editMode) return { 'data-section-key': key };
  return {
    'data-section-key': key,
    'data-section-editable': 'true',
    'data-section-selected': selectedKey === key ? 'true' : undefined,
    onClick: (event) => {
      // Stop the click from following a link or hitting a button underneath.
      event.preventDefault();
      event.stopPropagation();
      window.parent.postMessage({ type: 'techno:section-clicked', key }, window.location.origin);
    },
  };
}

export const useSiteContent = () => useContext(SiteContentContext);
