const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-violet-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <h2 className="mt-6 text-xl font-semibold text-white animate-pulse">
          Loading Your Notes<span className="loading-dots"></span>
        </h2>
        <p className="mt-2 text-purple-300">Please wait while we prepare everything for you</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;