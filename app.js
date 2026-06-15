/**
 * ========================================================================
 *   FROGLOCK OS v1.0.3 - APPLICATION RUNTIME & SHELL MANAGER
 * ========================================================================
 */

// Global Audio Engine Context
let audioCtx = null;
let soundEnabled = true;
let crtHumOsc = null;
let crtHumGain = null;

// Twemoji helper — replaces native OS emojis with Twitter-style images
function applyTwemoji(el) {
    if (typeof twemoji !== 'undefined') {
        twemoji.parse(el || document.body, { folder: 'svg', ext: '.svg' });
    }
}

// Applications Database Registry
// Applications Database Registry
const APPS_REGISTRY = {
    readme: {
        title: "README.txt",
        icon: "📄",
        width: 480,
        height: 440,
        x: 40,
        y: 40,
        content: `
            <div class="readme-content">
                <img src="https://u.cubeupload.com/froglock/8dc15a17d3091f9c25ee.png" style="max-width: 100%; height: auto; display: block; margin: 0 auto 12px auto; border: 2px solid var(--border-inactive);" alt="Froglock OS Header">
                <h2>WELCOME TO FROGLOCK OS</h2>
                <p>Yo! Froglock here! I'm a guy who just likes to make whatever bs comes to his mind! My username's backstory is that I like frogs, so my username was originally Froggo. But, after I watched BLUE LOCK, I changed my username to FROGLOCK for fun and I was gonna change it a few days after... until it just stuck around for eternity. I really like listening to Vocaloid music and playing Geometry Dash. My favorite Vocaloid songs are Magnet, Romeo and Cinderella, IDSMILE, and basically anything Kurousagi and Masarada makes. My hardest demon in Geometry Dash is Stereo Demoness, a former top 1 demon. Some of my favorite genres of anime are romance and slice of life. They really just warm my heart and make me kick my feet in joy. My favorite recent anime is Lycoris Recoil, but the absolute GOAT is Bocchi the Rock! Ryo Yamada and Hatsune Miku have changed my life, for better or for worse is up to anyone. I also love Yuri. A. Lot.</p>
                <p>• Drag windows around and reposition them wherever you'd like.</p>
                <p>• Double-click desktop icons to launch applications.</p>
                <p style="margin-bottom: 16px;">• Toggle the audio for cool sfx.</p>
            </div>
        `
    },
    socials: {
        title: "socials.txt",
        icon: "📄",
        width: 420,
        height: 380,
        x: 60,
        y: 60,
        content: `
            <div class="readme-content">
                <h2>MY SOCIALS</h2>
                <p>Find me on these platforms!</p>
                <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
                    <a href="https://www.instagram.com/froggolock/" target="_blank" class="app-url" style="font-size:14px;">Instagram - @froggolock</a>
                    <a href="https://www.roblox.com/users/81655785/profile" target="_blank" class="app-url" style="font-size:14px;">Roblox - froglock</a>
                    <a href="https://github.com/froggylocky" target="_blank" class="app-url" style="font-size:14px;">GitHub - froggylocky</a>
                    <a href="https://giphy.com/froggolock" target="_blank" class="app-url" style="font-size:14px;">Giphy - froggolock</a>
                    <a href="https://www.youtube.com/@Fro-g-lock" target="_blank" class="app-url" style="font-size:14px;">YouTube - @Fro-g-lock</a>
                </div>
            </div>
        `
    },
    pjsk: {
        title: "PJSK PFP Frame Maker",
        icon: `<img src="https://www.google.com/s2/favicons?domain=pjsekai.sega.jp&sz=32" class="favicon-img" width="16" height="16" alt="">`,
        width: 500,
        height: 400,
        x: 80,
        y: 80,
        content: `
            <div class="app-viewer">
                <div class="app-screenshot-placeholder">
                    <img src="https://www.google.com/s2/favicons?domain=pjsekai.sega.jp&sz=64" width="64" height="64" class="pixel-icon favicon-img" style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.5))" alt="">
                    <span>PJSK PFP Frame Maker</span>
                </div>
                <div class="app-details">
                    <h3 class="app-title">Project Sekai Profile Frame Creator</h3>
                    <a href="https://pjsk-pfp-frame-maker.vercel.app/" target="_blank" class="app-url">https://pjsk-pfp-frame-maker.vercel.app/ ↗</a>
                    <p class="app-description">Do you like PJSK? No? I'm a chud? Oh. Anyways, if you are a fan of it, and ever saw those people with a Mizuki pfp frame online, and wanted to look put one on your pfp and you don't know where to look or put it on? Well this is the place for you!</p>
                    <div class="app-actions">
                        <a href="https://pjsk-pfp-frame-maker.vercel.app/" target="_blank" class="retro-btn highlight">LAUNCH WEBSITE ↗</a>
                    </div>
                </div>
            </div>
        `
    },
    badge: {
        title: "EToH Badge Maker",
        icon: `<img src="https://u.cubeupload.com/froglock/logoe.png" class="favicon-img" width="16" height="16" alt="">`,
        width: 500,
        height: 400,
        x: 120,
        y: 120,
        content: `
            <div class="app-viewer">
                <div class="app-screenshot-placeholder">
                    <img src="https://u.cubeupload.com/froglock/logoe.png" width="64" height="64" class="pixel-icon favicon-img" style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.5))" alt="">
                    <span>EToH Badge Maker</span>
                </div>
                <div class="app-details">
                    <h3 class="app-title">EToH Badge Maker Tool</h3>
                    <a href="https://e-to-h-badge-maker.vercel.app/" target="_blank" class="app-url">https://e-to-h-badge-maker.vercel.app/ ↗</a>
                    <p class="app-description">This site is for creating badge images for anyone's EToH (Eternal Towers of Hell) fangame! I made this because Inkscape looked too hard :(</p>
                    <div class="app-actions">
                        <a href="https://e-to-h-badge-maker.vercel.app/" target="_blank" class="retro-btn highlight">LAUNCH WEBSITE ↗</a>
                    </div>
                </div>
            </div>
        `
    },
    buttons: {
        title: "Froglock's Button Helper",
        icon: `<img src="https://u.cubeupload.com/froglock/logof.png" class="favicon-img" width="16" height="16" alt="">`,
        width: 520,
        height: 420,
        x: 160,
        y: 160,
        content: `
            <div class="app-viewer">
                <div class="app-screenshot-placeholder">
                    <img src="https://u.cubeupload.com/froglock/logof.png" width="64" height="64" class="pixel-icon favicon-img" style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.5))" alt="">
                    <span>Button CSS Utility</span>
                </div>
                <div class="app-details">
                    <h3 class="app-title">Froglock's Button Helper</h3>
                    <a href="https://froglocks-button-helper.vercel.app/" target="_blank" class="app-url">https://froglocks-button-helper.vercel.app/ ↗</a>
                    <p class="app-description">This helps me make irl button pins in real life. That was a run on sentence who cares.</p>
                    <div class="app-actions">
                        <a href="https://froglocks-button-helper.vercel.app/" target="_blank" class="retro-btn highlight">LAUNCH WEBSITE ↗</a>
                    </div>
                </div>
            </div>
        `
    },
    yuri: {
        title: "Random Yuri Generator",
        icon: `<img src="https://u.cubeupload.com/froglock/chatuhdY.png" class="favicon-img" width="16" height="16" alt="">`,
        width: 500,
        height: 420,
        x: 200,
        y: 200,
        content: `
            <div class="app-viewer">
                <div class="app-screenshot-placeholder">
                    <img src="https://u.cubeupload.com/froglock/chatuhdY.png" width="64" height="64" class="pixel-icon favicon-img" style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.5))" alt="">
                    <span>Random Yuri Generator</span>
                </div>
                <div class="app-details">
                    <h3 class="app-title">Random Yuri Generator</h3>
                    <a href="https://random-yuri-generator.vercel.app/" target="_blank" class="app-url">https://random-yuri-generator.vercel.app/ ↗</a>
                    <p class="app-description">Ever feeling... Yuriful? Having unbridled lesbian fury? Well, you can use this website to randomly generate a post from Safebooru with the "yuri" tag!</p>
                    <div class="app-actions">
                        <a href="https://random-yuri-generator.vercel.app/" target="_blank" class="retro-btn highlight">LAUNCH WEBSITE ↗</a>
                    </div>
                </div>
            </div>
        `
    },
    slots: {
        title: "TowrSlots",
        icon: `<img src="https://u.cubeupload.com/froglock/logoT.png" class="favicon-img" width="16" height="16" alt="">`,
        width: 500,
        height: 400,
        x: 240,
        y: 140,
        content: `
            <div class="app-viewer">
                <div class="app-screenshot-placeholder">
                    <img src="https://u.cubeupload.com/froglock/logoT.png" width="64" height="64" class="pixel-icon favicon-img" style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.5))" alt="">
                    <span>TowrSlots</span>
                </div>
                <div class="app-details">
                    <h3 class="app-title">TowrSlots</h3>
                    <a href="https://towrslots.vercel.app/" target="_blank" class="app-url">https://towrslots.vercel.app/ ↗</a>
                    <p class="app-description">This site is for help with making tower slots for EToH fangame developers. Although, I feel this tool is kinda useless, as Google Sheets exists. Well, if you are spooked by Google Sheets, this may be the tool for u bro.</p>
                    <div class="app-actions">
                        <a href="https://towrslots.vercel.app/" target="_blank" class="retro-btn highlight">LAUNCH WEBSITE ↗</a>
                    </div>
                </div>
            </div>
        `
    },
    paint: {
        title: "MS Paint",
        icon: "🎨",
        width: 480,
        height: 440,
        x: 0,
        y: 0,
        content: `
            <div class="paint-layout" style="display:flex; flex-direction:column; height:100%; gap:8px;">
                <div class="paint-toolbar" style="display:flex; gap:6px; flex-wrap:wrap; background-color:var(--bg-system); padding:6px; border:2px solid var(--border-inactive); align-items:center;">
                    <button id="paint-btn-brush" class="retro-btn highlight active">BRUSH</button>
                    <button id="paint-btn-eraser" class="retro-btn">ERASER</button>
                    <button id="paint-btn-clear" class="retro-btn">CLEAR</button>
                    <div style="border-left: 2px solid var(--border-inactive); height:20px; margin: 0 4px;"></div>
                    <span style="font-size:10px; font-family:var(--font-pixel);">SIZE:</span>
                    <select id="paint-size-select" class="retro-input" style="padding: 2px; height:24px; font-size:11px;">
                        <option value="2">2px</option>
                        <option value="4" selected>4px</option>
                        <option value="8">8px</option>
                        <option value="16">16px</option>
                        <option value="32">32px</option>
                    </select>
                    <div style="border-left: 2px solid var(--border-inactive); height:20px; margin: 0 4px;"></div>
                    <span style="font-size:10px; font-family:var(--font-pixel);">COLOR:</span>
                    <div id="paint-colors" style="display:flex; gap:4px;">
                        <div class="paint-color-swatch active" data-color="#f4ffb2" style="width:16px; height:16px; background-color:#f4ffb2; border:1px solid #fff; cursor:pointer;"></div>
                        <div class="paint-color-swatch" data-color="#d4dcc9" style="width:16px; height:16px; background-color:#d4dcc9; border:1px solid #000; cursor:pointer;"></div>
                        <div class="paint-color-swatch" data-color="#5a624c" style="width:16px; height:16px; background-color:#5a624c; border:1px solid #000; cursor:pointer;"></div>
                        <div class="paint-color-swatch" data-color="#45493d" style="width:16px; height:16px; background-color:#45493d; border:1px solid #000; cursor:pointer;"></div>
                        <div class="paint-color-swatch" data-color="#ffffff" style="width:16px; height:16px; background-color:#ffffff; border:1px solid #000; cursor:pointer;"></div>
                        <div class="paint-color-swatch" data-color="#ff7763" style="width:16px; height:16px; background-color:#ff7763; border:1px solid #000; cursor:pointer;"></div>
                    </div>
                </div>
                <div class="paint-canvas-container" style="flex:1; border:2px solid var(--border-inactive); background-color:#1a1b16; position:relative; overflow:hidden; min-height: 280px;">
                    <canvas id="paint-canvas" style="display:block; width:100%; height:100%; cursor:crosshair;"></canvas>
                </div>
            </div>
        `
    },
    cpstester: {
        title: "CPS Tester",
        icon: "⏱️",
        width: 380,
        height: 320,
        x: 0,
        y: 0,
        content: `
            <div class="cps-layout" style="display:flex; flex-direction:column; height:100%; gap:10px; text-align:center; justify-content:center; align-items:center;">
                <div style="font-family:var(--font-pixel); font-size:10px; color:var(--text-accent); margin-bottom:4px;">CLICKS PER SECOND TEST</div>
                <div style="display:flex; justify-content:space-around; width:100%; margin-bottom:8px; font-family:var(--font-ui);">
                    <div>TIMER: <span id="cps-timer" style="color:var(--text-accent); font-weight:bold;">5.0s</span></div>
                    <div>SCORE: <span id="cps-count" style="color:var(--text-accent); font-weight:bold;">0</span></div>
                    <div>HIGH SCORE: <span id="cps-high" style="color:var(--text-muted);">0.0</span></div>
                </div>
                <div id="cps-click-area" style="width:100%; height:120px; background-color:var(--bg-system); border:3px solid var(--border-inactive); display:flex; justify-content:center; align-items:center; cursor:pointer; user-select:none; font-weight:bold; font-family:var(--font-ui); font-size:16px; text-shadow:1px 1px 0 #000;">
                    CLICK TO START TEST
                </div>
                <div style="margin-top:6px; font-size:24px; font-family:var(--font-pixel); color:var(--text-accent); min-height:30px;" id="cps-result"></div>
                <button id="cps-btn-reset" class="retro-btn" style="margin-top:4px; width:120px;">RESET TEST</button>
            </div>
        `
    }
};

// Simulated terminal state variables
let terminalHistory = "";
let terminalCommandHistory = [];
let terminalHistoryIndex = -1;

// Guestbook simulated memory DB
const DEFAULT_COMMENTS = [
    { name: "Satoshi_N", badge: "CYPHER", text: "Nice CRT console theme. Colors look military/vintage.", date: "2026-06-01 10:23:44" },
    { name: "Vercel_Fan", badge: "MAKER", text: "Checked your E to H Badge Maker, very cool interface styling!", date: "2026-06-02 14:05:12" },
    { name: "Froggy", badge: "SYS", text: "Froglock OS boot sequence successfully deployed.", date: "2026-06-03 09:12:00" }
];

// Sound Synthesizer Engine Class
class SoundSynth {
    static init() {
        if (audioCtx) return;
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            soundEnabled = true;

            // Play boot success sound
            this.playBootArpeggio();
        } catch (e) {
            console.warn("Audio Context not supported in this browser.", e);
        }
    }

    static startHum() {
        if (!audioCtx || !soundEnabled) return;
        try {
            crtHumOsc = audioCtx.createOscillator();
            crtHumGain = audioCtx.createGain();

            // 60Hz hum representing cathode power transformer oscillation
            crtHumOsc.type = 'sine';
            crtHumOsc.frequency.setValueAtTime(60, audioCtx.currentTime);

            // Lowpass filter to muffle higher order harmonics
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(80, audioCtx.currentTime);

            crtHumGain.gain.setValueAtTime(0.005, audioCtx.currentTime); // barely audible, background hum

            crtHumOsc.connect(filter);
            filter.connect(crtHumGain);
            crtHumGain.connect(audioCtx.destination);
            crtHumOsc.start();
        } catch (e) {
            console.error("CRT Hum initialization error:", e);
        }
    }

    static stopHum() {
        if (crtHumOsc) {
            try { crtHumOsc.stop(); } catch (e) { }
            crtHumOsc = null;
        }
    }

    static playBootArpeggio() {
        if (!audioCtx || !soundEnabled) return;
        const now = audioCtx.currentTime;
        const scale = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

        scale.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + index * 0.1);

            gain.gain.setValueAtTime(0.06, now + index * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 0.35);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now + index * 0.1);
            osc.stop(now + index * 0.1 + 0.4);
        });
    }

    static playKeyClick(isKeyUp = false) {
        if (!audioCtx || !soundEnabled) return;

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Key down is lower, punchier. Key up is higher, snappier
        const baseFreq = isKeyUp ? 800 : 400;
        const randomPitch = Math.random() * 80 - 40; // slight pitch randomness

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq + randomPitch, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03); // very brief click

        // Add high pass noise band for click impact
        const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.015, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = noiseBuffer;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.setValueAtTime(1500, now);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.02, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
        noiseNode.start(now);
        noiseNode.stop(now + 0.02);
    }

    static playBeep(freq = 880, duration = 0.12) {
        if (!audioCtx || !soundEnabled) return;
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.linearRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.05);
    }

    static playShutdownSweep() {
        try {
            // Force create context if needed for the final shutdown chirp
            const context = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            const now = context.currentTime;

            // Sweep 1: Descending pitch beep
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(30, now + 0.7);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.7);

            osc.connect(gain);
            gain.connect(context.destination);

            osc.start(now);
            osc.stop(now + 0.75);
        } catch (e) {
            console.warn("Could not play shutdown sweep audio", e);
        }
    }
}

// Simulated BIOS Boot Sequence
const BOOT_MESSAGES = [
    "FROGLOCK BIOS v0.98a - STAGE 1 BOOT INITIATED",
    "--------------------------------------------------",
    "CPU: Custom WebAssembly 8-bit core detected at 4.77MHz",
    "MEM: Checking RAM bank: 640KB BASE MEMORY ... OK",
    "MEM: Checking EX-RAM bank: 16384KB EXTENDED ... OK",
    "BUS: System interconnect bus check: OK",
    "DISK: Mounting primary local storage database ... MOUNTED (C:\\)",
    "NET: Probing connection sockets to remote hosts...",
    "NET: [RESOLVING] pjsk-pfp-frame-maker.vercel.app ... ACTIVE (STATUS 200)",
    "NET: [RESOLVING] e-to-h-badge-maker.vercel.app ... ACTIVE (STATUS 200)",
    "NET: [RESOLVING] froglocks-button-helper.vercel.app ... ACTIVE (STATUS 200)",
    "NET: [RESOLVING] random-yuri-generator.vercel.app ... ACTIVE (STATUS 200)",
    "NET: [RESOLVING] towrslots.vercel.app ... ACTIVE (STATUS 200)",
    "DISK: Loading kernel module SYS.OS (104,233 bytes) ... OK",
    "DISK: Initializing Audio Engine oscillators ... READY",
    "SYS: Launching GUI user session interface...",
    "SYSTEM READY."
];

let bootIndex = 0;
let bootInterval = null;

function runBootSequence() {
    const logContainer = document.getElementById("boot-log");
    const skipBtn = document.getElementById("boot-skip-container");
    skipBtn.classList.remove("hidden");

    bootInterval = setInterval(() => {
        if (bootIndex < BOOT_MESSAGES.length) {
            const line = document.createElement("div");
            line.textContent = BOOT_MESSAGES[bootIndex];

            // Accent coloring for boot states
            if (BOOT_MESSAGES[bootIndex].includes("OK") || BOOT_MESSAGES[bootIndex].includes("ACTIVE") || BOOT_MESSAGES[bootIndex].includes("READY")) {
                line.style.color = "var(--text-accent)";
            } else if (BOOT_MESSAGES[bootIndex].includes("BOOT INITIATED")) {
                line.style.fontFamily = "var(--font-pixel)";
                line.style.fontSize = "13px";
                line.style.color = "#fff";
            }

            logContainer.appendChild(line);
            logContainer.scrollTop = logContainer.scrollHeight;

            // Play mechanical ticker during bios writing
            SoundSynth.playKeyClick(false);

            bootIndex++;
        } else {
            clearInterval(bootInterval);
            setTimeout(completeBoot, 600);
        }
    }, 280); // Speed of simulated scrolling logs
}

function completeBoot() {
    clearInterval(bootInterval);
    document.getElementById("boot-screen").classList.add("hidden");
    const desktop = document.getElementById("desktop");
    desktop.classList.remove("hidden");
    document.getElementById("screen").classList.add("crt-active");

    // Automatically open README window on startup
    openApplication("readme");

    // Play desktop loaded notification
    SoundSynth.playBeep(440, 0.08);
    setTimeout(() => SoundSynth.playBeep(659.25, 0.15), 85);
}

// Window Dragging & Z-Index Manager
let zIndexCounter = 300;
let activeDraggingWindow = null;
let dragStartX = 0;
let dragStartY = 0;
let windowStartX = 0;
let windowStartY = 0;

function makeWindowDraggable(winEl) {
    const titleBar = winEl.querySelector(".window-titlebar");

    const handlePointerDown = (e) => {
        // Bring window to front
        focusWindow(winEl);

        // Check if user clicked window control buttons
        if (e.target.closest(".window-controls")) return;

        activeDraggingWindow = winEl;

        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

        dragStartX = clientX;
        dragStartY = clientY;

        const rect = winEl.getBoundingClientRect();
        const workspaceRect = document.getElementById("screen").getBoundingClientRect();

        windowStartX = rect.left - workspaceRect.left;
        windowStartY = rect.top - workspaceRect.top;

        document.addEventListener("mousemove", handlePointerMove);
        document.addEventListener("mouseup", handlePointerUp);
        document.addEventListener("touchmove", handlePointerMove, { passive: false });
        document.addEventListener("touchend", handlePointerUp);

        // Click sound down
        SoundSynth.playKeyClick(false);
    };

    const handlePointerMove = (e) => {
        if (!activeDraggingWindow) return;
        if (e.cancelable) e.preventDefault();

        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

        const dx = clientX - dragStartX;
        const dy = clientY - dragStartY;

        let newX = windowStartX + dx;
        let newY = windowStartY + dy;

        // Boundary checks (relative to CRT screen container)
        const workspace = document.getElementById("screen");
        const maxW = workspace.clientWidth - activeDraggingWindow.clientWidth;
        const maxH = workspace.clientHeight - activeDraggingWindow.clientHeight - 45; // Taskbar height

        newX = Math.max(0, Math.min(newX, maxW));
        newY = Math.max(0, Math.min(newY, maxH));

        activeDraggingWindow.style.left = `${newX}px`;
        activeDraggingWindow.style.top = `${newY}px`;
    };

    const handlePointerUp = () => {
        if (activeDraggingWindow) {
            activeDraggingWindow = null;
            document.removeEventListener("mousemove", handlePointerMove);
            document.removeEventListener("mouseup", handlePointerUp);
            document.removeEventListener("touchmove", handlePointerMove);
            document.removeEventListener("touchend", handlePointerUp);
            // Click sound up
            SoundSynth.playKeyClick(true);
        }
    };

    titleBar.addEventListener("mousedown", handlePointerDown);
    titleBar.addEventListener("touchstart", handlePointerDown, { passive: true });
}

function focusWindow(winEl) {
    if (winEl.classList.contains("active-window")) return;

    // Remove active status from all windows
    document.querySelectorAll(".window").forEach(w => {
        w.classList.remove("active-window");
    });

    // Set current active
    winEl.classList.add("active-window");
    zIndexCounter += 2;
    winEl.style.zIndex = zIndexCounter;

    // Synchronize taskbar active tabs
    const appId = winEl.dataset.app;
    document.querySelectorAll(".tray-btn").forEach(btn => {
        if (btn.dataset.app === appId) {
            btn.classList.add("active-tab");
        } else {
            btn.classList.remove("active-tab");
        }
    });
}

// Window Operations (Open, Close, Minimize, Maximize)
function openApplication(appId) {
    // If window already open, focus it
    const existing = document.getElementById(`window-${appId}`);
    if (existing) {
        if (existing.classList.contains("hidden")) {
            existing.classList.remove("hidden");
        }
        focusWindow(existing);
        return;
    }

    const appConfig = APPS_REGISTRY[appId];
    if (!appConfig) return;

    let leftX = appConfig.x;
    let topY = appConfig.y;

    // Position readme, paint, and cpstester in the middle of the screen
    if (appId === "readme" || appId === "paint" || appId === "cpstester") {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        leftX = Math.max(10, Math.floor((screenW - appConfig.width) / 2));
        topY = Math.max(10, Math.floor((screenH - appConfig.height - 45) / 2));
    }

    // Create DOM Window
    const win = document.createElement("div");
    win.id = `window-${appId}`;
    win.className = "window";
    win.dataset.app = appId;
    win.style.left = `${leftX}px`;
    win.style.top = `${topY}px`;
    win.style.width = `${appConfig.width}px`;
    win.style.height = `${appConfig.height}px`;

    win.innerHTML = `
        <div class="window-titlebar">
            <span class="titlebar-text">
                <span style="font-size: 14px;">${appConfig.icon}</span>
                ${appConfig.title}
            </span>
            <div class="window-controls">
                <button class="retro-btn win-btn btn-min" title="Minimize">_</button>
                <button class="retro-btn win-btn btn-max" title="Maximize">■</button>
                <button class="retro-btn win-btn btn-close" title="Close">X</button>
            </div>
        </div>
        <div class="window-content">
            ${appConfig.content}
        </div>
    `;

    document.getElementById("workspace").appendChild(win);
    makeWindowDraggable(win);

    // Add Event Listeners for controls
    win.querySelector(".btn-close").addEventListener("click", () => closeApplication(appId));
    win.querySelector(".btn-min").addEventListener("click", () => minimizeApplication(appId));
    win.querySelector(".btn-max").addEventListener("click", () => toggleMaximizeWindow(win));

    // Focus window content listener (for focusing window when content is clicked)
    win.addEventListener("mousedown", () => focusWindow(win));
    win.addEventListener("touchstart", () => focusWindow(win), { passive: true });

    // Add tab in taskbar tray
    addTabToTaskbar(appId, appConfig.title, appConfig.icon);

    // Apply Twitter emojis to the new window and taskbar tab
    applyTwemoji(win);
    const newTab = document.getElementById(`tab-${appId}`);
    if (newTab) applyTwemoji(newTab);

    // Focus newly created window
    focusWindow(win);

    // App-specific initialization hooks
    if (appId === "paint") {
        initPaintApp();
    } else if (appId === "cpstester") {
        initCpsTesterApp();
    }

    SoundSynth.playBeep(600, 0.06);
}

function closeApplication(appId) {
    const win = document.getElementById(`window-${appId}`);
    if (win) {
        win.remove();

        // Remove taskbar tab
        const tab = document.getElementById(`tab-${appId}`);
        if (tab) tab.remove();

        // Play closing blip
        SoundSynth.playBeep(350, 0.08);
    }
}

function minimizeApplication(appId) {
    const win = document.getElementById(`window-${appId}`);
    if (win) {
        win.classList.add("hidden");
        // Remove active tab focus
        const tab = document.getElementById(`tab-${appId}`);
        if (tab) tab.classList.remove("active-tab");

        SoundSynth.playBeep(250, 0.1);
    }
}

function toggleMaximizeWindow(winEl) {
    if (winEl.dataset.maximized === "true") {
        // Restore
        winEl.style.top = winEl.dataset.oldTop;
        winEl.style.left = winEl.dataset.oldLeft;
        winEl.style.width = winEl.dataset.oldWidth;
        winEl.style.height = winEl.dataset.oldHeight;
        winEl.dataset.maximized = "false";
    } else {
        // Maximize
        winEl.dataset.oldTop = winEl.style.top;
        winEl.dataset.oldLeft = winEl.style.left;
        winEl.dataset.oldWidth = winEl.style.width;
        winEl.dataset.oldHeight = winEl.style.height;

        winEl.style.top = "0px";
        winEl.style.left = "0px";
        winEl.style.width = "100%";
        winEl.style.height = "calc(100% - 45px)"; // Leaving taskbar visible
        winEl.dataset.maximized = "true";
    }
    SoundSynth.playBeep(520, 0.07);
}

// Taskbar Tabs Synchronization
function addTabToTaskbar(appId, title, icon) {
    const tray = document.getElementById("taskbar-tray");

    // Check if already in tray
    if (document.getElementById(`tab-${appId}`)) return;

    const tab = document.createElement("button");
    tab.id = `tab-${appId}`;
    tab.className = "retro-btn tray-btn active-tab";
    tab.dataset.app = appId;
    tab.innerHTML = `${icon} ${title}`;

    tab.addEventListener("click", () => {
        const win = document.getElementById(`window-${appId}`);
        if (!win) return;

        if (win.classList.contains("hidden")) {
            win.classList.remove("hidden");
            focusWindow(win);
        } else if (win.classList.contains("active-window")) {
            // Already active, minimize it
            minimizeApplication(appId);
        } else {
            // Focus it
            focusWindow(win);
        }
    });

    tray.appendChild(tab);
}

// Unused system functions removed for optimization

// --- SHUTDOWN CRT BLOWOUT SEQUENCE ---
function triggerShutdownSequence() {
    // Play shutdown sweep sound
    SoundSynth.playShutdownSweep();
    SoundSynth.stopHum();

    const screen = document.getElementById("screen");
    screen.classList.remove("crt-active");

    // Add CRT blowout effect styling in JS to prevent stylesheet clutter
    const blackout = document.createElement("div");
    blackout.style.position = "absolute";
    blackout.style.top = "0"; blackout.style.left = "0"; blackout.style.right = "0"; blackout.style.bottom = "0";
    blackout.style.backgroundColor = "#000";
    blackout.style.zIndex = "999999";
    blackout.style.display = "flex";
    blackout.style.justifyContent = "center";
    blackout.style.alignItems = "center";

    const line = document.createElement("div");
    line.style.width = "100%";
    line.style.height = "4px";
    line.style.backgroundColor = "#d4dcc9";
    line.style.boxShadow = "0 0 10px #f4ffb2";
    line.style.transition = "all 0.4s ease-out";

    blackout.appendChild(line);
    screen.appendChild(blackout);

    // Animate CRT tube collapsing to a line, then a pixel, then fully off
    setTimeout(() => {
        line.style.width = "4px";
    }, 300);

    setTimeout(() => {
        line.style.opacity = "0";
    }, 700);

    setTimeout(() => {
        // Attempt 1: standard close
        window.close();
        // Attempt 2: workaround for tabs not opened by script (bypasses browser restriction)
        window.open('', '_self', '').close();

        // Show fallback standby message if tab close was blocked by browser security rules
        setTimeout(() => {
            blackout.innerHTML = `
                <div style="text-align: center; color: var(--text-primary); font-family: var(--font-pixel); font-size: 11px; padding: 20px;">
                    <p style="margin-bottom: 20px; color: var(--text-error)">[ SYSTEM SHUTDOWN COMPLETE ]</p>
                    <p style="margin-bottom: 20px; font-family: var(--font-ui); font-size: 13px;">The CPU has powered down. You may now close this browser tab.</p>
                    <button class="retro-btn highlight" onclick="window.location.reload();">REBOOT SYSTEM</button>
                </div>
            `;
            line.remove();
        }, 300);
    }, 1200);
}

// --- GENERAL OS CLOCK & PERFORMANCE COUNTERS ---
function startSystemClock() {
    setInterval(() => {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        const clockEl = document.getElementById("system-clock");
        if (clockEl) {
            clockEl.textContent = `${hrs}:${mins}:${secs}`;
        }
    }, 1000);
}

function simulateSystemMetrics() {
    setInterval(() => {
        const cpuText = document.getElementById("cpu-text");
        const cpuBar = document.getElementById("cpu-bar");
        const ramText = document.getElementById("ram-text");
        const ramBar = document.getElementById("ram-bar");

        if (!cpuText || !cpuBar || !ramText || !ramBar) return;

        // Random slight fluctuation for realism
        const activeWindowCount = document.querySelectorAll(".window:not(.hidden)").length;
        const baseCpu = activeWindowCount * 8 + 5; // CPU based on active tasks
        const randomCpu = Math.floor(Math.random() * 12) + baseCpu;
        const clampedCpu = Math.min(99, Math.max(2, randomCpu));

        cpuText.textContent = `${clampedCpu}%`;
        cpuBar.style.width = `${clampedCpu}%`;

        const baseRam = activeWindowCount * 4 + 32;
        const randomRam = Math.floor(Math.random() * 4) + baseRam;
        const clampedRam = Math.min(99, Math.max(10, randomRam));

        ramText.textContent = `${clampedRam}%`;
        ramBar.style.width = `${clampedRam}%`;
    }, 2500);
}

// Start Menu Interactions
function initStartMenu() {
    const startBtn = document.getElementById("start-btn");
    const startMenu = document.getElementById("start-menu");

    if (!startBtn || !startMenu) return;

    startBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        startMenu.classList.toggle("hidden");
        startBtn.classList.toggle("active");
        SoundSynth.playBeep(700, 0.05);
    });

    document.addEventListener("click", () => {
        startMenu.classList.add("hidden");
        startBtn.classList.remove("active");
    });

    startMenu.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing when clicking inside
    });

    // Add start item handlers
    document.querySelectorAll(".start-item").forEach(item => {
        item.addEventListener("click", () => {
            const action = item.dataset.action;
            const app = item.dataset.app;

            if (action === "open-app" && app) {
                openApplication(app);
            } else if (action === "shutdown") {
                triggerShutdownSequence();
            }
            startMenu.classList.add("hidden");
            startBtn.classList.remove("active");
        });
    });
}

// Icon Click & Launch Handlers
function initDesktopIcons() {
    document.querySelectorAll(".desktop-icon").forEach(icon => {
        // Selection highlights
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelectorAll(".desktop-icon").forEach(i => i.classList.remove("selected"));
            icon.classList.add("selected");
            SoundSynth.playKeyClick(false);
        });

        // Launch on double click
        icon.addEventListener("dblclick", () => {
            const app = icon.dataset.app;
            if (app) openApplication(app);
        });

        // Touch support: single tap to select, double tap simulation (or simple tap to open on mobile)
        let lastTap = 0;
        icon.addEventListener("touchend", (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            const app = icon.dataset.app;

            document.querySelectorAll(".desktop-icon").forEach(i => i.classList.remove("selected"));
            icon.classList.add("selected");

            if (tapLength < 300 && tapLength > 0) {
                // Double tap detected
                if (app) openApplication(app);
                e.preventDefault();
            } else {
                // Single tap: on small screen, select is fine, but let's make it responsive
                // If it's a mobile viewport, single tap can open immediately to make it user-friendly
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        if (app) openApplication(app);
                    }, 200);
                }
            }
            lastTap = currentTime;
        });
    });

    // Deselect icons when clicking desktop empty space
    document.getElementById("desktop").addEventListener("click", () => {
        document.querySelectorAll(".desktop-icon").forEach(i => i.classList.remove("selected"));
    });
}

// --- SOUND CONTROL HANDLER ---
function initSoundToggleTaskbar() {
    const soundToggle = document.getElementById("sound-toggle");
    if (soundToggle) {
        soundToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!audioCtx) {
                // First click interaction enables audio context
                SoundSynth.init();
            }
            // Toggle sound state
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                soundToggle.classList.add("highlight");
                document.getElementById("sound-icon").textContent = "🔊";
                SoundSynth.playBeep(800, 0.05);
            } else {
                soundToggle.classList.remove("highlight");
                document.getElementById("sound-icon").textContent = "🔇";
            }
            // Re-apply Twemoji after text content change
            applyTwemoji(soundToggle);
        });
    }
}

// --- MS PAINT APP LOGIC ---
function initPaintApp() {
    const canvas = document.getElementById("paint-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    // Set explicit size matching the parent
    canvas.width = container.clientWidth || 450;
    canvas.height = container.clientHeight || 280;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let drawColor = "#f4ffb2";
    let drawSize = 4;
    let drawMode = "brush"; // brush or eraser

    // Set initial canvas background
    ctx.fillStyle = "#1a1b16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Setup drawing styles
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        lastX = clientX - rect.left;
        lastY = clientY - rect.top;
    }

    function draw(e) {
        if (!isDrawing) return;
        if (e.cancelable) e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        const currentX = clientX - rect.left;
        const currentY = clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);

        ctx.strokeStyle = drawMode === "eraser" ? "#1a1b16" : drawColor;
        ctx.lineWidth = drawSize;
        ctx.stroke();

        lastX = currentX;
        lastY = currentY;
    }

    function stopDrawing() {
        isDrawing = false;
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing, { passive: true });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing);

    // Setup toolbar listeners
    const btnBrush = document.getElementById("paint-btn-brush");
    const btnEraser = document.getElementById("paint-btn-eraser");
    const btnClear = document.getElementById("paint-btn-clear");
    const sizeSelect = document.getElementById("paint-size-select");
    const swatches = document.querySelectorAll(".paint-color-swatch");

    if (btnBrush) {
        btnBrush.addEventListener("click", () => {
            drawMode = "brush";
            btnBrush.classList.add("highlight", "active");
            if (btnEraser) btnEraser.classList.remove("highlight", "active");
            SoundSynth.playBeep(700, 0.05);
        });
    }

    if (btnEraser) {
        btnEraser.addEventListener("click", () => {
            drawMode = "eraser";
            btnEraser.classList.add("highlight", "active");
            if (btnBrush) btnBrush.classList.remove("highlight", "active");
            SoundSynth.playBeep(600, 0.05);
        });
    }

    if (btnClear) {
        btnClear.addEventListener("click", () => {
            ctx.fillStyle = "#1a1b16";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            SoundSynth.playBeep(400, 0.1);
        });
    }

    if (sizeSelect) {
        sizeSelect.addEventListener("change", (e) => {
            drawSize = parseInt(e.target.value);
            SoundSynth.playBeep(800, 0.04);
        });
    }

    swatches.forEach(swatch => {
        swatch.addEventListener("click", () => {
            swatches.forEach(s => s.classList.remove("active"));
            swatch.classList.add("active");
            drawColor = swatch.dataset.color;
            drawMode = "brush";
            if (btnBrush) btnBrush.classList.add("highlight", "active");
            if (btnEraser) btnEraser.classList.remove("highlight", "active");
            SoundSynth.playBeep(900, 0.04);
        });
    });
}

// --- CPS TESTER APP LOGIC ---
function initCpsTesterApp() {
    const clickArea = document.getElementById("cps-click-area");
    const timerEl = document.getElementById("cps-timer");
    const countEl = document.getElementById("cps-count");
    const highEl = document.getElementById("cps-high");
    const resultEl = document.getElementById("cps-result");
    const resetBtn = document.getElementById("cps-btn-reset");

    if (!clickArea) return;

    let clicks = 0;
    let startTime = null;
    let timerInterval = null;
    let testDuration = 5000; // 5 seconds
    let isRunning = false;
    let isFinished = false;

    // Load highscore
    let highscore = parseFloat(localStorage.getItem("froglock_cps_high") || "0.0");
    if (highEl) highEl.textContent = highscore.toFixed(1);

    function startTest() {
        isRunning = true;
        clicks = 1;
        startTime = Date.now();
        if (countEl) countEl.textContent = clicks;
        if (clickArea) clickArea.textContent = "CLICK FAST!";
        if (resultEl) resultEl.textContent = "";

        timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, (testDuration - elapsed) / 1000);

            if (timerEl) timerEl.textContent = `${remaining.toFixed(1)}s`;

            if (elapsed >= testDuration) {
                endTest();
            }
        }, 100);

        SoundSynth.playBeep(700, 0.05);
    }

    function endTest() {
        isRunning = false;
        isFinished = true;
        clearInterval(timerInterval);

        const cps = clicks / (testDuration / 1000);

        if (timerEl) timerEl.textContent = "0.0s";
        if (clickArea) clickArea.textContent = "TEST OVER";
        if (resultEl) resultEl.textContent = `${cps.toFixed(1)} CPS`;

        // Save highscore
        if (cps > highscore) {
            highscore = cps;
            localStorage.setItem("froglock_cps_high", highscore.toString());
            if (highEl) highEl.textContent = highscore.toFixed(1);
            if (resultEl) resultEl.textContent += " (NEW HIGH!)";

            SoundSynth.playBeep(880, 0.08);
            setTimeout(() => SoundSynth.playBeep(1100, 0.12), 70);
        } else {
            SoundSynth.playBeep(440, 0.15);
        }
    }

    function handleClick(e) {
        if (isFinished) return;

        if (!isRunning) {
            startTest();
        } else {
            clicks++;
            if (countEl) countEl.textContent = clicks;
            SoundSynth.playKeyClick(false);
        }

        clickArea.style.transform = "scale(0.97)";
        setTimeout(() => {
            clickArea.style.transform = "none";
        }, 50);
    }

    function resetTest() {
        clearInterval(timerInterval);
        isRunning = false;
        isFinished = false;
        clicks = 0;
        if (timerEl) timerEl.textContent = "5.0s";
        if (countEl) countEl.textContent = "0";
        if (clickArea) clickArea.textContent = "CLICK TO START TEST";
        if (resultEl) resultEl.textContent = "";
        SoundSynth.playBeep(520, 0.08);
    }

    clickArea.addEventListener("mousedown", handleClick);
    clickArea.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleClick(e);
    }, { passive: false });

    if (resetBtn) {
        resetBtn.addEventListener("click", resetTest);
    }
}

// Document Load Initiator
document.addEventListener("DOMContentLoaded", () => {
    startSystemClock();
    initStartMenu();
    initDesktopIcons();
    initSoundToggleTaskbar();

    // Apply Twitter emojis to the full initial document
    applyTwemoji(document.body);

    // Wire up the skip boot button
    const skipBtn = document.getElementById("btn-skip-boot");
    if (skipBtn) {
        skipBtn.addEventListener("click", () => {
            completeBoot();
        });
    }

    // Power On button handler
    const powerOnBtn = document.getElementById("btn-power-on");
    const bootPrompt = document.getElementById("boot-prompt");
    if (powerOnBtn && bootPrompt) {
        powerOnBtn.addEventListener("click", () => {
            // Initialize AudioContext right on click
            SoundSynth.init();

            // Hide boot prompt
            bootPrompt.classList.add("hidden");

            // Start the boot sequence
            runBootSequence();
        });
    } else {
        // Fallback if elements don't exist
        runBootSequence();
    }

    // Universal keypress click sound listener (makes typing feel realistic)
    document.addEventListener("keydown", (e) => {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") {
            SoundSynth.playKeyClick(false);
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") {
            SoundSynth.playKeyClick(true);
        }
    });
});
