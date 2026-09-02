import React, { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";

/**
 * RichText editor component with toolbar buttons:
 * bold, italic, underline, strikethrough, headings 1 to 6, ul/ol lists, tables, links, images, align, hr, code, undo/redo
 */
export default function RichTextEditor({ value, onChange, placeholder = "Write content here...", error, hint, label, required }) {
    const editor = useRef(null);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder,
        height: 450,
        minHeight: 350,
        enableDragAndDropFileToEditor: true,
        toolbarAdaptive: false,
        buttons: [
            "paragraph",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "ul",
            "ol",
            "|",
            "font",
            "fontsize",
            "brush",
            "|",
            "align",
            "|",
            "link",
            "table",
            "image",
            "hr",
            "|",
            "source",
            "fullsize",
            "|",
            "undo",
            "redo"
        ],
        controls: {
            paragraph: {
                list: {
                    p: "Paragraph",
                    h1: "Heading 1",
                    h2: "Heading 2",
                    h3: "Heading 3",
                    h4: "Heading 4",
                    h5: "Heading 5",
                    h6: "Heading 6",
                    blockquote: "Quote",
                    pre: "Code Block"
                }
            }
        },
        removeButtons: ["about"],
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: "insert_as_html",
        theme: "default"
    }), [placeholder]);

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
                <JoditEditor
                    ref={editor}
                    value={value || ""}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => onChange?.(newContent)}
                />
            </div>
            {(error || hint) && (
                <p className={`text-xs ${error ? "text-red-500 font-medium" : "text-gray-500"}`}>
                    {error || hint}
                </p>
            )}
        </div>
    );
}
