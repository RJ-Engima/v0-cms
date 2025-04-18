export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-1/3 animate-pulse rounded-md bg-muted"></div>
      <div className="h-64 animate-pulse rounded-lg bg-muted"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-96 animate-pulse rounded-lg bg-muted"></div>
        <div className="h-96 animate-pulse rounded-lg bg-muted"></div>
      </div>
    </div>
  )
}
