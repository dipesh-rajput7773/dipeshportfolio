'use client';

import { useState, useEffect } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import { motion } from 'motion/react';
import { Terminal, Film, Instagram, ArrowRight, Zap, Camera, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const [playReel, setPlayReel] = useState(false);
    const [playReel2, setPlayReel2] = useState(false);

    useEffect(() => {
        if (playReel || playReel2) {
            const processEmbed = () => {
                if ((window as any).instgrm) {
                    (window as any).instgrm.Embeds.process();
                }
            };

            if (!(window as any).instgrm) {
                const s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.instagram.com/embed.js';
                s.onload = processEmbed;
                document.body.appendChild(s);
            } else {
                setTimeout(processEmbed, 100);
            }
        }
    }, [playReel, playReel2]);

    const grindLog = [
        { 
            date: "FEB 2026", 
            event: "Started E-commerce business.\n   Building backend workflows and scaling operations." 
        },
        { 
            date: "JAN 2026", 
            event: "First talking video posted.\n   Faced camera. Hit publish.\n   Hardest rep so far." 
        },
        { 
            date: "JUN 2025", 
            event: "First thedipverse reel started on 6 June.\n   The visual journey begins." 
        },
        { 
            date: "2025", 
            event: "Started thedipverse. First cinematic\n   post published. Code by day,\n   lens by night." 
        },
        { 
            date: "DEC 2024", 
            event: "Deleted the 1.7K meme page.\n   Realized I couldn't focus on it while working my dev job.\n   Sacrificed follower count for real engineering skills." 
        },
        { 
            date: "OCT 2024", 
            event: "Shot a mukbang-style food video.\n   Never published.\n   Learned: format fit > grit alone." 
        },
        { 
            date: "22 JAN 2024", 
            event: "Created Ram Mandir documentary for the inauguration.\n   Factual historical storytelling." 
        },
        { 
            date: "OCT 2023", 
            event: "Landed job as a developer.\n   Ran a final meme page on the side, hitting 1,700 followers and 3M+ reach.\n   Juggling code and content." 
        },
        { 
            date: "2021", 
            event: "Started 2 meme pages.\n   Hit 30M views on a single reel. Sold both for ₹5K.\n   The first real taste of scale." 
        },
        { 
            date: "2018", 
            event: "Uploaded first YouTube video.\n   A music-driven conceptual story edit on a popular song.\n   The initial spark." 
        }
    ];

    const contentMilestones = [
        { stat: "30M+", label: "Total Accounts Reached", desc: "Massive scale across the network." },
        { stat: "3", label: "Theme/Meme Pages", desc: "Built, managed, and grew communities." },
        { stat: "100%", label: "Viral Understanding", desc: "Organic audience retention and deep hooks." }
    ];

    const deepThoughts = [
        {
            id: "#001",
            hook: "Core Values",
            content: "Content shouldn't just be about the algorithm. It should be a byproduct of meaningful work and deep system learning."
        },
        {
            id: "#002",
            hook: "On Modern Build",
            content: "Editing and coding are the same discipline. Both are about aggressive optimization until only the essential remains."
        }
    ];

    return (
        <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-crimson/30 selection:text-white">
            <div className="max-w-7xl mx-auto space-y-40">

                {/* Section 01: The Narrative */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                    <div className="space-y-12">
                        <label className="mono text-crimson text-xs uppercase tracking-[0.5em]">001 — THE NARRATIVE</label>
                        <div className="space-y-10 font-display text-4xl md:text-6xl text-warm-white leading-[1.1] text-left">
                            <p>Architecting <br /> <span className="text-crimson mt-2 block">Attention.</span></p>
                            <p className="text-muted italic text-xl md:text-[1.8rem] leading-snug">
                                &quot;Operating at the absolute edge of code, commerce, and cinema. What started as cracking social media algorithms has evolved into building full-scale automated infrastructures. thedipverse is the pure manifestation of deep engineering logic colliding with high-retention visual storytelling.&quot;
                            </p>
                        </div>
                        <div className="pt-20 border-t border-crimson/20">
                            <blockquote className="font-display text-4xl md:text-[4.5rem] text-warm-white leading-tight tracking-tighter">
                                &quot;Code the Backend.<br/><span className="text-crimson">Film the Frontend.</span>&quot;
                            </blockquote>
                        </div>
                    </div>

                    {/* The Grind Log (Terminal Vibe) */}
                    <div className="space-y-8 py-12 md:pl-20 border-l border-warm-white/5">
                        <label className="mono text-crimson text-xs uppercase tracking-[0.5em]">002 — THE GRIND LOG</label>
                        
                        <div className="bg-[#050505] rounded-xl border border-warm-white/10 overflow-hidden font-mono shadow-2xl">
                            {/* Terminal Header */}
                            <div className="bg-[#111111] px-4 py-3 flex items-center border-b border-warm-white/10">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="flex-1 text-center text-[10px] text-warm-white/40 tracking-widest uppercase">
                                    dipesh@thedipverse: ~
                                </div>
                                <div className="w-12"></div> {/* Spacer for centering flex */}
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 md:p-8 space-y-8 text-xs md:text-[13px]">
                                {grindLog.map((log, i) => {
                                    const commands = [
                                        `sudo systemctl start ecom-backend --scaling=true`,
                                        `pip install thedipverse-facecam --upgrade`,
                                        `npm run build --reel="DKkMxoTvQmJ"`,
                                        `docker run -d thedipverse/cinematic:2025`,
                                        `sudo rm -rf /meme_pages/1.7k_page --force`,
                                        `yarn add mukbang-format --dev`,
                                        `git commit -m "feat: ram_mandir_doc inauguration"`,
                                        `npm install developer-job && node side_hustle.js`,
                                        `npm publish @meme/scale --access public --price=5k`,
                                        `python3 init_spark.py --upload="youtube_music_sync_2018"`
                                    ];
                                    
                                    return (
                                        <div key={i} className="space-y-3">
                                            <div className="flex gap-3 text-warm-white/50">
                                                <span className="text-crimson font-bold">➜</span>
                                                <span className="text-emerald-400 font-bold shrink-0">~</span>
                                                <span className="text-warm-white">{commands[i] ? commands[i] : `sudo npm install timeline-${log.date.replace(' ', '_')}`}</span>
                                            </div>
                                            <div className={`whitespace-pre-wrap ml-6 border-l-2 pl-4 py-1 flex flex-col gap-1 ${log.date === 'OCT 2024' ? 'border-red-500/30 text-red-500' : 'border-warm-white/10 text-warm-white/80'}`}>
                                                <span className={log.date === 'OCT 2024' ? 'text-red-500 font-bold' : 'text-emerald-400 font-bold'}>
                                                    [{log.date}]{log.date === 'OCT 2024' && ' :: ERR: FORMAT REJECTED'}
                                                </span>
                                                <span className={log.date === 'OCT 2024' ? 'text-red-400' : 'text-warm-white/70'}>
                                                    {log.event.replace(/\/\/\s*/g, '')}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="pt-8 mt-8 border-t border-warm-white/5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                    <div className="flex items-center gap-3 text-warm-white/50">
                                        <span className="text-crimson font-bold">➜</span>
                                        <span className="text-emerald-400 font-bold">~</span>
                                        <span className="w-2 h-4 bg-warm-white/50 animate-pulse" />
                                    </div>
                                    <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">SYSTEM ONLINE: BUILDING IN PUBLIC.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 02: Visual Experiments (Reels / Work Attachments) */}
                <section className="space-y-16">
                    <div className="flex items-center gap-3">
                        <Film size={18} className="text-crimson" />
                        <h4 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">003 — VISUAL ARCHIVE / SELECTED WORK</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {/* REEL PLACEHOLDER 01 */}
                        <div className="editorial-card group p-0 overflow-hidden relative border border-warm-white/10 aspect-[9/16] bg-surface flex flex-col justify-center items-center p-8 space-y-6">
                            <div className="p-4 bg-crimson/10 rounded-full text-crimson group-hover:scale-110 transition-transform">
                                <Instagram size={32} />
                            </div>
                            <div className="space-y-4 z-20">
                                <h4 className="font-display text-3xl text-warm-white uppercase tracking-tighter italic">Cinema Test 01.</h4>
                                <p className="mono text-[10px] text-muted uppercase tracking-widest opacity-60 italic leading-relaxed px-6">// Attached: Grading and Pacing Experiment.</p>
                            </div>
                            <button onClick={() => setPlayReel(true)} className="px-8 py-4 bg-crimson text-white text-[10px] mono font-bold uppercase tracking-widest z-20 hover:bg-black transition-all">
                                Watch Reel
                            </button>
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-crimson/10 to-transparent pointer-events-none z-10" />
                            
                            {playReel && (
                                <div className="absolute inset-0 z-50 bg-[#050505] flex items-center justify-center overflow-y-auto overflow-x-hidden p-4">
                                    <div 
                                        className="w-full max-w-[350px] mt-20 mb-4 bg-white rounded-md overflow-hidden shadow-2xl"
                                        dangerouslySetInnerHTML={{ __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DKkMxoTvQmJ/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DKkMxoTvQmJ/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DKkMxoTvQmJ/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by The Dipverse (@thedipverse)</a></p></div></blockquote>`}}
                                    />
                                    <button 
                                        onClick={() => setPlayReel(false)} 
                                        className="absolute top-4 right-4 z-[60] w-8 h-8 flex items-center justify-center bg-black/80 rounded-full text-white border border-warm-white/20 hover:bg-crimson hover:borderColor-crimson transition-all"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* REEL EMBED 02 */}
                        <div className="editorial-card group p-0 overflow-hidden relative border border-warm-white/10 aspect-[9/16] bg-surface flex flex-col justify-center items-center p-8 space-y-6">
                            <div className="p-4 bg-crimson/10 rounded-full text-crimson group-hover:scale-110 transition-transform">
                                <Instagram size={32} />
                            </div>
                            <div className="space-y-4 z-20">
                                <h4 className="font-display text-3xl text-warm-white uppercase tracking-tighter italic">Cinema Test 02.</h4>
                                <p className="mono text-[10px] text-muted uppercase tracking-widest opacity-60 italic leading-relaxed px-6">// Attached: Framing & Movement.</p>
                            </div>
                            <button onClick={() => setPlayReel2(true)} className="px-8 py-4 bg-crimson text-white text-[10px] mono font-bold uppercase tracking-widest z-20 hover:bg-black transition-all">
                                Watch Reel
                            </button>
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-crimson/10 to-transparent pointer-events-none z-10" />
                            
                            {playReel2 && (
                                <div className="absolute inset-0 z-50 bg-[#050505] flex items-center justify-center overflow-y-auto overflow-x-hidden p-4">
                                    <div 
                                        className="w-full max-w-[350px] mt-20 mb-4 bg-white rounded-md overflow-hidden shadow-2xl"
                                        dangerouslySetInnerHTML={{ __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DWKEyXpE-kK/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DWKEyXpE-kK/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DWKEyXpE-kK/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by The Dipverse (@thedipverse)</a></p></div></blockquote>`}}
                                    />
                                    <button 
                                        onClick={() => setPlayReel2(false)} 
                                        className="absolute top-4 right-4 z-[60] w-8 h-8 flex items-center justify-center bg-black/80 rounded-full text-white border border-warm-white/20 hover:bg-crimson hover:borderColor-crimson transition-all"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* REEL PLACEHOLDER 03 */}
                        <div className="border border-warm-white/5 border-dashed flex items-center justify-center aspect-[9/16] opacity-30 hover:opacity-100 transition-opacity">
                            <p className="mono text-[10px] uppercase tracking-[0.4em] text-muted rotate-90">Archive Slot Pending</p>
                        </div>
                    </div>
                </section>

                {/* Section 03: Philosophical Hooks */}
                <section className="space-y-16">
                    <div className="flex items-center gap-3">
                        <Sparkles size={18} className="text-amber-500" />
                        <h4 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">004 — STRATEGIC LOGIC</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {deepThoughts.map((script, i) => (
                            <div key={i} className="editorial-card p-12 bg-white/[0.01] border border-warm-white/5 space-y-12 group hover:border-crimson/20 transition-all">
                                <div className="flex justify-between items-center opacity-40">
                                    <span className="mono text-[10px] uppercase tracking-widest">Logic {script.id}</span>
                                    <span className="mono text-[10px] uppercase tracking-widest">{script.hook}</span>
                                </div>
                                <p className="text-2xl md:text-4xl font-display text-warm-white leading-[1.1] md:leading-[1.15]">
                                    &quot;{script.content}&quot;
                                </p>
                                <div className="pt-8 border-t border-warm-white/5 flex justify-between items-center px-2">
                                    <span className="mono text-[8px] text-muted italic">— Strategy defined. Implementation pending.</span>
                                    <ArrowRight size={14} className="text-muted group-hover:text-crimson transition-transform group-hover:translate-x-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>



                <div className="pt-40 text-center pb-20 border-t border-warm-white/5 mt-20">
                    <Link href="/" className="mono text-xs uppercase tracking-widest text-muted hover:text-crimson transition-all">
                        // Return to Base Deployment
                    </Link>
                </div>
            </div>
        </main>
    );
}
