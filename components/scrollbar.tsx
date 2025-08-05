import React from 'react'

const Scrollbar = ({ children }: { children: React.ReactNode }) => {
  const dummyContent = Array.from(
    { length: 20 },
    (_, index) =>
      `Section ${
        index + 1
      }: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Custom Scrollbar Demo</h2>

        <div
          className="w-full overflow-x-auto h-auto rounded-lg bg-gray-50 p-4
                     [&::-webkit-scrollbar]:h-1.5
                     [&::-webkit-scrollbar-track]:bg-gray-100
                     [&::-webkit-scrollbar-thumb]:bg-[#5F2F8E]
                     [&::-webkit-scrollbar-thumb:hover]:bg-[#5F2F8E/80]
                     [&::-webkit-scrollbar-button]:hidden
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     motion-safe:scroll-smooth"
          tabIndex={0}
          role="region"
          aria-label="Scrollable content"
        >
          <div className="flex space-x-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Scrollbar
