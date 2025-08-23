import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <main className="p-inset h-[100dvh] w-full bg-background">
      <Background src="/background.mp4" />
      <div className="relative h-full w-full p-inset rounded-[42px] md:rounded-[72px]">
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
