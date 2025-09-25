import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = async () => {
  const isUserAuthenticated = await isAuthenticated();
  
  if (!isUserAuthenticated) {
    redirect('/sign-in');
  }
  
  const user = await getCurrentUser();

  // fetch in parallel
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewByUserId(user?.id || ""),
    getLatestInterviews({ userId: user?.id || "" }),
  ]);

  const hasPastInterviews = userInterviews && userInterviews.length > 0;
  const hasUpcomingInterviews = latestInterviews && latestInterviews.length > 0;

  return (
    <div className="space-y-12">
      {/* Hero CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-200/10 to-primary-200/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-200/5 rounded-full blur-xl animate-bounce"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Get Interview-Ready with <span className="text-primary-200">AI-Powered</span> Practice
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Practice on real interview questions & get instant feedback to improve your skills
            </p>
            <Button asChild className="bg-primary-200 text-dark-100 hover:bg-primary-200/90 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-full px-8 py-4 text-lg font-semibold">
              <Link href="/interview">Start an Interview ✨</Link>
            </Button>
          </div>
          
          <div className="flex-shrink-0 animate-fade-in-up animation-delay-200">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-200/20 rounded-full blur-2xl animate-pulse"></div>
              <Image
                src="/robot.png"
                alt="AI Interview Assistant"
                width={350}
                height={350}
                className="relative z-10 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Your Interviews Section */}
      <section className="space-y-6 animate-fade-in-up animation-delay-400">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-200 rounded-full"></div>
          <h2 className="text-3xl font-bold text-white">Your Interviews</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary-200/50 to-transparent"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hasPastInterviews ? (
            userInterviews?.map((interview, index) => (
              <div 
                key={interview.id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <InterviewCard {...interview} />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-primary-200/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <p className="text-gray-300 text-lg">You haven't taken any interviews yet</p>
                <p className="text-gray-400 mt-2">Start your first interview to see your progress here</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Available Interviews Section */}
      <section className="space-y-6 animate-fade-in-up animation-delay-600">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-200 rounded-full"></div>
          <h2 className="text-3xl font-bold text-white">Available Interviews</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary-200/50 to-transparent"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview, index) => (
              <div 
                key={interview.id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <InterviewCard {...interview} />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-primary-200/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <p className="text-gray-300 text-lg">No new interviews available</p>
                <p className="text-gray-400 mt-2">Check back later for new interview opportunities</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;