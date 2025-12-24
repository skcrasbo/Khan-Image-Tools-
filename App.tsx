
import React, { useState, useMemo } from 'react';
import { 
  Search, Sliders, Image as ImageIcon, PieChart, Palette, Zap, 
  Terminal, Activity, Aperture, Crop, Grid, Layers, Sun, Type, 
  Maximize2, Scissors, Eye, RotateCw, RefreshCw, Moon, 
  CircleDashed, Droplets, Mountain, Ghost, Film, Watch, 
  Stamp, Triangle, Monitor, Droplet, Circle, Pipette, 
  LayoutGrid, Copy, PaintBucket, Expand, Minimize, Eraser, 
  Wand2, Move, Split, Square, FileType, FileJson, Binary, 
  ArrowRightLeft, BarChartHorizontal, BarChart2, LineChart, 
  ScatterChart, Radar, FileCode, FileDigit, ImagePlus,
  Shuffle, Merge, GitFork, ArrowDownCircle, ArrowUpCircle,
  CircleDot, Hash, Tv, Dices, Info, ShieldCheck, HeartPulse,
  Mail, Scale, Home, Menu, X, CheckCircle2, AlertTriangle,
  Send, Database, Lock, Cpu, Globe, Rocket
} from 'lucide-react';
import SmokeEffect from './components/SmokeEffect';
import Editor from './components/Editor';
import AdSlot from './components/AdSlot';
import { ToolCategory, ToolDefinition } from './types';

const ALL_TOOLS: ToolDefinition[] = [
  // --- FILTERS ---
  { id: 'black_white', name: 'Black/White', description: 'Threshold', category: ToolCategory.FILTER, icon: 'CircleDashed' },
  { id: 'blur', name: 'Blur', description: 'Soften focus', category: ToolCategory.FILTER, icon: 'Droplets' },
  { id: 'brightness', name: 'Brightness', description: 'Adjust light', category: ToolCategory.FILTER, icon: 'Sun' },
  { id: 'brownie', name: 'Brownie', description: 'Vintage box', category: ToolCategory.FILTER, icon: 'Layers' },
  { id: 'contrast', name: 'Contrast', description: 'Boost diff', category: ToolCategory.FILTER, icon: 'CircleDashed' },
  { id: 'darken', name: 'Darken', description: 'Reduce light', category: ToolCategory.FILTER, icon: 'Moon' },
  { id: 'emboss', name: 'Emboss', description: '3D effect', category: ToolCategory.FILTER, icon: 'Stamp' },
  { id: 'exposure', name: 'Exposure', description: 'Cam setting', category: ToolCategory.FILTER, icon: 'Zap' },
  { id: 'gamma', name: 'Gamma', description: 'Correction', category: ToolCategory.FILTER, icon: 'Activity' },
  { id: 'grayscale', name: 'Grayscale', description: 'No color', category: ToolCategory.FILTER, icon: 'Ghost' },
  { id: 'hsl', name: 'HSL', description: 'Full control', category: ToolCategory.FILTER, icon: 'Sliders' },
  { id: 'hue', name: 'Hue', description: 'Shift color', category: ToolCategory.FILTER, icon: 'RotateCw' },
  { id: 'invert', name: 'Invert', description: 'Negative', category: ToolCategory.FILTER, icon: 'RefreshCw' },
  { id: 'kodachrome', name: 'Kodachrome', description: 'Rich film', category: ToolCategory.FILTER, icon: 'Aperture' },
  { id: 'lighten', name: 'Lighten', description: 'Add light', category: ToolCategory.FILTER, icon: 'Sun' },
  { id: 'noise', name: 'Noise', description: 'Grain', category: ToolCategory.FILTER, icon: 'Monitor' },
  { id: 'pixelate', name: 'Pixelate', description: '8-bit', category: ToolCategory.FILTER, icon: 'Grid' },
  { id: 'polaroid', name: 'Polaroid', description: 'Instant', category: ToolCategory.FILTER, icon: 'ImageIcon' },
  { id: 'saturation', name: 'Saturation', description: 'Intensity', category: ToolCategory.FILTER, icon: 'Droplet' },
  { id: 'sepia', name: 'Sepia', description: 'Old paper', category: ToolCategory.FILTER, icon: 'Watch' },
  { id: 'sharpen', name: 'Sharpen', description: 'Crisp edges', category: ToolCategory.FILTER, icon: 'Triangle' },
  { id: 'technicolor', name: 'Technicolor', description: 'Vibrant', category: ToolCategory.FILTER, icon: 'Film' },
  { id: 'vibrance', name: 'Vibrance', description: 'Smart sat', category: ToolCategory.FILTER, icon: 'Activity' },
  { id: 'vintage', name: 'Vintage', description: 'Retro', category: ToolCategory.FILTER, icon: 'Watch' },

  // --- MANIPULATION ---
  { id: 'flip', name: 'Flip Image', description: 'Mirror H/V', category: ToolCategory.MANIPULATION, icon: 'RotateCw' },
  { id: 'rotate', name: 'Rotate Image', description: 'Turn 90/180', category: ToolCategory.MANIPULATION, icon: 'RefreshCw' },
  { id: 'add_border', name: 'Add Border', description: 'Frame it', category: ToolCategory.MANIPULATION, icon: 'Square' },
  { id: 'crop', name: 'Crop', description: 'Trim edges', category: ToolCategory.MANIPULATION, icon: 'Crop' },
  { id: 'crop_circle', name: 'Crop Circle', description: 'Round clip', category: ToolCategory.MANIPULATION, icon: 'Circle' },
  { id: 'color_palette', name: 'Color Palette', description: 'Extract swatches', category: ToolCategory.MANIPULATION, icon: 'Palette' },
  { id: 'image_color_picker', name: 'Image Color Picker', description: 'Identify hex', category: ToolCategory.MANIPULATION, icon: 'Pipette' },
  { id: 'chessboard', name: 'Chessboard', description: 'Check pattern', category: ToolCategory.MANIPULATION, icon: 'LayoutGrid' },
  { id: 'duplicate', name: 'Duplicate', description: 'Clone side-by-side', category: ToolCategory.MANIPULATION, icon: 'Copy' },
  { id: 'fill_transparent', name: 'Fill Transparent', description: 'Solidify alpha', category: ToolCategory.MANIPULATION, icon: 'PaintBucket' },
  { id: 'grid_overlay', name: 'Grid Overlay', description: 'Guide lines', category: ToolCategory.MANIPULATION, icon: 'Grid' },
  { id: 'increase_space', name: 'Increase Space', description: 'Add canvas', category: ToolCategory.MANIPULATION, icon: 'Expand' },
  { id: 'overlay', name: 'Overlay', description: 'Tint layer', category: ToolCategory.MANIPULATION, icon: 'Layers' },
  { id: 'remove_border', name: 'Remove Border', description: 'Shrink canvas', category: ToolCategory.MANIPULATION, icon: 'Minimize' },
  { id: 'remove_color', name: 'Remove Color', description: 'Erase hue', category: ToolCategory.MANIPULATION, icon: 'Eraser' },
  { id: 'remove_white_bg', name: 'Remove White BG', description: 'Transparent', category: ToolCategory.MANIPULATION, icon: 'Wand2' },
  { id: 'replace_color', name: 'Replace Color', description: 'Swap hues', category: ToolCategory.MANIPULATION, icon: 'RefreshCw' },
  { id: 'resize', name: 'Resize', description: 'Scale dimensions', category: ToolCategory.MANIPULATION, icon: 'Maximize2' },
  { id: 'round_corners', name: 'Round Corners', description: 'Smooth edges', category: ToolCategory.MANIPULATION, icon: 'Crop' },
  { id: 'shift', name: 'Shift', description: 'Move offset', category: ToolCategory.MANIPULATION, icon: 'Move' },
  { id: 'symmetric', name: 'Symmetric', description: 'Mirror half', category: ToolCategory.MANIPULATION, icon: 'Split' },

  // --- CONVERSION ---
  { id: 'base64_to_image', name: 'Base64 to Image', description: 'Decode string', category: ToolCategory.CONVERSION, icon: 'FileCode' },
  { id: 'image_to_base64', name: 'Image to Base64', description: 'Encode string', category: ToolCategory.CONVERSION, icon: 'FileDigit' },
  { id: 'jpg_to_png', name: 'JPG to PNG', description: 'Format swap', category: ToolCategory.CONVERSION, icon: 'ImagePlus' },
  { id: 'jpg_to_webp', name: 'JPG to WEBP', description: 'Modernize', category: ToolCategory.CONVERSION, icon: 'ArrowRightLeft' },
  { id: 'png_to_jpg', name: 'PNG to JPG', description: 'Flatten', category: ToolCategory.CONVERSION, icon: 'FileType' },
  { id: 'png_to_webp', name: 'PNG to WEBP', description: 'Optimize', category: ToolCategory.CONVERSION, icon: 'Binary' },
  { id: 'webp_to_jpg', name: 'WEBP to JPG', description: 'Legacy support', category: ToolCategory.CONVERSION, icon: 'FileJson' },
  { id: 'webp_to_png', name: 'WEBP to PNG', description: 'Lossless', category: ToolCategory.CONVERSION, icon: 'Layers' },

  // --- CHARTS ---
  { id: 'area_chart', name: 'Area Chart', description: 'Filled trend', category: ToolCategory.CHART, icon: 'Activity' },
  { id: 'bubble_chart', name: 'Bubble Chart', description: '3D Points', category: ToolCategory.CHART, icon: 'CircleDashed' },
  { id: 'doughnut_chart', name: 'Doughnut', description: 'Ring chart', category: ToolCategory.CHART, icon: 'Circle' },
  { id: 'half_doughnut_chart', name: 'Half Doughnut', description: 'Gauge style', category: ToolCategory.CHART, icon: 'Sun' },
  { id: 'horizontal_bar_chart', name: 'Horiz. Bar', description: 'Row comparison', category: ToolCategory.CHART, icon: 'BarChartHorizontal' },
  { id: 'horizontal_stacked_bar_chart', name: 'H. Stacked Bar', description: 'Segmented rows', category: ToolCategory.CHART, icon: 'BarChartHorizontal' },
  { id: 'line_chart', name: 'Line Chart', description: 'Trends', category: ToolCategory.CHART, icon: 'LineChart' },
  { id: 'pie_chart', name: 'Pie Chart', description: 'Circular ratio', category: ToolCategory.CHART, icon: 'PieChart' },
  { id: 'polar_area_chart', name: 'Polar Area', description: 'Radial segments', category: ToolCategory.CHART, icon: 'Aperture' },
  { id: 'radar_chart', name: 'Radar Chart', description: 'Spider web', category: ToolCategory.CHART, icon: 'Radar' },
  { id: 'scatter_chart', name: 'Scatter Chart', description: 'XY distribution', category: ToolCategory.CHART, icon: 'ScatterChart' },
  { id: 'vertical_bar_chart', name: 'Vertical Bar', description: 'Column comparison', category: ToolCategory.CHART, icon: 'BarChart2' },
  { id: 'vertical_stacked_bar_chart', name: 'V. Stacked Bar', description: 'Segmented cols', category: ToolCategory.CHART, icon: 'BarChart2' },
];

const IconMap: Record<string, React.FC<any>> = {
  Search, Sliders, ImageIcon, PieChart, Palette, Zap, 
  Terminal, Activity, Aperture, Crop, Grid, Layers, Sun, Type, 
  Maximize2, Scissors, Eye, RotateCw, RefreshCw, Moon,
  CircleDashed, Droplets, Mountain, Ghost, Film, Watch,
  Stamp, Triangle, Monitor, Droplet, Circle, Pipette,
  LayoutGrid, Copy, PaintBucket, Expand, Minimize, Eraser,
  Wand2, Move, Split, Square, FileType, FileJson, Binary,
  ArrowRightLeft, BarChartHorizontal, BarChart2, LineChart,
  ScatterChart, Radar, FileCode, FileDigit, ImagePlus,
  Shuffle, Merge, GitFork, ArrowDownCircle, ArrowUpCircle,
  CircleDot, Hash, Tv, Dices
};

const Logo: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div className="flex items-center gap-4 group cursor-pointer" onClick={onClick}>
    <div className="relative">
      <div className="w-12 h-12 bg-[#050505] border-2 border-red-900/50 rounded flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.15)] group-hover:shadow-[0_0_30px_rgba(255,0,0,0.3)] group-hover:border-red-600 transition-all duration-500 overflow-hidden">
        <svg viewBox="0 0 32 32" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
          <path 
            d="M9 7h3v7.5L18.5 7H22l-7.5 9 8 9h-3.5l-7-8V25H9V7z" 
            fill="#ff0000" 
            className="group-hover:animate-pulse"
          />
        </svg>
      </div>
    </div>
    <div>
      <h1 className="text-2xl font-black tracking-tighter text-white uppercase flex flex-col leading-none">
        KHAN <span className="text-red-600 text-sm tracking-[0.3em]">IMAGE TOOLS</span>
      </h1>
    </div>
  </div>
);

type View = 'HOME' | 'ABOUT' | 'PRIVACY' | 'CONTACT' | 'TERMS';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [activeTool, setActiveTool] = useState<ToolDefinition | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const categories = ["ALL", ...Object.values(ToolCategory)];

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter(t => {
       const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
       const matchesCat = activeCategory === "ALL" || t.category === activeCategory;
       return matchesSearch && matchesCat;
    });
  }, [searchTerm, activeCategory]);

  const handleNav = (view: View) => {
    setCurrentView(view);
    setActiveTool(null);
    setIsMobileMenuOpen(false);
    setFormSent(false);
    window.scrollTo(0, 0);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const PageHeader = () => (
    <header className="w-full py-6 px-6 flex flex-col md:flex-row justify-between items-center border-b border-red-900/30 bg-black/40 backdrop-blur-sm sticky top-0 z-50">
       <div className="flex items-center justify-between w-full md:w-auto">
          <Logo onClick={() => handleNav('HOME')} />
          <button className="md:hidden text-red-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
       </div>

       <nav className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-20 md:top-0 left-0 w-full md:w-auto bg-black md:bg-transparent p-6 md:p-0 border-b border-red-900/30 md:border-none gap-6 items-center z-50`}>
          <button onClick={() => handleNav('HOME')} className={`text-xs font-bold font-mono tracking-widest flex items-center gap-2 ${currentView === 'HOME' ? 'text-red-500 underline underline-offset-8' : 'text-neutral-500 hover:text-red-400'}`}>
             <Home size={14} /> HOME
          </button>
          <button onClick={() => handleNav('ABOUT')} className={`text-xs font-bold font-mono tracking-widest flex items-center gap-2 ${currentView === 'ABOUT' ? 'text-red-500 underline underline-offset-8' : 'text-neutral-500 hover:text-red-400'}`}>
             <Info size={14} /> ABOUT
          </button>
          <button onClick={() => handleNav('PRIVACY')} className={`text-xs font-bold font-mono tracking-widest flex items-center gap-2 ${currentView === 'PRIVACY' ? 'text-red-500 underline underline-offset-8' : 'text-neutral-500 hover:text-red-400'}`}>
             <ShieldCheck size={14} /> PRIVACY
          </button>
          <button onClick={() => handleNav('CONTACT')} className={`text-xs font-bold font-mono tracking-widest flex items-center gap-2 ${currentView === 'CONTACT' ? 'text-red-500 underline underline-offset-8' : 'text-neutral-500 hover:text-red-400'}`}>
             <Mail size={14} /> CONTACT
          </button>
       </nav>

       {currentView === 'HOME' && !activeTool && (
         <div className="flex items-center gap-2 bg-black border border-red-900/50 rounded-full px-4 py-2 w-full md:w-64 focus-within:border-red-500 transition shadow-inner mt-4 md:mt-0">
             <Search size={16} className="text-red-500" />
             <input 
               type="text" 
               placeholder="SEARCH TOOLS..." 
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="bg-transparent border-none outline-none text-xs w-full text-red-100 placeholder-red-900/50 font-mono"
             />
         </div>
       )}
    </header>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 overflow-x-hidden font-sans selection:bg-red-900 selection:text-white">
      <SmokeEffect />

      {activeTool ? (
        <Editor tool={activeTool} onBack={() => setActiveTool(null)} />
      ) : (
        <div className="relative z-10 flex flex-col items-center min-h-screen">
          
          <PageHeader />

          <main className="w-full max-w-7xl flex-1 px-4 py-8">
            {currentView === 'HOME' && (
              <div className="animate-fade-in">
                <div className="w-full mb-8 overflow-x-auto pb-4 scrollbar-hide">
                   <div className="flex gap-2">
                       {categories.map(cat => (
                           <button 
                             key={cat}
                             onClick={() => setActiveCategory(cat)}
                             className={`px-6 py-2 rounded-full text-[10px] font-bold font-mono transition whitespace-nowrap ${activeCategory === cat ? 'bg-red-700 text-white shadow-[0_0_15px_rgba(200,0,0,0.4)]' : 'bg-neutral-900 text-neutral-500 hover:text-red-400'}`}
                           >
                               {cat.replace('_', ' ')}
                           </button>
                       ))}
                   </div>
                </div>

                {/* ADS ABOVE TOOLS GRID */}
                <div className="w-full flex justify-center mb-10">
                   <AdSlot type="leaderboard" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredTools.map((tool) => {
                    const Icon = IconMap[tool.icon] || Zap;

                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool)}
                        title={tool.description}
                        className="group relative bg-[#0a0a0a] border border-red-900/20 p-6 flex flex-col items-center justify-center gap-4 rounded-xl hover:bg-[#110505] hover:border-red-600/50 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="p-3 bg-black rounded-lg border border-red-900/10 text-red-900 group-hover:text-red-500 group-hover:border-red-600/50 transition shadow-inner">
                          <Icon size={24} />
                        </div>
                        <div className="text-center z-10">
                          <h3 className="font-bold text-sm text-neutral-300 group-hover:text-red-100 transition-colors uppercase">{tool.name}</h3>
                          <p className="text-[10px] text-red-900/70 group-hover:text-red-500/50 font-mono mt-1 transition-colors uppercase tracking-wider">{tool.category}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* ADS AT END OF TOOLS GRID */}
                <div className="w-full flex justify-center mt-12 mb-6">
                   <AdSlot type="leaderboard" />
                </div>
              </div>
            )}

            {currentView === 'ABOUT' && (
              <div className="max-w-5xl mx-auto space-y-16 py-12 animate-fade-in font-mono text-sm leading-relaxed">
                <div className="border-l-4 border-red-600 pl-8 py-6 bg-red-950/5">
                   <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">Laboratory_Overview</h2>
                   <p className="text-red-500 text-xl font-bold uppercase tracking-widest">Khan Image Tools: Zero-Knowledge Image Processing</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 items-start">
                   <section className="space-y-6">
                      <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3"><Cpu size={20} className="text-red-500" /> Advanced Engineering</h3>
                      <p className="text-neutral-400">Khan Image Tools is not a traditional cloud editor. We leverage <strong>browser-side heavy computation</strong> via React and optimized HTML5 Canvas pipelines. Every filter application, format transcoding, and pixel manipulation happens inside your machine's hardware, bypassing the need for remote server processing.</p>
                      <p className="text-neutral-400">This architectural choice ensures two things: absolute privacy and lightning-fast execution regardless of your upload bandwidth.</p>
                   </section>
                   <section className="space-y-6">
                      <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3"><Lock size={20} className="text-red-500" /> Privacy Manifesto</h3>
                      <p className="text-neutral-400">In an era of data mining, your creative assets should be yours alone. Our "No-Server" protocol ensures that not a single byte of your image data is ever uploaded to our infrastructure. Your browser is the only witness to your work.</p>
                      <ul className="text-[10px] text-red-900 space-y-2 uppercase font-bold">
                         <li className="flex items-center gap-2"><CheckCircle2 size={12}/> Zero Upload Latency</li>
                         <li className="flex items-center gap-2"><CheckCircle2 size={12}/> Local RAM Execution</li>
                         <li className="flex items-center gap-2"><CheckCircle2 size={12}/> Permanent Encryption-by-Omission</li>
                      </ul>
                   </section>
                </div>

                <div className="bg-red-950/10 border border-red-900/20 p-12 rounded-xl grid md:grid-cols-3 gap-12">
                   <div className="space-y-4">
                      <Globe size={32} className="text-red-500" />
                      <h4 className="text-white font-bold uppercase">Universal Compatibility</h4>
                      <p className="text-neutral-500 text-xs">Engineered to work across all modern Chromium and WebKit based browsers without additional plugins.</p>
                   </div>
                   <div className="space-y-4">
                      <Rocket size={32} className="text-red-500" />
                      <h4 className="text-white font-bold uppercase">High Fidelity</h4>
                      <p className="text-neutral-500 text-xs">Maintain 100% of your source image quality during conversion. No hidden compression artifacts.</p>
                   </div>
                   <div className="space-y-4">
                      <Database size={32} className="text-red-500" />
                      <h4 className="text-white font-bold uppercase">Open Standards</h4>
                      <p className="text-neutral-500 text-xs">Support for WebP, PNG, and JPEG 1.0 protocols ensuring your results are industry-standard ready.</p>
                   </div>
                </div>

                <div className="border-t border-red-900/20 pt-12">
                   <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-[0.3em]">System_Specs</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[9px] text-neutral-600">
                      <div className="p-4 border border-red-950">CORE: REACT_V19</div>
                      <div className="p-4 border border-red-950">ENGINE: CANVAS_2D_ACCEL</div>
                      <div className="p-4 border border-red-950">STYLING: TAILWIND_JIT</div>
                      <div className="p-4 border border-red-950">SECURITY: CLIENT_ONLY</div>
                   </div>
                </div>
              </div>
            )}

            {currentView === 'PRIVACY' && (
              <div className="max-w-4xl mx-auto space-y-12 py-12 animate-fade-in font-mono text-sm leading-relaxed text-neutral-400">
                <div className="border-b border-red-900/20 pb-8">
                   <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Privacy_Protocol_V3.0</h2>
                   <p className="text-red-500 font-bold mt-2 uppercase tracking-widest text-xs">Last Updated: October 2024</p>
                </div>
                
                <section className="space-y-6">
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest flex items-center gap-2"><Lock size={18} className="text-red-500"/> 1. The Zero-Retention Guarantee</h3>
                  <p>Khan Image Tools functions as a purely client-side application. We do not maintain any backend database or storage solution for your images. When you select a file, it is loaded into your browser's local memory (RAM) and processed using JavaScript. Closing the browser tab immediately purges all working data from your system memory.</p>
                </section>

                <section className="space-y-6">
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest flex items-center gap-2"><Globe size={18} className="text-red-500"/> 2. Third-Party Integration</h3>
                  <p>To keep this tool free for the global creative community, we partner with Google AdSense. Google may use cookies to serve personalized ads. We recommend reviewing the <a href="https://policies.google.com/technologies/ads" className="text-red-500 underline">Google Privacy & Terms</a> to understand their data collection practices.</p>
                </section>

                <section className="space-y-6">
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest">3. Browser Log Analysis</h3>
                  <p>Standard HTTP logs are collected by our hosting provider for security and traffic distribution analysis. This includes anonymized IP addresses and browser fingerprints. This data is never correlated with any image processing actions performed within the app.</p>
                </section>

                <div className="p-6 border border-red-900/40 bg-red-950/10 text-red-500 text-[10px] uppercase font-bold tracking-widest">
                   PRO TIP: For maximum privacy, you can disconnect your internet after loading the site—our tools will continue to function perfectly in offline mode.
                </div>
              </div>
            )}

            {currentView === 'CONTACT' && (
              <div className="max-w-4xl mx-auto space-y-12 py-12 animate-fade-in font-mono text-sm leading-relaxed">
                <div className="border-b border-red-900/20 pb-6">
                   <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Secure Communication Terminal</h2>
                   <p className="text-neutral-500 mt-2 uppercase tracking-widest text-xs flex items-center gap-2"><Database size={12}/> Connection: Encrypted_Client_Channel</p>
                </div>

                {formSent ? (
                   <div className="bg-red-950/20 border border-red-600 p-12 text-center rounded-lg space-y-4 animate-pulse">
                      <CheckCircle2 size={48} className="text-red-500 mx-auto" />
                      <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Transmission Successful</h3>
                      <p className="text-neutral-400">Your message has been encoded and sent to our administrative lab. We will respond via your provided terminal address within 48 hours.</p>
                      <button onClick={() => setFormSent(false)} className="px-6 py-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition uppercase text-xs font-bold">New Transmission</button>
                   </div>
                ) : (
                   <div className="grid md:grid-cols-3 gap-12">
                      <div className="md:col-span-2 space-y-8">
                         <form onSubmit={handleContactSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                               <div className="space-y-2">
                                  <label className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Subject_Identify</label>
                                  <input required type="text" placeholder="Full Name" className="w-full bg-black border border-red-900/40 p-4 text-white focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] outline-none transition rounded" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Terminal_Address</label>
                                  <input required type="email" placeholder="Email Address" className="w-full bg-black border border-red-900/40 p-4 text-white focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] outline-none transition rounded" />
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Inquiry_Priority</label>
                               <input required type="text" placeholder="Subject" className="w-full bg-black border border-red-900/40 p-4 text-white focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] outline-none transition rounded" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Transmission_Data</label>
                               <textarea required rows={6} placeholder="Type your message here..." className="w-full bg-black border border-red-900/40 p-4 text-white focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] outline-none transition rounded resize-none" />
                            </div>
                            <button type="submit" className="w-full py-4 bg-red-900 hover:bg-red-700 text-white font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition shadow-lg group">
                               <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                               Send_Transmission
                            </button>
                         </form>
                      </div>

                      <div className="space-y-8">
                         <div className="bg-[#0a0a0a] border border-red-900/20 p-6 space-y-4 rounded">
                            <h4 className="text-red-500 font-bold text-xs uppercase tracking-widest">System_Logs</h4>
                            <div className="text-[9px] font-mono text-neutral-600 space-y-1">
                               <p>> Initializing secure channel...</p>
                               <p>> Node: KHAN_HQ_ASIA</p>
                               <p>> Status: Awaiting_Input</p>
                               <p>> Latency: 12ms</p>
                            </div>
                         </div>
                         <div className="bg-[#0a0a0a] border border-red-900/20 p-6 space-y-4 rounded">
                            <h4 className="text-red-500 font-bold text-xs uppercase tracking-widest">Support_Policy</h4>
                            <p className="text-[10px] text-neutral-500 leading-relaxed">Our support team operates under standard lab hours. Responses are delivered via encrypted protocol to the terminal address provided.</p>
                         </div>
                      </div>
                   </div>
                )}
              </div>
            )}

            {currentView === 'TERMS' && (
              <div className="max-w-4xl mx-auto space-y-12 py-12 animate-fade-in font-mono text-sm leading-relaxed text-neutral-400">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter border-b border-red-900/20 pb-6">Terms of Service</h2>
                <section className="space-y-6">
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest">1. Acceptable Use</h3>
                  <p>By accessing Khan Image Tools, you agree to use our Service only for lawful purposes. You are prohibited from using the tool to process material that is infringing, libelous, obscene, or otherwise offensive.</p>
                </section>

                <section className="space-y-6">
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest flex items-center gap-2"><AlertTriangle size={18} className="text-red-500" /> 2. Disclaimer of Warranties</h3>
                  <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted or error-free, nor do we make any warranty as to the results that may be obtained from the use of the Service.</p>
                </section>

                <section className="space-y-6">
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest">3. Limitation of Liability</h3>
                  <p>In no event shall Khan Image Tools, its developers, or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service.</p>
                </section>
              </div>
            )}
          </main>

          <footer className="w-full bg-[#030303] border-t border-red-900/30 pt-16 pb-32">
             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <Logo />
                    <p className="text-[10px] font-mono text-neutral-600 leading-relaxed uppercase tracking-widest">Advanced browser-based manipulation lab. 100% Client-side. 100% Privacy Focused.</p>
                </div>
                
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-4">NAVIGATE</h4>
                    <ul className="space-y-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        <li><button onClick={() => handleNav('HOME')} className="hover:text-red-400 transition">/HOME_DASHBOARD</button></li>
                        <li><button onClick={() => handleNav('ABOUT')} className="hover:text-red-400 transition">/ABOUT_ENGINE</button></li>
                        <li><button onClick={() => handleNav('CONTACT')} className="hover:text-red-400 transition">/SEND_INQUIRY</button></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-4">PROTOCOLS</h4>
                    <ul className="space-y-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        <li><button onClick={() => handleNav('PRIVACY')} className="hover:text-red-400 transition">/PRIVACY_MANIFESTO</button></li>
                        <li><button onClick={() => handleNav('TERMS')} className="hover:text-red-400 transition">/USAGE_TERMS</button></li>
                    </ul>
                </div>

                <div className="space-y-4">
                   <h4 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-4">SECURITY</h4>
                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-neutral-600">
                         <ShieldCheck size={12} className="text-green-900" />
                         <span className="text-[9px] font-mono">ENCRYPTED_JS_EXECUTION</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-600">
                         <HeartPulse size={12} className="text-red-900" />
                         <span className="text-[9px] font-mono">NON_STORAGE_SESSIONS</span>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="mt-20 text-center text-neutral-800 text-[8px] font-mono tracking-[0.5em] uppercase border-t border-red-950/10 pt-8">
                &copy; {new Date().getFullYear()} KHAN_IMAGE_LABS // ACCESSED_FROM_IP_LOGGED
             </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
