type SkeletonProps = {
	rows?: number;
	className?: string;
};

export default function Skeleton({ rows = 3, className = "" }: SkeletonProps) {
	return (
		<div className={`animate-pulse space-y-4 ${className}`} data-testid="loading-skeleton">
			{Array.from({ length: rows }).map((_, i) => (
				<div key={`skeleton-${Date.now()}-${i}`} className="flex flex-col gap-2">
					<div className="h-5 bg-gray-200 rounded w-3/4" />
					<div className="h-4 bg-gray-200 rounded w-full" />
					<div className="h-4 bg-gray-200 rounded w-1/2" />
				</div>
			))}
		</div>
	);
}
