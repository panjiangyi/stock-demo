import { Skeleton, Box, Stack, Grid } from '@mui/material'

interface StatementsPageSkeletonProps {
  // No props needed for skeleton
}

export default function StatementsPageSkeleton({}: StatementsPageSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="bg-white p-4 rounded-lg shadow-sm">
        <Skeleton variant="text" width="60%" height={32} className="text-xl font-medium" />
      </header>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <Skeleton variant="rectangular" width={80} height={28} className="rounded text-sm font-medium" />
          <Skeleton variant="rectangular" width={60} height={28} className="rounded text-sm font-medium" />
        </div>
        <div className="p-4">
          <Skeleton variant="rectangular" width="100%" height={600} className="rounded" />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <Skeleton variant="rectangular" width={80} height={28} className="rounded text-sm font-medium inline-block" />
        </div>
        <div className="p-4">
          <div className="border border-gray-200 rounded-lg shadow-sm">
            <div className="flex">
              {/* Table Headers */}
              <div className="bg-gray-50 border-r border-gray-200 min-w-[140px]">
                <Skeleton variant="rectangular" width="100%" height={40} className="border-b border-gray-200" />
                <Skeleton variant="rectangular" width="100%" height={40} className="border-b border-gray-200" />
                <Skeleton variant="rectangular" width="100%" height={40} />
              </div>

              {/* Table Data Columns */}
              <div className="flex-1 flex overflow-hidden">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className={`min-w-[120px] text-center ${index !== 7 ? 'border-r border-gray-200' : ''}`}
                  >
                    <Skeleton variant="rectangular" width="100%" height={40} className="border-b border-gray-200" />
                    <Skeleton variant="rectangular" width="100%" height={40} className="border-b border-gray-200" />
                    <Skeleton variant="rectangular" width="100%" height={40} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
