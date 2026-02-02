import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function PlanCard({
  title,
  price,
  features,
  active,
  highlight,
  onSelect,
  description,
  icon
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`glass p-10 rounded-[3rem] border-2 transition-all duration-500 relative overflow-hidden group flex flex-col
        ${highlight ? "border-accent/40 shadow-2xl shadow-accent/10" : "border-white/5"}
        ${active ? "border-accent ring-1 ring-accent/20" : "hover:border-white/20"}`}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>

      <div className="mb-8 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${active ? 'bg-accent/20 border-accent/20' : 'bg-white/5 border-white/10 group-hover:bg-accent/10'}`}>
          <div className={active ? 'text-accent' : 'text-muted group-hover:text-accent'}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{title}</h3>
          <p className="text-[8px] font-black text-accent uppercase tracking-[0.3em]">Clearance: {active ? 'AUTHORIZED' : 'LOCKED'}</p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-4xl font-black text-white italic tracking-tighter mb-2">{price}</p>
        <p className="text-[10px] text-muted font-bold uppercase tracking-tight leading-relaxed">{description}</p>
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 group/item">
            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${active ? 'text-accent' : 'text-muted group-hover/item:text-accent'}`} />
            <span className="text-xs font-bold text-white/80 uppercase tracking-tight leading-tight group-hover/item:text-white transition-colors">{f}</span>
          </li>
        ))}
      </ul>

      {active ? (
        <div className="w-full py-4 text-center glass border-accent/20 text-accent rounded-3xl font-black uppercase tracking-widest text-[10px] italic shadow-inner">
          PROTOCOL ACTIVE
        </div>
      ) : (
        <button
          onClick={onSelect}
          className="w-full bg-white text-black py-4 rounded-3xl font-black uppercase tracking-tighter hover:bg-accent transition-all text-xs italic shadow-xl shadow-white/5"
        >
          SELECT PROTOCOL
        </button>
      )}
    </motion.div>
  );
}
