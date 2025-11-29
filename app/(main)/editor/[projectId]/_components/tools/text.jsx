"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useCanvas } from "@/context/Context";
import { IText } from "fabric";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, Trash2, Type, Underline } from "lucide-react";
import { useEffect, useState } from "react";

const FONT_FAMILIES = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Courier New",
    "Lucida Sans",
    "Lucida Console",
    "Gill Sans",
    "Futura",
    "Garamond",
    "Baskerville",
    "Didot",
    "Franklin Gothic",
    "Rockwell",
    "Calibre",
    "Inter",
    "Poppins",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Nunito",
    "Source Sans Pro",
    "Source Serif Pro",
    "Source Code Pro",
    "Noto Sans",
    "Noto Serif",
    "Noto Mono",
    "Raleway",
    "Oswald",
    "Merriweather",
    "Playfair Display",
    "PT Sans",
    "PT Serif",
    "Work Sans",
    "Rubik",
    "Ubuntu",
    "Inconsolata",
    "JetBrains Mono",
    "Fira Sans",
    "Fira Code",
    "Manrope",
    "Cabin",
    "Quicksand",
    "Mukta",
    "Exo",
    "Exo 2",
    "Karla",
    "IBM Plex Sans",
    "IBM Plex Serif",
    "IBM Plex Mono",
    "Josefin Sans",
    "DM Sans",
    "DM Serif Display",
    "DM Mono",
    "Space Grotesk",
    "Space Mono",
    "Sora",
    "Urbanist",
    "Epilogue",
    "Mulish",
    "Heebo",
    "Titillium Web",
    "Zilla Slab",
    "Hind",
    "Varela Round",
    "Bricolage Grotesque",
    "Arimo",
    "Actor",
    "Antic",
    "Bodoni Moda",
    "Crimson Pro",
    "Cardo",
    "Spectral",
    "Proza Libre",
    "Sen",
    "Asap",
    "Domine",
    "Tenor Sans",
    "Chivo",
    "Barlow",
    "Barlow Condensed",
    "League Spartan",
    "Lexend",
    "Cormorant Garamond",
    "Cormorant Infant",
    "Prompt",
    "Teko",
    "Catamaran",
    "Average",
    "Overpass",
    "Baloo 2",
    "Khand",
    "Acumin Pro",
    "SF Pro Display",
    "SF Pro Text",
    "Avenir"
]

const FONT_SIZES = { min: 8, max: 120, default: 20 };

export default function TextControl() {
    const { canvasEditor } = useCanvas();
    const [selectedText, setSelectedText] = useState(null);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [fontSize, setFontSize] = useState(FONT_SIZES.default);
    const [textColor, setTextColor] = useState("#000000");
    const [textAlign, setTextAlign] = useState("left");
    const [_, setChanged] = useState(0);

    if (!canvasEditor) {
        return (
            <div className="p-4">
                <p className="text-white/70 text-sm">Canvas not ready</p>
            </div>
        );
    }

    const updateSelectedText = () => {
        if (!canvasEditor) return;
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject && activeObject.type === "i-text") {
            setSelectedText(activeObject);
            setFontFamily(activeObject.fontFamily || "Arial");
            setFontSize(activeObject.fontSize || FONT_SIZES.default);
            setTextColor(activeObject.fill || "#000000");
            setTextAlign(activeObject.textAlign || "left");
        } else {
            setSelectedText(null);
        }

    }

    useEffect(() => {
        if (!canvasEditor) return;

        updateSelectedText();

        const handleSelectionCreated = () => updateSelectedText();
        const handleSelectionUpdated = () => updateSelectedText();
        const handleSelectionCleared = () => setSelectedText(null);

        canvasEditor.on("selection:created", handleSelectionCreated);
        canvasEditor.on("selection:updated", handleSelectionUpdated);
        canvasEditor.on("selection:cleared", handleSelectionCleared);

        return () => {
            canvasEditor.off("selection:created", handleSelectionCreated);
            canvasEditor.off("selection:updated", handleSelectionUpdated);
            canvasEditor.off("selection:cleared", handleSelectionCleared);
        };
    }, [canvasEditor])

    const addText = () => {
        if (!canvasEditor) return;

        const text = new IText("Edit this text", {
            left: canvasEditor.width / 2,
            top: canvasEditor.height / 2,
            originX: "center",
            originY: "center",
            fontFamily,
            fontSize: FONT_SIZES.default,
            fill: textColor,
            textAlign,
            editable: true,
            selectable: true,
        });

        canvasEditor.add(text);
        canvasEditor.setActiveObject(text);
        canvasEditor.requestRenderAll();

        setTimeout(() => {
            text.enterEditing();
            text.selectAll();
        }, 100);

    }

    const applyFontFamily = (family) => {
        if (!selectedText) return;
        setFontFamily(family);
        selectedText.set("fontFamily", family);
        canvasEditor.requestRenderAll();
    }

    const applyFontSize = (size) => {
        if (!selectedText) return;
        const newSize = Array.isArray(size) ? size[0] : size;
        setFontSize(newSize)
        selectedText.set("fontSize", newSize);
        canvasEditor.requestRenderAll();
    }

    const applyTextAlign = (align) => {
        if (!selectedText) return;
        setTextAlign(align);
        selectedText.set("textAlign", align);
        canvasEditor.requestRenderAll();
    }

    const applyTextColor = (color) => {
        if (!selectedText) return;
        setTextColor(color);
        selectedText.set("fill", color);
        canvasEditor.requestRenderAll();
    }

    const toggleFormat = (format) => {
        if (!selectedText) return;

        switch (format) {
            case "bold": {
                const current = selectedText.fontWeight || "normal";
                selectedText.set("fontWeight", current === "bold" ? "normal" : "bold");
                break;
            }
            case "italic": {
                const current = selectedText.fontStyle || "normal";
                selectedText.set(
                    "fontStyle",
                    current === "italic" ? "normal" : "italic"
                );
                break;
            }
            case "underline": {
                const current = selectedText.underline || false;
                selectedText.set("underline", !current);
                break;
            }
        }

        canvasEditor.requestRenderAll();
        setChanged((c) => c + 1); // 👈 force rerender to update buttons
    }

    const deleteSelectedText = () => {
        if (!selectedText || !canvasEditor) return;
        canvasEditor.remove(selectedText);
        canvasEditor.requestRenderAll();
        setSelectedText(null);
    }

    return (
        <div className="space-y-6">
            {/* Add Text Button */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-white mb-2">Add Text</h3>
                    <p className="text-xs text-white/70 mb-4">
                        Click to add editable text to your canvas
                    </p>
                </div>
                <Button onClick={addText} className="w-full" variant="primary">
                    <Type className="h-4 w-4 mr-2" />
                    Add Text
                </Button>
            </div>

            {/* Text Editing Controls - Show only when text is selected */}
            {selectedText && (
                <div className="border-t border-white/10 pt-6">
                    <h3 className="text-sm font-medium text-white mb-4">
                        Edit Selected Text
                    </h3>

                    <div className="space-y-2 mb-4">
                        <label className="text-xs text-white/70">Font Family</label>
                        <select
                            value={fontFamily}
                            onChange={(e) => applyFontFamily(e.target.value)}
                            className="w-full px-3 py-2 my-2 bg-slate-700 border border-white/20 rounded text-white text-sm"
                        >
                            {FONT_FAMILIES.map((font) => (
                                <option key={font} value={font}>
                                    {font}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Font Size Slider */}
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                            <label className="text-xs text-white/70">Font Size</label>
                            <span className="text-xs text-white/70">{fontSize}px</span>
                        </div>
                        <Slider
                            value={[fontSize]}
                            onValueChange={applyFontSize}
                            min={FONT_SIZES.min}
                            max={FONT_SIZES.max}
                            step={1}
                            className="w-full"
                        />
                    </div>

                    {/* Text Alignment */}
                    <div className="space-y-2 mb-4">
                        <label className="text-xs text-white/70">Text Alignment</label>
                        <div className="grid grid-cols-4 gap-1">
                            {[
                                ["left", AlignLeft],
                                ["center", AlignCenter],
                                ["right", AlignRight],
                                ["justify", AlignJustify],
                            ].map(([align, Icon]) => (
                                <Button
                                    key={align}
                                    onClick={() => applyTextAlign(align)}
                                    variant={textAlign === align ? "default" : "outline"}
                                    size="sm"
                                    className="p-2"
                                >
                                    <Icon className="h-4 w-4" />
                                </Button>
                            ))}
                        </div>
                    </div>



                    {/* Text Color */}
                    <div className="space-y-2 mb-4">
                        <label className="text-xs text-white/70">Text Color</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => applyTextColor(e.target.value)}
                                className="w-10 h-10 rounded border border-white/20 bg-transparent cursor-pointer"
                            />
                            <Input
                                value={textColor}
                                onChange={(e) => applyTextColor(e.target.value)}
                                placeholder="#000000"
                                className="flex-1 bg-slate-700 border-white/20 text-white text-sm"
                            />
                        </div>
                    </div>


                    <div className="space-y-2 mb-4">
                        <label className="text-xs text-white/70">Formatting</label>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => toggleFormat("bold")}
                                variant={
                                    selectedText.fontWeight === "bold" ? "default" : "outline"
                                }
                                size="sm"
                                className="flex-1"
                            >
                                <Bold className="h-4 w-4" />
                            </Button>
                            <Button
                                onClick={() => toggleFormat("italic")}
                                variant={
                                    selectedText.fontStyle === "italic" ? "default" : "outline"
                                }
                                size="sm"
                                className="flex-1"
                            >
                                <Italic className="h-4 w-4" />
                            </Button>
                            <Button
                                onClick={() => toggleFormat("underline")}
                                variant={selectedText.underline ? "default" : "outline"}
                                size="sm"
                                className="flex-1"
                            >
                                <Underline className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Delete Text */}
                    <Button
                        onClick={deleteSelectedText}
                        variant="outline"
                        className="w-full text-red-400 border-red-400/20 hover:bg-red-400/10"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Text
                    </Button>

                </div>
            )}


            {/* Instructions */}
            <div className="bg-slate-700/30 rounded-lg p-3">
                <p className="text-xs text-white/70">
                    <strong>Double-click</strong> any text to edit it directly on canvas.
                    <br />
                    <strong>Select</strong> text to see formatting options here.
                </p>
            </div>
        </div>
    )
}