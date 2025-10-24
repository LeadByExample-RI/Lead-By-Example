interface ProgressBarProps {
  raised: number;
  goal: number;
  percentage: number;
  daysLeft?: number;
}

export default function ProgressBar({ raised, goal, percentage, daysLeft }: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-600">Progress</span>
        <span className="text-sm font-bold text-royal-purple">
          ${raised.toLocaleString()} / ${goal.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-royal-purple to-gold h-full rounded-full 
                     transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage}% funded`}
        />
      </div>
      {daysLeft !== undefined && (
        <p className="text-xs text-gray-500 mt-1">
          {percentage}% funded • {daysLeft} days left
        </p>
      )}
    </div>
  );
}
