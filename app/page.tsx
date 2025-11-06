import SensorList from '@/components/SensorList';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-10 px-6 sm:py-32 sm:px-8">
        <SensorList />
      </main>
    </div>
  );
}