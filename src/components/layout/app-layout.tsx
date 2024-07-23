import Footer from "./footer";
import Header from "./header";
import CustomProvider from "./providers";
import { Toaster } from 'sonner'


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          {children}
        </main>
        <Toaster richColors/>
        <Footer />
      </div>
    </CustomProvider>
  );
}
