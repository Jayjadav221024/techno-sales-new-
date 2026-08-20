import React from "react";
import * as Icons from "@untitledui/icons/dist/index.js";

// Proxy handler to catch any icon that might be missing and provide a clean fallback SVG
const FallbackIcon = (props) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const SafeIcons = new Proxy(Icons, {
    get(target, prop) {
        if (prop in target && target[prop]) {
            return target[prop];
        }
        return FallbackIcon;
    }
});

export * from "@untitledui/icons/dist/index.js";
export default SafeIcons;
