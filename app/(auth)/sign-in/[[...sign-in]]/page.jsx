import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section - Hero Image & Text */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Aask Senior Hero"
            src="/assets/hero-image.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861..."
                  fill="currentColor"
                />
              </svg>
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Connect with Alumni, Shape Your Future
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Aask Senior helps students connect with alumni from their college
              who are working in different fields. Get career guidance, industry
              insights, and mentorship based on your interests.
            </p>
          </div>
        </section>

        {/* Right Section - Authentication */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.41 10.3847C1.14777 7.4194 2.85643..." fill="currentColor" />
                </svg>
              </a>
            </div>

            {/* Clerk SignIn Component */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sign in to Aask Senior</h2>
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
