import React from 'react';

const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <button onClick={handleRefresh} className='bg-orange-500 hover:bg-orange-600 py-2 px-6 rounded-full text-white'>
      Update
    </button>
  );
};

export default RefreshButton;