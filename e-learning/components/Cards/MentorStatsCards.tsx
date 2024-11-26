import React from 'react';

function MentorStatsCards() {
  return (
      <>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                  Total Clients
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                  1.6M
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                  Courses Bought
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                  19.2K
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                  Servers a week
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                  4.9K
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                  Total Revenue
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                  166.7K
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </>
  );
}

export default MentorStatsCards;
