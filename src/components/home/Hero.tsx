
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Your Space for</span>
                <span className="block gradient-heading mt-2">Mental Wellness</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                A supportive community where you can share, track, and grow your mental well-being. 
                Connect anonymously with peers, access resources, and develop wellness habits.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link to="/forums">
                    <Button className="button-primary w-full">Join Community</Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/resources">
                    <Button className="button-secondary w-full">Explore Resources</Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="absolute -bottom-24 left-0 right-0 h-40 bg-gradient-to-b from-white to-wellness-lavender/30 transform rotate-1 scale-110"></div>
    </div>
  );
};

export default Hero;
