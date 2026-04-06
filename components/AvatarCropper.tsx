'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Check, RotateCcw } from 'lucide-react';

interface AvatarCropperProps {
    imageSrc: string;           // object URL from FileReader
    onCropDone: (blob: Blob) => void;
    onCancel: () => void;
}

export default function AvatarCropper({ imageSrc, onCropDone, onCancel }: AvatarCropperProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const SIZE = 320; // canvas & preview size in px

    const [zoom, setZoom] = useState(1);
    // offset = how much the image is shifted from center (in canvas coords)
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const drag = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);

    // Load image once
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            imgRef.current = img;
            // auto-fit: scale so the shorter side fills the circle
            const minSide = Math.min(img.naturalWidth, img.naturalHeight);
            const autoZoom = SIZE / minSide;
            setZoom(autoZoom);
            setOffset({ x: 0, y: 0 });
        };
        img.src = imageSrc;
    }, [imageSrc]);

    // Redraw whenever zoom/offset/image changes
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img) return;
        const ctx = canvas.getContext('2d')!;

        ctx.clearRect(0, 0, SIZE, SIZE);

        // Draw the image centred + shifted
        const drawW = img.naturalWidth * zoom;
        const drawH = img.naturalHeight * zoom;
        const x = SIZE / 2 - drawW / 2 + offset.x;
        const y = SIZE / 2 - drawH / 2 + offset.y;
        ctx.drawImage(img, x, y, drawW, drawH);

        // Darken everything outside the circle
        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(0, 0, SIZE, SIZE);
        // Cut out the circle
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Circle border
        ctx.strokeStyle = 'rgba(139,92,246,0.9)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 4, 0, Math.PI * 2);
        ctx.stroke();
    }, [zoom, offset]);

    useEffect(() => { draw(); }, [draw]);

    // Pointer events for dragging
    const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y };
    };

    const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.startX;
        const dy = e.clientY - drag.current.startY;
        setOffset({ x: drag.current.ox + dx, y: drag.current.oy + dy });
    };

    const onPointerUp = () => { drag.current = null; };

    // Produce the final cropped circle as a Blob
    const handleConfirm = () => {
        const img = imgRef.current;
        if (!img) return;

        const out = document.createElement('canvas');
        out.width = SIZE;
        out.height = SIZE;
        const ctx = out.getContext('2d')!;

        // Clip to circle
        ctx.beginPath();
        ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
        ctx.clip();

        const drawW = img.naturalWidth * zoom;
        const drawH = img.naturalHeight * zoom;
        const x = SIZE / 2 - drawW / 2 + offset.x;
        const y = SIZE / 2 - drawH / 2 + offset.y;
        ctx.drawImage(img, x, y, drawW, drawH);

        out.toBlob((blob) => {
            if (blob) onCropDone(blob);
        }, 'image/jpeg', 0.92);
    };

    const handleReset = () => {
        const img = imgRef.current;
        if (!img) return;
        const minSide = Math.min(img.naturalWidth, img.naturalHeight);
        setZoom(SIZE / minSide);
        setOffset({ x: 0, y: 0 });
    };

    return (
        /* Backdrop */
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <div
                style={{
                    background: '#fff', borderRadius: '24px', padding: '28px',
                    width: '100%', maxWidth: '400px',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
                    fontFamily: "'Inter', sans-serif",
                    display: 'flex', flexDirection: 'column', gap: '22px',
                    animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
                }}
            >
                <style>{`
          @keyframes modalIn {
            from { opacity:0; transform: scale(0.88) translateY(20px); }
            to   { opacity:1; transform: scale(1) translateY(0); }
          }
        `}</style>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#1a1a2e', margin: 0 }}>Adjust your photo</h2>
                        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '3px 0 0' }}>Drag to reposition · Scroll or slide to zoom</p>
                    </div>
                    <button
                        onClick={onCancel}
                        style={{ background: '#f3f4f6', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', display: 'flex', color: '#6b7280' }}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Canvas crop area */}
                <div style={{ position: 'relative', margin: '0 auto' }}>
                    <canvas
                        ref={canvasRef}
                        width={SIZE}
                        height={SIZE}
                        style={{
                            display: 'block', borderRadius: '16px',
                            cursor: 'grab', userSelect: 'none',
                            background: '#111',
                            maxWidth: '100%',
                        }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        onWheel={(e) => {
                            e.preventDefault();
                            setZoom(z => Math.max(0.3, Math.min(8, z - e.deltaY * 0.003)));
                        }}
                    />
                </div>

                {/* Zoom slider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        onClick={() => setZoom(z => Math.max(0.3, z - 0.1))}
                        style={{ background: '#f3f4f6', border: 'none', borderRadius: '8px', padding: '7px', cursor: 'pointer', display: 'flex', color: '#6b7280', flexShrink: 0 }}
                    >
                        <ZoomOut size={15} />
                    </button>

                    <input
                        type="range"
                        min={0.3} max={8} step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        style={{ flex: 1, accentColor: '#7c3aed', height: '4px', cursor: 'pointer' }}
                    />

                    <button
                        onClick={() => setZoom(z => Math.min(8, z + 0.1))}
                        style={{ background: '#f3f4f6', border: 'none', borderRadius: '8px', padding: '7px', cursor: 'pointer', display: 'flex', color: '#6b7280', flexShrink: 0 }}
                    >
                        <ZoomIn size={15} />
                    </button>

                    <button
                        onClick={handleReset}
                        title="Reset"
                        style={{ background: '#f3f4f6', border: 'none', borderRadius: '8px', padding: '7px', cursor: 'pointer', display: 'flex', color: '#6b7280', flexShrink: 0 }}
                    >
                        <RotateCcw size={15} />
                    </button>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={onCancel}
                        style={{
                            flex: 1, padding: '12px', borderRadius: '12px',
                            border: '1.5px solid #e5e7eb', background: '#fff',
                            fontSize: '14px', fontWeight: 600, color: '#374151',
                            cursor: 'pointer',
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        style={{
                            flex: 2, padding: '12px', borderRadius: '12px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            fontSize: '14px', fontWeight: 700, color: '#fff',
                            cursor: 'pointer', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: '8px',
                            boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
                        }}
                    >
                        <Check size={16} />
                        Apply & Upload
                    </button>
                </div>
            </div>
        </div>
    );
}
