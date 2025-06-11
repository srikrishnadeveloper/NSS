
import React from 'react';
import Header from '@/components/Header';
import UserTypeCard from '@/components/UserTypeCard';

const Index = () => {
  const AdminIcon = () => (
    <svg className="h-12 w-12 md:h-16 md:w-16 text-red-600" viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 2L42 12V22L54 30V50L32 62L10 50V30L22 22V12L32 2Z" />
      <path d="M32 8L26 14V20L18 26V44L32 52L46 44V26L38 20V14L32 8Z" fill="white" />
      <circle cx="32" cy="25" r="6" />
      <path d="M22 40C22 36 26 33 32 33C38 33 42 36 42 40V44H22V40Z" />
      <rect x="28" y="15" width="8" height="3" />
      <rect x="30" y="12" width="4" height="2" />
    </svg>
  );

  const CoachIcon = () => (
    <svg className="h-12 w-12 md:h-16 md:w-16 text-blue-600" viewBox="0 0 64 64" fill="currentColor">
      <circle cx="32" cy="18" r="8" />
      <path d="M32 28C24 28 18 34 18 42V54H46V42C46 34 40 28 32 28Z" />
      <path d="M12 48L20 44L24 52L16 56L12 48Z" />
      <path d="M52 48L48 56L40 52L44 44L52 48Z" />
      <circle cx="32" cy="35" r="2" fill="white" />
      <path d="M28 40H36V44H28V40Z" fill="white" />
      <rect x="14" y="46" width="4" height="8" />
      <rect x="46" y="46" width="4" height="8" />
      <path d="M26 22C26 20 28 18 30 18H34C36 18 38 20 38 22V24H26V22Z" fill="white" />
    </svg>
  );

  const ParentIcon = () => (
    <svg className="h-12 w-12 md:h-16 md:w-16 text-green-600" viewBox="0 0 64 64" fill="currentColor">
      <circle cx="24" cy="16" r="6" />
      <circle cx="40" cy="16" r="6" />
      <circle cx="32" cy="28" r="4" />
      <path d="M24 24C18 24 14 28 14 34V46H34V40C34 36 30 32 26 32H22C20 32 18 30 18 28V26C20 25 22 24 24 24Z" />
      <path d="M40 24C46 24 50 28 50 34V46H30V40C30 36 34 32 38 32H42C44 32 46 30 46 28V26C44 25 42 24 40 24Z" />
      <path d="M32 34C28 34 25 37 25 41V53H39V41C39 37 36 34 32 34Z" />
      <rect x="26" y="48" width="12" height="8" fill="white" />
      <circle cx="29" cy="51" r="1" fill="currentColor" />
      <circle cx="35" cy="51" r="1" fill="currentColor" />
      <path d="M29 53H35V54H29V53Z" fill="currentColor" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-roboto">
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-8 mt-16">
          {/* Select Your Role Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide">
              SELECT YOUR ROLE
            </h1>
          </div>

          {/* First row - Admin and Coach */}
          <div className="flex justify-center items-center gap-8 md:gap-12">
            <UserTypeCard
              userType="admin"
              title="ADMIN"
              description=""
              icon={<AdminIcon />}
              href="/login/admin"
            />
            
            <UserTypeCard
              userType="coach"
              title="COACH"
              description=""
              icon={<CoachIcon />}
              href="/login/coach"
            />
          </div>
          
          {/* Second row - Parent (centered) */}
          <div className="flex justify-center">
            <UserTypeCard
              userType="parent"
              title="PARENT"
              description=""
              icon={<ParentIcon />}
              href="/login/parent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
