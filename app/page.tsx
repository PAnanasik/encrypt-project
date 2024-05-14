import { Suspense } from "react";
import ContentBlock from "./components/content";
import FormMain from "./components/form";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SkeletonCard } from "./components/skeleton";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center pl-4 h-full">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel className="w-full flex" defaultSize={60}>
          <FormMain />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="w-full" defaultSize={40} minSize={1}>
          <Suspense fallback={<SkeletonCard />}>
            <ContentBlock />
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
