import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import ProgressBar from "@/app/components/progress_bar";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <WinstonSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Your page content goes here */}
          <ProgressBar percentage={25} />
          <h2 className="text-2xl font-semibold mb-4">Welcome to Winston</h2>
          <p className="text-gray-600">Your personal learning assistant</p>
        </main>
      </div>
    </div>
  );
}
