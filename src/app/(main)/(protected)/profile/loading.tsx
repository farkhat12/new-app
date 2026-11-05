import { Skeleton } from "@/shared/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Profile Info */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Skeleton className="size-16 shrink-0 rounded-full bg-blue-100 dark:bg-blue-950/40 sm:size-20" />

          <div className="min-w-0 space-y-2">
            <Skeleton className="h-7 w-36 bg-blue-100 dark:bg-blue-950/40" />
            <Skeleton className="h-4 w-40 bg-blue-100 dark:bg-blue-950/40" />
          </div>
        </div>

        <Skeleton className="h-9 w-24 bg-blue-100 dark:bg-blue-950/40" />
      </section>

      {/* Apartment Tabs */}
      <section className="space-y-4">
        <Skeleton className="h-6 w-36 bg-blue-100 dark:bg-blue-950/40" />

        {/* Tabs */}
        <div className="grid w-full grid-cols-2 gap-2 sm:w-64">
          <Skeleton className="h-9 rounded-md bg-blue-100 dark:bg-blue-950/40" />
          <Skeleton className="h-9 rounded-md bg-blue-100 dark:bg-blue-950/40" />
        </div>

        {/* Apartment Cards */}
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex gap-4 rounded-xl border p-4">
              <Skeleton className="size-24 shrink-0 rounded-lg bg-blue-100 dark:bg-blue-950/40" />

              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4 bg-blue-100 dark:bg-blue-950/40" />
                <Skeleton className="h-4 w-1/2 bg-blue-100 dark:bg-blue-950/40" />
                <Skeleton className="h-4 w-1/3 bg-blue-100 dark:bg-blue-950/40" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
