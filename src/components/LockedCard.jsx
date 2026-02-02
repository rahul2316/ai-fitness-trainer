export default function LockedCard({ title }) {
    return (
      <div className="relative bg-card p-6 rounded-xl opacity-60">
        <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
          <span className="bg-accent text-black px-4 py-2 rounded-lg text-sm">
            Upgrade Required 🔒
          </span>
        </div>
  
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-2">
          This feature is locked in your current plan
        </p>
      </div>
    );
  }
  