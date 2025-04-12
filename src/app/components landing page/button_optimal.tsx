import OptimizeButton from "@/app/optimize-button"
import { BookOpen, ChevronRight } from "lucide-react"

export default function UsageExample() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold">Default Button</h2>
      <OptimizeButton />

      <h2 className="text-xl font-bold">Custom Text</h2>
      <OptimizeButton text="Mulai Belajar Sekarang" />

      <h2 className="text-xl font-bold">Different Sizes</h2>
      <div className="flex flex-wrap gap-4">
        <OptimizeButton size="sm" text="Small" />
        <OptimizeButton size="md" text="Medium" />
        <OptimizeButton size="lg" text="Large" />
        <OptimizeButton size="xl" text="Extra Large" />
        <OptimizeButton size="2xl" text="2X Large" />
      </div>

      <h2 className="text-xl font-bold">Different Icons</h2>
      <div className="flex flex-wrap gap-4">
        <OptimizeButton icon={<ChevronRight className="h-5 w-5" />} />
        <OptimizeButton icon={<BookOpen className="h-5 w-5" />} />
      </div>

      <h2 className="text-xl font-bold">Icon Position</h2>
      <div className="flex flex-wrap gap-4">
        <OptimizeButton iconPosition="leading" text="Leading Icon" />
        <OptimizeButton iconPosition="trailing" text="Trailing Icon" />
      </div>

      <h2 className="text-xl font-bold">Full Width</h2>
      <OptimizeButton fullWidth />
    </div>
  )
}
