"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/client";
import { onAuthStateChanged } from "firebase/auth";

export default function LandingPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!auth) {
      setIsChecking(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      } else {
        setIsChecking(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen pattern flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen pattern">
      {/* Header */}
      <header className="flex items-center justify-between p-6 max-w-7xl mx-auto backdrop-blur-sm bg-white/5 rounded-2xl mx-6 mt-4 border border-white/10">
        <div className="flex items-center gap-3 group">
          <div className="p-2 bg-primary-200/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Image src="/logo.svg" alt="PrepIt Logo" width={28} height={24} />
          </div>
          <h1 className="text-2xl font-bold text-primary-100">PrepIt</h1>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild className="bg-primary-200 text-dark-100 hover:bg-primary-200/90 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 max-w-5xl mx-auto relative">
        {/* Subtle floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-primary-200/5 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-primary-200/10 rounded-full blur-md animate-ping"></div>
        
        <div className="animate-fade-in-up">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Master Your Next Interview with <span className="text-primary-200">AI</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Practice job interviews with our AI-powered platform. Get real-time feedback, 
            improve your skills, and land your dream job with confidence.
          </p>
          <div className="animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="text-lg px-12 py-5 bg-primary-200 text-dark-100 hover:bg-primary-200/90 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-full">
              <Link href="/sign-up">Start Practicing Now ✨</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-white mb-12">
          Why Choose PrepIt?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-primary-200/30 transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="w-20 h-20 bg-primary-200/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Image src="/ai-avatar.png" alt="AI Interview" width={40} height={40} />
            </div>
            <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-200 transition-colors">🤖 AI-Powered Interviews</h4>
            <p className="text-gray-300 leading-relaxed">
              Practice with our advanced AI interviewer that adapts to your responses 
              and provides realistic interview scenarios.
            </p>
          </div>

          <div className="group text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-primary-200/30 transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="w-20 h-20 bg-primary-200/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Image src="/star.svg" alt="Feedback" width={40} height={40} />
            </div>
            <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-200 transition-colors">⚡ Instant Feedback</h4>
            <p className="text-gray-300 leading-relaxed">
              Get detailed analysis of your performance with scores on communication, 
              technical knowledge, and problem-solving skills.
            </p>
          </div>

          <div className="group text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-primary-200/30 transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="w-20 h-20 bg-primary-200/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Image src="/tech.svg" alt="Tech Stack" width={40} height={40} />
            </div>
            <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-200 transition-colors">🚀 Multiple Tech Stacks</h4>
            <p className="text-gray-300 leading-relaxed">
              Practice interviews for various roles including React, Node.js, Python, 
              and many other technologies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-dark-200/50 backdrop-blur-sm text-white py-24 px-6 text-center overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary-200/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-primary-200/5 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative z-10">
          <h3 className="text-5xl font-bold mb-8 text-white">
            Ready to Ace Your Next Interview? 🎯
          </h3>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-300">
            Join thousands of developers who have improved their interview skills with PrepIt.
          </p>
          <Button asChild size="lg" className="text-lg px-12 py-5 bg-primary-200 text-dark-100 hover:bg-primary-200/90 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-full">
            <Link href="/sign-up">Start Your Free Practice 🚀</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}