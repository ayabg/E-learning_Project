"use client"
import MentorStatsCards from '@/components/Cards/MentorStatsCards'
import { BarchartCustomLabel } from '@/components/Charts/BarChartCustomLabel'
import { ChartbarInteractive } from '@/components/Charts/ChartbarInteractive'
import { LineChartLabel } from '@/components/Charts/LinechartLabel'
import { PieChartLabel } from '@/components/Charts/PieChart'
import MentorProfileSidebar from '@/components/sidebars/MentorProfileSidebar'
import React from 'react'

function MentorProfile() {
  return (
    <div className="w-full mb-6 flex">
        <MentorProfileSidebar />
        <div className="w-full h-full max-md:p-2 p-12 bg-[#C0C0C0]/15">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 max-md:text-lg md:pl-8">
            My Statistics
          </h1>
          <div className="w-full max-w-[1500px] mx-auto mt-4 flex flex-col gap-5">
            <MentorStatsCards />
            <ChartbarInteractive />
            <div className="w-full grid lg:grid-cols-3 gap-5">
                <BarchartCustomLabel />
                <LineChartLabel />
                <PieChartLabel />
            </div>
          </div>
        </div>
    </div>
  )
}

export default MentorProfile