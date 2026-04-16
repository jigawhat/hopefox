import React, { useState } from 'react';
import { format, startOfWeek } from 'date-fns';
import DailyTasks from '../components/planner/DailyTasks';
import DailyGoals from '../components/planner/DailyGoals';
import WeeklyPlanning from '../components/planner/WeeklyPlanning';
import { CalendarDays, CheckSquare, Target } from 'lucide-react';

const tabs = [
  { id: 'tasks', label: 'Daily Tasks', icon: CheckSquare },
  { id: 'goals', label: 'Daily Goals', icon: Target },
  { id: 'weekly', label: 'Weekly Plan', icon: CalendarDays },
];

export default function Planner() {
  const [activeTab, setActiveTab] = useState('tasks');
  const today = format(new Date(), 'yyyy-MM-dd');
  const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold">My Planner</h1>
          <p className="text-muted-foreground mt-2">Organise your day, set goals, and plan your week.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-muted/50 p-1 rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-card shadow text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'tasks' && <DailyTasks date={today} />}
        {activeTab === 'goals' && <DailyGoals date={today} />}
        {activeTab === 'weekly' && <WeeklyPlanning weekStart={weekStart} />}

      </div>
    </div>
  );
}