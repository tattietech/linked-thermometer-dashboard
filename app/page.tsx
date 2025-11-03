export default async function Home() {
   const response = await fetch(
    process.env.API_ENDPOINT as string,
    {
      headers: {
        "x-api-key": process.env.API_KEY,
      } as HeadersInit
    }
  );
  const data = await response.json();

  type Sensor = {
    deviceName: string;
    temperature: number;
    humidity: number;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-48 px-16 bg-white dark:bg-black sm:items-start">
        {data.map((sensor:Sensor) => (
        <div key={sensor.deviceName} >
          <p><strong>{sensor.deviceName}</strong></p>
          <p>Temperature: {sensor.temperature}°C</p>
          <p>Humidity: {sensor.humidity}%</p>
        </div>
      ))}
      </main>
    </div>
  );
}
